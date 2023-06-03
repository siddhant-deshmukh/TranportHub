import React, { useContext, useState } from 'react'
import AppContext from '../AppContext'
import axios from 'axios'

const NavBar = () => {
  const { user, setUser } = useContext(AppContext)
  const [btnToggle, setToggle] = useState<boolean>(true)
  return (
    <div className='w-full min-h-fit px-10 items-center py-2 bg-blue-800 text-white flex justify-between'>
      <h1 className='text-2xl font-bold'>
        TransportHub
      </h1>
      <div className='w-fit'>
        {
          user && <div className='rounded-full'>
            <div className='absolute' hidden={!btnToggle}>

            </div>
          </div>
        }
        {
          !user && <div className='flex space-x-4'>
            <button>Login</button>
            <button>Register</button>
          </div>
        }
        {
          user && <div className='flex space-x-4'>
            <div className='relative'>
              <button
                className='rounded-full border bg-white p-1.5'
                onClick={() => { setToggle(prev => !prev) }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path className='fill-gray-200 stroke-gray-400' strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>

              </button>
              <div hidden={btnToggle} className="z-50 absolute border shadow-lg right-0 top-14 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg  dark:bg-gray-700 dark:divide-gray-600" >
                <div className="px-4 py-3 text-left">
                  <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                </div>
                <ul className="py-2">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <button
                      className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                      onClick={() => {
                        axios.get(`${import.meta.env.VITE_API_URL}/u/logout`,{withCredentials : true})
                          .then(({ data, status }) => {
                            console.log(status, data)
                            setUser(null)
                          })
                      }}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
            {/* <button
              onClick={() => {
                axios.get(`${import.meta.env.VITE_API_URL}/u/logout`)
                  .then(({ data, status }) => {
                    console.log(status, data)
                    setUser(null)
                  })
              }}>Logout</button> */}
          </div>
        }
      </div>
    </div>
  )
}

export default NavBar