const aluno = deps => {
  const { con, errHandler, SQL } = deps

  return {
    all: () => {
      return new Promise(async (resolve, reject) => {
        const client = await con.connect()
        try {
          const res = await client.query('select coda, nome from aluno')
          resolve(res.rows)
        } catch (err) {
          errHandler(err, reject)
          return false
        } finally {
          client.release()
        }
      })
    },
    save: aluno => {
      return new Promise(async (resolve, reject) => {
        const client = await con.connect()
        try {
          await client.query('begin')
          let { coda, nome } = aluno
          await client.query(SQL`insert into aluno values (${coda}, ${nome})`)
          await client.query('commit')
          resolve()
        } catch (err) {
          await client.query('rollback')
          errHandler(err, reject)
          return false
        } finally {
          client.release()
        }
      })
    },
    update: aluno => {
      return new Promise(async (resolve, reject) => {
        const client = await con.connect()
        try {
          await client.query('begin')
          let { coda, nome } = aluno
          await client.query(SQL`update aluno set nome = ${nome} where coda = ${coda}`)
          await client.query('commit')
          resolve()
        } catch (err) {
          await client.query('rollback')
          errHandler(err, reject)
          return false
        } finally {
          client.release()
        }
      })
    },
    delete: id => {
      return new Promise(async (resolve, reject) => {
        const client = await con.connect()
        try {
          await client.query('begin')
          await client.query(SQL`delete from aluno where coda = ${id}`)
          await client.query('commit')
          resolve()
        } catch (err) {
          await client.query('rollback')
          errHandler(err, reject)
          return false
        } finally {
          client.release()
        }
      })
    }
  }
}

module.exports = aluno
