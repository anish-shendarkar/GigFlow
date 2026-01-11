import userSchema from "../models/User.js";
import bidSchema from "../models/Bid.js";
import gigSchema from "../models/Gig.js";
import mongoose from "mongoose";

export const getOpenGigs = async (req, res) => {
    try {
        const gigs = await gigSchema.find({ status: "open" });
        res.json(gigs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const createGig = async (req, res) => {
    try {
        const { title, description, budget } = req.body;
        const gig = await gigSchema.create({
            title,
            description,
            budget,
            ownerId: req.user._id
        });
        res.status(201).json({ message: "Gig created" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const placeBid = async (req, res) => {
    try {
        const { gigId } = req.params;
        const { price, message } = req.body;
        const bid = new bidSchema({
            gigId,
            freelancerId: req.user._id,
            price,
            message
        });
        await bid.save();
        res.status(201).json({ message: "Bid placed" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getBidsForGig = async (req, res) => {
    try {
        const { gigId } = req.params;
        const gig = await gigSchema.findById(gigId);
        if (req.user._id.toString() !== gig.ownerId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const bids = await bidSchema
            .find({ gigId })
            .populate("freelancerId", "name email");
        res.json(bids);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const hireFreelancer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { bidId } = req.params;

        const bid = await bidSchema.findById(bidId)
            .populate("gigId")
            .session(session);

        if (!bid) {
            throw new Error("Bid not found");
        }

        if (bid.gigId.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (bid.gigId.status !== "open") {
            throw new Error("Gig is not open for hiring");
        }

        await gigSchema.updateOne(
            { _id: bid.gigId._id, status: "open" },
            { status: "assigned" },
            { session }
        )

        await bidSchema.updateOne(
            { _id: bidId },
            { status: "hired" },
            { session }
        );

        await bidSchema.updateMany(
            { gigId: bid.gigId._id, _id: { $ne: bidId } },
            { status: "rejected" },
            { session }
        )

        await session.commitTransaction();
        session.endSession();

        res.json({ message: "Freelancer hired successfully" });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: err.message });
    }
}
