import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~/components': path.resolve(__dirname, 'src/components'),
      '~/features': path.resolve(__dirname, 'src/components/features'),
      '~/hooks': path.resolve(__dirname, 'src/hooks'),
      '~/utils': path.resolve(__dirname, 'src/utils'),
      '~/mocks': path.resolve(__dirname, '__mocks__'),
    },
  },
});
