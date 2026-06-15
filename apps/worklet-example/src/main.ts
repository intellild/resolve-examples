import './styles.css';

const status = document.querySelector<HTMLParagraphElement>('#status');
const startButton = document.querySelector<HTMLButtonElement>('#start-worklet');

async function resolveWorkletUrlWithWorkerEntry() {
  const probe = new Worker(new URL('./meter.worklet.ts', import.meta.url), {
    type: 'module',
    name: 'worklet-url-probe',
  });

  return await new Promise<string>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      probe.terminate();
      reject(new Error('Timed out while probing the worklet URL'));
    }, 3000);

    probe.addEventListener(
      'message',
      (event: MessageEvent<string>) => {
        window.clearTimeout(timeout);
        probe.terminate();
        resolve(event.data);
      },
      { once: true },
    );

    probe.addEventListener(
      'error',
      (event) => {
        window.clearTimeout(timeout);
        probe.terminate();
        reject(event.error ?? new Error(event.message));
      },
      { once: true },
    );
  });
}

async function startWorklet() {
  if (!status || !startButton) {
    return;
  }

  startButton.disabled = true;
  status.textContent = 'Resolving worklet code URL...';

  try {
    const audioContext = new AudioContext();
    const workletUrl = await resolveWorkletUrlWithWorkerEntry();

    await audioContext.audioWorklet.addModule(workletUrl);

    const oscillator = new OscillatorNode(audioContext);
    const meter = new AudioWorkletNode(audioContext, 'meter-processor');

    oscillator.connect(meter).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);

    status.textContent = `Loaded AudioWorklet module from ${workletUrl}`;
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : 'Failed to load worklet';
  } finally {
    startButton.disabled = false;
  }
}

startButton?.addEventListener('click', () => {
  void startWorklet();
});
