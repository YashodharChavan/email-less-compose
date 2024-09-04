import './App.css'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() { 

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
      console.log(data);
   
      const response = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
   
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
   
      const jsondata = await response.json();
      console.log(jsondata);
   
      toast.info(
        <div className="custom-toast flex items-center bg-[#444] text-[#fff] p-[10px] rounded relative">
          <span>{jsondata.message}</span>
          <button className="toast-close-button p-[5px] absolute top-[5px] right-[10px] border-none text-[#fff] cursor-pointer text-[20px]" onClick={() => toast.dismiss()}>✖</button>
        </div>,
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
          style: { backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff' }
        }
      );
    
  };
  


  return (
    <>
      <form action="" className='flex gap-y-2 flex-col w-[300px] sm:w-[420px]' onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className='h-8 p-1' {...register("to", {required: true})} placeholder='Enter the recipient'/>
        <br />
        <input type="text" className='h-8 p-1' {...register("subject", {required: true})}  placeholder='Enter the subject'/>
        <br />
        <textarea type="text" {...register("text", {required: true})} className={'h-40 p-1 flex flex-start items-start'} placeholder='Enter the message'/>
        <br />
        <input type="submit" className='bg-blue-500 rounded cursor-pointer' value={"Send"}/>
      </form>
      <ToastContainer/>
    </>
  )
}

export default App
