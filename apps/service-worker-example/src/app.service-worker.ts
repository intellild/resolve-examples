type ServiceWorkerLike = typeof globalThis & {
  clients: {
    claim(): Promise<void>;
  };
  location: {
    href: string;
  };
  skipWaiting(): Promise<void>;
  addEventListener(type: 'install', listener: () => void): void;
  addEventListener(
    type: 'activate',
    listener: (event: { waitUntil(promise: Promise<void>): void }) => void,
  ): void;
  addEventListener(
    type: 'message',
    listener: (event: {
      source?: {
        postMessage(message: unknown): void;
      };
    }) => void,
  ): void;
};

const sw = globalThis as ServiceWorkerLike;

sw.addEventListener('install', () => {
  void sw.skipWaiting();
});

sw.addEventListener('activate', (event) => {
  event.waitUntil(sw.clients.claim());
});

sw.addEventListener('message', (event) => {
  event.source?.postMessage({
    type: 'service-worker-example:pong',
    url: sw.location.href,
  });
});
