# How-To: Supabase einrichten und integrieren

Dieser Leitfaden führt Sie durch die Schritte zur Einrichtung einer Supabase-Datenbank und deren Integration in Ihr ReplicateAI-Projekt, um Chat-Nachrichten persistent zu speichern.

## 1. Supabase-Projekt erstellen

1.  **Registrieren oder Anmelden**: Gehen Sie zu [Supabase](https://supabase.com/) und melden Sie sich an oder erstellen Sie ein neues Konto.
2.  **Neues Projekt**: Klicken Sie auf "New project" im Dashboard.
3.  **Projektdetails**:
    *   **Name**: Geben Sie Ihrem Projekt einen aussagekräftigen Namen (z.B. `replicateai-chat`).
    *   **Datenbank-Passwort**: Legen Sie ein sicheres Passwort fest.
    *   **Region**: Wählen Sie eine Region, die Ihren Anforderungen entspricht.
4.  **Projekt erstellen**: Klicken Sie auf "Create new project".

## 2. Datenbank-Schema erstellen

Nachdem Ihr Projekt erstellt wurde, müssen Sie die `messages`-Tabelle in Ihrer Supabase-Datenbank einrichten.

1.  **SQL Editor öffnen**: Navigieren Sie im Supabase-Dashboard zu "SQL Editor" (das Icon mit dem Datenbank-Symbol).
2.  **Neues Query**: Klicken Sie auf "New query".
3.  **Schema einfügen**: Kopieren Sie das folgende SQL-Schema und fügen Sie es in den Editor ein:

    ```sql
    CREATE TABLE messages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      text TEXT NOT NULL,
      sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'assistant', 'system')),
      timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
      file_data JSONB,
      reasoning TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Optional: Indizes für bessere Performance bei Abfragen
    CREATE INDEX idx_messages_timestamp ON messages(timestamp DESC);
    CREATE INDEX idx_messages_sender ON messages(sender);
    ```
4.  **Ausführen**: Klicken Sie auf "Run" (das Play-Symbol), um die Tabelle zu erstellen.

## 3. Supabase-Anmeldeinformationen abrufen

Sie benötigen die URL und die API-Schlüssel Ihres Supabase-Projekts, um die Anwendung zu verbinden.

1.  **API Settings**: Navigieren Sie im Supabase-Dashboard zu "Project Settings" (Zahnrad-Icon) und dann zu "API".
2.  **URL und Keys**: Notieren Sie sich die folgenden Werte:
    *   **`URL`**: Dies ist Ihre `NEXT_PUBLIC_SUPABASE_URL`.
    *   **`anon public`**: Dies ist Ihr `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    *   **`service_role`**: Dies ist Ihr `SUPABASE_SERVICE_ROLE_KEY`. **Halten Sie diesen Schlüssel geheim und verwenden Sie ihn nur serverseitig!**

## 4. Umgebungsvariablen in ReplicateAI konfigurieren

Öffnen Sie die `.env`-Datei in Ihrem ReplicateAI-Projekt und fügen Sie die abgerufenen Supabase-Anmeldeinformationen hinzu.

1.  **`.env` Datei öffnen**: Suchen Sie die `.env`-Datei im Stammverzeichnis Ihres Projekts.
2.  **Variablen hinzufügen/aktualisieren**: Fügen Sie die folgenden Zeilen hinzu oder aktualisieren Sie sie mit Ihren tatsächlichen Werten:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=Ihre_Supabase_URL_hier
    NEXT_PUBLIC_SUPABASE_ANON_KEY=Ihr_Supabase_Anon_Key_hier
    SUPABASE_SERVICE_ROLE_KEY=Ihr_Supabase_Service_Role_Key_hier
    ```
    *Ersetzen Sie die Platzhalter durch Ihre tatsächlichen Schlüssel.*

## 5. Anwendung starten und testen

1.  **Abhängigkeiten installieren**: Stellen Sie sicher, dass Sie den Supabase-Client installiert haben:
    ```bash
    npm install @supabase/supabase-js
    ```
2.  **Anwendung starten**: Starten Sie den Entwicklungs-Server:
    ```bash
    npm run dev
    ```
3.  **Chat testen**: Öffnen Sie die Anwendung in Ihrem Browser und senden Sie einige Nachrichten im Chat. Diese sollten nun in Ihrer Supabase-Datenbank in der `messages`-Tabelle gespeichert werden. Sie können dies im Supabase-Dashboard unter "Table Editor" überprüfen.

Herzlichen Glückwunsch! Ihre ReplicateAI-Anwendung ist nun mit Supabase verbunden und speichert Chat-Nachrichten persistent.