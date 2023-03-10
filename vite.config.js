import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 3000,
      hot: true,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    resolve: {
      alias: {
        '@bootstrap': resolve(__dirname, './node_modules/bootstrap'),
        '@pages': resolve(__dirname, './src/views'),
        '@components': resolve(__dirname, './src/components'),
        '@services': resolve(__dirname, './src/services'),
      },
    },
  }
})
