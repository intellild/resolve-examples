import { parentPort, threadId } from 'node:worker_threads';

parentPort?.postMessage({
  threadId,
  filename: __filename,
});
