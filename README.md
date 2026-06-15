# ResolveExamples

This repository collects real-world usage scenarios for `require.resolve` and
`import.meta.resolve`. These examples are intended to become both showcases and
test cases for code-entry URL/path resolution behavior. If you have a new
scenario, pull requests are welcome.

## Code URL Resolve Examples

This workspace collects cases where an application needs the runtime URL or path for a piece of JavaScript code. These are not static assets: the referenced file should be treated as its own code entry, transformed, bundled with its imports, emitted, and then resolved at runtime.

The ideal future shape is that users can write `require.resolve('./entry.ts')` or `import.meta.resolve('./entry.ts')`, and the build output preserves the resolve call while rewriting the argument to the emitted JavaScript file.

Examples in this repo:

- [Worklet example](./apps/worklet-example/README.md) - AudioWorklet needs a module URL for code loaded by `audioWorklet.addModule()`.
- [Service worker example](./apps/service-worker-example/README.md) - `navigator.serviceWorker.register()` needs a generated service worker entry URL.
- [Electron example](./apps/electron-example/README.md) - Electron main process code needs a runtime path for a generated Node worker entry.
- [CRXJS extension example](./apps/crxjs-extension) - extension content scripts inject a generated main-world script URL.

Related feature requests and bug reports:

- `import.meta.resolve` / `require.resolve` primitive: [vitejs/vite#14500](https://github.com/vitejs/vite/issues/14500), [webpack/webpack#16693](https://github.com/webpack/webpack/issues/16693), [web-infra-dev/rspack#8008](https://github.com/web-infra-dev/rspack/issues/8008), [web-infra-dev/rspack#13046](https://github.com/web-infra-dev/rspack/issues/13046).
- Worklets: [vitejs/vite#9952](https://github.com/vitejs/vite/issues/9952), [vitejs/vite#6757](https://github.com/vitejs/vite/issues/6757), [webpack/webpack#11543](https://github.com/webpack/webpack/issues/11543), [angular/angular-cli#29130](https://github.com/angular/angular-cli/issues/29130), [vercel/next.js#24907](https://github.com/vercel/next.js/issues/24907).
- Service workers: [vitejs/vite#7163](https://github.com/vitejs/vite/issues/7163), [webpack/webpack#17253](https://github.com/webpack/webpack/issues/17253).
- Electron and Node workers: [alex8088/electron-vite#51](https://github.com/alex8088/electron-vite/issues/51), [alex8088/electron-vite#862](https://github.com/alex8088/electron-vite/issues/862), [electron/forge#3644](https://github.com/electron/forge/issues/3644), [webpack/webpack#15961](https://github.com/webpack/webpack/issues/15961).
- Browser extensions: [crxjs/chrome-extension-tools#783](https://github.com/crxjs/chrome-extension-tools/issues/783), [crxjs/chrome-extension-tools#1047](https://github.com/crxjs/chrome-extension-tools/issues/1047), [wxt-dev/wxt#1567](https://github.com/wxt-dev/wxt/issues/1567), [PlasmoHQ/plasmo#470](https://github.com/PlasmoHQ/plasmo/issues/470).
