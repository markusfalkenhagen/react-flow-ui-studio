# How-To: Neue KI-Tools in ReplicateAI integrieren

Dieser Leitfaden beschreibt den Prozess der Integration neuer KI-gesteuerter Tools oder Fähigkeiten in ReplicateAI. Dies beinhaltet die Erweiterung des `intelligentWebhookFlow` und die Konfiguration von n8n, um die neuen Tools zu verarbeiten.

## 1. Überblick des Integrationsprozesses

Die Integration eines neuen Tools in ReplicateAI folgt einem dreistufigen Prozess:

1.  **Definition des Tools**: Beschreiben Sie das neue Tool und seine Anwendungsfälle im `toolSelectionPrompt`.
2.  **KI-Erkennung**: Trainieren Sie die KI (durch den Prompt), das neue Tool basierend auf Benutzereingaben zu erkennen.
3.  **Aktionsausführung**: Konfigurieren Sie n8n (oder einen anderen externen Dienst), um die tatsächliche Aktion auszuführen, wenn das Tool von der KI ausgewählt wird.

## 2. Schritt 1: `intelligent-webhooks.ts` aktualisieren

Sie müssen die Liste der verfügbaren Tools im `toolSelectionPrompt` in [`src/ai/flows/intelligent-webhooks.ts`](src/ai/flows/intelligent-webhooks.ts) erweitern.

1.  **Datei öffnen**: Öffnen Sie `src/ai/flows/intelligent-webhooks.ts`.
2.  **Tool hinzufügen**: Fügen Sie Ihr neues Tool zur Liste im `prompt`-String hinzu. Beschreiben Sie klar, wofür das Tool ist und geben Sie ein Beispiel für eine Benutzereingabe, die dieses Tool auslösen würde.

    ```typescript
    // Auszug aus src/ai/flows/intelligent-webhooks.ts
    prompt: `You are FlowHero, an AI assistant that intelligently selects the most appropriate tool or capability to fulfill a user's task request.

    You have access to the following tools/capabilities:
    ...
    - "NewToolName": For tasks involving [kurze Beschreibung des Anwendungsfalls]. Example: "[Beispiel-Benutzereingabe]."
    ...
    `,
    ```
    *Ersetzen Sie `"NewToolName"` und die Beschreibungen durch die Details Ihres neuen Tools.*

3.  **Anwendung neu starten**: Nach dem Speichern der Änderungen müssen Sie Ihren Next.js-Entwicklungs-Server neu starten, damit die Änderungen am Genkit AI Flow wirksam werden.

## 3. Schritt 2: n8n-Workflow erweitern

Nachdem die KI nun in der Lage ist, Ihr neues Tool zu erkennen, müssen Sie n8n anweisen, was zu tun ist, wenn dieses Tool ausgewählt wird.

1.  **n8n-Workflow öffnen**: Öffnen Sie den n8n-Workflow, der den Webhook von ReplicateAI empfängt (den Sie unter [How-To: Webhooks konfigurieren](configure-webhooks.md) eingerichtet haben).
2.  **If-Node erweitern**: Wenn Sie einen "If"-Node verwenden, um die `toolSelected`-Eigenschaft zu prüfen, fügen Sie eine neue Bedingung für Ihr `NewToolName` hinzu.
3.  **Neuen Workflow-Zweig erstellen**: Erstellen Sie einen neuen Zweig im Workflow, der ausgeführt wird, wenn Ihr `NewToolName` ausgewählt wird.
4.  **Aktions-Nodes hinzufügen**: Fügen Sie die erforderlichen Nodes hinzu, um die tatsächliche Aktion für Ihr neues Tool auszuführen. Dies könnte sein:
    *   Ein "HTTP Request"-Node, um eine externe API aufzurufen.
    *   Ein "Function"-Node, um benutzerdefinierten JavaScript-Code auszuführen.
    *   Ein "Database"-Node, um mit einer Datenbank zu interagieren.
    *   Ein "Email"-Node, um eine E-Mail zu senden.
    *   Jeder andere n8n-Node, der die gewünschte Funktionalität bietet.

### Beispiel für einen n8n-Workflow-Zweig für "NewToolName"

```mermaid
graph TD
    A[Webhook (ReplicateAI)] --> B{If toolSelected is "NewToolName"?}
    B -- Yes --> C[Execute NewToolName Logic]
    C --> D[API Call / Database Op / etc.]
    B -- No --> E[Continue to other tool logic]
```

## 4. Schritt 3: Testen des neuen Tools

1.  **ReplicateAI Chat**: Gehen Sie zum Chat-Interface von ReplicateAI.
2.  **Test-Nachricht senden**: Senden Sie eine Nachricht, die Ihr neues Tool auslösen sollte, basierend auf dem Beispiel, das Sie im `toolSelectionPrompt` definiert haben.
    *   Beispiel: "Bitte [Ihre Beispiel-Benutzereingabe für NewToolName]."
3.  **Überprüfen der KI-Antwort**: Im Chat sollte eine Systemnachricht erscheinen, die anzeigt, dass die KI Ihr `NewToolName` ausgewählt hat.
4.  **n8n-Workflow-Ausführung prüfen**: Überprüfen Sie in Ihrer n8n-Instanz den Ausführungsverlauf des Workflows. Sie sollten sehen, dass der Webhook von ReplicateAI empfangen wurde und der Zweig für Ihr `NewToolName` ausgeführt wurde.

Durch diese Schritte können Sie die Fähigkeiten von ReplicateAI erweitern, indem Sie neue KI-gesteuerte Tools integrieren und diese mit leistungsstarken Automatisierungsworkflows verbinden.