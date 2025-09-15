import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/server.ts',
    output: {
      file: 'dist/server.js',
      format: 'es',
    },
    external: ['itty-router', 'discord-interactions'],
    plugins: [
      typescript(),
      nodeResolve({
        preferBuiltins: true,
      }),
      commonjs(),
    ],
    watch: {
      chokidar: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
  {
    input: 'src/register.ts',
    output: {
      file: 'dist/register.js',
      format: 'es',
    },
    external: ['dotenv'],
    plugins: [
      typescript(),
      nodeResolve({
        preferBuiltins: true,
      }),
      commonjs(),
    ],
    watch: {
      chokidar: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
];
