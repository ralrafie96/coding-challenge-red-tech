
import { Navigate, Routes, Route } from 'react-router-dom'
import { NotFound } from '../../pages/notFound/notFound'
import { Dashboard } from '../../pages/dashboard/dashboard'
import { CreateOrder } from '../../pages/createOrder/createOrder'

export const RtRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createOrder" element={<CreateOrder />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    )
}