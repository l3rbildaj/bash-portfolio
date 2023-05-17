import React, { useEffect, useRef, useTransition } from "react"
import picture from "../assets/cv.jpg"
import { motion, useAnimation, useInView, useMotionValue } from "framer-motion"
import zelige from "../assets/zelige.png";
import background from "../assets/wavey-background.png"
import downArrow from "../assets/Icon-down-arrow.svg"




export default function Introduction() {
    const name = "YOUSSEF ELMOFAKER"
    const dragConstraints = useRef(null)
    const motionRef = useRef(null)
    const animator = useAnimation()
    const nameanimator = useAnimation()
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransition(y, [-100,100], [30,-30])
    const rotateY = useTransition(x, [-100,100], [-30,30])


    const about = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus incidunt inventore similique modi quo cumque ut veniam, aliquid voluptatum aspernatur officiis explicabo eligendi dolorum veritatis? Nostrum nesciunt officiis at ipsam?"
    const charVariants = {
        hidden: { backgroundColor: "transparent" },
        visible: { backgroundColor: "green" },
    };



    useEffect(() => {
        animator.start({
            x: -130,
            y: 0,
            transition: { duration: 0.5 }
        })
    }, [])


    return (
        <>

            <motion.div id="introduction" className="relative z-10 w-full flex flex-col-reverse md:flex-row justify-center items-center pt-10 md:pt-0 gap-5 md:gap-20  h-screen">
                <motion.img src={background} className="absolute top-0 left-0 opacity-10 h-full blur-3xl w-full -z-20" />
                <motion.div animate={{y:[0,10,0]}} transition={{duration:1, repeat:"loop"}} className="absolute bottom-5 hidden md:block bg-green-400 bg-opacity-20 backdrop-blur-xl w-fit p-5 rounded-full">
                    <motion.img src={downArrow}/>
                </motion.div>
                <motion.img
                    className="opacity-25 blur-sm"
                    src={zelige}
                    initial={{ x: 100, y: -150 }}
                    animate={{ rotate: 180 }}
                    transition={{ repeat: "loop", duration: 4 }}

                />
                <p className="text-xl h-fit font-mono text-white  w-3/4 md:w-1/2 ">
                    <span className="text-green-500 text-4xl font-bold">
                        Hi,
                    </span><br />
                    I am
                    <motion.h1

                        initial="hidden"
                        animate={{ x: [0, -1, 0] }}
                        transition={{ repeat: "loop", duration: 2 }}
                        onHoverStart={() => { nameanimator.start({ height: "100%", y: "-100%", transition: { duration: 0.5 } }) }}
                        onHoverEnd={() => { nameanimator.start({ height: "10%", transition: { duration: 0.5 } }) }}
                        className="relative w-fit z-10 hover:text-black text-4xl font-diamond text-transparent bg-gradient-to-tr from-green-500 via-yellow-200 to-yellow-400 bg-clip-text "

                    >
                        <span className="">
                            {name},
                        </span>
                        <motion.div initial={{ height: "10%", }} animate={nameanimator} className="w-full -z-10 absolute bg-gradient-to-tr from-green-500 via-yellow-200 to-yellow-400"></motion.div>
                    </motion.h1>
                    {
                        about.split("").map((e, index) => (
                            <motion.span
                                key={index}
                                variants={charVariants}
                                whileHover="visible"
                                initial="hidden"
                                animate="hidden"
                                className="md:text-base text-sm"
                                transition={{ duration: 0.2 }}

                            >
                                {e}
                            </motion.span>
                        ))
                    }


                </p>



                <motion.div className="relative  w-1/6 md:w-2/6 h-2/3 flex justify-center items-center cursor-grab" drag dragElastic={0.16} style={{x,y,rotateX, rotateY, z:100}} dragConstraints={{top:0, bottom:0, left:0, right:0}}  ref={dragConstraints}>
                    <div className="bg-yellow-300 hidden md:flex w-1/4 h-1/4 md:w-40 md:h-40 rounded-full absolute md:-inset-10 backdrop-blur-3xl bg-opacity-30  justify-center items-center font-climate text-sm md:text-6xl text-green-900 font-bold">19</div>
                    <motion.div ref={motionRef} animate={animator} onDragEnd={() => { animator.start({ x: -100, y: 0, transition: { duration: 0.5 } }); console.log("shjkda") }} drag={true} dragConstraints={dragConstraints} transition={{ repeat: "loop", duration: 4 }} className="bg-green-300 hidden md:flex -bottom-20 -right-20 md:w-60 md:h-60 rounded-full absolute  backdrop-blur-3xl bg-opacity-30 z-30  justify-center items-center font-climate text-2xl text-center text-yellow-500 ">Full-Stack Developer</motion.div>
                    <motion.img className="overflow-hidden rounded-full z-10" src={picture} alt="" />
                </motion.div>

            </motion.div>


        </>
    )
}