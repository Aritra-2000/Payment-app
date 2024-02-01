import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subheading'
import { Inputbox } from '../components/Inputbox'
import { Button } from '../components/Button'
import { Bottom } from '../components/Bottom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Signin = () => {
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg text-center bg-white h-max w-80 p-2 px-4'>
          <Heading label={"Sign In"} />
          <Subheading sub={"Enter your credentials to access your account"} />
          <Inputbox label={"Email"} placeholder={"aritra@gmail.com"} onChange={(e)=>setUserName(e.target.value)}/>
          <Inputbox label={"Password"} placeholder={"123456"} onChange={(e)=>setPassword(e.target.value)}/>
          <div className="pt-4">
            <Button label={"Sign in"} onClick={async ()=> {
               const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                userName,
                password
               }) 
               localStorage.setItem("token", response.data.token);
               navigate("/dashboard")
            }}/>
          </div>
          <Bottom query={"Don't have an account?"} text={"Sign up"} to={'/signup'}/>
        </div>
      </div>
    </div>
  )
}
