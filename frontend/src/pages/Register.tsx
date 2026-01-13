import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import PageWrapper from "../components/PageWrapper"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const submit = async () => {
        await api.post("/auth/register", { name, email, password })
        navigate("/")
    }

    return (
        <PageWrapper>
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

            <input className="input" placeholder="Name" onChange={e => setName(e.target.value)} />
            <input className="input mt-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="input mt-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

            <button className="btn-primary mt-4" onClick={submit}>
                Create Account
            </button>

            <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600">
                    Login
                </Link>
            </p>
        </PageWrapper>
    )
}
