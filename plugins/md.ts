// @ts-nocheck
import path from 'path'
import fs from 'fs'
import marked from 'marked'

const mdToJs = str => {
  const content = JSON.stringify(marked(str))
  return `export default ${content}`
}

export function md() {
  return {
    name: 'markdown',
    configureServer(server) { // 用于开发
      server.middlewares.use(async (req, res, next) => {
        // custom handle request...
        if (req.url.endsWith('.md')) {
          res.type = 'js'
          const filePath = path.join(process.cwd(), req.url)
          res.body = mdToJs(fs.readFileSync(filePath).toString())
        } else {
          await next()
        }
      })
    },
    transform(src, id) {// 用于rollup 
      if (id.endsWith('.md')) {
        return {
          code: mdToJs(src),
          map: null // provide source map if available
        }
      }
    },
    
  }
}