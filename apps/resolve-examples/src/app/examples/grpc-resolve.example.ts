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
  const protoPath = require.resolve('./grpc/proto/hero.proto');
  const commonProtoPath = fileURLToPath(
    import.meta.resolve('./grpc/proto/common.proto'),
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
