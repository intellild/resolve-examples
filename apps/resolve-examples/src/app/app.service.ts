import { Injectable } from '@nestjs/common';
import {
  createGraphqlResolveExample,
  createGrpcResolveExample,
  loadI18nMessages,
} from './examples';

const exampleFactories = [
  createGraphqlResolveExample,
  createGrpcResolveExample,
  loadI18nMessages,
] as const;

@Injectable()
export class AppService {
  getData(): { message: string; examples: string[] } {
    return {
      message: 'Hello API',
      examples: exampleFactories.map(factory => factory.name),
    };
  }
}
