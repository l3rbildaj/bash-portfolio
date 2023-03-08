import React from "react";




export default function ProjectCard({name, picture, description, github_link}) {
    
    




    return(
        <>
        
        <div className="relative transform transition duration-500 hover:shadow-2xl hover:shadow-white hover:scale-95 hover:border-solid border-dashed border-white border-2 w-screen md:w-1/3 p-3">
            <div className="flex justify-center items-center h-full m-auto">

            <img className="mx-auto m-4" src={picture} alt="" />
            </div>
            <div className="opacity-0 p-5  absolute gap-1 flex-col items-center justify-center  transform transition duration-100 hover:opacity-100  hover:flex hover:bg-gray-800 hover:bg-opacity-80 inset-0 w-full h-full">
                <h1 className="text-xl">#{name}</h1>
                <p className="text-xs font-extralight lg:text-base" >{description}</p>
                <a className="hover:bg-transparent mx-auto hover:text-white bg-slate-100 text-gray-800" href={github_link}>GITHUB-Link</a>
            </div>
        </div>
        
        
        
        
        
        
        
        
        </>
    )
}