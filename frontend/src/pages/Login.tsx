import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import { AuthContext } from "../context/AuthContext"
import PageWrapper from "../components/PageWrapper"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    // Login component
    const submit = async () => {
        try {
            setError("")
            const res = await api.post("/auth/login", { email, password })
            login(res.data.token)
            setTimeout(() => navigate("/gigs", {replace: true}), 100)
        } catch (err: any) {
            setError(err.response?.data?.message )
        }
    }

    return (
        <PageWrapper>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <input
                className="input"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                className="input mt-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => e.key === "Enter" && submit()}
            />
            <button className="btn-primary mt-4" onClick={submit}>
                Login
            </button>
            <p className="text-sm text-center mt-4">
                No account?{" "}
                <Link to="/register" className="text-blue-600">
                    Register
                </Link>
            </p>
        </PageWrapper>
    )
}