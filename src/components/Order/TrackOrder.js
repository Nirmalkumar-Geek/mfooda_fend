import React,{useEffect,useState} from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCol, CContainer, CRow } from '@coreui/react';
import './TrackOrder.css'
import axios from 'axios';
import Spinner from '../Payment/Spinner'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

const OrderTracker = () => {

    const [orderInfo,setOrderInfo] = useState({})
    const [loader,setLoader] = useState(true)
    const [error,setError] = useState(false)
    const user_id = useSelector(state => state.rootReducer.profile.user_id);

    const { order_id } = useParams();

    useEffect(()=>{

        const getOrderInfo = async () =>{

            try{
                const payload = { "customer_id": user_id, "order_id": order_id }
                const order_info = await axios.post('https://api.selfmade.city/api/orders/order-info', payload)

                if (order_info.data && order_info.data.status === 'success') {

                    setOrderInfo(order_info.data.data)

                }
            }catch(error){
                console.log(error)
                setError(true)
            }
            setLoader(false)

        }

        getOrderInfo()
        

    },[])

    return (
        <div>
            {console.log(orderInfo)}
            {
                loader ? (
                    <Spinner />
                ) :(
                        !error ? (
                            <CContainer className='mt-5'>

                                <CRow className='mt-5 justify-content-center'>
                                    <CCol className='col-md-8 col-12 mt-5'>
                                        <CCard>
                                            <CCardHeader>
                                                {
                                                    (()=>{
                                                        switch (orderInfo.order_status){
                                                            case "created":
                                                                return (<CButton disabled style={{ display: 'flex', alignItems: 'center' }}>
                                                                    Created
                                                                </CButton>)
                                                            case "accepted":
                                                                return (<CButton disabled style={{ display: 'flex', alignItems: 'center' }}>
                                                                    accepted
                                                                </CButton>)
                                                            case "outfordeliver":
                                                                return (<CButton disabled style={{ display: 'flex', alignItems: 'center' }}>
                                                                    outfordeliver
                                                                </CButton>)
                                                            case 'delivered':
                                                                return ((<CButton color="success" disabled style={{ display: 'flex', alignItems: 'center' }}>
                                                                    Delivered
                                                                </CButton>))
                                                        }
                                                    })()
                                                }
                                            </CCardHeader>
                                            <CCardBody>
                                                <CCardText id='order-id'>#{orderInfo.order_id} | {orderInfo.created_at}</CCardText>
                                                <CCardText id='restaurant-name'>{orderInfo.restaurant_name}</CCardText>
                                                <div id='order-menu' className='mt-2'>Order Menu</div>
                                                {
                                                    orderInfo.line_items.map((item,key)=>{

                                                        return(
                                                            <div id='order-item-1' key={key}>
                                                                <CRow className='mt-1'>
                                                                    <CCol className='col-6'>{item.name}</CCol>
                                                                    <CCol className='col-6'>RM{item.price ? item.price : "NULL"}</CCol>
                                                                </CRow>
                                                            </div>
                                                        )

                                                    })
                                                }
                                                <div id='order-group-2'>
                                                    <CRow className='mt-1'>
                                                        <CCol className='col-6'>Total</CCol>
                                                        <CCol className='col-6'>RM{orderInfo.total_amount_paid}</CCol>
                                                    </CRow>
                                                </div>
                                            </CCardBody>
                                        </CCard>

                                    </CCol>

                                </CRow>
                            </CContainer>
                        ) : (

                            <CContainer className='mt-5'>
                                <CRow className='mt-5'> 
                                    <CCol className='mt-5 text-center'>
                                        <h1>We Will back you shortly</h1>
                                    </CCol>
                                </CRow>
                            </CContainer>

                        )
                )
            }
        </div>
    )

}

export default OrderTracker;