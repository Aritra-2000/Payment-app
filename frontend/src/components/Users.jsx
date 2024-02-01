import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "./Button";


export function Users() {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(res => {
                setUsers(res.data.user)
            })
    }, [filter])


    return <div>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div>
            <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search Users......" className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div className="mt-2">
            {users.map((user, index) => <User key={index} user={user} />)}
        </div>
    </div>
}



function User({ user }) {

    const navigate = useNavigate()

    return <div className="flex justify-between">
        <div className="flex">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-2 mr-2">
                <div className="flex flex-col text-md justify-center">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName)
            }} label={"Send Money"} />
        </div>
    </div>
}