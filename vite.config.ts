import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv"
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

dotenv.config()

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env': JSON.stringify(env),
    },
    plugins: [react()],
    base: "./",
    resolve: {
      alias: {
        'pages': path.resolve(__dirname, 'src/pages'),
        'components': path.resolve(__dirname, 'src/components'),
        'assets': path.resolve(__dirname, 'src/assets'),
        'images': path.resolve(__dirname, 'src/images'),
        'styles': path.resolve(__dirname, 'src/styles'),
        'store': path.resolve(__dirname, 'src/store'),
        'types': path.resolve(__dirname, 'src/types'),
        'utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  }
})