// CRXJS main-world script loading currently uses the worker URL transform.
import mainWorldScriptUrl from './main-world.ts?worker&url';

const script = document.createElement('script');

script.src = chrome.runtime.getURL(mainWorldScriptUrl);
script.type = 'module';
script.dataset.resolveExample = 'main-world';
script.onload = () => script.remove();

(document.head ?? document.documentElement).append(script);
