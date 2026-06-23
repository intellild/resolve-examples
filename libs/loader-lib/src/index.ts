import { fileURLToPath } from 'node:url';

export interface LoaderRule {
  test: RegExp;
  use: Array<{
    loader: string;
    options: {
      banner: string;
    };
  }>;
}

export function createLoaderRule(): LoaderRule {
  return {
    test: /\.example$/,
    use: [
      {
        loader: fileURLToPath(new URL('./loader.ts', import.meta.url)),
        options: {
          banner: 'resolved from loader-lib',
        },
      },
    ],
  };
}
