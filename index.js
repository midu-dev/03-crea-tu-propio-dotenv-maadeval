const fs = require('node:fs')
// reference: https://www.npmjs.com/package/dotenv

function config(options = {}) {
  const defaultPath = '.env'
  const pathToRead = options.path ?? defaultPath

  const isPathExist = fs.existsSync(pathToRead)
  if (!isPathExist) return

  const envFileRead = fs.readFileSync(pathToRead, 'utf-8')

  const regexToMatchEnvVariables = /([A-Z]+)=(.+)/g
  const envVariables = envFileRead
    .match(regexToMatchEnvVariables)
    .map((envVariable) => {
      const [key, value] = envVariable.split('=')
      return { key, value }
    })

  envVariables.forEach(({ key, value }) => {
    process.env[key] = value.replaceAll('"', '')
  })
}

module.exports = { config }
