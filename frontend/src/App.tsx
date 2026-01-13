import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import GigList from "./pages/GigList"
import GigDetails from "./pages/GigDetails"
import CreateGig from "./pages/CreateGig"
import ProtectedRoute from "./components/ProtectedRoute"
import BidList from "./components/BidList"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/gigs" element={<ProtectedRoute><GigList /></ProtectedRoute>} />
        <Route path="/gigs/:gigId" element={<ProtectedRoute><GigDetails /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateGig /></ProtectedRoute>} />
        <Route path="/bids/:gigId" element={<ProtectedRoute><BidList /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
