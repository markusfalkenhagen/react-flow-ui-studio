# Style Guide für ReplicateAI

Dieser Style Guide beschreibt die Konventionen und Best Practices für Code und Dokumentation im ReplicateAI-Projekt. Die Einhaltung dieser Richtlinien gewährleistet Konsistenz, Lesbarkeit und Wartbarkeit des gesamten Projekts.

## 1. Code-Stil

### 1.1. TypeScript/JavaScript

*   **Formatierung**: Verwenden Sie Prettier für die automatische Code-Formatierung. Stellen Sie sicher, dass Ihr Editor Prettier bei jedem Speichern ausführt.
*   **Linting**: Eslint wird für die Code-Qualität und das Auffinden potenzieller Fehler verwendet. Beheben Sie alle Linting-Fehler, bevor Sie Commits pushen.
*   **Variablennamen**:
    *   Verwenden Sie `camelCase` für Variablennamen, Funktionsnamen und Methoden.
    *   Verwenden Sie `PascalCase` für Komponenten, Klassen und Typen/Interfaces.
    *   Verwenden Sie `UPPER_SNAKE_CASE` für Konstanten, die global oder auf Modulebene definiert sind.
*   **Importe**:
    *   Gruppieren Sie Importe:
        1.  Node.js-Module (z.B. `path`)
        2.  Drittanbieter-Bibliotheken (z.B. `react`, `next`)
        3.  Projekt-Aliase (z.B. `@/components`, `@/lib`)
        4.  Relative Importe (z.B. `./utils`)
    *   Sortieren Sie Importe alphabetisch innerhalb jeder Gruppe.
*   **Funktionen**:
    *   Verwenden Sie Pfeilfunktionen für Komponenten und Callbacks.
    *   Benennen Sie Funktionen aussagekräftig.
*   **Kommentare**:
    *   Verwenden Sie JSDoc-Kommentare für Funktionen, Klassen und komplexe Logik.
    *   Kurze Erklärungen können mit `//` kommentiert werden.
    *   Vermeiden Sie redundante Kommentare, die den Code nur wiederholen.

### 1.2. React/Next.js

*   **Komponenten**:
    *   Verwenden Sie Funktionskomponenten.
    *   Benennen Sie Komponenten mit `PascalCase` und speichern Sie sie in Dateien mit dem gleichen Namen (z.B. `MyComponent.tsx`).
    *   Verwenden Sie `useState`, `useEffect`, `useCallback`, `useMemo` und `useRef` Hooks nach Bedarf.
    *   Props sollten klar typisiert sein.
*   **Styling**:
    *   Verwenden Sie Tailwind CSS für das Styling.
    *   Bevorzugen Sie Utility-Klassen gegenüber Inline-Styles.
    *   Verwenden Sie `clsx` oder `tailwind-merge` für bedingtes Styling.
*   **API-Routen**:
    *   Verwenden Sie Next.js API Routes für serverseitige Logik.
    *   Stellen Sie sicher, dass die Routen RESTful sind.
    *   Behandeln Sie Fehler ordnungsgemäß und geben Sie aussagekräftige Statuscodes zurück.

### 1.3. Git-Commits

*   **Commit-Nachrichten**: Verwenden Sie das [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) Format.
    *   `type(scope): subject`
    *   **Typen**: `feat` (Feature), `fix` (Bugfix), `docs` (Dokumentation), `style` (Formatierung), `refactor` (Refactoring), `test` (Tests), `chore` (Wartung), `perf` (Performance).
    *   **Scope**: Optional, beschreibt den Bereich der Änderung (z.B. `chat`, `api`, `supabase`).
    *   **Subject**: Kurze, prägnante Beschreibung der Änderung im Präsens.
*   **Beispiele**:
    *   `feat(chat): Add Supabase integration for messages`
    *   `fix(api): Correct webhook error handling`
    *   `docs(contributing): Update style guide`

## 2. Dokumentations-Stil

*   **Markdown**: Alle Dokumentationsdateien sollten im Markdown-Format (`.md`) geschrieben sein.
*   **Klarheit und Prägnanz**: Schreiben Sie klar, prägnant und direkt. Vermeiden Sie Jargon, wo immer möglich.
*   **Konsistenz**:
    *   Verwenden Sie eine konsistente Terminologie.
    *   Halten Sie sich an die [Diátaxis-Struktur](https://diataxis.fr/) (Tutorials, How-To Guides, Reference, Explanation).
*   **Code-Blöcke**: Verwenden Sie dreifache Backticks (``````) für Code-Blöcke und geben Sie die Sprache an (z.B. ````javascript`).
*   **Bilder und Videos**: Speichern Sie alle visuellen Assets im `docs/assets/` Verzeichnis und verlinken Sie sie entsprechend.
*   **Links**: Verwenden Sie relative Links für interne Dokumente.
*   **Überschriften**: Verwenden Sie `#` für Hauptüberschriften, `##` für Unterüberschriften usw.

## 3. Design-Prinzipien

*   **Farbpalette**:
    *   Primärfarbe: `#4285F4` (Calm Blue)
    *   Hintergrundfarbe: `#F5F5F5` (Light Gray)
    *   Akzentfarbe: `#67B965` (Soft Muted Green)
*   **Typografie**:
    *   Body und Headline Font: 'Inter', sans-serif
    *   Code Font: 'Source Code Pro'
*   **Icons**: Verwenden Sie [Lucide Icons](https://lucide.dev/).
*   **Animationen**: Subtile Animationen mit Framer Motion für Ladezustände und Interaktionen. Keine Seitenübergänge, nur Fades, Scales und Slides.

Durch die Einhaltung dieser Richtlinien stellen wir sicher, dass ReplicateAI ein qualitativ hochwertiges, konsistentes und gut dokumentiertes Projekt bleibt.