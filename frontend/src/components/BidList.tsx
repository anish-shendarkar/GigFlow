import { useEffect, useState } from "react"
import api from "../api/axios"
import type { Bid } from "../types/bid"
import { useParams } from "react-router"

export default function BidList() {
    const { gigId } = useParams()
    const [bids, setBids] = useState<Bid[]>([])

    useEffect(() => {
        api.get(`/bids/${gigId}`).then(res => setBids(res.data))
    }, [gigId])

    const hire = async (bidId: string) => {
        await api.patch(`/bids/${bidId}/hire`)
        window.location.reload()
    }

    return (
        <div className="mt-6 space-y-3">
            {bids.map(bid => (
                <div key={bid._id} className="card">
                    <p className="font-medium">{bid.freelancerId.name}</p>
                    <p>₹{bid.price}</p>
                    <p className="text-gray-600">{bid.message}</p>

                    {bid.status === "pending" && (
                        <button
                            className="btn-primary mt-2"
                            onClick={() => hire(bid._id)}
                        >
                            Hire
                        </button>
                    )}

                    <p className="text-sm mt-1">Status: {bid.status}</p>
                </div>
            ))}
        </div>
    )
}
