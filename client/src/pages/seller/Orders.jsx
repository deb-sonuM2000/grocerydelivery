import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {
  const { currency, axios } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const {data} = await axios.get('/api/order/seller')
      if(data.success){
        setOrders(data.orders)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className='no-scrollbar flex-1 min-h-[95vh] overflow-y-auto bg-gray-50'>
      <div className="md:p-8 p-4 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders List</h2>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row gap-6 justify-between p-6 w-full rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Info */}
              <div className="flex gap-4 flex-1 min-w-0">
                <img 
                  className="w-14 h-14 object-contain rounded-md border border-gray-200 p-1" 
                  src={assets.box_icon} 
                  alt="boxIcon" 
                />
                <div className="space-y-2 truncate">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="font-medium text-gray-800">
                        {item.product.name}
                        <span className="text-primary ml-1">x {item.quantity}</span>
                      </p>
                      <p className="text-sm text-gray-500">{item.product.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="text-sm text-gray-600 space-y-1 flex-1 min-w-0">
                <p className='font-semibold text-gray-800'>{order.address.firstName} {order.address.lastName}</p>
                <p className="truncate">{order.address.street}, {order.address.city}</p>
                <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                <p className="text-blue-600 hover:text-blue-800">{order.address.phone}</p>
              </div>

              {/* Price */}
              <div className="flex items-center">
                <p className="font-bold text-lg text-gray-900 whitespace-nowrap">
                  {currency}{order.amount.toFixed(2)}
                </p>
              </div>

              {/* Order Meta */}
              <div className="flex flex-col text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Method:</span> {order.paymentType}</p>
                <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-1 font-semibold ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders