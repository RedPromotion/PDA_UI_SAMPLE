import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

const repoName = 'PDA_UI_SAMPLE'; 

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  resolve: {
    alias: {      
      '@RootContext': path.resolve(__dirname, './src/context/RootContext.jsx'),      
    },
  },
})
