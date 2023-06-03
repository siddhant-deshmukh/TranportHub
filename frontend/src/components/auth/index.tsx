import { useState } from 'react'
import Login from './Login'
import Register from './Register'

const Auth = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('register')


  return (
    <div>
      <div className='mx-auto max-w-xl border-2 p-7 shadow-lg rounded-xl mt-5'>
        {
          authType === 'login' && <Login />
        }
        {
          authType === 'register' && <Register />
        }
      </div>
      <div className='text-center mt-5'>
        {
          authType === 'login' && <div>
            Not registered? <button onClick={() => { setAuthType('register') }} className='mx-1 text-blue-400 underline font-bold'>Register</button>
          </div>
        }
        {
          authType === 'register' && <div>
            Already registered? <button onClick={() => { setAuthType('login') }} className='mx-1 text-blue-400 underline font-bold'>Login</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Auth