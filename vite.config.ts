import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { executeNurAiQuery, getServerAiStatus } from './api/ask'

function nurLocalApiPlugin(): Plugin {
  return {
    name: 'nur-local-serverless-api',
    configureServer(server) {
      server.middlewares.use('/api/ask', (req, res) => {
        if (req.method === 'GET') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(getServerAiStatus()))
          return
        }

        if (req.method === 'POST') {
          let raw = ''
          req.on('data', (chunk) => {
            raw += chunk
          })
          req.on('end', async () => {
            try {
              const parsed = raw ? JSON.parse(raw) : {}
              const result = await executeNurAiQuery(parsed)
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(result))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(
                JSON.stringify({
                  error: err instanceof Error ? err.message : 'Erreur serveur IA',
                })
              )
            }
          })
          return
        }

        res.statusCode = 405
        res.end('Method Not Allowed')
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), nurLocalApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
})
