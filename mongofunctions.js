const mongoose = require('mongoose')
const Destination = require('./Models/destination.model')
const createTravelDestination = async (newDestination) => {
  const destination = new Destination(newDestination)
  const addedDestination = await destination.save()
  return addedDestination
}
const readTravelDestination = async (destinationName) => {
  const foundDestination = await Destination.findOne({name : destinationName})
  return foundDestination
}
const readAllTravelDestinations = async () => {
  const allDestinations = await Destination.find({})
  return allDestinations
}
const readTravelDestinationsByCity = async (city) => {
  const foundDestination = await Destination.find({'location.city' : city})
  return foundDestination
}
const readTravelDestinationsByRating = async () => {
  const sortedDestination = await Destination.find({}).sort({rating : -1})
  return sortedDestination
}
const updateTravelDestination = async (destinationID, updateData) => {
  const foundDestination = await Destination.findOneAndUpdate({_id : destinationID}, updateData, {new : true})
  return foundDestination
}
const deleteTravelDestination = async (destinationID) => {
  const deletedDestination = await Destination.findOneAndDelete({_id : destinationID})
  return "Sucessfully Deleted"
}
const filterDestinationsByRating = async (rating) => {
  const filteredDestination = await Destination.find({rating : {$gte : rating}})
  return filteredDestination
}
const addReview = async (destinationID, userReview) => {
  const updatedDestination = await Destination.findOneAndUpdate({_id : destinationID}, {$push : {reviews : userReview}}, {new : true})
  return updatedDestination
}
const getReviews = async (destinationId) => {
  const allDestinations = await Destination.findOne({_id : destinationId})
  return allDestinations.reviews
}
module.exports = {createTravelDestination, readTravelDestination, readAllTravelDestinations, readTravelDestinationsByCity, readTravelDestinationsByRating, updateTravelDestination, deleteTravelDestination, filterDestinationsByRating, addReview, getReviews}