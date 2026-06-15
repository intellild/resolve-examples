type WorkletGlobal = typeof globalThis & {
  AudioWorkletProcessor?: new () => {
    port: MessagePort;
  };
  registerProcessor?: (
    name: string,
    processorCtor: new () => {
      process(
        inputs: Float32Array[][],
        outputs: Float32Array[][],
        parameters: Record<string, Float32Array>,
      ): boolean;
    },
  ) => void;
  self?: {
    location: {
      href: string;
    };
    postMessage(message: string): void;
  };
};

const scope = globalThis as WorkletGlobal;

if (typeof scope.self !== 'undefined' && 'postMessage' in scope.self) {
  scope.self.postMessage(scope.self.location.href);
} else if (scope.AudioWorkletProcessor && scope.registerProcessor) {
  const BaseAudioWorkletProcessor = scope.AudioWorkletProcessor;

  class MeterProcessor extends BaseAudioWorkletProcessor {
    process() {
      return true;
    }
  }

  scope.registerProcessor('meter-processor', MeterProcessor);
}
