# Architektur von ReplicateAI

ReplicateAI ist eine moderne Webanwendung, die auf dem Next.js-Framework basiert und eine intelligente Chat-Schnittstelle mit KI-gesteuerter Tool-Auswahl und Webhook-Integration bietet. Die Architektur ist modular aufgebaut, um Skalierbarkeit, Wartbarkeit und Erweiterbarkeit zu gewährleisten.

## 1. Überblick der Hauptkomponenten

```mermaid
graph TD
    A[Client (Next.js Frontend)] --> B[Next.js API Routes]
    B --> C[Genkit AI Flows]
    B --> D[Supabase Database]
    C --> E[External Webhooks (n8n)]
    D --> F[Supabase Storage (Optional)]
    
    subgraph "Next.js Application"
        B
        C
        D
    end
    
    subgraph "External Services"
        E
        F
    end
    
    A -- "User Input" --> B
    B -- "API Calls" --> C
    C -- "Tool Selection" --> E
    B -- "Data Persistence" --> D
    D -- "File Storage" --> F
```

### 1.1. Client (Next.js Frontend)

Das Frontend ist eine Single-Page Application (SPA), die mit React und Next.js entwickelt wurde. Es bietet die Benutzeroberfläche für den Chat, die Nachrichtenanzeige, die Eingabefelder und die Dateivorschau.

*   **Technologien**: React, Next.js, Tailwind CSS, Shadcn/ui, Framer Motion
*   **Hauptkomponenten**:
    *   `ChatArea.tsx`: Verwaltet den Zustand des Chats, lädt Nachrichten und sendet Benutzereingaben.
    *   `MessageList.tsx`: Zeigt die Chat-Nachrichten an.
    *   `MessageInput.tsx`: Ermöglicht die Texteingabe und den Dateiupload.
    *   UI-Komponenten (`src/components/ui`): Wiederverwendbare UI-Elemente.

### 1.2. Next.js API Routes

Next.js API Routes dienen als Backend-for-Frontend (BFF) und als Schnittstelle zu externen Diensten wie Genkit AI und Supabase. Sie ermöglichen serverseitige Logik und den Schutz von API-Schlüsseln.

*   **Dateien**:
    *   `src/app/api/webhook/route.ts`: Verarbeitet eingehende Webhook-Anfragen und leitet sie an den Genkit AI Flow weiter.
    *   `src/app/api/messages/route.ts`: Verwaltet das Speichern und Laden von Chat-Nachrichten aus Supabase.
    *   `src/app/api/settings/route.ts`: Stellt Anwendungseinstellungen bereit (z.B. Begrüßungsnachricht).

### 1.3. Genkit AI Flows

Genkit ist ein Open-Source-Framework von Google, das die Entwicklung von KI-gesteuerten Anwendungen vereinfacht. In ReplicateAI wird Genkit verwendet, um die intelligente Tool-Auswahl zu implementieren.

*   **Dateien**:
    *   `src/ai/genkit.ts`: Genkit-Konfiguration.
    *   `src/ai/flows/intelligent-webhooks.ts`: Definiert den AI-Flow, der basierend auf der Benutzereingabe das am besten geeignete Tool auswählt und optional einen Webhook an n8n sendet.
    *   `src/ai/dev.ts`: Entwicklungs-Konfiguration für Genkit.

### 1.4. Supabase Database

Supabase wird als Backend-as-a-Service (BaaS) für die Persistenz von Chat-Nachrichten verwendet. Es bietet eine PostgreSQL-Datenbank, Authentifizierung und Echtzeit-Funktionen.

*   **Konfiguration**: Umgebungsvariablen (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
*   **Schema**: Die `messages`-Tabelle speichert alle Chat-Nachrichten mit Metadaten.
*   **Client**: `src/lib/supabase.ts` initialisiert den Supabase-Client.

### 1.5. External Webhooks (n8n)

n8n ist ein Workflow-Automatisierungstool, das als Ziel für die von Genkit AI ausgelösten Webhooks dient. Es ermöglicht die flexible Integration mit einer Vielzahl von Drittanbieterdiensten basierend auf der von der KI getroffenen Tool-Auswahl.

*   **Konfiguration**: `N8N_WEBHOOK_URL` in der `.env`-Datei.
*   **Funktion**: Empfängt die von `intelligentWebhook` gesendeten Daten und kann daraufhin weitere Aktionen auslösen (z.B. Datenanalyse, Content-Generierung, Code-Ausführung).

### 1.6. Supabase Storage (Optional)

Für die Dateiverwaltung kann Supabase Storage verwendet werden, um hochgeladene Dateien zu speichern und temporäre Links für die Vorschau im Chat bereitzustellen. Dies ist derzeit optional und kann bei Bedarf erweitert werden.

## 2. Datenfluss

1.  **Benutzereingabe**: Der Benutzer gibt eine Nachricht in das Chat-Eingabefeld ein.
2.  **Nachricht speichern**: Die Nachricht wird an die Next.js API-Route `/api/messages` gesendet und in der Supabase-Datenbank gespeichert.
3.  **AI-Verarbeitung**: Die Benutzernachricht wird an den `intelligentWebhook` Genkit AI Flow gesendet.
4.  **Tool-Auswahl**: Der AI Flow analysiert die Nachricht und wählt das am besten geeignete Tool aus (z.B. "DataAnalysis", "ContentGeneration").
5.  **Webhook-Auslösung**: Basierend auf der Tool-Auswahl sendet der AI Flow optional einen Webhook an die konfigurierte n8n-URL mit den relevanten Daten.
6.  **AI-Antwort**: Der AI Flow gibt eine simulierte Antwort zurück, die im Chat angezeigt wird.
7.  **Nachrichtenanzeige**: Alle Nachrichten (Benutzer, Assistent, System) werden aus Supabase geladen und im `MessageList` angezeigt.

## 3. Skalierbarkeit und Erweiterbarkeit

*   **Modulare Komponenten**: Ermöglicht die einfache Entwicklung und Wartung einzelner Teile der Anwendung.
*   **API-zentriert**: Klare Trennung von Frontend und Backend.
*   **Genkit AI**: Einfache Erweiterung um neue Tools und AI-Modelle.
*   **Supabase**: Skalierbare Datenbank und Backend-Dienste.
*   **n8n**: Flexible Integration mit unzähligen externen Diensten und Workflows.

Diese Architektur bietet eine robuste Grundlage für eine intelligente und erweiterbare Chat-Anwendung.