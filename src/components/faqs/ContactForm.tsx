"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { sendMessage } from "@/actions/sendMessage";
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
    console.log(values);
    setLoading(true);
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      // toast("Empty Fields!")
      return false;
    }
    // toast("success")

    const message = await sendMessage(
      values.name,
      values.email,
      values.message
    );
    if (message === true) {
      setLoading(false);
      toast.success("Message sent");
    }
    if (message.error) {
      setLoading(false);
      toast.error(message.error);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="w-full  mx-auto my-8 flex justify-start items-center">
      <div className="w-full md:w-1/2">
        <h3 className="text-3xl text-lbgreen font-semibold my-12">
          Contact us
        </h3>
        <p className="text-lbtextdark text-lg mb-4">
          If you have further queries please contact us
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl text-lbtextdark"
        >
          <input
            onChange={handleChange}
            required
            value={values.name}
            name="name"
            type="text"
            placeholder="Full Name *"
            className="p-2 rounded-lg my-4 text-lg border-1 border-gray-400 placeholder-gray-400"
          />
          <input
            onChange={handleChange}
            required
            value={values.email}
            name="email"
            type="email"
            placeholder="Email *"
            className="p-2 rounded-lg my-4 text-lg border-1 border-gray-400 placeholder-gray-400"
          />
          <textarea
            onChange={handleChange}
            required
            value={values.message}
            name="message"
            rows={4}
            placeholder="Message *"
            className="p-2 rounded-lg my-4 text-lg border-1 border-gray-400 placeholder-gray-400 "
          />
          <button
            disabled={loading}
            className="px-4 py-2 bg-lbgreen hover:bg-blue-700 transition-colors min-w-48 text-white rounded-lg disabled:cursor-not-allowed self-start"
          >
            {loading ? (
               "Sending..."
            ) : (
              "Send message"
            )}
          </button>
        </form>
      </div>

      <Image
        unoptimized={true}
        quality={100}
        alt="contact"
        src="/images/home/Bird.svg"
        className=" w-2/8 h-full ml-32 mt-16 object-cover"
        width={500}
        height={500}
      />
    </div>
  );
}
