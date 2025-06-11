# Referenz: Umgebungsvariablen

Dieses Dokument listet und beschreibt die Umgebungsvariablen, die zur Konfiguration der ReplicateAI-Anwendung verwendet werden. Diese Variablen sollten in einer `.env`-Datei im Stammverzeichnis des Projekts definiert werden.

## 1. `.env` Datei

Die `.env`-Datei enthält Schlüssel-Wert-Paare für die Umgebungsvariablen. Ein Beispiel:

```env
GEMINI_API_KEY=IHR_GEMINI_API_SCHLÜSSEL
N8N_WEBHOOK_URL=IHRE_N8N_WEBHOOK_URL
NEXT_PUBLIC_SUPABASE_URL=IHRE_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=IHR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=IHR_SUPABASE_SERVICE_ROLE_KEY
```

**Wichtig**: Die `.env`-Datei sollte niemals in die Versionskontrolle (Git) aufgenommen werden. Fügen Sie `.env` zu Ihrer `.gitignore`-Datei hinzu.

## 2. Verfügbare Umgebungsvariablen

| Variable                      | Beschreibung                                                                                                | Verwendung                                                                 | Erforderlich |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- | :----------- |
| `GEMINI_API_KEY`              | Ihr API-Schlüssel für den Zugriff auf das Google Gemini AI-Modell über Genkit.                              | Serverseitig (in Genkit AI Flows).                                         | Ja           |
| `N8N_WEBHOOK_URL`             | Die URL des n8n-Webhooks, an den der `intelligentWebhookFlow` die KI-Auswahl sendet.                        | Serverseitig (in `src/ai/flows/intelligent-webhooks.ts`).                  | Ja (für n8n-Integration) |
| `NEXT_PUBLIC_SUPABASE_URL`    | Die URL Ihrer Supabase-Instanz. Das `NEXT_PUBLIC_`-Präfix macht diese Variable im Frontend verfügbar.        | Client- und Serverseitig (in `src/lib/supabase.ts`).                       | Ja           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Der öffentliche "Anon Key" Ihrer Supabase-Instanz. Das `NEXT_PUBLIC_`-Präfix macht diese Variable im Frontend verfügbar. | Client- und Serverseitig (in `src/lib/supabase.ts`).                       | Ja           |
| `SUPABASE_SERVICE_ROLE_KEY`   | Der Service Role Key Ihrer Supabase-Instanz. Dieser Schlüssel hat erweiterte Berechtigungen und sollte **nur serverseitig** verwendet werden. | Serverseitig (in API-Routen wie `src/app/api/messages/route.ts` für privilegierte Operationen). | Ja (für serverseitige Supabase-Operationen) |

## 3. Zugriff auf Umgebungsvariablen

*   **Serverseitig**: Sie können über `process.env.VARIABLE_NAME` auf Umgebungsvariablen zugreifen.
*   **Clientseitig**: Nur Variablen, die mit `NEXT_PUBLIC_` beginnen, sind im Client-Code verfügbar (z.B. `process.env.NEXT_PUBLIC_SUPABASE_URL`).

## 4. Sensible Daten

Variablen wie `GEMINI_API_KEY` und `SUPABASE_SERVICE_ROLE_KEY` enthalten sensible Daten und sollten niemals im Client-Code verwendet oder exponiert werden. Stellen Sie sicher, dass diese nur in serverseitigen API-Routen oder Genkit Flows verwendet werden.

Die korrekte Konfiguration dieser Umgebungsvariablen ist entscheidend für die ordnungsgemäße Funktion von ReplicateAI und die sichere Verbindung zu externen Diensten wie Google Gemini und Supabase.