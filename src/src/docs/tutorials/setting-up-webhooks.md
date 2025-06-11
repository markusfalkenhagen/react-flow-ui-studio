# Tutorial: Webhooks einrichten

Dieses Tutorial führt Sie durch die Einrichtung der ausgehenden Webhook-Funktionalität in ReplicateAI, um die KI-gesteuerte Tool-Auswahl mit einem externen Dienst wie n8n zu verbinden.

## 1. Voraussetzungen

*   Eine laufende ReplicateAI-Anwendung (siehe [Tutorial: Erste Schritte](getting-started.md)).
*   Eine laufende n8n-Instanz (lokal oder gehostet).

## 2. n8n-Webhook-URL abrufen

Sie benötigen eine Webhook-URL von Ihrer n8n-Instanz, die ReplicateAI aufrufen kann.

1.  **Neuen Workflow in n8n erstellen**: Öffnen Sie Ihre n8n-Instanz und erstellen Sie einen neuen, leeren Workflow.
2.  **Webhook-Node hinzufügen**: Suchen Sie in der Node-Palette nach "Webhook" und fügen Sie ihn Ihrem Workflow hinzu.
3.  **Webhook-Node konfigurieren**:
    *   Klicken Sie auf den Webhook-Node, um seine Einstellungen zu öffnen.
    *   Stellen Sie sicher, dass die "HTTP Method" auf `POST` eingestellt ist.
    *   Klicken Sie auf "Webhook URLs". Sie sehen eine Test-URL und eine Produktions-URL.
    *   **Kopieren Sie die "Test Webhook URL"**. Diese URL wird für die lokale Entwicklung von ReplicateAI verwendet.
4.  **Workflow speichern**: Speichern Sie Ihren n8n-Workflow.

## 3. `N8N_WEBHOOK_URL` in ReplicateAI konfigurieren

Öffnen Sie die `.env`-Datei in Ihrem ReplicateAI-Projekt und fügen Sie die kopierte n8n-Webhook-URL hinzu.

1.  **`.env` Datei öffnen**: Suchen Sie die `.env`-Datei im Stammverzeichnis Ihres Projekts.
2.  **Variable hinzufügen/aktualisieren**: Fügen Sie die folgende Zeile hinzu oder aktualisieren Sie sie mit Ihrer n8n-Test-Webhook-URL:

    ```env
    N8N_WEBHOOK_URL=Ihre_n8n_Test_Webhook_URL_hier
    ```
    *Ersetzen Sie den Platzhalter durch die URL, die Sie in Schritt 2.3 kopiert haben.*

3.  **ReplicateAI neu starten**: Wenn Ihre ReplicateAI-Anwendung bereits läuft, starten Sie den Entwicklungs-Server neu, damit die neue Umgebungsvariable geladen wird.

## 4. n8n-Workflow testen

Jetzt können Sie testen, ob ReplicateAI den Webhook an n8n sendet.

1.  **n8n-Workflow aktivieren**: Stellen Sie sicher, dass Ihr n8n-Workflow aktiv ist (der Schalter oben rechts im Workflow-Editor sollte grün sein).
2.  **ReplicateAI Chat öffnen**: Gehen Sie zurück zum ReplicateAI Chat-Interface in Ihrem Browser (`http://localhost:3000`).
3.  **Nachricht senden**: Senden Sie eine Nachricht im ReplicateAI Chat, die eine klare Absicht für eines der [KI-Tools](explanation/ai-intelligence.md) hat.
    *   Beispiel: "Analysiere die Daten in dieser Tabelle." (Dies sollte das "DataAnalysis"-Tool auslösen).
4.  **n8n-Ausführung prüfen**: Wechseln Sie zurück zu Ihrer n8n-Instanz. Im Webhook-Node sollten Sie sehen, dass eine Ausführung stattgefunden hat. Klicken Sie auf den Webhook-Node und dann auf "Input Data", um die von ReplicateAI gesendeten Daten zu sehen (ein JSON-Objekt mit `toolSelected` und `reasoning`).

## 5. n8n-Workflow erweitern

Nachdem Sie bestätigt haben, dass der Webhook empfangen wird, können Sie Ihren n8n-Workflow erweitern, um basierend auf dem Wert von `toolSelected` Aktionen auszuführen.

*   Verwenden Sie einen "If"-Node, um verschiedene Zweige für verschiedene Tools zu erstellen.
*   Fügen Sie Nodes hinzu, um die tatsächliche Logik für jedes Tool zu implementieren (z.B. einen "HTTP Request"-Node, um eine externe API aufzurufen, einen "Function"-Node, um Daten zu verarbeiten).

Weitere Details zur Erweiterung des n8n-Workflows finden Sie im [How-To: Neue KI-Tools integrieren](how-to/integrate-ai-tools.md) Leitfaden.

Durch die Einrichtung dieses Webhooks haben Sie die Grundlage geschaffen, um die intelligenten Entscheidungen von ReplicateAI in leistungsstarke Automatisierungsworkflows in n8n zu integrieren.