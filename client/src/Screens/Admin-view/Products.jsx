
import ProductImageUpload from '@/Components/Admin-view/ImageUpload'
import CommonForm from '@/Components/Common/form'
import { Button } from '@/Components/ui/button'
import { Sheet , SheetContent, SheetTitle , SheetHeader } from '@/Components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useState } from 'react'

const initialFormData = {
  image:null,
  title:"",
  description:"",
  category:"",
  brand:'',
  price:"",
  salePrice:'',
  totalStock:""
}

function AdminProducts() {
  



  const [openCreateProductsDialog , SetopenCreateProductsDialog] = useState(false)

  const[formData ,setFormData] = useState(initialFormData)




  const[imageFile , setImageFile] = useState(null);

  const [uploadedImageUrl , SetuploadedImageUrl] = useState('')



  const Onsubmit = function(event)
  {
          event.preventDefault()
  }



  return (
   
    <Fragment>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4" >Displaying products</div>
      <div className="mb-5 w-full flex  justify-end">
        <Button onClick={
          function()
          {
            SetopenCreateProductsDialog(true)
          }
        }>Add New Product</Button>
         
      </div>











      <Sheet open={openCreateProductsDialog} onOpenChange={function()
        {
          SetopenCreateProductsDialog(false)
        }
      }>
       <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>
            Add New Product
          </SheetTitle>
        </SheetHeader>

        <ProductImageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl}  SetuploadedImageUrl={SetuploadedImageUrl}/> 

        <div className="py-6">


          <CommonForm
          formControls={addProductFormElements}
          formData={formData}
          setFormData={setFormData}
          buttonText="Add"
          onSubmit={Onsubmit}/>


        </div>
       </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts
