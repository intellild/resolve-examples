import './styles.css';

import serviceWorkerUrl from './app.service-worker.ts?worker&url';

const status = document.querySelector<HTMLParagraphElement>('#status');
const registerButton = document.querySelector<HTMLButtonElement>(
  '#register-service-worker',
);

async function registerServiceWorker() {
  if (!status || !registerButton) {
    return;
  }

  if (!('serviceWorker' in navigator)) {
    status.textContent = 'Service workers are not available in this browser.';
    return;
  }

  registerButton.disabled = true;
  status.textContent = 'Resolving service worker code URL...';

  try {
    const registration = await navigator.serviceWorker.register(
      serviceWorkerUrl,
      {
        type: 'module',
      },
    );

    status.textContent = `Registered ${registration.scope} from ${serviceWorkerUrl}`;
  } catch (error) {
    status.textContent =
      error instanceof Error
        ? error.message
        : 'Failed to register service worker';
  } finally {
    registerButton.disabled = false;
  }
}

registerButton?.addEventListener('click', () => {
  void registerServiceWorker();
});
