const script = document.createElement('script');
const mainWorldScriptUrl = new URL('./main-world.ts', import.meta.url);

script.src = mainWorldScriptUrl.href;
script.type = 'module';
script.dataset.resolveExample = 'main-world';
script.onload = () => script.remove();

(document.head ?? document.documentElement).append(script);
