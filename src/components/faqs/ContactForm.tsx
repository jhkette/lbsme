"use client"

import React,{useState} from 'react'
import Image from 'next/image';
import { Loader } from "lucide-react"

export default function ContactForm() {
     const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
        //     toast.warning("Empty Fields!")
        //     return false;
        // }

        // setLoading(true);
        // axios.post("/api/mail", {
        //     name: values.name,
        //     email: values.email,
        //     message: values.message,
        // }).then((res) => {
        //     if (res.status === 200) {
        //         setValues({ name: "", email: "", message: "" });
        //         setLoading(false);
        //         setSuccess(true);
        //         toast.success(res.data.message)
        //     } else {
        //         setLoading(false);
        //         toast.error(res.data.message)
        //     }
        // }).catch((err) => {
        //     setLoading(false);
        //     toast.error(err.message)
        // });
    };

    const handleChange = (e: | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setValues((prevInput) => ({
            ...prevInput,
            [e.target.name]: e.target.value,
        }));
    };
  return (
    
       <div className="w-full  mx-auto my-8 flex justify-start items-center">
        <div className="w-full md:w-1/2">
                    <h3 className="text-3xl text-lbgreen font-semibold my-12">Contact us</h3>
                    <p className="text-lbtextgrey text-lg mb-4">If you have further queries please contact us</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl text-lbtextgrey">
                        <input onChange={handleChange} required value={values.name} name="name" type="text" placeholder='Full Name *' className="p-2 rounded-lg my-4 text-lg border-1 border-gray-400 placeholder-gray-400" />
                        <input onChange={handleChange} required value={values.email} name="email" type="email" placeholder='Email *' className="p-2 rounded-lg my-4 text-lg border-1 border-gray-400 placeholder-gray-400"  />
                        <textarea onChange={handleChange} required value={values.message} name="message" rows={4} placeholder='Message *' className="p-2 rounded-lg my-4 text-lg border-1 border-gray-400 placeholder-gray-400 " />
                        <button disabled={loading} className="px-4 py-2 bg-lbgreen hover:bg-blue-700 transition-colors text-white rounded-lg disabled:cursor-not-allowed self-start">
                           
                         {loading ?  <Loader className="size-8  absolute top-82 text-lbgreen animate-spin" /> : "Send message"} 
                        </button>
                    </form>
                </div>
                
                <Image unoptimized={true} quality={100} alt="contact" src="/images/home/Bird.svg" className=" w-2/8 h-full ml-32 object-cover" width={500} height={500} />
                
            </div>
  )
}
