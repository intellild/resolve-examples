export interface LoaderOptions {
  banner?: string;
}

export default function loader(
  this: { getOptions(): LoaderOptions },
  source: string,
) {
  const { banner = 'loader-lib' } = this.getOptions();
  return `export default ${JSON.stringify(`${banner}: ${source}`)};`;
}
