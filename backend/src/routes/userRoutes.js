import express from "express";
import {
    getOpenGigs,
    createGig,
    placeBid,
    getBidsForGig,
    hireFreelancer
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/gigs", authMiddleware, getOpenGigs);
router.post("/gigs", authMiddleware, createGig);
router.post("/bids/:gigId", authMiddleware, placeBid);
router.get("/bids/:gigId", authMiddleware, getBidsForGig);
router.patch("/bids/:bidId/hire", authMiddleware, hireFreelancer);

export default router;
