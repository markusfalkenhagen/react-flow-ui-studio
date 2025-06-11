# How-To: ReplicateAI in Produktion bereitstellen

Dieser Leitfaden beschreibt die Schritte zur Bereitstellung Ihrer ReplicateAI-Anwendung in einer Produktionsumgebung. Da ReplicateAI auf Next.js basiert, ist Vercel eine empfohlene Plattform für das Deployment, aber die Prinzipien können auf andere Node.js-Hosting-Anbieter übertragen werden.

## 1. Vorbereitung für das Deployment

Bevor Sie Ihre Anwendung bereitstellen, stellen Sie sicher, dass die folgenden Punkte erfüllt sind:

*   **Umgebungsvariablen**: Alle erforderlichen Umgebungsvariablen (`.env`) müssen für die Produktionsumgebung konfiguriert sein. Dazu gehören:
    *   `GEMINI_API_KEY`
    *   `N8N_WEBHOOK_URL`
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   `SUPABASE_SERVICE_ROLE_KEY` (Dieser sollte nur serverseitig verfügbar sein und nicht im Frontend exponiert werden).
*   **Supabase-Setup**: Stellen Sie sicher, dass Ihre Supabase-Datenbank korrekt eingerichtet ist und die `messages`-Tabelle existiert (siehe [How-To: Supabase einrichten](setup-supabase.md)).
*   **Build-Optimierung**: Next.js optimiert den Build-Prozess automatisch für die Produktion.

## 2. Deployment mit Vercel (Empfohlen)

Vercel ist die Plattform, die von den Entwicklern von Next.js empfohlen wird und eine nahtlose Bereitstellung ermöglicht.

1.  **Vercel-Konto erstellen**: Wenn Sie noch keines haben, erstellen Sie ein kostenloses Vercel-Konto unter [vercel.com](https://vercel.com/).
2.  **Neues Projekt importieren**:
    *   Melden Sie sich bei Vercel an.
    *   Klicken Sie auf "Add New..." und dann auf "Project".
    *   Importieren Sie Ihr Git-Repository (GitHub, GitLab, Bitbucket), das Ihr ReplicateAI-Projekt enthält.
3.  **Projekt konfigurieren**:
    *   Vercel erkennt automatisch, dass es sich um ein Next.js-Projekt handelt.
    *   **Umgebungsvariablen**: Gehen Sie zu den "Environment Variables" in den Projekteinstellungen. Fügen Sie hier alle oben genannten Umgebungsvariablen hinzu. Stellen Sie sicher, dass sensible Schlüssel wie `SUPABASE_SERVICE_ROLE_KEY` als "Serverless Function (Node.js)" oder "Edge Function" Variablen markiert sind, um sie vor dem Client zu schützen.
    *   **Build & Output Settings**: Normalerweise sind die Standardeinstellungen für Next.js ausreichend.
4.  **Bereitstellen**: Klicken Sie auf "Deploy". Vercel wird Ihr Projekt bauen und bereitstellen. Nach erfolgreichem Deployment erhalten Sie eine öffentliche URL für Ihre Anwendung.

## 3. Deployment auf anderen Plattformen

Wenn Sie eine andere Hosting-Plattform verwenden möchten, müssen Sie sicherstellen, dass diese Node.js-Anwendungen hosten kann und die folgenden Anforderungen erfüllt:

*   **Node.js-Umgebung**: Die Plattform muss eine Node.js-Laufzeitumgebung bereitstellen.
*   **Build-Prozess**: Sie müssen den Next.js-Build-Befehl (`npm run build`) ausführen und die generierten statischen Assets und Server-Bundles bereitstellen.
*   **Umgebungsvariablen**: Die Plattform muss die Möglichkeit bieten, Umgebungsvariablen sicher zu konfigurieren.
*   **Port-Exposition**: Stellen Sie sicher, dass die Anwendung auf dem richtigen Port lauscht und dieser öffentlich zugänglich ist.
*   **Reverse Proxy**: Ein Reverse Proxy (z.B. Nginx, Caddy) kann erforderlich sein, um Anfragen an Ihre Next.js-Anwendung weiterzuleiten.

### Allgemeine Schritte für andere Plattformen:

1.  **Build erstellen**: Führen Sie lokal oder auf Ihrem CI/CD-Server den Build-Befehl aus:
    ```bash
    npm run build
    ```
    Dies erstellt den `.next`-Ordner mit den Produktions-Assets.
2.  **Abhängigkeiten installieren**: Stellen Sie sicher, dass alle `dependencies` aus `package.json` auf dem Server installiert sind.
3.  **Umgebungsvariablen setzen**: Konfigurieren Sie die Umgebungsvariablen auf Ihrer Hosting-Plattform.
4.  **Anwendung starten**: Starten Sie die Next.js-Anwendung im Produktionsmodus:
    ```bash
    npm run start
    ```
    Dies startet einen Node.js-Server, der die Next.js-Anwendung bedient.
5.  **Prozess-Manager**: Verwenden Sie einen Prozess-Manager wie PM2 oder systemd, um sicherzustellen, dass Ihre Anwendung im Falle eines Absturzes neu gestartet wird und im Hintergrund läuft.

## 4. Nach dem Deployment

*   **Testen**: Überprüfen Sie alle Funktionen Ihrer Anwendung in der Produktionsumgebung, insbesondere die Chat-Funktionalität, die KI-Tool-Auswahl und die Webhook-Integration.
*   **Monitoring**: Richten Sie Monitoring und Logging ein, um die Leistung und Fehler Ihrer Anwendung zu überwachen.
*   **CI/CD**: Erwägen Sie die Einrichtung einer Continuous Integration/Continuous Deployment (CI/CD)-Pipeline, um den Bereitstellungsprozess zu automatisieren.

Durch die Befolgung dieser Schritte können Sie Ihre ReplicateAI-Anwendung erfolgreich in einer Produktionsumgebung bereitstellen.