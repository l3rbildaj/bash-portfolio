import React from "react";

import { motion, useAnimation } from "framer-motion";
import { HashLink as Link } from "react-router-hash-link";



export default function Navbar() {
  const coverAnimation = useAnimation()
  const textAnimation = useAnimation()
  return (

    <nav className="w-full flex flex-row justify-center items-center">
      <Link
            to="#introduction"
          >
      <motion.div
        onHoverStart={(e) => { console.log("kdfjshflkf"); coverAnimation.start({ opacity:0 }); textAnimation.start({ opacity:1}) }}
        onHoverEnd={(e) => { coverAnimation.start({ opacity:1 }); textAnimation.start({ opacity:0 }) }}
        whileHover={{ scale: 1.3, rotateY: 360 }}
        className="rounded-full cursor-pointer  bg-yellow-500 relative p-3  flex items-center justify-center">

        <motion.div animate={coverAnimation} className="absolute inset-0 top-3 left-9">logo</motion.div>
        
        <motion.div initial={{opacity:0}}  className=" inset-0" animate={textAnimation}>
          
            introduction
        </motion.div>
        
      </motion.div>
      </Link>
      <Link
      ></Link>
      <Link
      ></Link>
      <Link
      ></Link>
    </nav>
  )
}