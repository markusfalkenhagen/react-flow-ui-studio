# Beitragen zu ReplicateAI

Wir freuen uns über Ihre Beiträge zu ReplicateAI! Bevor Sie beginnen, lesen Sie bitte diesen Leitfaden, um den Beitragsprozess zu verstehen und sicherzustellen, dass Ihre Beiträge reibungslos integriert werden können.

## Verhaltenskodex

Bitte beachten Sie unseren [Verhaltenskodex](CODE_OF_CONDUCT.md). Wir erwarten von allen Mitwirkenden, dass sie sich an diesen Kodex halten, um eine offene und einladende Umgebung zu gewährleisten.

## Wie man beiträgt

Es gibt viele Möglichkeiten, zu ReplicateAI beizutragen:

*   **Fehlerberichte**: Melden Sie Fehler, die Sie finden, indem Sie ein Issue öffnen.
*   **Feature-Vorschläge**: Schlagen Sie neue Features oder Verbesserungen vor.
*   **Code-Beiträge**: Schreiben Sie Code, um Fehler zu beheben oder neue Features zu implementieren.
*   **Dokumentations-Beiträge**: Verbessern Sie die bestehende Dokumentation oder fügen Sie neue hinzu.

### Fehlerberichte

Wenn Sie einen Fehler finden, öffnen Sie bitte ein neues Issue in unserem [GitHub-Repository](https://github.com/your-repo/replicateai/issues). Bitte fügen Sie so viele Details wie möglich hinzu:

*   Eine klare und prägnante Beschreibung des Fehlers.
*   Schritte zur Reproduktion des Fehlers.
*   Erwartetes Verhalten.
*   Tatsächliches Verhalten.
*   Ihre Umgebung (Betriebssystem, Node.js-Version, Browser usw.).
*   Screenshots oder Videos (falls zutreffend).

### Feature-Vorschläge

Wir freuen uns über Feature-Vorschläge! Öffnen Sie ein neues Issue und beschreiben Sie Ihr Feature so detailliert wie möglich. Erklären Sie, warum das Feature nützlich wäre und wie es funktionieren könnte.

### Code-Beiträge

1.  **Forken Sie das Repository**: Beginnen Sie damit, das ReplicateAI-Repository auf Ihr GitHub-Konto zu forken.
2.  **Klonen Sie Ihr Fork**: Klonen Sie Ihr geforktes Repository auf Ihren lokalen Computer:
    ```bash
    git clone https://github.com/your-username/replicateai.git
    cd replicateai
    ```
3.  **Abhängigkeiten installieren**: Installieren Sie alle erforderlichen Abhängigkeiten:
    ```bash
    npm install
    ```
4.  **Entwicklungs-Server starten**: Starten Sie die Anwendung im Entwicklungsmodus:
    ```bash
    npm run dev
    ```
5.  **Branch erstellen**: Erstellen Sie einen neuen Branch für Ihre Änderungen. Verwenden Sie einen beschreibenden Namen (z.B. `feature/add-dark-mode` oder `fix/login-bug`).
    ```bash
    git checkout -b feature/your-feature-name
    ```
6.  **Änderungen vornehmen**: Nehmen Sie Ihre Änderungen am Code vor. Stellen Sie sicher, dass Sie die [Style Guidelines](STYLE_GUIDE.md) befolgen.
7.  **Tests schreiben (falls zutreffend)**: Wenn Sie neue Features hinzufügen oder Fehler beheben, schreiben Sie bitte entsprechende Tests.
8.  **Änderungen committen**: Committen Sie Ihre Änderungen mit einer klaren und prägnanten Commit-Nachricht.
    ```bash
    git commit -m "feat: Add new feature"
    ```
9.  **Änderungen pushen**: Pushen Sie Ihren Branch zu Ihrem geforkten Repository:
    ```bash
    git push origin feature/your-feature-name
    ```
10. **Pull Request öffnen**: Öffnen Sie einen Pull Request (PR) von Ihrem geforkten Repository zum `main`-Branch des ursprünglichen ReplicateAI-Repositorys. Beschreiben Sie Ihre Änderungen detailliert und verweisen Sie auf alle relevanten Issues.

### Dokumentations-Beiträge

Verbesserungen an der Dokumentation sind immer willkommen! Wenn Sie Tippfehler finden, Erklärungen verbessern oder neue Abschnitte hinzufügen möchten, folgen Sie dem gleichen Prozess wie bei Code-Beiträgen (Forken, Branch erstellen, Änderungen vornehmen, PR öffnen).

## Style Guidelines

Bitte lesen Sie unsere [Style Guidelines](STYLE_GUIDE.md), um sicherzustellen, dass Ihr Code und Ihre Dokumentation konsistent mit dem Projektstil sind.

Vielen Dank für Ihre Beiträge!