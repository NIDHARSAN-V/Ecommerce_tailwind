import React from 'react'
import { SheetContent, SheetHeader  } from '../ui/sheet'
import { Button } from '../ui/button'

function UserCartWrapper() {
  return (
   <SheetContent className="sm:max-w-md">
   <SheetHeader>
  YourCart
   </SheetHeader>
    <div className="mt-8 space-y-4">


    </div>


    <div className="mt-8 space-y-4">
        <div className="flex justify-between">
            <span className='font-bold'>
                Total
            </span>
            <span className='font-bold'>
                $1000
            </span>
        </div>
    </div>
    <Button className='w-full mt-5'> CheckOut</Button>
   </SheetContent>
  )
}

export default UserCartWrapper
