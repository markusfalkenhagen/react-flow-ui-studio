# API-Referenz: Nachrichten-Endpunkt

Dieser Abschnitt beschreibt die API-Endpunkte für die Verwaltung von Chat-Nachrichten in ReplicateAI. Diese Endpunkte interagieren direkt mit der Supabase-Datenbank, um Nachrichten zu speichern und abzurufen.

## 1. Nachrichten abrufen (GET)

Ruft alle gespeicherten Chat-Nachrichten ab.

*   **URL**: `/api/messages`
*   **Methode**: `GET`
*   **Beschreibung**: Gibt eine Liste aller Chat-Nachrichten in chronologischer Reihenfolge zurück.

### Request

Keine spezifischen Request Body oder Query-Parameter erforderlich.

### Response

### Erfolgreiche Response (Status: 200 OK)

Gibt ein Array von `Message`-Objekten zurück.

**Beispiel Erfolgreiche Response:**

```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "text": "Hello! I'm FlowHero. How can I assist you today?",
    "sender": "assistant",
    "timestamp": "2023-10-27T10:00:00.000Z",
    "file": null,
    "reasoning": null
  },
  {
    "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
    "text": "Can you help me analyze some data?",
    "sender": "user",
    "timestamp": "2023-10-27T10:01:00.000Z",
    "file": null,
    "reasoning": null
  }
]
```

### Fehler-Response (Status: 500 Internal Server Error)

Im Falle eines Fehlers wird ein JSON-Objekt mit einer `error`-Eigenschaft zurückgegeben.

```json
{
  "error": "Error fetching messages: Database connection failed."
}
```

## 2. Nachricht speichern (POST)

Speichert eine neue Chat-Nachricht in der Datenbank.

*   **URL**: `/api/messages`
*   **Methode**: `POST`
*   **Beschreibung**: Fügt eine neue Nachricht zur `messages`-Tabelle in Supabase hinzu.

### Request

### Header

*   `Content-Type: application/json` (Erforderlich)

### Body

Der Request Body muss ein JSON-Objekt sein, das dem `Message`-Typ entspricht.

| Feld        | Typ        | Beschreibung                               | Erforderlich |
| :---------- | :--------- | :----------------------------------------- | :----------- |
| `id`        | `string`   | Eindeutige Kennung der Nachricht (UUID).   | Ja           |
| `text`      | `string`   | Der Inhalt der Nachricht.                  | Ja           |
| `sender`    | `'user' \| 'assistant' \| 'system'` | Wer die Nachricht gesendet hat. | Ja           |
| `timestamp` | `string`   | Der Zeitpunkt der Nachricht (ISO 8601 String). | Ja           |
| `file`      | `object`   | (Optional) Details zu einer angehängten Datei. | Nein         |
| `reasoning` | `string`   | (Optional) Begründung der KI für die Tool-Auswahl. | Nein         |

**Beispiel Request Body:**

```json
{
  "id": "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
  "text": "Based on your request, I've selected the 'DataAnalysis' tool.",
  "sender": "assistant",
  "timestamp": "2023-10-27T10:02:00.000Z",
  "reasoning": "The user's query indicated a need for data analysis."
}
```

### Response

### Erfolgreiche Response (Status: 201 Created)

Gibt das gespeicherte `Message`-Objekt zurück.

**Beispiel Erfolgreiche Response:**

```json
{
  "id": "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
  "text": "Based on your request, I've selected the 'DataAnalysis' tool.",
  "sender": "assistant",
  "timestamp": "2023-10-27T10:02:00.000Z",
  "file_data": null,
  "reasoning": "The user's query indicated a need for data analysis.",
  "created_at": "2023-10-27T10:02:00.000Z"
}
```

### Fehler-Response (Status: 500 Internal Server Error)

Im Falle eines Fehlers wird ein JSON-Objekt mit einer `error`-Eigenschaft zurückgegeben.

```json
{
  "error": "Error inserting message: Database write failed."
}
```

Diese API-Endpunkte bilden die Grundlage für die persistente Speicherung und den Abruf von Chat-Nachrichten in ReplicateAI.