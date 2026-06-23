# ResolveExamples

This repository collects real-world usage scenarios for code-entry URL/path
resolution. These examples are intended to become both showcases and test cases
for bundlers that treat `new URL('./entry.ts', import.meta.url)` as a code
reference, similar to a lazy import. If you have a new scenario, pull requests
are welcome.

## Code URL Resolve Examples

This workspace collects cases where an application needs the runtime URL or path for a piece of JavaScript code. These are not static assets: the referenced file should be treated as its own code entry, transformed, bundled with its imports, emitted, and then resolved at runtime.

The ideal future shape is that users can write `new URL('./entry.ts', import.meta.url)`. ESM output preserves the `new URL` expression while rewriting the argument to the emitted JavaScript chunk, such as `new URL('./entry.output-chunk.js', import.meta.url)`. CJS output keeps the current runtime path behavior.

Examples in this repo:

- [Worklet example](./apps/worklet-example/README.md) - AudioWorklet needs a module URL for code loaded by `audioWorklet.addModule()`.
- [Service worker example](./apps/service-worker-example/README.md) - `navigator.serviceWorker.register()` needs a generated service worker entry URL.
- [Electron example](./apps/electron-example/README.md) - Electron main process code needs a runtime path for a generated Node worker entry.
- [CRXJS extension example](./apps/crxjs-extension) - extension content scripts inject a generated main-world script URL.

Related feature requests and bug reports:

- Code-entry resolver primitive: [vitejs/vite#14500](https://github.com/vitejs/vite/issues/14500), [webpack/webpack#16693](https://github.com/webpack/webpack/issues/16693), [web-infra-dev/rspack#8008](https://github.com/web-infra-dev/rspack/issues/8008), [web-infra-dev/rspack#13046](https://github.com/web-infra-dev/rspack/issues/13046), [evanw/esbuild#2866](https://github.com/evanw/esbuild/issues/2866), [evanw/esbuild#4116](https://github.com/evanw/esbuild/issues/4116), [evanw/esbuild#2986](https://github.com/evanw/esbuild/issues/2986).
- Worklets (Audio / Paint / Layout / Animation): [vitejs/vite#9952](https://github.com/vitejs/vite/issues/9952), [vitejs/vite#6757](https://github.com/vitejs/vite/issues/6757), [vitejs/vite#6979](https://github.com/vitejs/vite/issues/6979), [webpack/webpack#11543](https://github.com/webpack/webpack/issues/11543), [webpack/webpack#18149](https://github.com/webpack/webpack/issues/18149), [webpack/webpack#17212](https://github.com/webpack/webpack/issues/17212), [web-infra-dev/rspack#13174](https://github.com/web-infra-dev/rspack/issues/13174), [angular/angular-cli#29130](https://github.com/angular/angular-cli/issues/29130), [vercel/next.js#24907](https://github.com/vercel/next.js/issues/24907).
- Service workers: [vitejs/vite#7163](https://github.com/vitejs/vite/issues/7163), [webpack/webpack#17253](https://github.com/webpack/webpack/issues/17253).
- Web workers (URL without instantiation, SharedWorker, self-referential): [web-infra-dev/rspack#11378](https://github.com/web-infra-dev/rspack/issues/11378), [web-infra-dev/rspack#12945](https://github.com/web-infra-dev/rspack/issues/12945), [web-infra-dev/rspack#12095](https://github.com/web-infra-dev/rspack/issues/12095), [web-infra-dev/rspack#11476](https://github.com/web-infra-dev/rspack/issues/11476), [vitejs/vite#14306](https://github.com/vitejs/vite/issues/14306), [vitejs/vite#16422](https://github.com/vitejs/vite/issues/16422), [evanw/esbuild#4344](https://github.com/evanw/esbuild/issues/4344), [webpack/webpack#18616](https://github.com/webpack/webpack/issues/18616) (worker URL without `new Worker`, e.g. Monaco `getWorkerUrl`), [GoogleChromeLabs/comlink#687](https://github.com/GoogleChromeLabs/comlink/issues/687) (cross-runtime worker URL via a resolver primitive).
- Electron and Node workers: [alex8088/electron-vite#51](https://github.com/alex8088/electron-vite/issues/51), [alex8088/electron-vite#862](https://github.com/alex8088/electron-vite/issues/862), [electron/forge#3644](https://github.com/electron/forge/issues/3644), [webpack/webpack#15961](https://github.com/webpack/webpack/issues/15961), [webpack/webpack#18497](https://github.com/webpack/webpack/issues/18497), [vercel/next.js#93427](https://github.com/vercel/next.js/issues/93427), [vercel/next.js#94015](https://github.com/vercel/next.js/issues/94015), [electron/electron#40031](https://github.com/electron/electron/issues/40031) (utility process ESM entry fork).
- Browser extensions: [crxjs/chrome-extension-tools#783](https://github.com/crxjs/chrome-extension-tools/issues/783), [crxjs/chrome-extension-tools#1047](https://github.com/crxjs/chrome-extension-tools/issues/1047), [wxt-dev/wxt#1567](https://github.com/wxt-dev/wxt/issues/1567), [PlasmoHQ/plasmo#470](https://github.com/PlasmoHQ/plasmo/issues/470).
- Node packaging / forking: [nodejs/node#62776](https://github.com/nodejs/node/issues/62776) (SEA + `cluster.fork` entry path).
- Build-time URL hooks: [vitejs/vite#8762](https://github.com/vitejs/vite/issues/8762) (`experimental.renderBuiltUrl`).
