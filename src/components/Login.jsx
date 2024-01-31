import { useContext, useState } from "react";
import Modal from "../layout/Modal"
import axios from 'axios'
import { ModalContext } from "../ModalContext";
// eslint-disable-next-line react/prop-types
const Login=({isOpen})=>{
    const {  setModal } = useContext(ModalContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function  handleSignupSubmit(e){
        e.preventDefault()
        try {
            const response = await axios.post("https://kennect-backend.onrender.com/user/login", {
                userName: username,
                password: password,
            });

            const token = response.data.token;
            const userId = response.data.userId;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            setModal(false);
        } catch (error) {
            console.log(error);
        }
    }
    return isOpen && (
        <>
            <Modal isOpenModal={isOpen}>
                <form onSubmit={handleSignupSubmit}>
              <div className="flex flex-col gap-4 mt-[2em]">
              <input placeholder="Create UserName" className="p-2 text-black" type="text " onChange={(e)=>setUsername(e.target.value) }></input>
              <input placeholder="Create Password" className="p-2 text-black" type="password" onChange={(e)=>setPassword(e.target.value)}></input>
              <button type="submit" className="bg-white text-[rgb(34,91,88)] w-max p-2 rounded-lg " > Login</button>
                </div>
                </form>
            </Modal>
        </>
    )
}

export default Login