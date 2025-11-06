import User from "../models/User.js";

// Middleware to check if user is authenticated.
// Defensively handle cases where an authentication middleware
// (e.g. @clerk/express) isn't loaded and `req.auth` may be undefined.
export const protect = async (req, res, next) => {
    try {
        const userId = req && req.auth ? req.auth.userId : null;

        if (!userId) {
            return res.status(401).json({ success: false, message: "not authenticated" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "user not found" });
        }

        req.user = user;
        return next();
    } catch (error) {
        // Return a 500 with the error message so the client sees a helpful response
        return res.status(500).json({ success: false, message: error.message });
    }
};
