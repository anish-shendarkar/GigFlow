import { useState } from "react"
import api from "../api/axios"

interface PlaceBidProps {
    gigId: string
}

export default function PlaceBid({ gigId }: PlaceBidProps) {
    const [price, setPrice] = useState<number>(0)
    const [message, setMessage] = useState("")

    const submit = async () => {
        await api.post(`/bids/${gigId}`, { price, message })
        window.location.reload()
    }

    return (
        <div className="card mt-6">
            <h3 className="font-semibold mb-2">Place a Bid</h3>

            <input className="input" type="number" placeholder="Price" onChange={e => setPrice(+e.target.value)} />
            <textarea className="input mt-2" placeholder="Message" onChange={e => setMessage(e.target.value)} />

            <button className="btn-primary mt-3" onClick={submit}>
                Submit Bid
            </button>
        </div>
    )
}
