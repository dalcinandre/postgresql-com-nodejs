const db = require('../services')

module.exports = {
  aluno: app => require('./aluno')({ app, db })
}
