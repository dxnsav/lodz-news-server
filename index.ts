import * as app from './app';
import { createServer } from '@google-cloud/functions-framework';

export const server = createServer.http(app);
