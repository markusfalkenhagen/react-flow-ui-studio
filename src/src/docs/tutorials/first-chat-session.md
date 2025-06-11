# Tutorial: Ihre erste Chat-Sitzung

Dieses Tutorial führt Sie durch Ihre erste Interaktion mit dem ReplicateAI Chat-Interface und zeigt Ihnen, wie Sie Nachrichten senden und die KI-gesteuerte Tool-Auswahl erleben können.

## 1. Anwendung starten

Stellen Sie sicher, dass Ihre ReplicateAI-Anwendung lokal läuft. Wenn nicht, folgen Sie dem [Tutorial: Erste Schritte](getting-started.md), um sie einzurichten und zu starten.

Öffnen Sie Ihren Webbrowser und navigieren Sie zu `http://localhost:3000`.

## 2. Das Chat-Interface

Sie sollten das ReplicateAI Chat-Interface sehen. Es besteht typischerweise aus:

*   **Nachrichtenliste**: Der Bereich, in dem die gesendeten und empfangenen Nachrichten angezeigt werden.
*   **Nachrichteneingabe**: Ein Textfeld am unteren Rand, in das Sie Ihre Nachrichten eingeben können.
*   **Senden-Button**: Ein Button, um Ihre Nachricht abzuschicken.

## 3. Eine Nachricht senden

1.  **Nachricht eingeben**: Klicken Sie in das Textfeld am unteren Rand des Chats.
2.  **Text eingeben**: Geben Sie eine Nachricht ein. Versuchen Sie eine Nachricht, die eine bestimmte Aufgabe impliziert, die einem der definierten [KI-Tools](explanation/ai-intelligence.md) entspricht.
    *   Beispiel: "Kannst du mir helfen, einen Entwurf für eine Marketing-E-Mail zu schreiben?"
3.  **Nachricht senden**: Klicken Sie auf den Senden-Schaltfläche (oft ein Pfeil- oder Papierflugzeug-Symbol) oder drücken Sie die Eingabetaste.

## 4. KI-Antwort und Tool-Auswahl

Nachdem Sie Ihre Nachricht gesendet haben, geschieht Folgendes:

1.  Ihre Nachricht wird in der Nachrichtenliste angezeigt.
2.  Die Anwendung sendet Ihre Nachricht an den internen KI-Flow.
3.  Die KI analysiert Ihre Nachricht und wählt das am besten geeignete Tool aus.
4.  Eine Systemnachricht kann erscheinen, die anzeigt, welches Tool die KI ausgewählt hat und warum (basierend auf der `reasoning`-Eigenschaft).
5.  Eine simulierte Antwort des Assistenten wird angezeigt, die angibt, welches Tool ausgewählt wurde.

Im Beispiel "Kannst du mir helfen, einen Entwurf für eine Marketing-E-Mail zu schreiben?" sollte die KI wahrscheinlich das Tool "ContentGeneration" auswählen.

## 5. Nachrichtenpersistenz

Da ReplicateAI mit Supabase integriert ist, werden alle Nachrichten, die Sie senden und empfangen, in Ihrer Supabase-Datenbank gespeichert.

*   Sie können Ihre Supabase-Datenbank im Supabase-Dashboard überprüfen, um die gespeicherten Nachrichten in der `messages`-Tabelle zu sehen.
*   Wenn Sie die Anwendung neu laden, sollten die zuvor gesendeten Nachrichten aus Supabase geladen und im Chat angezeigt werden.

## 6. Dateianhänge (falls implementiert)

Wenn die Dateianhangsfunktion implementiert ist, können Sie auch Dateien über das Eingabefeld hochladen. Diese Dateien werden im Chat angezeigt und ihre Metadaten (falls konfiguriert) in der Datenbank gespeichert.

Durch diese erste Chat-Sitzung haben Sie die grundlegende Interaktion mit ReplicateAI erlebt und gesehen, wie die KI Ihre Anfragen interpretiert und Tools auswählt.