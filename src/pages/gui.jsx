import React from "react";
import Contact from "../components/contact";
import Introduction from "../components/intorduction";
import Navbar from "../components/navbar";




export default function Gui(props) {




    return (

        <>
            <div className="w-full p-5 items-center 
             justify-center">

                <Navbar />

            </div>
            <Introduction />
            this is the gui interface
            <Contact/>
        </>
    )
}