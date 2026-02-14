```
flowchart TD
  A["Browser loads https://studies.cs.helsinki.fi/exampleapp/spa"]
  A --> B["User types note"]
  B --> C["User clicks Save → form.onsubmit fires"]
  C --> D["Create note object with content and date"]
  D --> E["Push note into local notes array"]
  E --> F["Clear input field"]
  F --> G["redrawNotes() UI now shows the new note"]
  G --> H["sendToServer(note) POST /exampleapp/new_note_spa (JSON body)"]
  H --> I["Server responds 201 Created with object property message and value note created"]
  I --> J["Console logs response)"]
```
