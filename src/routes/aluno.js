const aluno = deps => {
  const { app, db } = deps

  app
    .get('/aluno', async (req, res, next) => {
      try {
        res.json(await db.aluno().all())
      } catch (err) {
        res.status(500).send(err)
      } finally {
        next()
      }
    })
    .post('/aluno', async (req, res, next) => {
      try {
        res.status(201).json(await db.aluno().save(req.body))
      } catch (err) {
        res.status(500).send(err)
      } finally {
        next()
      }
    })
    .put('/aluno/:id', async (req, res, next) => {
      try {
        res.status(204).json(await db.aluno().update(req.params.id, req.body))
      } catch (err) {
        res.status(500).send(err)
      } finally {
        next()
      }
    })
    .delete('/aluno/:id', async (req, res, next) => {
      try {
        res.status(204).json(await db.aluno().delete(req.params.id))
      } catch (err) {
        res.status(500).send(err)
      } finally {
        next()
      }
    })
}

module.exports = aluno
