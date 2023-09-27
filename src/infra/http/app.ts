import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { register } from './routes';

export const app = new Elysia().use(swagger()).use(cors()).use(register);

export type AppInstance = typeof app;
