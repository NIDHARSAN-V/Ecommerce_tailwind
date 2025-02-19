import React from 'react'
import AdminSidebar from './Sidebar'
import AdminHeader from './Header'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='flex min-h-screen w-full'>
        <AdminSidebar/>
        <div className="flex flex-1 flex-col" >
             <AdminHeader/>
            <main className="flex flex-1 bg-blue-100 p-4 md:p-6">
            <Outlet/>
            </main>

        </div>
      
    </div>
  )
}

export default AdminLayout
