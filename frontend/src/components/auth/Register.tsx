import axios from "axios";
import { useContext, useState } from "react";
import AppContext from "../../AppContext";
import { ErrorMsg } from "../others";

const Register = () => {

  const [errorMsg, setErrorMsg] = useState<string>('')
  const { setUser } = useContext(AppContext)
  //@ts-ignore
  const onFormSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements?.name?.value
    const email = event.target.elements?.email?.value
    const password = event.target.elements?.password?.value
    const user_type = event.target.elements?.user_type?.value

    console.log(name, email, password, user_type)
    axios.post(`${import.meta.env.VITE_API_URL}/u/register`,{
      name,
      email,
      password, 
      user_type,
    },{withCredentials:true})
      .then(({status , data})=>{
        console.log(status,data)
        
        if(data?.user?._id){
          setUser(data.user._id)
        }else{
          setErrorMsg(data.msg)
        }
      })
      .catch((err)=>{
        const { response } = err
        const { status } = response
        if(status === 409){
          setErrorMsg('User Already exist. Please login')
        }else if(status === 400){
          setErrorMsg('Incorrect input')
        }else if(status === 500){
          setErrorMsg('Some error occured')
        }else{
          setErrorMsg('Some error occured')
        }
        console.error("While Register",err)
      })
  }

  return (
    <form onSubmit={onFormSubmit}>
      {
        errorMsg.length > 0 && <ErrorMsg setErrorMsg={setErrorMsg} errorMsg={errorMsg}/>
      }
      <div className="mb-6">
        <label htmlFor="name" className="">Your name</label>
        <input
          required
          id="name"
          type="text"
          name='name'
          minLength={1}
          maxLength={30}
          className="form-input" />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="">Your email</label>
        <input
          required
          id="email"
          type="email"
          name='email'
          minLength={1}
          maxLength={50}
          className="form-input" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="">Your password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          minLength={5}
          maxLength={20}
          className="form-input" />
      </div>
      <div className="mb-6">
        <label htmlFor="user_type" className="">Choose user type</label>
        <select
          id="user_type"
          name="user_type"
          className="form-select">
          <option className='w-full p-2' value={'manufacturer'} selected>Manufacturer</option>
          <option className='' value="transporter">Transporter</option>
        </select>
      </div>
      <button
        type='submit'
        className="form-button">
        Register
      </button>
    </form>
  )
}

export default Register