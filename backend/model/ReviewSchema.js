

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

rating :{type:Number,required:true, min: 1, max: 5},


heading:{type:String , required:true,trim:true},

message:{type:String , required:true,trim:true},
emailid :{type:String , required:true,trim:true},
name:{type:String},


status:{type:String , 
    
    enum: ["pending", "approved", "rejected"],
    
    
    default:"pending"},
    // When user submitted review
  approvedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: { createdAt: 'submittedAt', updatedAt: 'modifiedAt' },

 


});

  
 



const ReviewMdl =  mongoose.model( "ReviewMdl", reviewSchema)

module.exports= ReviewMdl