'use server';

/**
 * @fileOverview An AI agent that intelligently selects the appropriate tool based on the user's task.
 *
 * - intelligentWebhookFlow - A function that handles the intelligent tool selection process.
 * - IntelligentWebhookInput - The input type for the intelligentWebhookFlow function.
 * - IntelligentWebhookOutput - The return type for the intelligentWebhookFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

declare var process: {
  env: {
    N8N_WEBHOOK_URL: string;
  };
};

const IntelligentWebhookInputSchema = z.object({
  message: z.string().describe('The task description from the user.'),
});
export type IntelligentWebhookInput = z.infer<typeof IntelligentWebhookInputSchema>;

const IntelligentWebhookOutputSchema = z.object({
  toolSelected: z.string().describe('The name of the tool/capability selected by the AI.'),
  reasoning: z.string().describe('The AI reasoning for selecting the tool/capability.'),
});
export type IntelligentWebhookOutput = z.infer<typeof IntelligentWebhookOutputSchema>;

export async function intelligentWebhook(input: IntelligentWebhookInput): Promise<IntelligentWebhookOutput> {
  return intelligentWebhookFlow(input);
}

const toolSelectionPrompt = ai.definePrompt({
  name: 'toolSelectionPrompt',
  input: {schema: IntelligentWebhookInputSchema},
  output: {schema: IntelligentWebhookOutputSchema},
  prompt: `You are FlowHero, an AI assistant that intelligently selects the most appropriate tool or capability to fulfill a user's task request.

You have access to the following tools/capabilities:
- "DataAnalysis": For tasks involving analyzing datasets, spreadsheets, identifying trends, or generating insights from data. Example: "Analyze last quarter's sales figures and find top performing products."
- "ContentGeneration": For tasks involving writing text, such as drafting emails, creating marketing copy, summarizing documents, or writing articles. Example: "Draft an email to a client about a project update."
- "CodeExecution": For tasks that require writing or running scripts, like Python for data manipulation or a shell script for automation. Example: "Write a Python script to convert CSV to JSON."
- "FileManagement": For tasks related to file operations like conversion, organization, or extraction. Example: "Convert this DOCX file to PDF."
- "Research": For tasks requiring information gathering, finding facts, or exploring topics. Example: "Research the latest advancements in AI."
- "Planning": For tasks involving creating schedules, itineraries, or project plans. Example: "Plan a 3-day trip to Paris."
- "GeneralTask": For general requests that don't fit neatly into other categories or require a multi-step approach. Example: "Help me organize my upcoming marketing campaign."

Based on the user's task description, determine which tool/capability is most appropriate.

Task Description: {{{message}}}

Return the name of the selected tool/capability and your reasoning for selecting it.

Output in JSON format:
{
  "toolSelected": "<tool_name_from_list_above>",
  "reasoning": "<your_reasoning_for_selecting_this_tool>"
}
`,
});

const intelligentWebhookFlow = ai.defineFlow(
  {
    name: 'intelligentWebhookFlow',
    inputSchema: IntelligentWebhookInputSchema,
    outputSchema: IntelligentWebhookOutputSchema,
  },
  async input => {
    const {output} = await toolSelectionPrompt(input);

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(output),
        });
        console.log('Webhook sent to n8n successfully.');
      } catch (error) {
        console.error('Failed to send webhook to n8n:', error);
      }
    }
    return output!;
  }
);
