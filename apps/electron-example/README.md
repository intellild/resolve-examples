# Electron Code URL Example

This app captures the Electron main-process case where runtime code needs the real path of another JavaScript entry. The example starts a Node worker from the Electron main process:

```ts
const backgroundWorkerEntry = require.resolve('./background-worker.ts');
new Worker(backgroundWorkerEntry, { name: 'electron-background-worker' });
```

The desired future output shape keeps `require.resolve()` in the bundle, but rewrites the argument to the emitted file:

```ts
const backgroundWorkerEntry = require.resolve('./background-worker.js');
new Worker(backgroundWorkerEntry);
```

That lets Electron and Node resolve the real on-disk location at runtime, while the bundler still knows that `background-worker.ts` is a generated code entry.

## Related Issues

- [alex8088/electron-vite#51](https://github.com/alex8088/electron-vite/issues/51) - Feature request for `?nodeWorker` that generates a `Worker(require.resolve("./worker.js"))` wrapper.
- [alex8088/electron-vite#862](https://github.com/alex8088/electron-vite/issues/862) - Nested `?modulePath` worker entries are inlined instead of emitted independently.
- [electron/forge#3644](https://github.com/electron/forge/issues/3644) - Electron Forge + Vite + ESM breaks runtime `require.resolve()` and `import.meta.resolve()` from the built main file.
- [webpack/webpack#15961](https://github.com/webpack/webpack/issues/15961) - Node `worker_threads` entries need a way to get the transformed worker module path.
- [webpack/webpack#18497](https://github.com/webpack/webpack/issues/18497) - Feature request for friendlier worker imports that emit a URL/path.
