import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("API is working!");
});

export default router; // ✅ This ensures `controllers` is a valid middleware function
