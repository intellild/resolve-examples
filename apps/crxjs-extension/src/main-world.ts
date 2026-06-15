window.postMessage(
  {
    source: 'crxjs-resolve-example',
    message: 'main world script loaded',
  },
  window.location.origin,
);
