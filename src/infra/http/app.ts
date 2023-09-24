import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia';
import { register } from './routes';

export const app = new Elysia().use(cors()).use(register);

export type AppInstance = typeof app;
