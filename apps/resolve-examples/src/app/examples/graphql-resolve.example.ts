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
  const schemaPath = require.resolve('./graphql/schema/hero.graphql');
  const schemaPathFromImportMeta = fileURLToPath(
    import.meta.resolve('./graphql/schema/hero.graphql'),
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
