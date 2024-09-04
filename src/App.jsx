import './App.css'
import { useForm } from "react-hook-form";
function App() { 

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async data => {
    
    console.log(data)
    fetch("http://localhost:3000/send", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.text())
    .then((res) => console.log("the response is "+res))
  }


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
    </>
  )
}

export default App
