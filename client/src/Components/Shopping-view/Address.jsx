import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader ,CardTitle} from '../ui/card'
import CommonForm from '../Common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, fetchAllAddress } from '@/Store/Shop/AddressSlice'

function Address() {

    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)
    const {addressList} = useSelector(state => state.shopaddress)

    const initialAddressFormData = {
        address:'',
        city:'',
        phone:'',
        pincode:'',
        notes:''
    }
    const [formData , setFormData] = useState(initialAddressFormData)

    //    console.log(addressList , "In address")

    function handleManageAddress(event)
    {
        event.preventDefault();

        dispatch(addNewAddress({...formData , userId : user.id})).then(data=>{
            // console.log(data , "In Address Page")
            if(data.payload.success)
            {
                dispatch(fetchAllAddress(user.id))
                setFormData(initialAddressFormData)
            }
        })




    }


    useEffect(()=>{
        dispatch(fetchAllAddress(user.id))
    },[dispatch])

    function isFormValid()
    {
        return Object.keys(formData).map(key => formData[key].trim()!=='').every(item=>item)

    }


 

  return (
   <Card>
        <div className='p-5'>
            
        </div>
        <CardHeader>
             <CardTitle>
                Add New Address
             </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">

            <CommonForm
            formControls = {addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Add'}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}/>




        </CardContent>
   </Card>
  )
}

export default Address
