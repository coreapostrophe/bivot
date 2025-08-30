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
    input: 'src/reddit.ts',
    output: {
      file: 'dist/reddit.js',
      format: 'es',
      sourcemap: true,
    },
    target: 'es2022',
    platform: 'neutral',
  },
]);
