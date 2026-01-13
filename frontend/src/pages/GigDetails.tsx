import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import api from "../api/axios"
import type { Gig } from "../types/gig"
import PlaceBid from "../components/PlaceBid"
import BidList from "../components/BidList"
import { AuthContext } from "../context/AuthContext"

export default function GigDetails() {
    const { gigId } = useParams()
    const [gig, setGig] = useState<Gig | null>(null)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get(`/gigs/${gigId}`).then(res => setGig(res.data))
    }, [gigId])

    if (!gig) return null

    const isOwner = user?._id === gig.ownerId

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold">{gig.title}</h2>
            <p className="mt-2 text-gray-600">{gig.description}</p>
            <p className="mt-2 font-medium">₹{gig.budget}</p>

            {!isOwner && gig.status === "open" && (
                <PlaceBid gigId={gig._id} />
            )}

            {isOwner && <BidList gigId={gig._id} />}
        </div>
    )
}
