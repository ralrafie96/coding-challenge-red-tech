import { Box, Button, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import AxiosClient from '../../utils/axiosClient';
import React, { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid';

export const CreateOrder = () => {

    const navigate = useNavigate()

    const OrderTypeLst = [
        'PurchaseOrder',
        'Standard',
        'ReturnOrder',
        'SaleOrder',
        'TransferOrder'
    ]

    const [createdBy, setCreatedBy] = useState('')
    const [customer, setCustomer] = useState('')
    const [orderType, setOrderType] = useState('')

    const handleSubmit = async () => {
        let id = v4()
        console.log(id)
        console.log([createdBy, customer, orderType])
        let date = new Date()
        let dateString = `${date.getDay()}, ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`
        const results = await AxiosClient.post('https://red-candidate-web.azurewebsites.net/api/Orders', {
            "orderId": id,
            "orderType": orderType,
            "customerName": customer,
            "createdDate": dateString,
            "createdByUserName": createdBy
        })
        navigate('/dashboard')
    }

    return (
        <Box className="create-order-container">
            <Paper className="create-order-card">
                <h2>Create Order</h2>
                <Box className="create-order-field-container">
                    <h3>Created By</h3>
                    <TextField value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} className="create-order-field" size="small" placeholder='John Doe' />
                </Box>
                <Box className="create-order-field-container">
                    <h3>Customer</h3>
                    <TextField value={customer} onChange={(e) => setCustomer(e.target.value)} className="create-order-field" size="small" placeholder='Mary Smith' />
                </Box>
                <Box className="create-order-field-container">
                    <h3>Order Type</h3>
                    <Select
                        className='create-order-field'
                        defaultValue=''
                        size='small'
                        value={orderType}
                        label="Order Type"
                        onChange={(e) => setOrderType(e.target.value)}
                    >
                        <MenuItem key={`${null}-${-1}`} value={''}>None</MenuItem>
                        {OrderTypeLst.filter((value, index, self) => self.indexOf(value) === index).map((value, index) =>
                            <MenuItem key={`${value}-${index}`} value={value}>{value}</MenuItem>
                        )}
                    </Select>
                </Box>
                <Box className="create-order-btns">
                    <Button variant='outlined' className="create-order-btn" onClick={() => navigate('/dashboard')}>Cancel</Button>
                    <Button style={{ color: 'white', background: 'blue' }} className="create-order-btn" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Paper>
        </Box>
    )
}
