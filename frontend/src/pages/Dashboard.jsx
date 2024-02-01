import React from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'

export const Dashboard = () => {

  return (
    <div>
        <Appbar name={"user"}/>
        <div className="m-8">
            <Balance balance={"4440"}/>
            <Users/>
        </div>
    </div>
  )
}