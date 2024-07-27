import { Box } from "@mui/material"
import { OrderTable } from "../../components/orderTable/orderTable"


export const Dashboard = () => {
    return (
        <Box className="dashboard-container" >
            <OrderTable />
        </Box>
    )
}