import React, { useContext } from 'react'
import './Sidebar.css'
import { useState } from 'react';
import { MdMenu } from "react-icons/md";
import { PiPlusBold } from "react-icons/pi";
import { BiMessage } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineHistory } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { Context } from '../../context/Context';


const Sidebar = () => {

  //useState to Open and close the menu bar

  const [extended, setExtended] = useState(false)
  const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)


  const loadPrompt = async (prompt) => {
      setRecentPrompt(prompt)
      await onSent(prompt)
  }

  return (
    <div className='sidebar'>

      <div className="top">
        {/*To Open and close the menu bar */}
          <MdMenu onClick={()=>setExtended(prev=>!prev)} className='menu' size={20}  />
            <div onClick={()=>{newChat()}} className='new-chat'>
              <PiPlusBold className='plus-icon'  />
              {extended?<p>New Chat</p>:null}

            </div>
            {extended?
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item,index)=>{
                return (
                  <div onClick={()=>{loadPrompt(item)}} className="recent-entry">
                    <BiMessage className='icon' size={20} />

                    <p>{item.slice(0,18)} ...</p>
                  </div>

                )
              })}
                
            </div>: null }
      </div>
      <div className="bottom">
        <div className="bottom-line recent-entry">
          <BsQuestionCircle className='Q-icon'size={20} />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-line recent-entry">
          <AiOutlineHistory className='H-icon'size={20} />
          {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-line recent-entry">
          <AiOutlineSetting className='S-icon' size={20}/>
          {extended?<p>Settings</p>:null}
        </div>


      </div>
      
   </div>
  )
}

export default Sidebar