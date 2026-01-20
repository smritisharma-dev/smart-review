
import axios from 'axios'

const ApiUrl = "https://smart-review-backend.onrender.com/google"





export const searchBusiness = async(query)=>{
try{
const res = await axios.get(`${ApiUrl}/searchlist`,{params:{query}})




return res.data?.data || []
}

catch(error){

  console.log("Deatils Api fail to fetch data", error.message)  
  return []
}
}




export const findBusinessDetails = async(placeId)=>{
try{
const res = await axios.get(`${ApiUrl}/findbusiness`,{

params:{placeId}


})
return res.data.data
}

catch(error){

    console.log("api endpoint is not working",error.message)
}
}

