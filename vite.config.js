import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/ChakibMel/lean-six-sigma-quiz.git', // Replace with your actual GitHub repository name
})

