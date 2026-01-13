import type { User } from "./auth"
export interface Bid {
    _id: string
    gigId: string
    freelancerId: User
    price: number
    message: string
    status: "pending" | "hired" | "rejected"
}
