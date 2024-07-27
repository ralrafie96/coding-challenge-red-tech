import { Box, Button, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import AxiosClient from '../../utils/axiosClient';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid';
import { ClearOrder, GetOrder, MakeOrder } from '../../redux/actions/order';
import { useSelector } from 'react-redux'
import { Order } from '../../models/order';

export const CreateOrder = () => {

    const navigate = useNavigate()
    let id = v4()

    const OrderTypeLst = [
        'PurchaseOrder',
        'Standard',
        'ReturnOrder',
        'SaleOrder',
        'TransferOrder'
    ]

    const [createdBy, setCreatedBy] = useState<string>('')
    const [customer, setCustomer] = useState<string>('')
    const [orderType, setOrderType] = useState<string>('')
    const [errMsg, setErrMsg] = useState<string>('')

    
    const reduxOrder: any = useSelector((state: any) => state.order)

    useEffect(() => {
        GetOrder()
        setCustomer(reduxOrder?.customerName)
        setCreatedBy(reduxOrder?.createdByUserName)
        setOrderType(reduxOrder?.orderType)
    }, [GetOrder])

    const handleSubmit = async () => {
        let errFld: string[] = []
        if (!orderType) {
            errFld = [...errFld, "Order Type"]
        } else {
            errFld = errFld.filter(item => item !== "Order Type")
        }
        if (!customer) {
            errFld = [...errFld, "Customer"]
        } else {
            errFld = errFld.filter(item => item !== "Customer")
        }
        if (!createdBy) {
            errFld = [...errFld, "Created By"]
        } else {
            errFld = errFld.filter(item => item !== "Created By")
        }

        if (errFld.length !== 0) {
            setErrMsg(`The following fields have errors: ${errFld.join(', ')}`)
            return
        }
        let date = new Date()
        let dateString = `${date.getDay()}, ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`
        try {
            await AxiosClient.post('https://red-candidate-web.azurewebsites.net/api/Orders', {
                "orderId": id,
                "orderType": orderType,
                "customerName": customer,
                "createdDate": dateString,
                "createdByUserName": createdBy
            })
            ClearOrder()
            navigate('/dashboard')
        } catch (e) {
            setErrMsg(`The following error occurred: ${e}`)
        }
    }

    const handleSave = () => {
        let date = new Date()
        let dateString = `${date.getDay()}, ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`
        MakeOrder({
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
                <Box className="create-order-errors">
                    <Typography>{errMsg}</Typography>
                </Box>
                <Box className="create-order-btns">
                    <Button style={{ color: 'white', background: 'blue' }} className="create-order-btn" onClick={handleSave}>Save Order</Button>
                </Box>
                <Box className="create-order-btns">
                    <Button variant='outlined' className="create-order-btn" onClick={() => navigate('/dashboard')}>Cancel</Button>
                    <Button style={{ color: 'white', background: 'blue' }} className="create-order-btn" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Paper>
        </Box>
    )
}
