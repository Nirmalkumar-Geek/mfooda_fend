import React, { useEffect, Suspense } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Spinner from "../Payment/Spinner";


const Restaurant = React.lazy(() => import('../../components/Content/Restaurants'))
const Menu = React.lazy(() => import('../../components/Content/Menu'))
const Cart = React.lazy(() => import('../../components/Cart/Cart'))
const NotFound = React.lazy(() => import('../../components/404/404'))
const MNavBar = React.lazy(() => import('../../components/Nav/NavBar'))
const Profile = React.lazy(() => import('../../components/Profile/Profile'))
const Order = React.lazy(() => import('../../components/Order/Order'))
const CheckOut = React.lazy(() => import('../../components/CheckOut/CheckOut'))
const OrderSuccess = React.lazy(() => import('../../components/Order/OrderSuccess'))
const Loader = React.lazy(() => import('../../components/Payment/Loader'))
const OrderTracker = React.lazy(() => import('../../components/Order/TrackOrder'))
const Search = React.lazy(() => import('../../components/Search/Search'))

const DefaultLayout = () => {

    const isAuthenticated = useSelector(state => state.rootReducer.session.isAuthenticated);
    const accessToken = useSelector(state => state.rootReducer.session.accessToken);
    useEffect(() => {

        console.log("DefaultLayout did mount")

        return () => {

            console.log("DefaultLayout did un mount")

        }

    })

    return (
        <div>
            <Suspense fallback={<Spinner />}>
                {isAuthenticated && <MNavBar />}
                <Routes>
                    <Route exact path='/' name="Restaurants Page" element={<PrivateRoute element={Restaurant} />} />
                    <Route path="/restaurants/:restaurant_id" element={<PrivateRoute element={Menu} />} />
                    <Route path="/order-info/:order_id" element={<PrivateRoute element={OrderTracker} />} />
                    <Route path="/cart" element={<PrivateRoute element={Cart} />} />
                    <Route path="/profile" element={<PrivateRoute element={Profile} />} />
                    <Route path="/checkout" element={<PrivateRoute element={CheckOut} />} />
                    <Route path="/orders" element={<PrivateRoute element={Order} />} />
                    <Route path="/search" element={<PrivateRoute element={Search} />} />

                    <Route path="/payment-success" element={<OrderSuccess />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default DefaultLayout;
