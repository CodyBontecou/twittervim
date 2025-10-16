# Twittervim

A Chrome/Firefox web extension that enables complete keyboard navigation for X (formerly Twitter) using vim-style shortcuts.

## Features

- **Command Palette** - VSCode-style command palette (⌘⇧P / Ctrl⇧P) to search and execute any command
- Navigate between different sections of X using keyboard shortcuts
- Interact with tweets without using your mouse
- Focus and navigate through tweets with vim-like keybindings
- Visual feedback showing which tweet is currently focused
- Built-in help panel showing all available shortcuts

## Installation

### Chrome/Edge/Brave

1. Build the extension:
   ```bash
   pnpm install
   pnpm build
   ```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the `extension` folder from this project

### Firefox

1. Build the extension:
   ```bash
   pnpm install
   pnpm build
   ```

2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Navigate to the `extension` folder and select the `manifest.json` file

## Keyboard Shortcuts

### Command Palette

Press **⌘⇧P** (Mac) or **Ctrl⇧P** (Windows/Linux) to open the command palette. This VSCode-style interface lets you:

- Search for any command by name
- Filter commands by typing
- See all available shortcuts in one place
- Navigate with arrow keys (↑/↓)
- Execute commands with Enter
- Close with Escape

The command palette shows all navigation and tweet interaction commands in organized categories, making it easy to discover and use features you might not remember the keyboard shortcut for.

### Navigation Shortcuts

Navigate to different sections of X using two-key combinations:

| Shortcut | Action |
|----------|--------|
| `g` + `h` | Go to Home |
| `g` + `e` | Go to Explore |
| `g` + `n` | Go to Notifications |
| `g` + `m` | Go to Messages |
| `g` + `k` | Go to Grok |
| `g` + `p` | Go to Profile |
| `g` + `l` | Go to Lists |
| `g` + `b` | Go to Bookmarks |
| `g` + `c` | Go to Communities |

### Tweet Interaction Shortcuts

Interact with tweets directly from your keyboard:

| Shortcut | Action |
|----------|--------|
| `j` | Focus next tweet |
| `k` | Focus previous tweet |
| `r` | Reply to focused tweet |
| `t` | Retweet focused tweet |
| `l` | Like focused tweet |
| `b` | Bookmark focused tweet |
| `o` | Open focused tweet |
| `Esc` | Remove focus from tweet |

## Usage

1. Visit [x.com](https://x.com) or [twitter.com](https://twitter.com)
2. Click the blue `?` button in the bottom right corner to view all available shortcuts
3. Start using keyboard shortcuts to navigate!

### Tips

- **New to the extension?** Press **⌘⇧P** / **Ctrl⇧P** to open the command palette and explore all available commands
- Navigation shortcuts work from anywhere on the site
- Tweet interaction shortcuts only work when you're not typing in an input field
- Use `j` and `k` to navigate through your timeline like vim
- The focused tweet will have a blue outline
- Press `Esc` to remove the focus and start fresh
- Can't remember a shortcut? Use the command palette to search for it!

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Run in Firefox
pnpm dev-firefox
```

### Project Structure

- `src/composables/useTwitterKeyboard.ts` - Main keyboard shortcuts logic using useMagicKeys from VueUse
- `src/contentScripts/views/CommandPalette.vue` - VSCode-style command palette component
- `src/contentScripts/views/App.vue` - Main content script UI with help panel and command palette
- `src/contentScripts/` - Content script that injects into X/Twitter pages
- `src/manifest.ts` - Extension manifest configuration

## Technologies Used

- [Vite](https://vitejs.dev/) - Fast build tool
- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [VueUse](https://vueuse.org/) - Collection of Vue composition utilities (specifically `useMagicKeys`)
- [UnoCSS](https://github.com/unocss/unocss) - Instant on-demand Atomic CSS
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [vitesse-webext](https://github.com/antfu-collective/vitesse-webext) - WebExtension template

## Browser Compatibility

- Chrome/Edge/Brave (Manifest V3)
- Firefox (Manifest V3)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
