import express from 'express'
import morgan from 'morgan'
import phoneBookRepository from './services/phoneBookRepository.js'
import NotFoundError from './errors/NotFoundError.js'
import 'dotenv/config'

morgan.token('body', (req) => JSON.stringify(req.body))

const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.get('/info', async (req, res) => {
  const count = await phoneBookRepository.getCount()
  let response = `<p>Phonebook has info for ${count} people.</p>`
  response += `<p>${new Date().toString()}</p>`
  res.send(response)
})

app.get('/api/persons', async (req, res, next) => {
  try {
    res.json(await phoneBookRepository.getAll())
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const person = await phoneBookRepository.getById(id)

    if (!person) {
      return next(new NotFoundError())
    }
    res.json(person)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const person = await phoneBookRepository.deleteById(id)

    if (!person) {
      return next(new NotFoundError())
    }

    res.json(person)
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body

  if(!name || !number) {
    return next(new Error('name and number are required'))
  }

  const newPerson = {
    // id: Math.floor(Math.random() * 50000),
    name: name,
    number: number,
  }

  try {
    res.json(await phoneBookRepository.addPerson(newPerson))
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  const { name, number } = req.body

  if(!name || !number) {
    return next(new Error('name and number are required'))
  }

  try {
    const updatedPerson = await phoneBookRepository.updatePerson(req.body)
    if(!updatedPerson) {
      return next(new NotFoundError(`Person with id ${req.params.id} not found`))
    }

    res.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

// Unknown endpoint
app.use((req, res) => {
  console.error('Unknown endpoint')
  res.status(404).send({ error: 'Endpoint not found' })
})

// Wrong ID error handler
app.use((error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
})

// Duplicate error handler
app.use((err, req, res, next) => {
  if (err.name === 'DuplicateError') {
    return res.status(409).send({ error: err.message })
  }
  next(err)
})

// General error handler
// eslint-disable-next-line
app.use((err, req, res, _next) => {
  let statusCode = 500

  if (err.name === 'ValidationError') {
    statusCode = 400
  } else if (err.name === 'NotFoundError') {
    statusCode = 404
  }

  res.status(statusCode).send({ error: err.message })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
