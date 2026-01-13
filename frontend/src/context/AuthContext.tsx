import { createContext, useState } from "react"
import type { ReactNode } from "react"
import type { User } from "../types/auth"
import { jwtDecode } from "jwt-decode"

interface AuthContextType {
    user: User | null
    login: (token: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    )

    const login = (token: string) => {
        localStorage.setItem("token", token)

        // Decode token to get user ID
        const decoded: any = jwtDecode(token)

        // Create user object matching your User type
        const user: User = {
            _id: decoded._id,
            name: decoded.name,
            email: decoded.email,
        }

        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
    }

    const logout = () => {
        localStorage.clear()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}