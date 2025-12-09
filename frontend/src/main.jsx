import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReviewManagerNav from './component/ReviewManagerNav';
import ShowReview from './component/ShowReview';

import{BrowserRouter , Routes, Route} from "react-router-dom"
import Login from './component/Login';
createRoot(document.getElementById('root')).render(
  
   <BrowserRouter>
  <ReviewManagerNav />
  <div className="container mt-4">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/reviewPage" element={<App />} />
      <Route path="/showreview" element={<ShowReview />} />
      <Route path="/adminlogin" element={<Login />} />
    </Routes>
  </div>
</BrowserRouter>

)
