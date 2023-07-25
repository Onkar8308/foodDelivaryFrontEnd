import { Component, Inject, OnInit } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { Cart } from 'src/app/class/cart';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from 'src/app/service/invoice.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-payment-module',
  templateUrl: './payment-module.component.html',
  styleUrls: ['./payment-module.component.css']
})
export class PaymentModuleComponent implements OnInit {

  inputdata:any;
  cartID!:number;
  cartDetails!:Cart;
  item:any;
  total!:any;
  constructor(
    private ref: MatDialogRef<PaymentModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private invoice: InvoiceService,
    private paymentdialoge:MatDialog,
    private cartService:CartService) { }




  ngOnInit(): void {
   // this.getInvoiceDetails(this.data);
  //  this.inputdata=this.data;
  //    this.cartService.getCartById(this.data.cartId).subscribe(cart=>{
  //      this.cartDetails=cart;
  //     // console.log(this.cartDetails);
  //      this.item = cart.itemList;
  //     console.log(this.item);
  //   });

  

   
  }
  

  


  closeInvoice() {
    this.ref.close();

  }

  payAmout(){
this.paymentdialoge.open(PaymentComponent,{
  width:'30%',
  height:'30%'
    
});
  }

}
