import { useContext } from "react";
import { ModalContext } from '../ModalContext';
import {MdOutlineClose} from 'react-icons/md'
// eslint-disable-next-line react/prop-types
const Modal = ({children}) => {
  const { isOpenModal, setModal } = useContext(ModalContext);
  return (
    isOpenModal && (
      <div className="fixed inset-0 w-[100%] h-[100%]  bg-slate-500 bg-opacity-5 backdrop-blur-sm ">
        <div className=" w-[50%] h-auto mx-auto z-0 my-[12em] bg-[rgb(34,91,88)] p-4 relative text-white ">
          {children}
          <button className="absolute top-3 z-[10] right-5 bg-transparent border-0 cursor-pointer" onClick={() => setModal(false)}>
           <MdOutlineClose size={30} className=" z-[10] bg-white text-[rgb(34,91,88)]  "/>
          </button>
        </div>
      </div>
    )
  );
};
export default Modal;
