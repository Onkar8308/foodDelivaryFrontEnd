import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from 'src/app/class/order';
import { OrderService } from 'src/app/service/order.service';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-previous-order-customer',
  templateUrl: './previous-order-customer.component.html',
  styleUrls: ['./previous-order-customer.component.css']
})
export class PreviousOrderCustomerComponent implements OnInit {

  customerId:any;
  customerOrder:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private router:Router,
    private orderService:OrderService,
    private matDialogref:MatDialogRef<PreviousOrderCustomerComponent>,
  ) { 
    this.customerId=data;
  }

  ngOnInit(): void {
    this.orderService.getOrderByCustomerIdAndStatusPaid(this.customerId).subscribe(customerOrders=>{
      console.log(customerOrders);
      this.customerOrder=customerOrders;
    })
  }
  orderAgain(custId:number,restId:number,itemId:number,cartId:number,itemcost:number){
console.log(custId,restId,itemId,cartId,itemcost);
    this.orderService.saveOrder(custId,restId,itemId,cartId).subscribe(repeatedCart=>{
      console.log(repeatedCart);
    })

    alert("item added to your cart succesfully")
    this.matDialogref.close();
    this.router.navigate(['cart']);
  }

  deleteOrder(orderId:number){
    this.orderService.deleteOrderById(orderId).subscribe(msg=>{
      console.log(msg);
    })
    alert("item deleted from your history")
    this.matDialogref.close();
  }

}
