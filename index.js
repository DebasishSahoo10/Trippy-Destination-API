// MONGO
const mongoose = require('mongoose')
const mongoURI = process.env['MONGODB']
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
})
const Destination = require('./Models/destination.model')
const mongoFunc = require('./mongofunctions')
// EXPRESS
const express = require('express')
const app = express()
app.use(express.json())
app.listen(3000, () => {
  console.log(`Server is running on 3000`)
})
app.get('/', async (req, res) => {
  res.send("Base URL")
})
app.post('/destinations', async (req, res) => {
  const destFromAPI = req.body
  if (Object.keys(destFromAPI).length !== 0) {
    try {
      const addedDestination = await mongoFunc.createTravelDestination(destFromAPI)
      res.status(201).json({data : addedDestination})
    } catch (error) {
      res.status(500).json({error : `${error}`})
    }
  } else {
    res.status(400).json({error : "Missing Request Body"})
  }
})
app.post('/destinations/:destinationId', async (req, res) => {
  const destinationId = req.params.destinationId
  const updateDataFromAPI = req.body
  if (destinationId !== "" | Object.keys(updateDataFromAPI).length !== 0) {
    const updatedDestination = await mongoFunc.updateTravelDestination(destinationId, updateDataFromAPI)
    res.status(201).json({data : updatedDestination})
  } else {
    res.status(400).json({error : "Something missing from API"})
  }
})
app.post('/destinations/:destinationId/reviews', async (req, res) => {
  const destinationId = req.params.destinationId
  const reviewData = req.body
  if (destinationId !== "" | Object.keys(reviewData).length !== 0) {
    try {
      const updatedDestination = await mongoFunc.addReview(destinationId, reviewData)
      res.status(201).json({data : updatedDestination})
    } catch (error) {
      res.status(400).json({error : `$error`})
    }
  } else {
    res.status(500).json({error : "Something is missing"})
  }
})
app.get('/destinations', async (req, res) => {
    try {
      const foundDestinations = await mongoFunc.readAllTravelDestinations()
      res.status(201).json({data : foundDestinations})
    } catch (error) {
      res.status(500).json({error : `${error}`})
    }
})
app.get('/destinations/rating', async (req, res) => {
  try {
    const sortedDestination = await mongoFunc.readTravelDestinationsByRating()
    res.status(201).json({data : sortedDestination})
  } catch (error) {
    res.status(500).json({error : `${error}`})
  }
})
app.get('/destinations/location/:city', async (req, res) => {
  const locationFromAPI = req.params.city
  if (locationFromAPI !== "") {
    try {
      const foundDestination = await mongoFunc.readTravelDestinationsByCity(locationFromAPI)
      res.status(201).json({data : foundDestination})
    } catch (error) {
      res.status(500).json({error : `${error}`})
    }
  } else {
    res.status(400).json({error : "Missing Params"})
  }
})
app.get('/destinations/filter/:minRating', async (req, res) => {
  const minRating = req.params.minRating
  if (minRating) {
    try {
      const filteredDestinations = await mongoFunc.filterDestinationsByRating(minRating)
      res.status(201).json({data : filteredDestinations})
    } catch (error) {
      res.status(400).json({error : `${error}`})
    }
  } else {
    res.status(500).json({error : "Something went wrong"})
  }
})
app.get('/destinations/:name', async (req, res) => {
  const nameFromAPI = req.params.name
  if (nameFromAPI !== "") {
    try {
      const foundDestination = await mongoFunc.readTravelDestination(nameFromAPI)
      res.status(201).json({data : foundDestination})
    } catch (error) {
      res.status(500).json({error : `${error}`})
    }
  } else {
    res.status(400).json({error : "Missing Params"})
  }
})
app.get('/destinations/:destinationId/reviews', async (req, res) => {
  const destinationId = req.params.destinationId
  try {
    const foundReviews = await mongoFunc.getReviews(destinationId)
    res.status(201).json({data : foundReviews})
  } catch (error) {
    res.status(400).json({error : `${error}`})
  }
})
app.delete('/destinations/:destinationID', async (req, res) => {
  const destinationID = req.params.destinationID
  if (destinationID !== "") {
    try {
      const deletedDestination = await mongoFunc.deleteTravelDestination(destinationID)
      res.status(201).json({message : deletedDestination})
    } catch (error) {
      res.status(400).json({error : `${error}`})
    }
  } else {
    res.status(500).json({error : "Param is missing"})
  }
})