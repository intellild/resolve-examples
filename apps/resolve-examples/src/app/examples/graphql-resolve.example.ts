import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface GraphqlResolveExample {
  module: 'GraphQLModule.forRoot';
  options: {
    typePaths: string[];
    definitions: {
      path: string;
    };
    autoSchemaFile: string;
  };
  importMetaSchemaPath: string;
}

export function createGraphqlResolveExample(): GraphqlResolveExample {
  const schemaPath = fileURLToPath(
    new URL('./graphql/schema/hero.graphql', import.meta.url),
  );
  const schemaPathFromImportMeta = fileURLToPath(
    new URL('./graphql/schema/hero.graphql', import.meta.url),
  );
  const schemaDirectory = dirname(schemaPath);

  return {
    module: 'GraphQLModule.forRoot',
    options: {
      typePaths: [schemaPath],
      definitions: {
        path: join(schemaDirectory, 'hero.d.ts'),
      },
      autoSchemaFile: join(schemaDirectory, 'generated-schema.graphql'),
    },
    importMetaSchemaPath: schemaPathFromImportMeta,
  };
}
