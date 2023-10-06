// name: The name of the travel destination.
// location: The location of the travel destination, including the city and country.
// description: A brief description or information about the travel destination.
// rating: The rating of the travel destination, represented as a number.
// reviews: An array of user reviews for the travel destination. Each review should include the following fields:
// user: The ID of the user who wrote the review. You can reference the User model.
// text: The text content of the review.

const mongoose = require('mongoose')
const destinationScema = new mongoose.Schema({
  name : {type : String, required : true},
  location : {
    destination : {type : String, required : true},
    city : {type : String, required : true},
    country : {type : String, required : true}
  },
  description : {type : String, required : true},
  rating : {type : Number, min : 0, max : 5, default : 0},
  reviews : [{
    user : {type : String, required : true},
    text : {type : String, required : true}
  }]
},{timestamps : true})
const Destination = mongoose.model('Destination', destinationScema)
module.exports = Destination