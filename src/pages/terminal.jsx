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
        setHistoryCounter(historyCounter-2)
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
      if (inpRef.current ){
        
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
      
      if ((firstInpRef.current.value.trim() == "clear" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim() == "clear") ) {
        setResults([])
        setInputs([...inputs, "clear"])
        setHistoryCounter(inputs.length)
        firstInpRef.current.value =""
        firstInpRef.current.disabled = false
        firstInpRef.current.focus()
        return;
      }

      if((firstInpRef.current.value.trim() == "touch" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim() == "touch") ){
        nav("/contact")
      }
      if((firstInpRef.current.value.trim() == "instagram" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim() == "instagram") ){
        window.location.href = "https://www.instagram.com/you.___.ker/"
      }
      if((firstInpRef.current.value.trim() == "github" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim() == "github") ){
        window.location.href = "https://github.com/Youker17"
      }
      if ((firstInpRef.current.value.trim() == "exit" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim() == "exit") ) {
        window.location.href = "https://google.com"
      }
      if ((firstInpRef.current.value.trim() == "suprise" && !inpRef.current) || (inpRef.current && inpRef.current.value.trim() == "suprise") ) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }


      // handle other commands-------------------------
      firstInpRef.current.disabled = true
      if (inpRef.current) {
        inpRef.current.disabled = true
        if (commands[inpRef.current.value.trim()] === undefined) {
          err.play()
          setInputs([...inputs, inpRef.current.value.trim()])
          setResults([...results, `sorry command '${inpRef.current.value.trim()}' doesnt exist :( \n try 'help' to see all commands.`])
          setHistoryCounter(inputs.length)
          return;
        }
        setResults([...results, commands[inpRef.current.value.trim()]])
        setInputs([...inputs, inpRef.current.value.trim()])
        setHistoryCounter(inputs.length) 
        if (inpRef.current.value.trim() === "projects") {nav("/projects")}
        return;
      }
      if (commands[firstInpRef.current.value.trim()] === undefined) {
        err.play()
        setResults([...results, `sorry command '${firstInpRef.current.value.trim()}' doesnt exist :( \ntry 'help' to see all commands.`])  
        setInputs([...inputs, firstInpRef.current.value.trim()])
        setHistoryCounter(inputs.length)      
        return;
      }
      setInputs([...inputs, firstInpRef.current.value.trim()])
      setHistoryCounter(inputs.length)
      setResults([...results, commands[firstInpRef.current.value.trim()]])
      if (firstInpRef.current.value.trim() === "projects") {nav("/projects")}

    }
  }

  useEffect(
    () => {

      window.addEventListener("keydown", (event)=>{
       
      })
    }, [])

  return (


        <div ref={containerRef}>
          <p className='text-gray-500 animate-typing writer mb-10  will-change-transform'>type command "<span className='text-gray-800 bg-gray-300'>help</span>" to see available commands</p><div className='border-l-2 border-white animate-pulse w-1 h-full'></div>
          <div>
            <span className="text-green-400"><span className="text-yellow-400">guest@</span>YOUSSEFE-ELMOFAKER:~$</span>
            <input type="text" autoFocus className="bg-transparent pl-2 w-2/3 focus:outline-none border-0 caret-terminal" ref={firstInpRef} onKeyDown={handleInput} />
          </div>
          {
            results.map((e, index) => {

              return (<>
                <pre>{e}</pre>
                <div>
                  <span className="text-green-400"><span className="text-yellow-400">guest@</span>YOUSSEFE-ELMOFAKER:~$</span>
                  <input type="text" autoFocus className="bg-transparent pl-2 w-2/3 focus:outline-none border-0 caret-terminal" ref={inpRef} onKeyDown={handleInput} />
                </div>

              </>)
            })
          }
        </div>
  )
}

export default Terminal
