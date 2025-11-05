import React, { useEffect } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {

    // Only redirect non-owners after user info is available.
    const { isOwner, navigate, user } = useAppContext();

    useEffect(() => {
        if (typeof isOwner === 'boolean' && user && isOwner === false) {
            navigate && navigate('/');
        }
    }, [isOwner, navigate, user]);
    return(
        <div className='flex flex-col h-screen'>
            
            <Navbar/>
            <div className='flex h-full'>
                <Sidebar />
                <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                    <Outlet/>
                </div>
            </div>

        </div>
    )
}

export default Layout