import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB()
connectCloudinary();
 
const app = express()
app.use(cors()) //Enable Cross-Origin Resource Sharing


// Clerk Middleware
app.use(express.json())

// Try to load Clerk middleware dynamically. If @clerk/express is missing or broken
// fall back to a noop middleware so the server can run in development.
let _clerkMiddleware = (req, res, next) => next();
try {
	const clerkModule = await import('@clerk/express');
	if (clerkModule && typeof clerkModule.clerkMiddleware === 'function') {
		// clerkMiddleware may be a factory that returns the middleware
		_clerkMiddleware = clerkModule.clerkMiddleware();
	}
} catch (err) {
	// Log a clear warning but keep the server running
	console.warn('Warning: could not load @clerk/express middleware. Continuing without Clerk auth.', err && err.message ? err.message : err);
}

app.use(_clerkMiddleware)


// API to listen to Clerk Webhook
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res)=> res.send("API is working"))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)); 