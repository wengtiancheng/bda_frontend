import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({

  plugins: [vue()],
  //为src目录设置别名
  resolve: {
    alias:[
      {
        find: '@',
        replacement: '/src'
      }
    ]
  },
  server: {
    port: 3000,   //设定前端运行的端口
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
