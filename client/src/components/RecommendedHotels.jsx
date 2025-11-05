 import React, { useState, useEffect, useCallback } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const RecommendedHotels = () => {

    const { rooms, searchedCities } = useAppContext();
    const [recommended, setRecommended] = useState([]);

    // normalize string for comparison (case-insensitive, trimmed)
    const normalize = (s) => (String(s || "").trim().toLowerCase());

    const filterHotels = useCallback(() => {
        const list = Array.isArray(rooms) ? rooms : [];
        const cities = Array.isArray(searchedCities) ? searchedCities : [];

        // If there are no recent searched cities, show a sensible fallback: top rooms
        if (cities.length === 0) {
            setRecommended(list.slice(0, 4));
            return;
        }

        const normalizedCities = cities.map(normalize);

        const filtered = list.filter((room) => {
            const city = normalize(room?.hotel?.city);
            return normalizedCities.includes(city);
        });
        

        setRecommended(filtered);
    }, [rooms, searchedCities]);

    useEffect(() => {
        filterHotels();
    }, [filterHotels]);

   
    return recommended.length > 0 &&(
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

            <Title title='recommended Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.'/>

           

            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                    {recommended.slice(0,4).map((room, index) => (
                        <HotelCard key={room._id} room={room} index={index} />
                    ))}
            </div>
            
        </div>
    );
};

export default RecommendedHotels;