# Referenz: Datenmodelle

Dieses Dokument beschreibt die wichtigsten Datenmodelle, die in der ReplicateAI-Anwendung verwendet werden, insbesondere die Struktur der Chat-Nachrichten, wie sie in der Supabase-Datenbank gespeichert und im Frontend verwendet werden.

## 1. Message

Das `Message`-Modell repräsentiert eine einzelne Nachricht im Chat. Es wird sowohl serverseitig (API-Routen, Supabase-Interaktion) als auch clientseitig (Anzeige im Chat) verwendet.

### TypeScript Interface (`src/types/index.ts`)

```typescript
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
  file?: FileObject;
  reasoning?: string;
}

export interface FileObject {
  id: string;
  name: string;
  type: string;
  url: string; // Can be a blob URL for local preview or a remote URL
  size: number;
  isImage: boolean;
  dataAiHint?: string; // For placeholder images from design
}
```

### Supabase Datenbank Tabelle (`messages`)

Die `messages`-Tabelle in Supabase speichert die persistenten Chat-Nachrichten. Die Struktur entspricht weitgehend dem `Message`-Interface, mit einigen Anpassungen für die Datenbank.

*   **Tabelle**: `messages`
*   **Schema (SQL)**:
    ```sql
    CREATE TABLE messages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      text TEXT NOT NULL,
      sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'assistant', 'system')),
      timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
      file_data JSONB, -- Speichert das FileObject als JSONB
      reasoning TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- Automatisch generierter Zeitstempel
    );
    ```

### Feld-Beschreibung

| Feld          | Typ (TypeScript)             | Typ (Supabase SQL)        | Beschreibung                                                                 |
| :------------ | :--------------------------- | :------------------------ | :--------------------------------------------------------------------------- |
| `id`          | `string`                     | `UUID`                    | Eindeutige Kennung der Nachricht.                                            |
| `text`        | `string`                     | `TEXT`                    | Der Inhalt der Chat-Nachricht.                                               |
| `sender`      | `'user' \| 'assistant' \| 'system'` | `VARCHAR(20)`             | Der Absender der Nachricht. Beschränkt auf die Werte 'user', 'assistant', 'system'. |
| `timestamp`   | `Date`                       | `TIMESTAMP WITH TIME ZONE` | Der Zeitpunkt, zu dem die Nachricht erstellt wurde.                          |
| `file`        | `FileObject \| undefined`    | `JSONB`                   | (Optional) Details zu einer angehängten Datei, gespeichert als JSON-Objekt.  |
| `reasoning`   | `string \| undefined`        | `TEXT`                    | (Optional) Begründung der KI für die Tool-Auswahl.                           |
| `created_at`  | *Nicht im Interface*         | `TIMESTAMP WITH TIME ZONE` | Automatisch generierter Zeitstempel der Tabellenerstellung. Wird oft für Sortierung verwendet. |

## 2. FileObject

Das `FileObject`-Modell beschreibt eine Datei, die an eine Nachricht angehängt ist. Es ist Teil des `Message`-Modells.

### TypeScript Interface (`src/types/index.ts`)

Siehe oben im Abschnitt "Message".

### Speicherung

`FileObject` wird als JSONB-Objekt in der `file_data`-Spalte der `messages`-Tabelle in Supabase gespeichert.

### Feld-Beschreibung

| Feld        | Typ       | Beschreibung                                                                 |
| :---------- | :-------- | :--------------------------------------------------------------------------- |
| `id`        | `string`  | Eindeutige Kennung der Datei.                                                |
| `name`      | `string`  | Der Dateiname.                                                               |
| `type`      | `string`  | Der MIME-Typ der Datei (z.B. `image/png`, `application/pdf`).                |
| `url`       | `string`  | Die URL zum Zugriff auf die Datei (z.B. Blob-URL für lokale Vorschau, Supabase Storage URL). |
| `size`      | `number`  | Die Größe der Datei in Bytes.                                                |
| `isImage`   | `boolean` | Gibt an, ob die Datei ein Bild ist (für die Vorschau).                       |
| `dataAiHint`| `string`  | (Optional) Hinweis für die KI oder Design-Platzhalter.                       |

Diese Datenmodelle sind entscheidend für das Verständnis, wie Chat-Nachrichten und angehängte Dateien in ReplicateAI strukturiert und verwaltet werden.