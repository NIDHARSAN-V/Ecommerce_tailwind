import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItems } from '@/config';



import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { logoutUser } from '@/Store/AuthSlice';
import UserCartWrapper from './Cart_Wrapper';




function MenuItems() {
  return (
    <nav className="flex flex-col mb-4 lg:mb-3 lg:items-center lg:gap-6 lg:flex-row ">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Link key={item.id} to={item.path} className="text-sm font-medium">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}


function HeaderRightContent()
{

  const { isAuthenticated , user } = useSelector((state) => state.auth);

  const navigate = useNavigate()

  const dispatch = useDispatch()
  

  const[openCartSheet , setOpenCartSheet]= useState(false)

 const handleLogout = async function()
  {
     dispatch(logoutUser());
  }
  
  return <div className="flex lg:items-center 
   flex-row gap-4">

     <Sheet open={openCartSheet} onOpenChange={function()
      {
        setOpenCartSheet(false);
      }
     } >

     <Button variant="outline" size="icon" onClick={
      function()
      {
        setOpenCartSheet(true);
      }
     }>
       <ShoppingCart className='w-6 h-6 '/>
       <span className='sr-only'>User Cart</span>
    </Button>

    <UserCartWrapper/>

     </Sheet>

   



       <DropdownMenu>
        <DropdownMenuTrigger asChild>

              <Avatar className='bg-black'>
                <AvatarFallback className='bg-black text-white font-extrabold'>
                  
                {user?.username ? user.username[0].toUpperCase() : "U"}

                </AvatarFallback>
              </Avatar>

        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">

          <DropdownMenuLabel >
               Logged in as {user.username}
          </DropdownMenuLabel>

          <DropdownMenuSeparator/>
            
            <DropdownMenuItem  onClick={function()
            {
              navigate("/shop/account")
            }
          }>
          <UserCog className='mr-2 h-4 w-4'/>
          Account

            </DropdownMenuItem>


          <DropdownMenuSeparator/>
  

          <DropdownMenuItem onClick={
            function()
            {
              handleLogout();
            }
          }>
               
               <LogOut className='mr-2 h-4 w-4'/>
               Logout

            </DropdownMenuItem>

            

        </DropdownMenuContent>
       </DropdownMenu>

   </div>
}


function ShoppingViewHeader() {
  const { isAuthenticated , user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-xs">

            <MenuItems />

            <HeaderRightContent/>

          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex justify-center w-full">

  <MenuItems /> 
  
</div>



      <div className=" hidden lg:block">

        <HeaderRightContent/>

      </div>

      </div>



    </header>
  );
}

export default ShoppingViewHeader;
