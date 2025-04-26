import React from 'react'
import { Card, CardHeader } from '../ui/card'
import { Label } from '../ui/label'

function AddressCard({addressInfo}) {
  return (
   <Card>
    <CardHeader className='grid gap-4'>
           <Label>{addressInfo.address}</Label>
           <Label>{addressInfo.city}</Label>
           <Label>{addressInfo.pincode}</Label>
           <Label>{addressInfo.phone}</Label>
           <Label>{addressInfo.notes}</Label>
    </CardHeader>
   </Card>

  )
}

export default AddressCard
