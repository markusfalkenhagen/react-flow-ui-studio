# API-Referenz: Einstellungen-Endpunkt

Dieser Abschnitt beschreibt den API-Endpunkt für das Abrufen von Anwendungseinstellungen in ReplicateAI.

## Endpunkt-Details

*   **URL**: `/api/settings`
*   **Methode**: `GET`
*   **Beschreibung**: Ruft allgemeine Anwendungseinstellungen ab, wie z.B. die Begrüßungsnachricht des Chats.

## Request

### Header

Keine spezifischen Header erforderlich.

### Body

Kein Request Body erforderlich.

## Response

Der Endpunkt gibt ein JSON-Objekt zurück, das die Anwendungseinstellungen enthält.

### Erfolgreiche Response (Status: 200 OK)

| Feld              | Typ      | Beschreibung                               |
| :---------------- | :------- | :----------------------------------------- |
| `greetingMessage` | `string` | Die Begrüßungsnachricht, die im Chat angezeigt wird. |

**Beispiel Erfolgreiche Response:**

```json
{
  "greetingMessage": "Hello! Welcome to ReplicateAI. How can I assist you today?"
}
```

### Fehler-Response (Status: 500 Internal Server Error)

Im Falle eines Fehlers wird ein JSON-Objekt mit einer `error`-Eigenschaft zurückgegeben.

```json
{
  "error": "Internal Server Error"
}
```

## Beispiel mit `curl`

```bash
curl -X GET http://localhost:3000/api/settings
```

Dieser Endpunkt ist einfach gehalten und dient dazu, grundlegende Konfigurationen für das Frontend bereitzustellen.