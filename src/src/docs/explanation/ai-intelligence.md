# KI-Intelligenz und Tool-Auswahl in ReplicateAI

Das Herzstück der intelligenten Funktionalität von ReplicateAI ist der `intelligentWebhookFlow`, ein KI-Agent, der darauf trainiert ist, die Absicht des Benutzers zu verstehen und das am besten geeignete Tool oder die beste Fähigkeit auszuwählen, um eine Aufgabe zu erfüllen. Dieses Dokument beschreibt, wie diese KI-Intelligenz funktioniert.

## 1. Der `intelligentWebhookFlow`

Der `intelligentWebhookFlow` ist ein Genkit AI Flow, der die Kernlogik für die Tool-Auswahl kapselt. Er nimmt eine Benutzernachricht entgegen und gibt den Namen des ausgewählten Tools sowie eine Begründung für diese Auswahl zurück.

*   **Definition**: Definiert in [`src/ai/flows/intelligent-webhooks.ts`](src/ai/flows/intelligent-webhooks.ts).
*   **Input Schema (`IntelligentWebhookInputSchema`)**: Erwartet ein Objekt mit einer `message`-Eigenschaft (der Text der Benutzernachricht).
*   **Output Schema (`IntelligentWebhookOutputSchema`)**: Gibt ein Objekt mit `toolSelected` (Name des Tools) und `reasoning` (Begründung der KI) zurück.

## 2. Das `toolSelectionPrompt`

Der `intelligentWebhookFlow` nutzt ein Prompt-Template namens `toolSelectionPrompt`, um das zugrunde liegende große Sprachmodell (LLM) anzuweisen, die Tool-Auswahl durchzuführen.

*   **Zweck**: Leitet das LLM an, die Benutzernachricht zu analysieren und eine Entscheidung über das passende Tool zu treffen.
*   **Prompt-Inhalt**: Der Prompt enthält:
    *   Eine Rolle für die KI ("FlowHero, ein KI-Assistent, der intelligent das am besten geeignete Tool oder die beste Fähigkeit auswählt...").
    *   Eine Liste der verfügbaren Tools/Capabilities mit Beispielen für deren Anwendungsfälle.
    *   Die Anweisung, das am besten geeignete Tool basierend auf der "Task Description" des Benutzers zu bestimmen.
    *   Das gewünschte JSON-Ausgabeformat (`toolSelected` und `reasoning`).

### Beispiel für Prompt-Logik

Wenn der Benutzer eine Nachricht wie "Analysiere die Verkaufszahlen des letzten Quartals und finde die umsatzstärksten Produkte." eingibt, wird der Prompt das LLM dazu anleiten, dies als eine Aufgabe zur "Datenanalyse" zu erkennen.

## 3. Verfügbare Tools/Capabilities

Die KI ist darauf trainiert, zwischen den folgenden vordefinierten Tools zu unterscheiden:

*   **"DataAnalysis"**: Für Aufgaben, die die Analyse von Datensätzen, Tabellen, das Erkennen von Trends oder das Generieren von Erkenntnissen aus Daten beinhalten.
    *   *Beispiel*: "Analysiere die Verkaufszahlen des letzten Quartals und finde die umsatzstärksten Produkte."
*   **"ContentGeneration"**: Für Aufgaben, die das Schreiben von Texten beinhalten, wie das Verfassen von E-Mails, das Erstellen von Marketingtexten, das Zusammenfassen von Dokumenten oder das Schreiben von Artikeln.
    *   *Beispiel*: "Entwerfe eine E-Mail an einen Kunden über ein Projekt-Update."
*   **"CodeExecution"**: Für Aufgaben, die das Schreiben oder Ausführen von Skripten erfordern, wie Python für die Datenmanipulation oder ein Shell-Skript für die Automatisierung.
    *   *Beispiel*: "Schreibe ein Python-Skript, um CSV in JSON zu konvertieren."
*   **"FileManagement"**: Für Aufgaben im Zusammenhang mit Dateivorgängen wie Konvertierung, Organisation oder Extraktion.
    *   *Beispiel*: "Konvertiere diese DOCX-Datei in PDF."
*   **"Research"**: Für Aufgaben, die das Sammeln von Informationen, das Finden von Fakten oder das Erforschen von Themen erfordern.
    *   *Beispiel*: "Recherchiere die neuesten Fortschritte in der KI."
*   **"Planning"**: Für Aufgaben, die das Erstellen von Zeitplänen, Reiserouten oder Projektplänen beinhalten.
    *   *Beispiel*: "Plane eine 3-tägige Reise nach Paris."
*   **"GeneralTask"**: Für allgemeine Anfragen, die nicht eindeutig in andere Kategorien passen oder einen mehrstufigen Ansatz erfordern.
    *   *Beispiel*: "Hilf mir, meine bevorstehende Marketingkampagne zu organisieren."

## 4. Integration mit Webhooks

Nachdem die KI ein Tool ausgewählt hat, kann der `intelligentWebhookFlow` einen HTTP POST-Request an eine konfigurierte n8n-Webhook-URL senden. Dieser Webhook enthält die von der KI getroffene Entscheidung (`toolSelected` und `reasoning`).

*   **Zweck**: Ermöglicht die Auslösung externer Workflows und die Integration mit Drittanbieterdiensten basierend auf der KI-Entscheidung.
*   **Konfiguration**: Die n8n-Webhook-URL wird über die Umgebungsvariable `N8N_WEBHOOK_URL` bereitgestellt.
*   **Vorteil**: Entkoppelt die KI-Logik von der tatsächlichen Tool-Ausführung, was eine hohe Flexibilität und Erweiterbarkeit ermöglicht. n8n kann dann die spezifische Logik für jedes Tool implementieren.

Diese Architektur ermöglicht es ReplicateAI, auf intelligente Weise auf eine Vielzahl von Benutzeranfragen zu reagieren, indem es die Leistungsfähigkeit von LLMs mit flexiblen Workflow-Automatisierungstools kombiniert.