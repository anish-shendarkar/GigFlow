import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function CreateGig() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [budget, setBudget] = useState("")
    const navigate = useNavigate()

    const submit = async () => {
        await api.post("/gigs", { title, description, budget })
        navigate("/gigs")
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Gig</h2>

            <input className="input" placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <textarea className="input mt-3" placeholder="Description" onChange={e => setDescription(e.target.value)} />
            <input className="input mt-3" type="number" placeholder="Budget" onChange={e => setBudget(e.target.value)} />

            <button className="btn-primary mt-4" onClick={submit}>
                Create
            </button>
        </div>
    )
}
