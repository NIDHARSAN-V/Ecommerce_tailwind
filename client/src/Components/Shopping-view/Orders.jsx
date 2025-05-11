import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableHead, TableHeader, TableRow } from '../ui/table'

function ShoppingOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Order History 
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
               <TableHead>
                Order ID
               </TableHead>
               <TableHead>
                Order Date
               </TableHead>
               <TableHead>
                Order Status
               </TableHead>
               <TableHead>
                Order Price
               </TableHead>
            </TableRow>

          </TableHeader>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders
