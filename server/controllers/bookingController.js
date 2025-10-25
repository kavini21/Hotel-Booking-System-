import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


// Function to Check Availablity of Room 
const checkAvailability = async ({ checkInDate, checkOutDate, room})=> {
    try{
        const bookings = await Booking.find({
            room,
            checkInData: {$lte: checkOutDate},
            checkOutData: {$gte: checkOutDate},

        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch(error){
        console.error(error.message);
    }
}

//API to check availability of room
// post /api/booking/check-availiability
export const checkAvailabilityAPI = async (req, res) =>{
    try {
        const { room, checkInData, checkOutData } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutData, room});
        res.json({ success: true, isAvailable})
    } catch (error) {
        res.json({ success: false, message: error.message }) 
    }
}

//API TO create a new booking 
// POST / api/bookings/book

export const createBooking = async (req, res) => {
    try {
        const{ room, checkInData, checkOutData, guests } = req.body;
        const user = req.user._id;

        // Befor Booking Check Availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutData, 
            room
        });

        if(!isAvailable){
            return res.json({success: false, message: "Room is not available"})
        }
        // Get totalprice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // calculate totalprice based on nights
        const checkIn = new Data(checkInData)
        const checkOut = new Data(checkOutData)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInData,
            checkOutData,
            totalPrice

        })

        res.join({ success: true, message: "Booking created successfully"})

    } catch (error) { 
        console.log(error);
        res.join({ success: false, message: "failed to create booking"})

    }
};
 // API to get all booking for a user
 // GET/api/ booking/user
 export const getUserBookings = async (req, res) =>{
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").Sort({createdAt: -1})
        res.join({success: true, bookings})
    } catch (error){
        res.json({success: false, message: "Failed to fetch bookings"});
        
    }
 }

 export const getHotelBookings = async (req, res) =>{
    try {
        const hotel = await Hotel.findOne({owner: req.auth.userId});
    if(!hotel){
        return res.json({ success: false, message: "No Hotel found"});
    }
    const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").Sort({ createdAt: -1});
    // Total Bookings
    const totalBookings = bookings.length;
      // Total Revenue
      const totalRevenue = bookings.reduce((acc, booking)=>acc + booking.totalPrice, 0)

      res.json({success: true, dashboarData: {totalBookings, totalRevenue, bookings}})


    } catch (error) {
        res.json({success: false, message: "Failed to fetch bookings"})
    }
 }
