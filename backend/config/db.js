

const mongoose = require('mongoose')




const Dbconnection=async()=> {
  try{


await mongoose.connect(process.env.MONGO_URI)


console.log("data base connected")
  }
catch(error)
{ console.log(`data base not connected please check the connection ${error}`)


}
}
module.exports= Dbconnection