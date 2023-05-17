import React from "react"
import { Outlet } from "react-router-dom"
import facebookicon from "../assets/Facebook.svg"
import instagramicon from "../assets/Instagram.svg"
import linkedinicon from "../assets/Linkedin.svg"






export default function Layout() {




    return (<div class="coding inverse-toggle h-screen px-5 pt-4 text-gray-100 text-sm font-mono subpixel-antialiased 
    bg-transparent  pb-6  leading-normal ">
        <div class="top mb-2 flex">
            <div class="h-5 w-5 bg-red-500 rounded-full hover:scale-110 hover:rotate-12 hover:shadow-xl hover:shadow-red-600 transform duration-200"><a href="https://www.facebook.com/you.ker.39"><img className="w-2/5 mx-auto pt-1" src={facebookicon} alt=""/></a></div>
            <div class="ml-2 h-5 w-5 bg-orange-300 rounded-full hover:scale-110 hover:rotate-12 hover:shadow-xl hover:shadow-yellow-600 transform duration-200"><a href="https://www.instagram.com/you.___.ker/"><img className="w-3/5 mx-auto pt-1" src={instagramicon} alt=""/></a></div>
            <div class="ml-2 h-5 w-5 bg-green-500 rounded-full hover:scale-110 hover:rotate-12 hover:shadow-xl hover:shadow-green-600 transform duration-200"><a href="https://www.linkedin.com/in/youssef-elmofaker-191992267/"><img className="w-3/5 mx-auto pt-1" src={linkedinicon} alt=""/></a></div>
        </div>
        <div class="mt-4 flex flex-col gap-10 relative">
            <p className='text-4xl'>Welcome to <span className="bg-slate-300 text-gray-800 px-2">ShellFolio</span> <span className="text-xs text-gray-500 font-thin">made with ❤️ by youssef elmofaker</span></p>
            <Outlet/>
        </div>
    </div>)
}