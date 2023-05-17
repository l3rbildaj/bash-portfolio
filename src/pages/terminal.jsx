import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";

import {commands} from '../commands/commands';





function Terminal() {
  const inpRef = useRef(null)
  const firstInpRef = useRef(null)
  const containerRef = useRef(null)
  const [results, setResults] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState("")
  const [historyCounter, setHistoryCounter] = useState(0)
  const err = new Audio("src/assets/erro.mp3")
  const nav = useNavigate()

  const handleInput = async (event) => {
    
    // history --------------------------------------------------------------------------------------------------------------------
    //keyup
    if (event.keyCode == '38') {
      
      console.log(historyCounter, inputs.length,inputs)
      if (historyCounter === 0 && inputs.length === 0) {
        err.play();
        return;
      }
      if (historyCounter === inputs.length) {
        if (inpRef.current) {
          inpRef.current.value = inputs[historyCounter-1]
        }
        else{
          firstInpRef.current.value = inputs[historyCounter-1]
        }
        setHistoryCounter((historyCounter-2 >= 0)?historyCounter-2: historyCounter-1)
        return;
      }
      if (inpRef.current) {
        if (historyCounter > 0) {
          inpRef.current.value = inputs[historyCounter]
          setHistoryCounter(historyCounter-1)
          return;
        }
        inpRef.current.value = inputs[historyCounter]
        return;
      }
      if (historyCounter > 0) {
        firstInpRef.current.value = inputs[historyCounter]
        setHistoryCounter(historyCounter-1)
        return;
      }
      firstInpRef.current.value = inputs[historyCounter]
      return;
    }



    // keydown
    if (event.keyCode == '40') {
      event.preventDefault()
      console.log(historyCounter, inputs.length)
      if (historyCounter === 0 && inputs.length === 0) {
        err.play();
        return;
      }

      if (inpRef.current){
        if (historyCounter < inputs.length) {setHistoryCounter(historyCounter + 1)}
        inpRef.current.value = (inputs[historyCounter+1] === undefined)?"":inputs[historyCounter+1]
        
        return;
      }
      if (historyCounter < inputs.length) {setHistoryCounter(historyCounter + 1)}
      firstInpRef.current.value = (inputs[historyCounter+1] === undefined)?"":inputs[historyCounter+1]
      
    }







    // tab auto complete ----------------------------------------------------
    if(event.key == "Tab"){
      event.preventDefault();
      console.log("in auto complete pressed")
      if (inpRef.current){
        
        let simcommands = Object.keys(commands).filter((e)=>e.slice(0,inpRef.current.value.length) === inpRef.current.value);
        console.log(simcommands[0], simcommands)
        if(simcommands.length >= 1 && inpRef.current.value !== ""){
          inpRef.current.value = simcommands[0]
          console.log(simcommands[0], simcommands)
          return;
        }
        err.play();
        return;
      }
      let simcommands = Object.keys(commands).filter((e)=>e.slice(0,firstInpRef.current.value.length) === firstInpRef.current.value);
      console.log(simcommands[0], simcommands)
      if(simcommands.length >= 1 && firstInpRef.current.value !== ""){
        firstInpRef.current.value = simcommands[0]
        console.log(simcommands[0], simcommands)
        return;
      }
      err.play();
      return;


    }


    // process the result-----------------------------------------------------------------------------------------------------------
    if (event.key === "Enter") {
      // handle clear----------------------------
      
      if (((firstInpRef.current.value.trim().toLowerCase() == "clear" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim().toLowerCase() == "clear")) || ((firstInpRef.current.value.trim().toLowerCase() == "cls" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim().toLowerCase() == "cls"))) {
        setResults([])
        setInputs([...inputs, "clear"])
        setHistoryCounter(inputs.length)
        firstInpRef.current.value =""
        firstInpRef.current.disabled = false
        firstInpRef.current.focus()
        return;
      }

      if(((firstInpRef.current.value.trim().toLowerCase() == "touch" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim().toLowerCase() == "touch")) || ((firstInpRef.current.value.trim().toLowerCase() == "contact" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim().toLowerCase() == "contact")) ){
        nav("/contact")
      }
      if((firstInpRef.current.value.trim().toLowerCase() == "instagram" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim().toLowerCase() == "instagram") ){
        window.location.href = "https://www.instagram.com/you.___.ker/"
      }
      if((firstInpRef.current.value.trim().toLowerCase() == "github" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim().toLowerCase() == "github") ){
        window.location.href = "https://github.com/Youker17"
      }
      if ((firstInpRef.current.value.trim().toLowerCase() == "exit" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim().toLowerCase() == "exit") ) {
        window.location.href = "https://google.com"
      }
      if ((firstInpRef.current.value.trim().toLowerCase() == "suprise" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim().toLowerCase() == "suprise") ) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }


      // handle other commands-------------------------
      firstInpRef.current.disabled = true
      if (inpRef.current) {
        inpRef.current.disabled = true
        if (commands[inpRef.current.value.trim().toLowerCase()] === undefined) {
          err.play()
          setInputs([...inputs, inpRef.current.value.trim().toLowerCase()])
          setResults([...results, `sorry command '${inpRef.current.value.trim().toLowerCase()}' doesnt exist :( \n try 'help' to see all commands.`])
          setHistoryCounter(inputs.length)
          return;
        }
        setResults([...results, commands[inpRef.current.value.trim().toLowerCase()]])
        setInputs([...inputs, inpRef.current.value.trim().toLowerCase()])
        setHistoryCounter(inputs.length) 
        if (inpRef.current.value.trim().toLowerCase() === "projects") {nav("/projects")}
        return;
      }
      if (commands[firstInpRef.current.value.trim().toLowerCase()] === undefined) {
        err.play()
        setResults([...results, `sorry command '${firstInpRef.current.value.trim().toLowerCase()}' doesnt exist :( \ntry 'help' to see all commands.`])  
        setInputs([...inputs, firstInpRef.current.value.trim().toLowerCase()])
        setHistoryCounter(inputs.length)      
        return;
      }
      setInputs([...inputs, firstInpRef.current.value.trim().toLowerCase()])
      setHistoryCounter(inputs.length)
      setResults([...results, commands[firstInpRef.current.value.trim().toLowerCase()]])
      if (firstInpRef.current.value.trim().toLowerCase() === "projects") {nav("/projects")}

    }
  }

  useEffect(
    () => {

      window.addEventListener("click", (event)=>{
        if (inpRef.current){
          inpRef.current.focus()
          return;
        }
        firstInpRef.current.focus()
      })
    }, [])

  return (


        <div ref={containerRef}>
          <p className='text-gray-500 animate-typing writer mb-10  will-change-transform'>type command "<span className='text-gray-800 bg-gray-300'>help</span>" to see available commands</p><div className='border-l-2 border-white animate-pulse w-1 h-full'></div>
          <div className="flex flex-row text-xs md:text-lg">
            <span className="text-green-400"><span className="text-yellow-400">guest@</span>YOU-KER:~$</span>
            <input type="text" autoFocus className="bg-transparent text-xs font-semibold text-yellow-100 md:text-xl pl-2 w-2/3 focus:outline-none border-0 caret-terminal" ref={firstInpRef} onKeyDown={handleInput} />
          </div>
          {
            results.map((e, index) => {

              return (<>
                <pre className="text-xs md:text-lg">{e}</pre>
                <div className="flex flex-row text-xs md:text-lg">
                  <span className="text-green-400"><span className="text-yellow-400">guest@</span>YOU-KER:~$</span>
                  <input type="text" autoFocus className="bg-transparent text-xs font-semibold text-yellow-100 md:text-xl pl-2 w-2/3 focus:outline-none border-0 caret-terminal" ref={inpRef} onKeyDown={handleInput} />
                </div>

              </>)
            })
          }
        </div>
  )
}

export default Terminal
