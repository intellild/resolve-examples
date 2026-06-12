interface ImportMeta {
  resolve(specifier: string, parent?: string): string;
  glob<TModule>(
    pattern: string,
    options: {
      eager: true;
    },
  ): Record<string, TModule>;
}
