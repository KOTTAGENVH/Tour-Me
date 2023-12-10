
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Addsouvenir from './components/addSouvenir';
import ViewSouvenir from './components/viewSouvenir';
import SouvenirList from './components/souvenirList';
import Edititem from './components/souvenirEdit';
import Addcart from './components/addCart';
import ViewCart from './components/CartView';
import Thanks from './components/thankyouPurchase';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import {  useSelector } from 'react-redux';
import Destination from './pages/TourSpotDBRETALL';
import Seller from './pages/SellerDuvidu';
import Hotel from './pages/Hotel';
import Travel from  './pages/TravelBimsara';
import Usertypes from './pages/Usertypes';
import AddTourspot from './pages/Addtourspot';
import Onetourspot from './pages/OneTourSpotView';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './pages/tourspotCheckout';
import AdminDashboard from './pages/AdminDashboard';
import Userdashboard from './pages/Userdashboard';
import Onlydestcomp from './pages/TourSpotRetDBone';
import ViewSouvenier from './components/viewSouvenir'
import Destdashboard from './pages/DestDashboard';
import Home from "./pages/Home";
import Footer from './components/Footer';


function App() {
  const user = useSelector((state) => state.user);
  return (


    <div className="App">
           <BrowserRouter>
           <ScrollToTop/>
           <Header/>
           <Routes>
   
           {!user && (
            <>
  
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Signin" element={<Signin/>} />
      
      </>
           )}
           
 {user && (
  <>

<Route path="/usertypes" element={<Usertypes />} />
<Route path="/userdash" element={<Userdashboard />} />
   
 </>
 )}

{user && user.isDest && (
                        <>

      <Route path="/onlydestcomp" element={<Onlydestcomp />} />
      <Route path="/addest" element={<AddTourspot />} />
      <Route path="/destdash" element={<Destdashboard />} />
                        </>
)}

{user && user.isHotel && (
                        <>
      <Route path="/hot" element={<Hotel />} />
                        </>
)}
{user && user.isTravel && (
                        <>
      <Route path="/trav" element={<Travel />} />
                        </>
)}

{user && user.isSeller && (
  <>
      <Route path="/sel" element={<Seller />} />
  
    
  </>
)}

{user && user.isAdmin && (
                        <>
   <Route path="/admindashboard" element={<AdminDashboard />} />
                        </>
)}
<Route path="/viewtourspot/:id" element={<Onetourspot />} />
<Route path="/dest" element={<Destination />} />
<Route path="/tourspotcart/:id" element={<Checkout/>}/>
<Route path="/viewSouvenier" element={<ViewSouvenier/>}/>
<Route path="/" element={<Home />} />

      </Routes>
      <br/>   <br/>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
