import React,{useState,useEffect} from 'react';
import {Link,useLocation} from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [activeTab,setActiveTab]=useState("Home");

    const loaction=useLocation();
    useEffect(()=>{
        if(loaction.pathname==='/'){
            setActiveTab('Home');
        }
        else if(loaction.pathname==='/add'){
            setActiveTab('AddUser');
        }
        else if(loaction.pathname==='/about'){
            setActiveTab('About');
        }
    },)
  return (
    <div className='header'>
        <p className='logo'>Management System</p>
        <div className='header-right'>
            <Link to='/'>
                <p className={`${activeTab==='Home'?'active':''}`} onClick={()=>setActiveTab('Home')}>Home</p>
            </Link>
            <Link to='/add'>
                <p className={`${activeTab==='AddUser'?'active':''}`} onClick={()=>setActiveTab('AddUser')}>AddUser</p>
            </Link>
            <Link to='/about'>
                <p className={`${activeTab==='About'?'active':''}`} onClick={()=>setActiveTab('About')}>About</p>
            </Link>
        </div>
      
    </div>
  )
}

export default Header
