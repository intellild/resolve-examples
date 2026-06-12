declare const require: NodeRequire;

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
        loader: require.resolve('./loader.ts'),
        options: {
          banner: 'resolved from loader-lib',
        },
      },
    ],
  };
}
