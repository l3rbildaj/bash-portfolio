import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { send } from "@emailjs/browser";




export default function Contact(){
    const [side , setSide] = useState(1);
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const contentRef = useRef(null)
    const nav = useNavigate(); 

    const handleHoverEnter=(e)=>{
        if (nameRef.current.value === "" || emailRef.current.value === "" || contentRef.current.value === "") {
            
            e.target.className += (side === 1)?"ml-50 mr-0":"mr-50 ml-0"
            setSide(side*-1)
            e.target.disabled = true;
            return;
        }
        e.target.disabled = false;
   
    }


    const handleSubmit=()=>{
        send("service_dm7woe4","template_vueyfhn",{
            message: contentRef.current.value,
            to_name:"youssef elmofaker",
            from_name:nameRef.current.value,

        },"sS9GoFHUl-5Jh3fti").then(message=>{console.log(message);nav("/")}).catch(err=>console.log(err=>console.log(err)))
    }



    useEffect(()=>{
        window.addEventListener("keydown",(e)=>{
            if (e.keyCode == "27") {
                nav("/");
            }
        })


    })





    return (<>
    <p>click <span className="bg-red-400 animate-pulse p-1" onClick={()=>nav("/")}>esc</span> to exit</p>
    <div class="container px-6 mx-auto">

    
    <section class="mb-32 text-center ">
      <div class="max-w-[700px] mx-auto px-3 lg:px-6">
        <h2 class="text-3xl font-bold mb-12 text-slate-100 font-inconsolata">Drop Me A Message {";)"}</h2>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div class="form-group mb-6">
            <input ref={nameRef} type="text" class="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-white
              bg-transparent
              border-2 border-dashed border-gray-300
              transition
              duration-300
              ease-in-out
              m-0
              focus:shadow-lg focus:scale-105 focus:shadow-white focus:outline-none" id="exampleInput7"
              placeholder="Name" autoComplete="off"/>
          </div>
          <div class="form-group mb-6">
            <input ref={emailRef} type="email" class="form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-white
              bg-transparent
              border-2 border-dashed border-gray-300
              transition
              duration-300
              ease-in-out
              m-0
              focus:shadow-lg focus:scale-105 focus:shadow-white focus:outline-none" id="exampleInput8"
              placeholder="Email address" autoComplete="off"/>
          </div>
          <div class="form-group mb-6">
            <textarea ref={contentRef} class="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-white
              bg-transparent
              border-2 border-dashed border-gray-300
              transition
              duration-300
              ease-in-out
              m-0
              focus:shadow-lg focus:scale-105 focus:shadow-white focus:outline-none
            " id="exampleFormControlTextarea13" rows="3" placeholder="Message"></textarea>
          </div>
          <div className="w-full flex ">
          <button type="submit" class="
            w-1/4
            mx-auto
            px-6
            py-2.5
            bg-white
            text-gray-800
            border-2 border-solid border-white
            font-medium
            text-xs
            leading-tight
            uppercase
            shadow-md
            transform transition duration-300 ease-in-out
            hover:bg-transparent hover:shadow-md hover:shadow-white hover:text-white  
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            " onMouseEnter={handleHoverEnter} onClick={handleSubmit} >Send</button></div>
     </form> </div>
    </section>
    
    
  </div></>)
}