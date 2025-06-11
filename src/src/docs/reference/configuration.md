# Referenz: Konfiguration

Dieses Dokument beschreibt die verschiedenen Konfigurationsmöglichkeiten für die ReplicateAI-Anwendung. Die meisten Konfigurationen erfolgen über Umgebungsvariablen, die in der `.env`-Datei im Stammverzeichnis des Projekts definiert werden.

## 1. Umgebungsvariablen

Die wichtigsten Konfigurationen werden über Umgebungsvariablen gesteuert. Eine vollständige Liste und Beschreibung finden Sie in der [Umgebungsvariablen-Referenz](environment-variables.md).

Beispiele für wichtige Umgebungsvariablen:

*   `GEMINI_API_KEY`: API-Schlüssel für das Google Gemini AI-Modell.
*   `N8N_WEBHOOK_URL`: URL des n8n-Webhooks für die KI-gesteuerte Tool-Ausführung.
*   `NEXT_PUBLIC_SUPABASE_URL`: URL Ihrer Supabase-Instanz (öffentlich).
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Öffentlicher Supabase Anon Key (öffentlich).
*   `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key (nur serverseitig).

## 2. Anwendungsinterne Konfiguration

Einige Einstellungen sind direkt im Code oder in Konfigurationsdateien innerhalb des Projekts definiert.

### 2.1. Genkit AI Konfiguration

Die Konfiguration für Genkit AI, einschließlich der verwendeten Modelle und Flows, ist in den Dateien im `src/ai/`-Verzeichnis definiert.

*   [`src/ai/genkit.ts`](src/ai/genkit.ts): Hauptkonfiguration für Genkit.
*   [`src/ai/dev.ts`](src/ai/dev.ts): Spezifische Konfiguration für die Entwicklungsumgebung.
*   [`src/ai/flows/intelligent-webhooks.ts`](src/ai/flows/intelligent-webhooks.ts): Definition des `intelligentWebhookFlow` und des `toolSelectionPrompt`.

Änderungen an den verfügbaren Tools oder der Prompt-Logik erfordern Anpassungen in [`intelligent-webhooks.ts`](src/ai/flows/intelligent-webhooks.ts).

### 2.2. Tailwind CSS Konfiguration

Das Styling der Anwendung wird mit Tailwind CSS verwaltet. Die Konfiguration befindet sich in:

*   [`tailwind.config.ts`](tailwind.config.ts): Hauptkonfigurationsdatei für Tailwind CSS.
*   [`postcss.config.mjs`](postcss.config.mjs): PostCSS-Konfiguration.

Anpassungen an Design-Token, Farben, Schriftarten oder Breakpoints werden hier vorgenommen.

### 2.3. Shadcn/ui Konfiguration

Die UI-Komponenten basieren auf Shadcn/ui. Die Konfiguration und die Komponenten selbst befinden sich in `src/components/ui/`.

*   [`components.json`](components.json): Konfigurationsdatei für Shadcn/ui.

### 2.4. Öffentliche Einstellungen API

Die Anwendung stellt einen einfachen API-Endpunkt bereit, um bestimmte Einstellungen für das Frontend abzurufen.

*   **Endpunkt**: `/api/settings`
*   **Datei**: [`src/app/api/settings/route.ts`](src/app/api/settings/route.ts)
*   **Konfiguration**: Derzeit wird die Begrüßungsnachricht direkt in dieser Datei oder über eine externe Quelle (wie `src/data/settings.json`) bezogen.

### 2.5. Datenkonfiguration (settings.json)

Einige statische Einstellungen können in JSON-Dateien gespeichert werden.

*   [`src/data/settings.json`](src/data/settings.json): Kann verwendet werden, um Einstellungen wie die Begrüßungsnachricht oder andere Frontend-Konfigurationen zu speichern.

## 3. Datenbank-Schema

Die Struktur der in Supabase gespeicherten Daten ist ein wichtiger Teil der Konfiguration.

*   **Schema**: Definiert in der `messages`-Tabelle in Supabase (siehe [How-To: Supabase einrichten](how-to/setup-supabase.md)).
*   **TypeScript-Typen**: Die entsprechenden TypeScript-Typen sind in [`src/lib/supabase.ts`](src/lib/supabase.ts) und [`src/types/index.ts`](src/types/index.ts) definiert.

Durch das Verständnis dieser Konfigurationspunkte können Sie das Verhalten und Aussehen der ReplicateAI-Anwendung an Ihre spezifischen Bedürfnisse anpassen.