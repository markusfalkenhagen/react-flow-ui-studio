# How-To: Webhooks konfigurieren und nutzen

Dieses Dokument beschreibt, wie Sie die Webhook-Funktionalität in ReplicateAI konfigurieren und nutzen können, um die KI-gesteuerte Tool-Auswahl mit externen Diensten zu verbinden.

## 1. Ausgehende Webhooks (KI-gesteuert)

ReplicateAI kann nach der KI-gesteuerten Tool-Auswahl einen Webhook an eine externe URL senden. Dies wird typischerweise verwendet, um einen Workflow in einem Automatisierungstool wie n8n auszulösen.

### 1.1. n8n-Webhook-URL abrufen

1.  **n8n-Instanz**: Stellen Sie sicher, dass Sie eine laufende n8n-Instanz haben (lokal oder gehostet).
2.  **Neuen Workflow erstellen**: Erstellen Sie einen neuen Workflow in n8n.
3.  **Webhook-Node hinzufügen**: Fügen Sie einen "Webhook"-Node als Startpunkt des Workflows hinzu.
4.  **Webhook-URL kopieren**: Konfigurieren Sie den Webhook-Node (z.B. Methode auf `POST` setzen) und kopieren Sie die generierte "Webhook URL". Diese URL wird Ihre `N8N_WEBHOOK_URL`.

### 1.2. `N8N_WEBHOOK_URL` in `.env` konfigurieren

Öffnen Sie die `.env`-Datei in Ihrem ReplicateAI-Projekt und fügen Sie die n8n-Webhook-URL hinzu.

1.  **`.env` Datei öffnen**: Suchen Sie die `.env`-Datei im Stammverzeichnis Ihres Projekts.
2.  **Variable hinzufügen/aktualisieren**: Fügen Sie die folgende Zeile hinzu oder aktualisieren Sie sie mit Ihrer n8n-Webhook-URL:

    ```env
    N8N_WEBHOOK_URL=Ihre_n8n_Webhook_URL_hier
    ```
    *Ersetzen Sie den Platzhalter durch Ihre tatsächliche n8n-Webhook-URL.*

### 1.3. n8n-Workflow für Tool-Auswahl erstellen

In n8n können Sie einen Workflow erstellen, der auf die von ReplicateAI gesendeten Daten reagiert.

1.  **Webhook-Node**: Der Webhook-Node empfängt die Daten von ReplicateAI. Der Request Body enthält `toolSelected` und `reasoning`.
    ```json
    {
      "toolSelected": "DataAnalysis",
      "reasoning": "The user's request clearly indicates a need to analyze sales figures, which falls under data analysis."
    }
    ```
2.  **If-Node (Conditional Logic)**: Fügen Sie einen "If"-Node hinzu, um basierend auf dem Wert von `toolSelected` verschiedene Pfade zu erstellen.
    *   Beispiel: Wenn `toolSelected` "DataAnalysis" ist, führen Sie einen bestimmten Zweig des Workflows aus.
3.  **Aktions-Nodes**: Fügen Sie Nodes hinzu, die die tatsächlichen Aktionen ausführen.
    *   Für "DataAnalysis": Verbinden Sie sich mit einer Datenbank, führen Sie eine Abfrage aus, generieren Sie einen Bericht.
    *   Für "ContentGeneration": Verwenden Sie einen LLM-Node, um Text zu generieren, und senden Sie ihn an eine E-Mail oder ein CMS.
    *   Für "CodeExecution": Führen Sie ein Skript auf einem Server aus.
4.  **Workflow aktivieren**: Speichern und aktivieren Sie Ihren n8n-Workflow.

## 2. Eingehende Webhooks (ReplicateAI als Empfänger)

ReplicateAI kann auch selbst als Webhook-Empfänger fungieren. Dies ist nützlich, wenn Sie externe Systeme haben, die die KI-Logik von ReplicateAI auslösen möchten.

### 2.1. Endpunkt-URL

Der Endpunkt für eingehende Webhooks in ReplicateAI ist:

*   **URL**: `http://localhost:3000/api/webhook` (für lokale Entwicklung)
    *   In Produktion wird dies `https://ihre-domain.com/api/webhook` sein.
*   **Methode**: `POST`
*   **Request Body**: Erwartet ein JSON-Objekt mit einer `message`-Eigenschaft.
    ```json
    {
      "message": "Ihre Nachricht hier, die von der KI verarbeitet werden soll."
    }
    ```

### 2.2. Testen des eingehenden Webhooks

Sie können diesen Endpunkt mit Tools wie `curl`, Postman, Insomnia oder direkt aus einem n8n-Workflow testen.

#### Beispiel mit `curl`:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"message": "Analysiere die Verkaufszahlen des letzten Quartals."}' http://localhost:3000/api/webhook
```

Die Antwort sollte ein JSON-Objekt mit `toolSelected` und `reasoning` enthalten, das von der ReplicateAI-KI generiert wurde.

Durch die Nutzung dieser Webhook-Funktionalitäten können Sie ReplicateAI nahtlos in Ihre bestehenden Automatisierungs- und Datenverarbeitungsworkflows integrieren.