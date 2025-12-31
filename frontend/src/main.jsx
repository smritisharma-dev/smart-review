import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReviewManagerNav from './component/ReviewManagerNav';
import ShowReview from './component/ShowReview';

import{BrowserRouter , Routes, Route} from "react-router-dom"
import Login from './component/Login';

import AdminNav from './component/AdminNav';
import AdminLayout from './component/AdminLayout';
import DashboardOver from './component/DashboardOver';

import Analytics from './component/Analytics';
import GoogleBusiness from './component/GoogleBusiness';
import Approval from './component/Approval';

createRoot(document.getElementById('root')).render(
  
   <BrowserRouter>
  <ReviewManagerNav />
  <div className="container mt-4">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/reviewPage" element={<App />} />
      <Route path="/showreview" element={<ShowReview />} />
      <Route path="/adminlogin" element={<Login />} />

      {/* for admin routes */}
      <Route path ={'/adminmanager'} element={<AdminLayout/>}>

<Route index element={<DashboardOver/>}/>
{/* Explicit dashboard route */}
<Route path="dashboard" element={<DashboardOver />} />
<Route path="google-business" element={<GoogleBusiness/>} />
<Route path="approval" element={<Approval/>} />
<Route path="analytics" element={<Analytics/>} />

      </Route>
    </Routes>
  </div>
</BrowserRouter>

)
