import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader ,CardTitle} from '../ui/card'
import CommonForm from '../Common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, fetchAllAddress } from '@/Store/Shop/AddressSlice'
import AddressCard from './AddressCard'

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


    console.log(addressList , "Address List")

 


    function handleDeleteAddress(getCurrentAddress)
    {
         dispatch(deleteAddress({userId : user.id , addressId : getCurrentAddress._id})).then(data=>{
            if(data.payload.succss)
            {
                dispatch(fetchAllAddress(user.id))
            }

                
         })
    }


    function handleEditAddress()
    {

    }

  return (
   <Card>
        <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 '>
           {
    addressList && addressList.length > 0 ? (
        addressList.map(AddressItem => <AddressCard addressInfo={AddressItem} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress}/>)
    ) : (
        "n"
    )
}

             
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
