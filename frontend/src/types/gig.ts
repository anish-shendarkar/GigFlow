export interface Gig {
    _id: string
    title: string
    description: string
    budget: number
    ownerId: string
    status: "open" | "assigned"
}
