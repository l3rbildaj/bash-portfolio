import React from "react";
import ecom  from "../assets/e-com.png";




export default function ProjectCard({name, picture, description, github_link}) {
    
    console.log(ecom)




    return(
        <>
        
        <div className="relative transform transition duration-500 hover:shadow-2xl hover:scale-95 hover:border-solid border-dashed border-white border-2 w-screen md:w-1/3 p-3">
            <img className="mx-auto m-4" src={"/src/assets/"+picture} alt="" />
            <div className="opacity-0 absolute gap-5 flex-col items-center  transform transition duration-100 hover:opacity-100  hover:flex hover:bg-gray-800 hover:bg-opacity-80 inset-0 w-full h-full">
                <h1 className="text-xl">#{name}</h1>
                <p className="text-xs lg:text-base" >{description}</p>
                <a className="hover:bg-transparent mx-auto hover:text-white bg-slate-100 text-gray-800" href={github_link}>GITHUB-Link</a>
            </div>
        </div>
        
        
        
        
        
        
        
        
        </>
    )
}