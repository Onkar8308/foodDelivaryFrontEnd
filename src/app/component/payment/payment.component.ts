import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DummyPayment } from 'src/app/class/dummy-payment';
import { CartService } from 'src/app/service/cart.service';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  email: any;
  cartID:number;
  cartDetails={};
  newCart={};
  customerId:number;
  totalAmountToPay:any;
  
  constructor(private router:Router,
    private dialog:MatDialog,
    private ref:MatDialogRef<PaymentComponent>,
    private cartService:CartService ,
    @Inject(MAT_DIALOG_DATA) public data:any)
    { 
      this.totalAmountToPay=data
    }

  ngOnInit(
  
  ): void {
     
    
  }

  cardDatils = new FormGroup({
    personName:  new FormControl('',[Validators.required,Validators.minLength(5)]),
    cardNum:  new FormControl('',[
      Validators.required,Validators.
      minLength(16),Validators.maxLength(16)
    ]),
    expiryDate:  new FormControl('',[Validators.required]),
    cvv:  new FormControl('',[Validators.required]),
  })



  payment(){
    if(
      this.cardDatils.get('personName')?.value == DummyPayment.personName &&
      this.cardDatils.get('cardNum')?.value == DummyPayment.cardNum &&
      this.cardDatils.get('expiryDate')?.value == DummyPayment.expiryDate &&
      this.cardDatils.get('cvv')?.value == DummyPayment.cvv
    ){
       
    this.email = sessionStorage.getItem('authenticateduser');
    console.log(this.email);

    this.cartService.getCartByEmail(this.email).subscribe(cartData => {
      this.cartID = cartData.id;
      console.log(cartData);
      this.customerId = cartData.cust.customerid;
      console.log(this.cartID);
      console.log(this.customerId);
      // console.log(cartData);
      this.cartService.getCartById(this.customerId).subscribe(cart => {
        if(cart.paymentStatus=="unpaid"){}
        this.cartDetails = cart;
        console.log(this.cartDetails);

        this.cartService.updateStatus(this.cartID).subscribe(cart=>{
          console.log(cart);
         
        })

        this.cartService.saveCart(this.newCart).subscribe(newCarDetails=>{
          console.log(newCarDetails);
        })
    
      });
      });
      
      // this.cartService.deleteItemInCartByID(this.cartID);

      this.dialog.open(PaymentSuccessComponent,{
        // this.router.navigate(['paymentsuccess'])
        height:'73vh',
        width:'70vh'  
      });
      this.ref.close();
      alert("payment successfull");
      
      // console.log(DummyPayment.personName)
      // console.log(this.cardDatils.get('personName')?.value);
    }
    else{
      alert("invalid card details");
    }
   
  }

  validCardDetails(){
    
  }
}
