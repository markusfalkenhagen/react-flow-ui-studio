# Kernkonzepte von ReplicateAI

Dieses Dokument erklärt die grundlegenden Konzepte und Terminologien, die in der ReplicateAI-Anwendung verwendet werden. Ein klares Verständnis dieser Konzepte ist entscheidend, um die Funktionsweise des Systems zu verstehen und effektiv damit zu arbeiten.

## 1. Chat-Nachricht (Message)

Eine `Message` ist die grundlegende Einheit der Kommunikation im ReplicateAI-Chat. Jede Nachricht hat folgende Eigenschaften:

*   **`id`**: Eine eindeutige Kennung für die Nachricht.
*   **`text`**: Der eigentliche Inhalt der Nachricht.
*   **`sender`**: Gibt an, wer die Nachricht gesendet hat (`user`, `assistant`, oder `system`).
*   **`timestamp`**: Der Zeitpunkt, zu dem die Nachricht erstellt wurde.
*   **`file` (optional)**: Ein Objekt, das Details zu einer angehängten Datei enthält (z.B. Name, Typ, URL).
*   **`reasoning` (optional)**: Eine Begründung, die von der KI geliefert wird, wenn sie eine Tool-Auswahl trifft.

Nachrichten werden in der Supabase-Datenbank gespeichert, um die Persistenz des Chat-Verlaufs zu gewährleisten.

## 2. Intelligente Webhooks (Intelligent Webhook Flow)

Dies ist das Herzstück der KI-gesteuerten Funktionalität von ReplicateAI. Der "Intelligent Webhook Flow" ist ein Genkit AI Flow, der die Benutzereingabe analysiert und basierend auf dem Inhalt die am besten geeignete "Tool/Capability" auswählt.

*   **Zweck**: Automatische Erkennung der Benutzerabsicht und Auswahl des passenden Tools.
*   **Input**: Die Textnachricht des Benutzers.
*   **Output**: Der Name des ausgewählten Tools (`toolSelected`) und eine Begründung (`reasoning`).
*   **Integration**: Nach der Tool-Auswahl kann der Flow einen externen Webhook (z.B. an n8n) auslösen, um die tatsächliche Ausführung des Tools zu initiieren.

## 3. Tools/Capabilities

Dies sind die vordefinierten Kategorien von Aufgaben, die die ReplicateAI-KI erkennen und zuordnen kann. Jedes Tool repräsentiert eine bestimmte Art von Aktion oder Funktionalität, die von der Anwendung oder einem externen Dienst ausgeführt werden kann.

Aktuell definierte Tools:

*   `DataAnalysis`
*   `ContentGeneration`
*   `CodeExecution`
*   `FileManagement`
*   `Research`
*   `Planning`
*   `GeneralTask`

Die KI wählt eines dieser Tools basierend auf der `message` des Benutzers aus.

## 4. Supabase

Supabase ist eine Open-Source-Alternative zu Firebase, die als Backend-as-a-Service (BaaS) für ReplicateAI dient. Es bietet:

*   **PostgreSQL-Datenbank**: Für die Speicherung von Chat-Nachrichten und anderen Anwendungsdaten.
*   **Echtzeit-Funktionen**: Ermöglicht Live-Updates im Chat (zukünftiges Feature).
*   **Authentifizierung**: Für die Benutzerverwaltung (zukünftiges Feature).
*   **Speicher (Storage)**: Zum Speichern von Dateien (optional für Dateianhänge).

## 5. n8n (Node-based Workflow Automation)

n8n ist ein leistungsstarkes Open-Source-Tool zur Workflow-Automatisierung. In ReplicateAI wird n8n als flexibler Endpunkt für die von der KI ausgelösten Webhooks verwendet.

*   **Zweck**: Ermöglicht die Verbindung der KI-Tool-Auswahl mit einer Vielzahl von externen Diensten und die Ausführung komplexer Workflows.
*   **Funktionsweise**: Wenn der `intelligentWebhook` Flow ein Tool auswählt, sendet er eine Anfrage an eine konfigurierte n8n-Webhook-URL. n8n kann dann basierend auf der empfangenen Tool-Auswahl weitere Aktionen ausführen (z.B. eine E-Mail senden, eine API aufrufen, Daten verarbeiten).

## 6. Umgebungsvariablen

Wichtige Konfigurationswerte, die außerhalb des Quellcodes gespeichert werden, um die Anwendung in verschiedenen Umgebungen (Entwicklung, Produktion) flexibel zu halten.

*   `GEMINI_API_KEY`: API-Schlüssel für das Google Gemini AI-Modell.
*   `N8N_WEBHOOK_URL`: Die URL des n8n-Webhooks, an den die KI-Auswahl gesendet wird.
*   `NEXT_PUBLIC_SUPABASE_URL`: Die URL Ihrer Supabase-Instanz (öffentlich zugänglich).
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Der öffentliche "Anon Key" für Supabase (öffentlich zugänglich).
*   `SUPABASE_SERVICE_ROLE_KEY`: Der Service Role Key für Supabase (nur serverseitig verwenden, um volle Datenbankzugriffe zu ermöglichen).

Diese Konzepte bilden das Fundament von ReplicateAI und ermöglichen die intelligente und erweiterbare Chat-Funktionalität.