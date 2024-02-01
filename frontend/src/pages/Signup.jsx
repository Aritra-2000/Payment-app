import { useState } from 'react'
import { Inputbox } from '../components/Inputbox'
import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subheading'
import { Button } from '../components/Button'
import { Bottom } from '../components/Bottom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className="flex flex-col justify-center">
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"} />
          <Subheading sub={"Enter your credentials to create an account"} />
          <Inputbox label={"First Name"} placeholder={"John"} onChange={(e) => setFirstName(e.target.value)} />
          <Inputbox label={"Last Name"} placeholder={"Doe"} onChange={(e) => setLastName(e.target.value)} />
          <Inputbox label={"Email"} placeholder={"aritra@gmail.com"} onChange={(e) => setUserName(e.target.value)} />
          <Inputbox label={"Password"} placeholder={"123456"} onChange={(e) => setPassword(e.target.value)} />
          <div className="pt-4">
            <Button onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                userName,
                firstName,
                lastName,
                password
              });
              localStorage.setItem("token", response.data.token)
              navigate("/signin")
            }} label={"Sign up"} />
          </div>
          <Bottom query={"Already have an account?"} text={"sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}