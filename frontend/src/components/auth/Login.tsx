import axios from "axios";
import { useContext, useState } from "react";
import AppContext from "../../AppContext";
import { ErrorMsg } from "../others";

const Login = () => {
  const { setUser } = useContext(AppContext)
  const [errorMsg,setErrorMsg] = useState<string>('')

  //@ts-ignore
  const onFormSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements?.email?.value
    const password = event.target.elements?.password?.value

    axios.post(`${import.meta.env.VITE_API_URL}/u/login-password`,{
      email,
      password, 
    },{withCredentials:true})
      .then(({status , data})=>{
        console.log(status,data)
        
        if(data?.user?._id){
          setUser(data.user)
        }else{
          setErrorMsg(data.msg)
        }
      })
      .catch((err)=>{
        const { response } = err
        const { status } = response
        if(status === 400){
          setErrorMsg('Wrong Input')
        } else if(status === 404){
          setErrorMsg('User doesn`t exist. Please Register')
        } else if(status === 405){
          setErrorMsg('Password authentication not available. Try another.')
        } else if(status === 406){
          setErrorMsg('Email Password doesn`t match')
        } else if(status === 500){
          setErrorMsg('Some error occured')
        } else {
          setErrorMsg("Some error occured")
        }
        console.error("While login",err)
      })
  }

  return (
    <form className="auth-form" onSubmit={onFormSubmit}>
      {
        errorMsg.length > 0 && <ErrorMsg setErrorMsg={setErrorMsg} errorMsg={errorMsg}/>
      }
      <div className="mb-6">
        <label htmlFor="email" className="">Your email</label>
        <input
          required
          id="email"
          type="email"
          name='email'
          minLength={1}
          maxLength={30}
          className="" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="">Your password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          minLength={5}
          maxLength={50}
          className="" />
      </div>
      <button
        type='submit'
        className="form-button w-full">
        Login
      </button>
    </form>

  )
}

export default Login