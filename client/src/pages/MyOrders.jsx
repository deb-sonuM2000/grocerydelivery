import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { currency, axios, user } = useAppContext()

    const fetchMyOrders = async () => {
        try {
            setLoading(true)
            setError(null)
            const { data } = await axios.get('/api/order/user', {
                params: { userId: user._id } // Send userId as query parameter
            })
            if (data.success) {
                setMyOrders(data.orders || []) // Ensure it's always an array
            }
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || "Failed to fetch orders")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user?._id) {
            fetchMyOrders()
        }
    }, [user])

    if (loading) {
        return (
            <div className='mt-16 pb-16 flex justify-center'>
                <p>Loading your orders...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className='mt-16 pb-16 flex flex-col items-center'>
                <p className='text-red-500 mb-4'>{error}</p>
                <button 
                    onClick={fetchMyOrders}
                    className='bg-primary text-white px-4 py-2 rounded'
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            
            {myOrders.length === 0 ? (
                <div className='text-center py-10'>
                    <p className='text-gray-500'>You haven't placed any orders yet.</p>
                </div>
            ) : (
                myOrders.map((order, index) => (
                    <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                        <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                            <span>OrderId : {order._id}</span>
                            <span>Payment: {order.paymentType}</span>
                            <span>Total Amount: {currency}{order.amount}</span>
                        </p>
                        {order.items.map((item, index) => (
                            <div key={index}
                                className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 && "border-b"
                                    }border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4
                                    py-5 md:gap-16 w-full max-w-4xl`}>

                                <div className='flex items-center mb-4 md:mb-0'>
                                    <div className='bg-primary/10 p-4 rounded-lg'>
                                        <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                                    </div>
                                    <div className='ml-4'>
                                        <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                        <p>Category: {item.product.category}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                                    <p>Quantity: {item.quantity || "1"}</p>
                                    <p>Status: {order.status}</p>
                                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className='text-primary text-lg font-medium'>
                                    Amount : {currency}{item.product.offerPrice * (item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    )
}

export default MyOrders