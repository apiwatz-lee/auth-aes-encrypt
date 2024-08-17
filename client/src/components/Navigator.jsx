import React,{useState} from 'react';
import {Link, useLocation,useNavigate} from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from 'react';
import { AppContext } from '../App';
import { useAuth } from '../context/Authentication';
import { jwtDecode } from 'jwt-decode';
import { FaBars,FaTimes } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiLogout,CiLogin} from "react-icons/ci";

export default function Navigator() {

    const location = useLocation();
    const {cart,setCart,setKeyword} = useContext(AppContext)
    const {logout,isAuthenticated} = useAuth();
    const navigate = useNavigate();

    let anchor;
    let name;

    const [isOpen,setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
   

    if(isAuthenticated){
        const getToken = localStorage.getItem('token') 
        const decodeToken = jwtDecode(getToken) 
        const role = decodeToken.role
        name = decodeToken.firstname
        if(role === 'admin'){
            anchor = [
                {id:1,name:'Product list',path:'/product',icon: <CiShoppingTag/>},
                {id:2,name:'Upload Products',path:'/product/upload',icon:<IoCloudUploadOutline />}]
        }else if(role === 'user'){
            anchor = [{id:1,name:'Product list',path:'/product',icon:<CiShoppingTag/>}]
        }
        
    }else if(!isAuthenticated){
         anchor = [
            {id:1,name:'Product list',path:'/product',icon: <CiShoppingTag/>},
        ]
    }

    const mobileMenu = anchor.map((item)=> 
        <Link to={item.path} className='flex items-center w-[200px] gap-5 justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg' key={item.id}> 
            <div className='text-2xl'>{item.icon}</div>
             <p className='w-full text-start'>{item.name}</p>
        </Link>
        
        )

    const handleLogout = () => {
        setCart([])
        setKeyword('')
        logout()
    }
  
   
    return (
        <>
            <aside className={`sm:hidden fixed z-10 ${isOpen ? 'top-0':'top-[-100%]'} h-auto w-full bg-gray-800 duration-300`}>
                <FaTimes className={`${isOpen ? 'top-5':'top-[-100%]'} text-2xl text-white fixed left-5 hover:text-gray-200 duration-1000 cursor-pointer`} onClick={toggleMenu}/>
                <ul className='flex flex-col justify-center items-center gap-5 p-20'>
                    {mobileMenu}
                    {isAuthenticated ? 
                        <div className='flex items-center w-[200px] gap-5 justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg' onClick={()=>handleLogout()}>
                            <div className='text-2xl'><CiLogout/></div>
                            <p className='w-full text-start'>Log out</p>
                        </div>
                        :
                        <div className='flex items-center w-[200px] gap-5  justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg' onClick={()=>navigate('/login')}>
                            <div className='text-2xl'><CiLogin /></div>
                            <p className='w-full text-start'>Log in</p>
                        </div>
                    }
                </ul>
            </aside>

            <nav className='flex justify-between lg:text-base items-center px-10 sm:px-20 pt-5'>
                <ul className='hidden sm:flex justify-center items-center gap-5 lg:p-3 h-16'>
                    {anchor && anchor.map((item)=>{
                        return <li key={item.id}>
                                    <Link 
                                    to={item.path} 
                                    className={`text-[15px] sm:text-base text-center text-gray-500 hover:text-gray-800 duration-500
                                    ${location.pathname === item.path ? 'text-gray-950 font-bold sm:font-normal underline-offset-8 sm:bg-gray-100 sm:p-2 rounded-xl':null}`}>
                                        {item.name}
                                    </Link>
                                </li>
                    })}
                </ul>

                <ul className='relative flex justify-between sm:justify-center items-center p-3 w-full sm:w-auto'>

                    <Link to ='/product/cart' className={`hidden sm:flex justify-center items-center ${location.pathname === '/product/cart' ? ' bg-gray-100 p-3 duration-500 rounded-full':'p-3'}`}>
                        <FiShoppingCart className={`text-3xl text-gray-500 hover:text-gray-800 duration-500 cursor-pointer`}/>
                        {cart.length !== 0 && <span className='absolute border bg-[#E04132] top-[5px] left-[43px] text-white rounded-full w-5 h-5 text-center text-[12px] flex justify-center items-center'>{cart.length}</span>}
                    </Link>

                    <div className='sm:hidden' onClick={toggleMenu}>
                        <FaBars className='text-2xl text-gray-700 hover:text-gray-500 duration-300 cursor-pointer'/>
                    </div>

                    <li className='text-gray-400 flex justify-center items-center gap-1 cursor-pointer'>
                        <p> {isAuthenticated ? `Hello ${name}` : `Hello Guest`} </p>
                        <span> | </span>
                        <Link to='/product/cart' className={`sm:hidden block text-3xl text-gray-500 ${location.pathname === '/product/cart' ? ' bg-gray-100 p-3 duration-500 rounded-full':'p-3'}`}>
                            <div className='relative'>
                                <FiShoppingCart/>
                                {cart.length !== 0 && <span className='absolute border bg-[#E04132] top-[-19px] left-[16px] text-white rounded-full w-5 h-5 text-center text-[12px] flex justify-center items-center'>{cart.length}</span>}
                            </div>
                        </Link>
                        {isAuthenticated ? 
                            <p className='hidden sm:block cursor-pointer text-orange-500 font-semibold hover:text-[#E04132] duration-500' onClick={()=>handleLogout()}>Log out</p>
                            :
                            <p className='hidden sm:block cursor-pointer text-orange-500 font-semibold hover:text-[#E04132] duration-500' onClick={()=>navigate('/login')}>Log in</p>
                        }
                    </li>
                </ul>
            </nav>
        </>
    )
}
        