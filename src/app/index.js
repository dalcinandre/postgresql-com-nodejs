const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { aluno } = require('../routes')
const { CORS } = require('../utils')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(CORS)

aluno(app)

module.exports = app
