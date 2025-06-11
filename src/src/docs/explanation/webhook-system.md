# Webhook-System in ReplicateAI

Das Webhook-System in ReplicateAI ermöglicht die Kommunikation zwischen der Anwendung und externen Diensten, insbesondere für die Ausführung von Aktionen, die durch die KI-gesteuerte Tool-Auswahl initiiert werden. Es besteht aus zwei Hauptteilen: einem eingehenden Webhook-Endpunkt für die Anwendung und einem ausgehenden Webhook, der von der KI ausgelöst wird.

## 1. Eingehender Webhook-Endpunkt (`/api/webhook`)

ReplicateAI stellt einen eigenen API-Endpunkt bereit, der als Webhook-Empfänger fungieren kann. Dieser Endpunkt ist dafür konzipiert, externe Anfragen zu verarbeiten und die `intelligentWebhook`-Funktion auszulösen.

*   **Zweck**: Ermöglicht es externen Systemen (z.B. n8n, andere Automatisierungstools), Anfragen an ReplicateAI zu senden, um die KI-Logik zu initiieren.
*   **Route**: [`src/app/api/webhook/route.ts`](src/app/api/webhook/route.ts)
*   **Methode**: `POST`
*   **Erwarteter Request Body**: Ein JSON-Objekt mit einer `message`-Eigenschaft, die den Text der Benutzereingabe enthält.
    ```json
    {
      "message": "Analysiere die Verkaufsdaten für das letzte Quartal."
    }
    ```
*   **Funktionsweise**:
    1.  Empfängt eine POST-Anfrage.
    2.  Extrahiert die `message` aus dem Request Body.
    3.  Ruft die `intelligentWebhook`-Funktion auf, um die KI-Tool-Auswahl durchzuführen.
    4.  Gibt das Ergebnis der KI-Auswahl als JSON-Antwort zurück.
*   **Fehlerbehandlung**: Der Endpunkt enthält grundlegende Fehlerbehandlung für fehlende Nachrichten oder interne Serverfehler.

## 2. Ausgehender Webhook (n8n-Integration)

Nachdem der `intelligentWebhookFlow` ein Tool ausgewählt hat, kann er einen ausgehenden Webhook an eine konfigurierte n8n-URL senden. Dies ist der Mechanismus, um die KI-Entscheidung an ein Workflow-Automatisierungstool zu übergeben, das dann die eigentliche Aktion ausführen kann.

*   **Auslöser**: Erfolgreiche Tool-Auswahl durch den `intelligentWebhookFlow`.
*   **Konfiguration**: Die Ziel-URL für den ausgehenden Webhook wird über die Umgebungsvariable `N8N_WEBHOOK_URL` in der `.env`-Datei definiert.
    ```env
    N8N_WEBHOOK_URL=https://flowherodemo.app.n8n.cloud/webhook-test/test
    ```
*   **Gesendeter Request Body**: Der Webhook sendet ein JSON-Objekt, das die Ausgabe des KI-Flows enthält:
    ```json
    {
      "toolSelected": "DataAnalysis",
      "reasoning": "The user's request clearly indicates a need to analyze sales figures, which falls under data analysis."
    }
    ```
*   **Implementierung**: Die Logik für das Senden des Webhooks ist in [`src/ai/flows/intelligent-webhooks.ts`](src/ai/flows/intelligent-webhooks.ts) innerhalb des `intelligentWebhookFlow` implementiert.
    ```typescript
    // Auszug aus intelligent-webhooks.ts
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(output), // 'output' enthält toolSelected und reasoning
        });
        console.log('Webhook sent to n8n successfully.');
      } catch (error) {
        console.error('Failed to send webhook to n8n:', error);
      }
    }
    ```
*   **Vorteile der n8n-Integration**:
    *   **Flexibilität**: n8n kann eine Vielzahl von Aktionen ausführen, von der Interaktion mit APIs bis zur Datenverarbeitung, basierend auf der empfangenen Tool-Auswahl.
    *   **Entkopplung**: Die KI-Logik bleibt sauber und muss keine spezifischen Implementierungsdetails für jedes Tool kennen.
    *   **Visuelle Workflows**: n8n bietet eine grafische Oberfläche zum Erstellen und Verwalten komplexer Workflows.

## 3. Anwendungsfälle

*   **Automatisierte Aufgaben**: Die KI wählt ein Tool, und n8n führt eine automatisierte Aufgabe aus (z.B. E-Mail-Versand, Datenbank-Update).
*   **Datenverarbeitung**: Die KI erkennt eine Datenanalyse-Anfrage, sendet einen Webhook an n8n, und n8n startet einen Datenanalyse-Workflow.
*   **Benachrichtigungen**: Nach einer bestimmten KI-Aktion kann n8n eine Benachrichtigung an Slack, Teams oder andere Kommunikationskanäle senden.

Das Webhook-System ist ein entscheidender Bestandteil von ReplicateAI, der die Brücke zwischen der intelligenten KI und der Ausführung realer Aktionen schlägt.