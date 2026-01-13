export default function PageWrapper({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
                {children}
            </div>
        </div>
    )
}
