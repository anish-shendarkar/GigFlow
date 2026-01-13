import { useEffect, useState } from "react"
import api from "../api/axios"
import type { Gig } from "../types/gig"
import { Link } from "react-router-dom"

export default function GigList() {
    const [gigs, setGigs] = useState<Gig[]>([])

    useEffect(() => {
        api.get("/gigs").then(res => setGigs(res.data))
    }, [])

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Open Gigs</h2>
                <Link to="/create" className="btn-primary">
                    + Create Gig
                </Link>
            </div>

            <div className="space-y-4">
                {gigs.map(gig => (
                    <div key={gig._id} className="card">
                        <h3 className="font-semibold">{gig.title}</h3>
                        <p className="text-gray-600">{gig.description}</p>
                        <p className="mt-1 font-medium">₹{gig.budget}</p>

                        <Link
                            to={`/gigs/${gig._id}`}
                            className="text-blue-600 mt-2 inline-block"
                        >
                            View →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
