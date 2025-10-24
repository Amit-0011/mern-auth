// import React from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Navbar = () => {

//   const navigate = useNavigate()
//   const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContext)

//   const sendVerificationOtp = async ()=>{
//     try {
//       axios.defaults.withCredentials = true;

//       const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

//       if (data.success) {
//         navigate('/email-verify')
//         toast.success(data.message)
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const logout = async ()=>{
//     try {
//       axios.defaults.withCredentials = true
//       const {data} = await axios.post(backendUrl + '/api/auth/logout')
//       data.success && setIsLoggedin(false)
//       data.success && setUserData(false)
//       navigate('/')
      
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   return (
//     <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
//       <img src={assets.logo} alt="" className='w-28 sm:w-32' />
//       {userData ? 
//       <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
//         {userData.name[0].toUpperCase()}
//         <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
//           <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
//             {
//             !userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>
//             }
            
//             <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
//           </ul>
//         </div>
//       </div>
//       : <button onClick={()=>navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer transition-all'>Login <img src={assets.arrow_icon} alt="" /> </button>
//       }
//     </div>
//   )
// }

// export default Navbar






// added 
import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext)

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      if (data.success) {
        setIsLoggedin(false)
        setUserData(false)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="" className='w-28 sm:w-32' />
      {userData ? (
        <div className="relative">
          {/* Mobile profile button with click toggle */}
          <div
            className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer sm:hidden"
            onClick={() => setShowMobileMenu(prev => !prev)}
          >
            {userData.name[0].toUpperCase()}
          </div>
          {showMobileMenu && (
            <div className="sm:hidden absolute top-full right-0 mt-2 z-20 bg-gray-100 text-black rounded shadow-lg">
              <ul className="py-2 px-4 text-sm whitespace-nowrap">
                {!userData.isAccountVerified && (
                  <li
                    onClick={() => { sendVerificationOtp(); setShowMobileMenu(false); }}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Verify Email
                  </li>
                )}
                <li
                  onClick={() => { logout(); setShowMobileMenu(false); }}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}

          {/* Desktop profile button with hover dropdown */}
          <div className="hidden sm:flex justify-center items-center rounded-full bg-black text-white cursor-pointer group relative w-8 h-8">
            {userData.name[0].toUpperCase()}
            <div className="hidden group-hover:block absolute top-full right-0 mt-2 z-10 bg-gray-100 text-black rounded shadow-lg">
              <ul className="py-2 px-4 text-sm whitespace-nowrap">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Verify Email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer transition-all'
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  )
}

export default Navbar

