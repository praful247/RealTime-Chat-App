import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins:[
        react(),
        tailwindcss(),
  ],
  server:{
    proxy:{
      '/auth':{
        target:'http://localhost:5000'  // act as middleman sends it to backend server 
      },
      '/api':{
        target:'http://localhost:5000'  // act as middleman sends it to backend server 
      },
      '/messages':{
        target:'http://localhost:5000'  // act as middleman sends it to backend server 
      },
      '/users':{
        target:'http://localhost:5000'  // act as middleman sends it to backend server 
      },
    },
  },
})
