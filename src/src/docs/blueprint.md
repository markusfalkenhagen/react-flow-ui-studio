# ReplicateAI Projekt Blueprint

Dieses Dokument diente ursprünglich als erster Entwurf und Überblick über die Kernfeatures und Design-Prinzipien des ReplicateAI-Projekts. Die detailliertere Dokumentation finden Sie nun in der strukturierten `docs/`-Ordnerstruktur, die dem [Diátaxis-Framework](https://diataxis.fr/) folgt.

## Kernfeatures (Ursprünglicher Entwurf):

*   **Chat Interface**: ChatGPT-ähnliche Schnittstelle für den Chat, mit Dark/Light Theme und responsivem Design. Jetzt persistent mit Supabase verbunden.
*   **Intelligent Webhooks**: KI-gesteuerte Tool-Auswahl. LLM "Tool" wählt die Fähigkeit, die am besten zur aktuellen Abfrage passt, und aktiviert Webhooks.
*   **Basic Webhooks**: Grundlegende Webhooks-Funktion zur Weiterleitung von Nachrichteninhalten an Dritte.
*   **Tool execution**: Grundlegende Tool-Ausführung zur Beantwortung mit vordefinierten Nachrichten aus Firebase (Hinweis: Die Tool-Ausführung wird nun idealerweise über n8n-Workflows gehandhabt, ausgelöst durch ausgehende Webhooks).
*   **File Support**: Datei-Upload und Vorschau mit Firebase Storage (temporäre Links), ohne den Datenbankteil (Hinweis: Die Dateiverwaltung kann optional mit Supabase Storage integriert werden).

Weitere Details zu diesen Features und ihrer Implementierung finden Sie in den entsprechenden Abschnitten der strukturierten Dokumentation:

*   [Architektur](explanation/architecture.md)
*   [Kernkonzepte](explanation/core-concepts.md)
*   [KI-Intelligenz und Tool-Auswahl](explanation/ai-intelligence.md)
*   [Webhook-System](explanation/webhook-system.md)
*   [How-To Guides](how-to/setup-supabase.md)
*   [Referenz](reference/api/webhook-api.md)
*   [Tutorials](tutorials/getting-started.md)

## Style Guidelines (Ursprünglicher Entwurf):

*   Primary color: A calm blue (#4285F4) evoking trust and intelligence.
*   Background color: Light gray (#F5F5F5), almost white.
*   Accent color: A soft, muted green (#67B965).
*   Body and headline font: 'Inter', sans-serif.
*   Code font: 'Source Code Pro'.
*   Lucide Icons; clean, simple line icons.
*   Subtle animations for message loading and interactions, using Framer Motion.

Diese Style Guidelines sind nun im [Style Guide](contributing/STYLE_GUIDE.md) für Mitwirkende dokumentiert.

Dieses Blueprint-Dokument wird als historischer Überblick beibehalten. Für die aktuellste und detaillierteste Dokumentation navigieren Sie bitte zum Haupt-README im `docs/`-Ordner.