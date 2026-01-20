import './App.css'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const [review, setReview] = useState({
    heading: "",
    emailid: "",
    message: "",
    name:""
  })

  const [error, setError] = useState({
    rating: "",
    heading: "",
    message: "",
    emailid: "",
    name:""
  })

  const [success, setSuccess] = useState("")

  const handler = (e) => {
    const { name, value } = e.target

    setReview(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear previous errors & success
    setError({ rating: "", heading: "", message: "", emailid: "" ,name:""})
    setSuccess("")
  }

  const onSumbit = (e) => {
    e.preventDefault();

    let flag = true

    // Rating validation
    if(review.name.trim()===""){
      setError(pre=> ({ ...pre,name:"name should be character"}))   
    flag= false
    return 
    }
    if (rating === 0) {
      setError(prev => ({
        ...prev,
        rating: "rating can not be empty"
      }))
      flag = false
      return
    }

    // Email validation
    const emailRejex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRejex.test(review.emailid) || review.emailid === "") {
      setError(prev => ({
        ...prev,
        emailid: "Please enter valid emailid"
      }))
      flag = false
      return
    }

    // Heading validation
    if (review.heading.trim() === "") {
      setError(prev => ({
        ...prev,
        heading: "please mentioned one word comment"
      }))
      flag = false
      return
    }

    // Message validation
    if (review.message.trim() === "") {
      setError(prev => ({
        ...prev,
        message: "please write some comment"
      }))
      flag = false
      return
    }

    if (!flag) return

    

    // Log values for now
    console.log("Rating:", rating)
    console.log("Review Heading:", review.heading)
    console.log("Review Message:", review.message)
    console.log("emailid:", review.emailid)
    console.log("name:", review.name)

    



  axios.post('https://smart-review-backend.onrender.com/preview',{
    rating,
    heading: review.heading,
    name: review.name,
 
  emailid: review.emailid,
   message: review.message


  })
  
.then((res)=>{res.data
console.log(res.data)

// Success message
    setSuccess("Your Review is submitted successfully")
    setTimeout(() => {
      setSuccess("")
    }, 3000)
 // Reset form
    setReview({ heading: "", emailid: "", message: "" ,name:""})
    setRating(0)
    setHover(0)

})

.catch((error)=>console.log(`data is not posting${error.message}`))

}
return (
    <>
      <div className='container d-flex justify-content-center my-5'>
        <div className='bg-light p-4 review-box' style={{ maxWidth: '600px', width: '100%' }}>

          <h2 className='text-center text-primary mb-4'>Write a Review</h2>
          

          <h4 className='text-center mb-3'>Select Rating</h4>
          <div className='text-center mb-4'>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                className='btn'
                key={num}
                onClick={() =>{ 
                  setRating(num)

                  setError(pre =>({...pre ,rating:""}))
                }}
              
                onMouseEnter={() => setHover(num)}
                onMouseLeave={() => setHover(0)}
              >
                <span
                  className='star'
                  style={{
                    color: (hover || rating) >= num ? 'gold' : 'grey',
                    fontSize: '24px'
                  }}
                >
                  &#9733;
                </span>
              </button>
            ))}
            {error.rating && <span className='text-danger'>{error.rating}</span>}
          </div>

          <h4 className='text-center text-primary'>Review Title</h4>
          <div className='d-flex justify-content-center my-3'>
            <input
              type='text'
              name='heading'
              value={review.heading}
              onChange={handler}
              className='form-control'
              placeholder='Write one word review'
              style={{ maxWidth: '400px' }}
            />
          </div>
          {error.heading && <span className='text-danger'>{error.heading}</span>}
<div className='d-flex justify-content-center my-3'>
            <input
              type="text"
              name='name'
              value={review.name}
              onChange={handler}
              className='form-control'
              placeholder='Enter your ,name'
              style={{ maxWidth: '400px' }}
            />
            {error.name && <span className='text-danger'>{error.name}</span>}
          </div>
          <div className='d-flex justify-content-center my-3'>
            <input
              type="email"
              name='emailid'
              value={review.emailid}
              onChange={handler}
              className='form-control'
              placeholder='Enter your emailId'
              style={{ maxWidth: '400px' }}
            />
            {error.emailid && <span className='text-danger'>{error.emailid}</span>}
          </div>

          <div className='d-flex justify-content-center'>
            <textarea
              className='form-control mt-3'
              rows='4'
              placeholder='Write your comment'
              style={{ maxWidth: '400px' }}
              name='message'
              value={review.message}
              onChange={handler}
            ></textarea>
          </div>
          {error.message && <span className='text-danger'>{error.message}</span>}

          <div className='text-center mt-4'>
            <button
              type='submit'
              onClick={onSumbit}
              className='btnsubmit border btn btn-primary btn-medium'
            >
              Submit Review
            </button>

            {success && (
              <div className='text-success text-center mt-3'>
                {success}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
