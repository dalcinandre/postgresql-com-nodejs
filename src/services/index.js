const { Pool } = require('pg')
const { SQL } = require('../utils')

const con = new Pool()

const errHandler = (err, reject) => {
  console.error(err)

  reject({erro: err.message})
}

module.exports = {
  aluno: () => require('./aluno')({ con, errHandler, SQL })
}
