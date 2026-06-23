import './styles.css';

const status = document.querySelector<HTMLParagraphElement>('#status');
const registerButton = document.querySelector<HTMLButtonElement>(
  '#register-service-worker',
);
const serviceWorkerUrl = new URL('./app.service-worker.ts', import.meta.url);

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

    status.textContent = `Registered ${registration.scope} from ${serviceWorkerUrl.href}`;
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
