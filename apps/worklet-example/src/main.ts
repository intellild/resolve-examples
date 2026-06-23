import './styles.css';

const status = document.querySelector<HTMLParagraphElement>('#status');
const startButton = document.querySelector<HTMLButtonElement>('#start-worklet');
const workletUrl = new URL('./meter.worklet.ts', import.meta.url);

async function startWorklet() {
  if (!status || !startButton) {
    return;
  }

  startButton.disabled = true;
  status.textContent = 'Resolving worklet code URL...';

  try {
    const audioContext = new AudioContext();

    await audioContext.audioWorklet.addModule(workletUrl);

    const oscillator = new OscillatorNode(audioContext);
    const meter = new AudioWorkletNode(audioContext, 'meter-processor');

    oscillator.connect(meter).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);

    status.textContent = `Loaded AudioWorklet module from ${workletUrl.href}`;
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
