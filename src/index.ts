import * as app from './app';
import * as functions from 'firebase-functions';

export const api = functions.http.onRequest(app);
