import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SiTicktick } from "react-icons/si";
import { useSelector } from "react-redux";
import { CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CCardHeader } from '@coreui/react'
import { TiTick } from "react-icons/ti";
import { Link } from 'react-router-dom';

const Order = () => {


    const profile = useSelector((state) => state.rootReducer.profile);
    const [orders, setOrders] = useState({})

    useState(() => {

        const getOrders = async () => {

            console.log(profile.user_id)
            const result = await axios.get("https://api.selfmade.city/api/orders/" + profile.user_id)

            console.log(result)

            if (result.data) {

                setOrders(result.data.data)

            }

        }

        getOrders()


    }, [])

    return (

        <CContainer className='mt-5'>
        {console.log(profile)}
            <CRow className='mt-5 justify-content-center'>
                {
                    Object.keys(orders).length !== 0 && Object.keys(orders).map((key)=>{

                        return (
                            <CCol className='col-md-8 col-12 mt-3 mb-2' key={key}>
                                <Link to={"/order-info/" + key} style={{ "textDecoration": "none" }}>
                                <CCard >
                                    {console.log(orders)}
                                    <CCardHeader style={{ textAlign: 'right' }}>
                                        <CCardText style={{ display: 'flex', alignItems: 'center' }}><SiTicktick color='green' style={{ marginRight: '5px' }} />Deliverd on {orders[key].created_at}</CCardText>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CCardTitle>{orders[key].restaurant_name}</CCardTitle>
                                        <CCardText> #{key} | {orders[key].created_at} </CCardText>
                                        {orders[key].line_items.map((item)=>{

                                            return(
                                                <CCardText key={item.item_id}>{item.name} x {item.quantity}</CCardText>
                                            )

                                        })}
                                    </CCardBody>
                                </CCard>
                                </Link>
                            </CCol>
                        )

                    })
                }
            </CRow>
        </CContainer>

    )


}

export default Order;