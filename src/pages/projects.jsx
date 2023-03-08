import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/projectCard";
import { projects } from "../projects/projects";




export default function Projects(){
    const nav = useNavigate(); 

    useEffect(()=>{
        window.addEventListener("keydown",(e)=>{
            if (e.keyCode == "27") {
                nav("/");
            }
        })


    })
    return (<>
    <p>click <span className="bg-red-400 animate-pulse p-1" onClick={()=>nav("/")}>esc</span> to exit</p>
    
    
    <div className="flex flex-wrap">
        {
            projects.map(e=><ProjectCard 
        github_link={e.link}
        name = {e.name}
        description={e.description}
        picture={e.img}
        />)
        }
        
    
    
    
    </div>
        
    </>)
}