import React, { useState } from 'react'
import "./TabSwitching.css"
const TabSwitching = ({tabs,onTabChange}) => {
    const [selectedTab,setSelectedTab]=useState(0)
    const [left,setLeft]=useState(0)
    const activeTab=(tab,index)=>{
        setLeft(index*100)
        setTimeout(()=>{
            setSelectedTab(index)
        },300)
        onTabChange(tab)
    }
  return (
    <div className='tabSwitching'>
        <div className='tabItems'>
            {tabs.map((tab,index)=>(
                <span onClick={()=>activeTab(tab,index)} key={index} className={`tabItem ${selectedTab===index?"active":""}`}>{tab}</span>
            ))}
            {/* 
             <span onClick={()=>activeTab("Day",0)} key={index} >Day</span>
              <span onClick={()=>activeTab("Week",1)} key={index} >Week</span>
            
            */}
            <span style={{left}} className='movingBg'/>
        </div>
      
    </div>
  )
}

export default TabSwitching
