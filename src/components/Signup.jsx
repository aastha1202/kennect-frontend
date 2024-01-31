import {  useState } from "react";
import Modal from "../layout/Modal"
import axios from 'axios'
import Login from "./Login";
// eslint-disable-next-line react/prop-types
const Signup=({isOpen})=>{
    const [isLoginOpen , setLoginOpen]= useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function  handleSignupSubmit(e){
        e.preventDefault()
         await axios.post('https://kennect-backend.onrender.com/user/register',{
                userName: username,
                password:password
            }).then((res)=> {
                console.log(res.data)
                setLoginOpen(true)
            }).catch((e)=> console.log(e))
    }
    return(
        <>
            <Modal isOpenModal={isOpen}>
                <form onSubmit={handleSignupSubmit}>
              <div className="flex flex-col gap-4 mt-[2em]">
                    <input placeholder="Create UserName" className="p-2 text-black" type="text " onChange={(e)=>setUsername(e.target.value) }></input>
                    <input placeholder="Create Password" className="p-2 text-black" type="password" onChange={(e)=>setPassword(e.target.value)}></input>
                    <button type="submit" className="bg-white text-[rgb(34,91,88)] w-max p-2 rounded-lg "> Sign Up</button>
                </div>
                </form>
            </Modal>
            <Login isOpen={isLoginOpen}></Login>

        </>
    )
}

export default Signup