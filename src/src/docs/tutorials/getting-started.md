# Tutorial: Erste Schritte mit ReplicateAI

Dieses Tutorial führt Sie durch die grundlegenden Schritte, um das ReplicateAI-Projekt lokal einzurichten und auszuführen. Am Ende dieses Tutorials haben Sie eine laufende Instanz der Anwendung und können mit dem Chat-Interface interagieren.

## 1. Voraussetzungen

Stellen Sie sicher, dass die folgenden Voraussetzungen auf Ihrem System erfüllt sind:

*   **Node.js**: Version 18 oder höher. Sie können dies mit `node -v` überprüfen.
*   **npm**: Node Package Manager, der mit Node.js installiert wird. Überprüfen Sie die Version mit `npm -v`.
*   **Git**: Für das Klonen des Repositorys. Überprüfen Sie die Version mit `git --version`.
*   **Google Cloud Projekt & Gemini API Key**: Sie benötigen einen API-Schlüssel für das Google Gemini Modell, um die KI-Funktionalität nutzen zu können. Anleitungen finden Sie in der Google Cloud Dokumentation.
*   **Supabase Projekt**: Sie benötigen ein Supabase-Projekt für die Speicherung der Chat-Nachrichten. Folgen Sie dem [How-To: Supabase einrichten](how-to/setup-supabase.md) Leitfaden, um dies einzurichten.
*   **n8n Instanz (Optional)**: Wenn Sie die ausgehende Webhook-Funktionalität testen möchten, benötigen Sie eine laufende n8n-Instanz und eine Webhook-URL (siehe [How-To: Webhooks konfigurieren](how-to/configure-webhooks.md)).

## 2. Repository klonen

Öffnen Sie Ihr Terminal und klonen Sie das ReplicateAI-Repository von GitHub:

```bash
git clone https://github.com/your-repo/replicateai.git
cd replicateai
```
*Ersetzen Sie `https://github.com/your-repo/replicateai.git` durch die tatsächliche URL des Repositorys.*

## 3. Abhängigkeiten installieren

Installieren Sie alle erforderlichen Projekt-Abhängigkeiten mit npm:

```bash
npm install
```

## 4. Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env`-Datei im Stammverzeichnis des Projekts und konfigurieren Sie die erforderlichen Umgebungsvariablen.

1.  **`.env` Datei erstellen**:
    ```bash
    touch .env
    ```
2.  **`.env` Datei bearbeiten**: Öffnen Sie die `.env`-Datei in Ihrem Code-Editor und fügen Sie die folgenden Variablen hinzu. Ersetzen Sie die Platzhalter durch Ihre tatsächlichen Anmeldeinformationen:

    ```env
    GEMINI_API_KEY=IHR_GEMINI_API_SCHLÜSSEL
    N8N_WEBHOOK_URL=IHRE_N8N_WEBHOOK_URL # Optional, wenn Sie n8n nutzen
    NEXT_PUBLIC_SUPABASE_URL=IHRE_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=IHR_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY=IHR_SUPABASE_SERVICE_ROLE_KEY # Nur serverseitig verwenden
    ```
    *Details zu diesen Variablen finden Sie in der [Umgebungsvariablen-Referenz](reference/environment-variables.md).*

## 5. Supabase-Datenbank einrichten

Stellen Sie sicher, dass Ihre Supabase-Datenbank eingerichtet ist und die `messages`-Tabelle existiert. Folgen Sie dazu dem [How-To: Supabase einrichten](how-to/setup-supabase.md) Leitfaden, falls noch nicht geschehen.

## 6. Anwendung starten

Starten Sie den Next.js-Entwicklungs-Server:

```bash
npm run dev
```

Die Anwendung sollte nun unter `http://localhost:3000` verfügbar sein.

## 7. Anwendung testen

Öffnen Sie Ihren Webbrowser und navigieren Sie zu `http://localhost:3000`. Sie sollten das ReplicateAI Chat-Interface sehen.

*   Senden Sie eine Nachricht im Chat. Diese sollte in Ihrer Supabase-Datenbank gespeichert werden.
*   Wenn Sie die n8n-Integration konfiguriert haben, beobachten Sie Ihren n8n-Workflow, um zu sehen, ob der Webhook ausgelöst wird, nachdem die KI eine Tool-Auswahl getroffen hat.

Herzlichen Glückwunsch! Sie haben ReplicateAI erfolgreich lokal eingerichtet und ausgeführt. Sie können nun mit der Erkundung der Anwendung und ihrer Funktionen beginnen.