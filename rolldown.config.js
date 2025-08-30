import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: 'src/server.ts',
    output: {
      file: 'dist/server.js',
      format: 'es',
      sourcemap: true,
    },
    target: 'es2022',
    platform: 'neutral',
    external: ['itty-router', 'discord-interactions'],
  },
  {
    input: 'src/register.ts',
    output: {
      file: 'dist/register.js',
      format: 'es',
      sourcemap: true,
    },
    target: 'es2022',
    platform: 'neutral',
    external: ['dotenv'],
  },
]);
