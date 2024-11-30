import { createContext, useState } from "react";
import runChat from '../config/gemini'

export const Context = createContext();


const ContextProvider = (props) =>{

  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const delayPara = (index,nextWord) =>{
    setTimeout(function() {
      setResultData(prev=>prev+nextWord);

    }, 75*index)

  }

  const newChat = () => {
    setLoading(false)
    setShowResults(false)
  }


  const onSent = async (prompt) =>{

    setResultData("")
    setLoading(true)
    setShowResults(true)
    let response;
    if (prompt !== undefined){
      response = await runChat(prompt);
      setRecentPrompt(prompt)
    }
    else{
      setPrevPrompts(prev=>[...prev,input])
      setRecentPrompt(input)
      response = await runChat(input)

    }
    
    let responseArray = response.split("**");
    let newResponse = "";
    for(let i = 0 ; i < responseArray.length; i++){

      if(i === 0 || i%2 !== 1){
        newResponse += responseArray[i]

      }
      else{
        newResponse += "<b>"+responseArray[i]+"</b>"
      }
      

    }
  
    let newResponse2 = newResponse.split("*").join("</br>")
    let newResArray = newResponse2.split(" ")
    for(let i = 0; i<newResArray.length; i++ ){
      const nextWord = newResArray[i];
      delayPara(i, nextWord+" ")

    }
    
    setLoading(false)
    setInput("")
    
  }

  
  const contextValue = {

    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResults,
    loading,
    resultData,
    input,
    setInput,
    newChat

  }

  return (
    <Context.Provider value = {contextValue}>
      {props.children}

    </Context.Provider>
  )
}

export default ContextProvider