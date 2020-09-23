require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
  date: Date,
  name: String,
})

mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.error('Error'))

const Visitor = mongoose.model('Visitors', visitorSchema)

const app = express()

app.get('/', async (req, res) => {
  console.log('TLC: req.query', req.query)
  try {
    const visitor = {
      date: new Date(),
      name: req.query.name ? req.query.name : 'Anónimo',
    }
    console.log('TLC: visitor', visitor)
    await Visitor.create(visitor)
    res.send(`<h1>El visitante fue almacenado con éxito</h1>`)
  } catch (error) {
    console.log('TLC: error', error)
  }
})

app.listen(3000, () => console.log('Listen on port 3000!'))
