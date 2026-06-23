# Worklet Code URL Example

This app captures the AudioWorklet case where an API wants a URL for JavaScript code, not a static asset. The example assumes bundlers treat `new URL('./meter.worklet.ts', import.meta.url)` as a generated code entry:

```ts
const workletUrl = new URL('./meter.worklet.ts', import.meta.url);
await audioContext.audioWorklet.addModule(workletUrl.href);
```

The desired ESM output shape preserves the `new URL` expression while rewriting the referenced module to the emitted worklet chunk:

```ts
const workletUrl = new URL('./meter.worklet.output-chunk.js', import.meta.url);
await audioContext.audioWorklet.addModule(workletUrl.href);
```

CJS output keeps the current runtime path behavior. The important distinction is that the worklet is code with its own execution context, not an asset file.

## Related Issues

- [vitejs/vite#9952](https://github.com/vitejs/vite/issues/9952) - TypeScript files imported with `?url` are not transpiled for AudioWorklet usage.
- [vitejs/vite#6757](https://github.com/vitejs/vite/issues/6757) - `?url` treats imported JavaScript as an asset and does not bundle its imports.
- [webpack/webpack#11543](https://github.com/webpack/webpack/issues/11543) - Feature request to support worklets like workers.
- [webpack/webpack#15814](https://github.com/webpack/webpack/issues/15814) - AudioWorklet code with dependencies fails to bundle.
- [webpack/webpack#17489](https://github.com/webpack/webpack/issues/17489) - Production mode breaks worklet detection.
- [angular/angular-cli#29130](https://github.com/angular/angular-cli/issues/29130) - Angular users probe a worklet URL by loading the worklet as a worker first.
- [vercel/next.js#24907](https://github.com/vercel/next.js/issues/24907) - Next.js AudioWorklet support gaps with Webpack 5.
- [vercel/next.js#29472](https://github.com/vercel/next.js/issues/29472) - Next.js production build emits worklet code that assumes worker-only globals.
