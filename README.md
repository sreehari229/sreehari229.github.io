# sreehari229.github.io

The interactive resume of **Sreehari S**, built to look and work like Visual Studio Code.
Live at [sreehari229.in](https://sreehari229.in).

Plain HTML, CSS and JavaScript: no build step and no framework. The only external assets are
[Codicons](https://github.com/microsoft/vscode-codicons) (VS Code's icon font) and the Fira Code font.

## What's inside

| Part of VS Code | What it does here |
| --- | --- |
| **Title bar** | Working menus (File, Edit, View, Go, Run, Terminal, Help), a command center, back/forward navigation and layout toggles |
| **Explorer** | A file tree, Open Editors, an Outline of the current file, and a collapsible Timeline section |
| **Editor** | Tabs (drag to reorder, middle-click to close), breadcrumbs, line numbers, syntax highlighting, bracket-pair colours, indent guides, code folding, a minimap, word wrap, a cursor you can move with the keyboard, and clickable links |
| **Find (Ctrl+F)** | Find in the open file, with match-case, whole-word and regex options |
| **Search (Ctrl+Shift+F)** | Search across every file and jump to a result |
| **Source Control** | Career history drawn as a git graph. The commit box opens an email to Sreehari |
| **Run and Debug (F5)** | Runs `Skills.py` in the terminal while the status bar turns orange |
| **Extensions** | Skills listed as installed extensions |
| **Terminal** | Try `help`, `neofetch`, `experience`, `git log`, `ls -la`, `cat About.md`, `theme light-modern` and more |
| **Command Palette** | `Ctrl+Shift+P` / `F1` for commands, `Ctrl+P` for files, `:` for a line, `@` for a symbol |
| **Themes** | Dark Modern, Dark+, Light Modern and Light+ (`Ctrl+K Ctrl+T`). The choice is remembered |
| **Markdown preview** | `Ctrl+Shift+V` on `About.md` or `README.md` |
| **Status bar** | Cursor position, language, indentation, notifications and an "Open to work" button |

The site also works on phones: the side bar becomes an overlay and the editor wraps long lines.
Deep links open a specific file, for example `/#experience` or `/#skills`.

### Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl+P` | Go to file |
| `Ctrl+Shift+P` / `F1` | Command Palette |
| `Ctrl+B` | Toggle the side bar |
| `` Ctrl+` `` / `Ctrl+J` | Toggle the terminal / panel |
| `Ctrl+F`, `Ctrl+Shift+F` | Find in file, search all files |
| `Ctrl+G`, `Ctrl+Shift+O` | Go to line, go to symbol |
| `Ctrl+K Ctrl+T` | Color theme |
| `Alt+Z` | Toggle word wrap |
| `Alt+1` … `Alt+9` | Switch to tab *n* |
| `Ctrl+S` | Download the resume as text |
| `F5` | Run `Skills.py` |

On macOS use `Cmd` in place of `Ctrl`.

## Editing the resume

All resume content lives in the `resumeData` object at the top of `app.js`.
Each "file" in the explorer is generated from that data by the matching function in `SRC`
(`about`, `experience`, `education`, `skills`, `contact`, `readme`, `settings`), so you can update the
data or the text of any file in one place.

## Project structure

```
├── index.html   # Workbench layout (title bar, activity bar, side bar, editor, panel, status bar)
├── style.css    # VS Code theme colors and layout
├── app.js       # Resume data, editor engine, terminal, command palette and views
├── CNAME        # Custom domain for GitHub Pages
└── README.md
```

## Running locally

Any static file server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

The site is served by GitHub Pages from the `main` branch root. Push to `main` and Pages publishes it.
