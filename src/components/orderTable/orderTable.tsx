import { Box, Button, Checkbox, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AxiosClient from '../../utils/axiosClient';
import SearchIcon from '@mui/icons-material/Search';

interface Order {
    orderId: string;
    createdDate: string;
    createdByUserName: string;
    orderType: string;
    customerName: string;
}

export const OrderTable = () => {

    const [rows, setRows] = useState<Order[]>([])
    const [filteredRows, setFilteredRows] = useState<Order[]>([])
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [ordersSelected, setOrdersSelected] = useState<Order[]>([])
    const [orderType, setOrderType] = useState<string>('')

    const handleAllOrdersSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!!e.target.checked) {
            setOrdersSelected(rows)
        } else {
            setOrdersSelected([])
        }
    }

    const handleOrderSelected = (e: React.ChangeEvent<HTMLInputElement>, item: Order) => {
        if (!e.target.checked) {
            setOrdersSelected(ordersSelected.filter(row => row.orderId !== item.orderId))
        } else {
            setOrdersSelected([...ordersSelected, item])
        }
    }

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOrderTypeChange = (e: SelectChangeEvent<string>) => {
        setOrderType(e.target.value)
    }

    useEffect(() => {
        const apiCall = async () => {
            const results = await AxiosClient.get('https://red-candidate-web.azurewebsites.net/api/Orders')
            setRows(results.data)
        }

        apiCall()
    }, [])

    useEffect(() => {
        setFilteredRows(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
    }, [rows, page, rowsPerPage])

    return (
        <TableContainer component={Paper}>
            <Box>
                <TextField />
                <Button><SearchIcon /></Button>
                <InputLabel>Order Type</InputLabel>
                <Select
                    value={orderType}
                    label="Order Type"
                    onChange={handleOrderTypeChange}
                >
                    <MenuItem key={`${null}-${-1}`} value={''}>None</MenuItem>
                    {rows.map(item => item.orderType).filter((value, index, self) => self.indexOf(value) === index).map((value, index) =>
                        <MenuItem key={`${value}-${index}`} value={value}>{value}</MenuItem>
                    )}
                </Select>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Checkbox checked={ordersSelected.length == rows.length} onChange={(e) => handleAllOrdersSelected(e)} /></TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell align="right">Creation Date</TableCell>
                        <TableCell align="right">Created By</TableCell>
                        <TableCell align="right">Order Type</TableCell>
                        <TableCell align="right">Customer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRows.map((row) => (
                        <TableRow
                            key={row.orderId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell><Checkbox checked={ordersSelected.indexOf(row) != -1} onChange={(e) => handleOrderSelected(e, row)} /></TableCell>
                            <TableCell component="th" scope="row">{row.orderId}</TableCell>
                            <TableCell align="right">{row.createdDate.toString()}</TableCell>
                            <TableCell align="right">{row.createdByUserName}</TableCell>
                            <TableCell align="right">{row.orderType}</TableCell>
                            <TableCell align="right">{row.customerName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
