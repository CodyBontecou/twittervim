# Twittervim

Navigate X (formerly Twitter) with lightning-fast vim-style keyboard shortcuts. Inspired by Gmail's keyboard navigation and vim text editor, this extension brings powerful keyboard shortcuts to your X experience.

## Features

### Command Palette
Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the command palette and discover all available commands with fuzzy search.

<img width="640" height="400" alt="twitterbinds-command-palette" src="https://github.com/user-attachments/assets/d28c5023-0fad-4eb2-9952-2c5ef2c2e2b0" />


### Navigation Shortcuts

Navigate anywhere on X with two-key combinations starting with `g`:

| Shortcut | Action |
|----------|--------|
| `g` + `h` | Go to Home timeline |
| `g` + `e` | Go to Explore |
| `g` + `n` | Go to Notifications |
| `g` + `m` | Go to Messages |
| `g` + `k` | Go to Grok AI |
| `g` + `p` | Go to your Profile |
| `g` + `l` | Go to your Lists |
| `g` + `b` | Go to Bookmarks |
| `g` + `c` | Go to Communities |

### Tweet Interaction Shortcuts

Browse and interact with tweets without touching your mouse:

| Shortcut | Action |
|----------|--------|
| `j` | Focus next tweet |
| `k` | Focus previous tweet |
| `r` | Reply to focused tweet |
| `t` | Retweet focused tweet |
| `l` | Like focused tweet |
| `b` | Bookmark focused tweet |
| `o` | Open focused tweet (detail view) |
| `Esc` | Remove focus from current tweet |

## Installation

### From Chrome Web Store
1. Visit the Chrome Web Store (link coming soon)
2. Click "Add to Chrome"
3. Start using keyboard shortcuts immediately on X.com

### Manual Installation (Development)
1. Clone this repository
2. Install dependencies: `pnpm install`
3. Build the extension: `pnpm build`
4. Load the `extension/` folder in Chrome:
   - Navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension/` folder

## Usage

1. Visit [x.com](https://x.com) or [twitter.com](https://twitter.com)
2. Start using keyboard shortcuts immediately
3. Press `Ctrl+Shift+P`/`Cmd+Shift+P` to open the command palette and explore all commands
4. Use `j`/`k` to navigate tweets, then `r`/`t`/`l`/`b` to interact

## Privacy

This extension:
- **Does NOT collect any data**
- **Does NOT track your activity**
- Only runs on X.com and Twitter.com domains
- Uses local browser storage only for extension preferences
- Never sends data to external servers

See [PRIVACY.md](./PRIVACY.md) for detailed privacy policy.

## Development

### Tech Stack
- Vue 3 with Composition API
- Vite for fast development
- TypeScript for type safety
- UnoCSS for styling
- WebExtension APIs

### Commands
```bash
# Development with HMR
pnpm dev

# Build for production
pnpm build

# Package for distribution
pnpm pack:zip

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Browser Support

- Chrome/Chromium (Manifest V3)
- Edge (Chromium-based)
- Brave
- Firefox support coming soon

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Credits

Built with [Vitesse WebExt](https://github.com/antfu/vitesse-webext) template by [@antfu](https://github.com/antfu).

## Support

Found a bug or have a feature request? [Open an issue](https://github.com/codybontecou/twittervim/issues) on GitHub.
