import React, { useContext } from 'react'
import './Main.css'
import { GiMoebiusTrefoil } from "react-icons/gi";
import { GiCompass } from "react-icons/gi";
import { FaRegLightbulb } from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { LuSendHorizonal } from "react-icons/lu";
import { IoMicOutline } from "react-icons/io5";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { Context } from '../../context/Context';
import { FaRegCircleUser } from "react-icons/fa6";
import { SiGooglegemini } from "react-icons/si";
import { GiGemini } from "react-icons/gi";
const Main = () => {

  const {onSent, recentPrompt, showResults, loading, resultData, setInput, input} = useContext(Context)





  return (
    <div className='main'>
      <div className="nav">
        <p className='g-logo'>Gemini</p>
        <GiMoebiusTrefoil className='user-icon' />
      </div>
      <div className="main-container">
        {!showResults
        ?<> 

<div className="greet">
          <p><span>Hello, Dev.</span></p>
          <p>How Can I Help You Today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on an upcoming road trip.</p>
            <GiCompass className='icon' />
          </div>
          <div className="card">
            <p>Briefly summarize this concept: Urban Planning.</p>
            <FaRegLightbulb className='icon' />
          </div>
          <div className="card">
            <p>Brainstorm team bonding activities for our work retreat.</p>
            <BsChatLeftText className='icon'  />
          </div>
          <div className="card">
            <p>Improve the readability of the following code.</p>
            <FaCode className='icon' />
          </div>
        </div>
          
          </>: <div className='result'>

            <div className='result-title'>
              <FaRegCircleUser size={40} />

              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
            <SiGooglegemini className='gemini-logo' />
            {loading
            ?<div className='loader'>
              <hr />
              <hr />
              <hr />

            </div>: <p dangerouslySetInnerHTML={{__html:resultData}}></p> }
              
            </div>

          </div>
         }

       
        <div className="main-botton">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
            <TbPhotoSquareRounded className='img'/>
            <IoMicOutline className='img'/>
            {input?<LuSendHorizonal onClick={()=>onSent()} className='img'/>:null}

            </div>
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, please double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default Main