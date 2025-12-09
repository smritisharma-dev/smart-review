

const mongoose = require('mongoose')



const Dbconnection=async()=> {
  try{

await mongoose.connect('mongodb://127.0.0.1:27017/adminReview')

console.log("data base connected")
  }
catch(error)
{ console.log(`data base not connected please check the connection ${error}`)


}
}
module.exports= Dbconnection