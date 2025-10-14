import React from "react";
import Title from "../components/Title";

const Mybooking = () =>{
    return (
     <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>

        <Title title='My Bookings' subTitle='Easily your past, current, and upcoming hotel reservations in place. 
        plan your trips seamlessly with just a few clicks' align='left'/>

        <div>
            <div>
                <div className="w-1/3">Hotels</div>
                <div className="w-1/3">Date & Timings</div>
                <div className="w-1/3">payment</div>
            </div>
        </div>


     </div>
    )
}

export default Mybooking