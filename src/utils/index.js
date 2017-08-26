const _formatador = (command, ...params) => {
  return {
    text: command.reduce((prev, curr, index) => prev + '$' + index + curr),
    values: params
  }
}

const cors = (req, res, next) => {
  let ip = req.connection.remoteAddress ||
    req.connection.socket.remoteAddress ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress

  ip = ip.split(':').slice(-1)[0]

  res = res
    .header('Access-Control-Allow-Origin', ip || '*')
    .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    .header('Access-Control-Allow-Methods', 'GET, POST, HEAD, PUT, DELETE, PATH')

  next()
}

module.exports = {
  SQL: (command, ...params) => _formatador(command, ...params),
  CORS: cors
}
