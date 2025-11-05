import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import Mybooking from "./pages/Mybooking";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/Hotelowner/Layout";
import Dashboard from "./pages/Hotelowner/Dashboard";
import AddRoom from "./pages/Hotelowner/Addroom";
import ListRoom from "./pages/hotelowner/ListRoom";
import {Toaster} from "react-hot-toast"
import { useAppContext } from "./context/AppContext";


const App = () => {

const isOwnerPath = useLocation().pathname.includes("owner");
const {showHotelReg} = useAppContext();

  return (
    <div>
      <Toaster />
  {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
     <div className='min-h-[70vh]'>
 
      <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/rooms' element= {<AllRooms/>} />
          <Route path='/rooms/:id' element= {<RoomDetails/>} />
          <Route path='/my-bookings' element= {<Mybooking/>} />
          <Route path='/owner' element={<Layout/>}>
                  <Route index element={<Dashboard/>} />
                  <Route path="add-room" element={<AddRoom/>} />
                  <Route path="list-room" element={<ListRoom/>} />



          </Route>  
          

          
      </Routes>

     </div>
     <Footer />
    </div>
  )
}

export default App;
