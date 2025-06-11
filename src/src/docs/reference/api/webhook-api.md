# API-Referenz: Webhook-Endpunkt

Dieser Abschnitt beschreibt den eingehenden Webhook-Endpunkt von ReplicateAI, der es externen Systemen ermöglicht, die KI-Logik der Anwendung auszulösen.

## Endpunkt-Details

*   **URL**: `/api/webhook`
*   **Methode**: `POST`
*   **Beschreibung**: Dieser Endpunkt empfängt eine JSON-Nachricht, leitet sie an den internen `intelligentWebhook` AI Flow weiter und gibt die von der KI getroffene Tool-Auswahl zurück.

## Request

### Header

*   `Content-Type: application/json` (Erforderlich)

### Body

Der Request Body muss ein JSON-Objekt mit der Eigenschaft `message` enthalten.

| Feld     | Typ      | Beschreibung                               | Erforderlich |
| :------- | :------- | :----------------------------------------- | :----------- |
| `message` | `string` | Der Text der Benutzereingabe, die von der KI verarbeitet werden soll. | Ja           |

**Beispiel Request Body:**

```json
{
  "message": "Analysiere die Verkaufszahlen des letzten Quartals und finde die umsatzstärksten Produkte."
}
```

## Response

Der Endpunkt gibt ein JSON-Objekt zurück, das die von der KI getroffene Tool-Auswahl und deren Begründung enthält.

### Erfolgreiche Response (Status: 200 OK)

| Feld          | Typ      | Beschreibung                               |
| :------------ | :------- | :----------------------------------------- |
| `toolSelected` | `string` | Der Name des von der KI ausgewählten Tools/Fähigkeit. |
| `reasoning`   | `string` | Die Begründung der KI für die Auswahl dieses Tools. |

**Beispiel Erfolgreiche Response:**

```json
{
  "toolSelected": "DataAnalysis",
  "reasoning": "The user's request clearly indicates a need to analyze sales figures, which falls under data analysis."
}
```

### Fehler-Response (Status: 400 Bad Request, 500 Internal Server Error)

Im Falle eines Fehlers wird ein JSON-Objekt mit einer `error`-Eigenschaft zurückgegeben.

| Feld    | Typ      | Beschreibung                               |
| :------ | :------- | :----------------------------------------- |
| `error` | `string` | Eine Beschreibung des aufgetretenen Fehlers. |

**Beispiel Fehler-Response (400 Bad Request):**

```json
{
  "error": "Message is required"
}
```

**Beispiel Fehler-Response (500 Internal Server Error):**

```json
{
  "error": "Internal Server Error"
}
```

## Beispiel mit `curl`

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Plane eine 3-tägige Reise nach Paris."
  }' \
  http://localhost:3000/api/webhook
```

Dieser Endpunkt ist ein zentraler Bestandteil der Interaktion mit der KI-Logik von ReplicateAI und ermöglicht eine flexible Integration in externe Automatisierungsworkflows.