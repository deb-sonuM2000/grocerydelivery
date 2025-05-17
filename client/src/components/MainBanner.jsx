import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative'>
      {/* Banner Images */}
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block h-auto' />
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden h-auto' />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 md:mb-8">
          Freshness You Can Trust, <br className="hidden md:block" />
          <span className="text-primary">Savings You'll Love!</span>
        </h1>
        
        {/* Buttons Container */}
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <Link 
            to={"/products"} 
            className='group flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull transition rounded text-white font-medium w-full sm:w-auto'
          >
            Shop Now
            <img className='transition group-hover:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
          </Link>

          <Link 
            to={"/products"} 
            className='group flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 transition rounded text-gray-800 font-medium w-full sm:w-auto'
          >
            Explore deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner