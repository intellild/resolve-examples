import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface GrpcResolveExample {
  module: 'ClientsModule.register';
  transport: 'Transport.GRPC';
  options: {
    package: string;
    protoPath: string;
    loader: {
      includeDirs: string[];
    };
  };
}

export function createGrpcResolveExample(): GrpcResolveExample {
  const protoPath = fileURLToPath(
    new URL('./grpc/proto/hero.proto', import.meta.url),
  );
  const commonProtoPath = fileURLToPath(
    new URL('./grpc/proto/common.proto', import.meta.url),
  );

  return {
    module: 'ClientsModule.register',
    transport: 'Transport.GRPC',
    options: {
      package: 'hero',
      protoPath,
      loader: {
        includeDirs: [dirname(commonProtoPath)],
      },
    },
  };
}
