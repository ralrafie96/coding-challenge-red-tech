import { Box, Button, Checkbox, Input, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AxiosClient from '../../utils/axiosClient';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface Order {
    orderId: string;
    createdDate: string;
    createdByUserName: string;
    orderType: string;
    customerName: string;
}

export const OrderTable = () => {

    const navigate = useNavigate()

    const [rows, setRows] = useState<Order[]>([])
    const [filteredRows, setFilteredRows] = useState<Order[]>([])
    const [rowCount, setRowCount] = useState<number>(0)
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [ordersSelected, setOrdersSelected] = useState<Order[]>([])
    const [orderType, setOrderType] = useState<string>('')
    const [searchText, setSearchText] = useState<string>('')
    const [customerSearch, setCustomerSearch] = useState<string>('')

    const handleAllOrdersSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!!e.target.checked) {
            setOrdersSelected(filteredRows)
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
        setPage(0)
    }

    const handleCustomerChange = () => {
        console.log(searchText)
        setCustomerSearch(searchText)
        setPage(0)
    }

    const handleDelete = async () => {
        const deleteIds = ordersSelected.filter((item) => item.orderId).map((item) => item.orderId)
        const results = await AxiosClient.post('https://red-candidate-web.azurewebsites.net/api/Orders/Delete', deleteIds)
        setOrdersSelected([])
        setRows(rows.filter((item) => !deleteIds.includes(item.orderId)))
        setPage(0)
    }

    useEffect(() => {
        const apiCall = async () => {
            const results = await AxiosClient.get('https://red-candidate-web.azurewebsites.net/api/Orders')
            setRows(results.data)
        }

        apiCall()
    }, [])

    useEffect(() => {
        let filtRows: Order[] = rows.filter((row) => row.orderType === orderType || orderType === '').filter((row) => row.customerName === customerSearch || customerSearch === '')
        setFilteredRows(filtRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
        setRowCount(filtRows.length)
    }, [rows, orderType, customerSearch, page, rowsPerPage])

    return (
        <TableContainer component={Paper}>
            <Box className='filter-bar'>
                <Box className="customer-search-container">
                    <TextField className="customer-search-input-field" size='small' placeholder='Customer Search' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <Button style={{ background: 'blue' }} size='large' className='customer-search-bar-btn-sm' onClick={handleCustomerChange}><SearchIcon style={{ color: 'white' }} /></Button>
                </Box>
                <Button style={{ background: 'blue', color: 'white' }} size='large' className='customer-search-bar-btn' onClick={() => navigate('/createOrder')}><AddIcon style={{ color: 'white' }} /> Create Order</Button>
                <Button style={{ background: 'blue', color: 'white' }} size='large' className='customer-search-bar-btn' onClick={handleDelete}><DeleteIcon style={{ color: 'white' }} /> Delete Selected</Button>
                <Select
                    className='filter-bar-select'
                    placeholder='Order Type'
                    defaultValue=''
                    size='small'
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
            <Box className='order-table-container'>
                <Table className='order-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell><Checkbox checked={ordersSelected.length == filteredRows.length} onChange={(e) => handleAllOrdersSelected(e)} /></TableCell>
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
            </Box>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rowCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
