const { describe, it, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')

const dotenv = require('../index.js')

describe('1. dotenv', () => {
  beforeEach(() => {
    // clean process.env
    for (const key of Object.keys(process.env)) {
      delete process.env[key]
    }
  })

  afterEach(() => {
    try {
      fs.unlinkSync('.env')
    } catch {}

    try {
      fs.unlinkSync('./test/.env.local')
    } catch {}
  })

  it('1.1. load .env file', () => {
    // create .env file in root directory
    fs.writeFileSync('.env', 'PORT=3000\nTOKEN="123abc"')
    dotenv.config()

    assert.equal(process.env.PORT, '3000')
    assert.equal(process.env.TOKEN, '123abc')
  })

  it('1.2. load .env file from custom path', () => {
    // create .env file in root directory
    fs.writeFileSync('./test/.env.local', 'PORT=3000\nTOKEN="123abc"')
    dotenv.config({ path: './test/.env.local' })

    assert.equal(process.env.PORT, '3000')
    assert.equal(process.env.TOKEN, '123abc')
  })

  it('1.3 it works even without .env file', () => {
    dotenv.config()
    assert.equal(process.env.TOKEN, undefined)
  })

  it('1.4 dont use dotenv dependency', () => {
    // check that dotenv dependency is not installed
    try {
      require('dotenv')
    } catch (error) {
      assert.equal(error.code, 'MODULE_NOT_FOUND')
    }
  })
})
