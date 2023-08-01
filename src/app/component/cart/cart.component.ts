import { Component, Inject, Input } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/class/cart';
import { CustomerAddress } from 'src/app/class/customer-address';
import { Item } from 'src/app/class/item';
import { CartService } from 'src/app/service/cart.service';
import { CustomerAddresssService } from 'src/app/service/customer-addresss.service';
import { CustomerService } from 'src/app/service/customer.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { PaymentComponent } from '../payment/payment.component';
import { Customer } from '../register/register.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  p:number=1
  count:number=3
  valid: boolean = false;
  email: any;
  inputdata: any;
  cartID!: number;
  cartDetails!: Cart;
  item: Item[]=[];
  customer:any;
  total: number = 0;
  customerId: number;
  quantityofItem:any=1;
  addId:number;
  itemCost:any;
  valueOfItemInInt:number=parseInt(this.quantityofItem);
  selectedAdd:CustomerAddress;

  constructor(private dialog: MatDialog,
    private cartService: CartService,
    private router: Router,
    private builder: FormBuilder,
    private customeraddService: CustomerAddresssService,
    private customerService:CustomerService,
    private itemService:ItemServiceService
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onSelected(value:string,id:number):void{
    this.quantityofItem=value;
    this.itemService.getItemById(id).subscribe(item=>{
      console.log(item.itemcost);
      this.itemCost= item.itemcost *parseInt( value);
      console.log(this.itemCost);
    })
    // for(let i= 0;i<this.cartDetails.itemList.length;i++){
    // }

  }

  ngOnInit(): void {
    

    this.email = sessionStorage.getItem('authenticateduser');
    console.log(this.email);
    this.customerService.getCustomerByEmail(this.email).subscribe(customer=>{
      console.log(customer);
      this.customer = customer;
    })  
    this.cartService.getCartByEmail(this.email).subscribe(cartData => {
      this.cartID = cartData.id;
      console.log(cartData);
      this.customerId = cartData.cust.customerid;
      console.log(this.cartID);
      console.log(this.customerId);

      
      // console.log(cartData);
      this.cartService.getCartById(this.customerId).subscribe(cart => {
        // if(cart.paymentStatus=="unpaid"){}
        this.cartDetails = cart;
        console.log(this.cartDetails);
        this.item = cart.itemList;
        //   console.log(cart.itemList);
        //   console.log(cart.itemList.length);
        for (let i = 0; i < cart.itemList.length; i++) {
          this.total = this.total +cart.itemList[i].itemcost;
          console.log(this.quantityofItem);
          if (this.total > 0) {
            this.valid = true;
            console.log(this.total)
          }
          //     console.log(this.item.itemcost);
        }
        //   console.log(this.total)
      });
    });

    console.log(this.cartID)


  }

  addressForm = this.builder.group({
    area: this.builder.control('', [Validators.required, Validators.minLength(10)]),
    city: this.builder.control('', [Validators.required]),
    state: this.builder.control('', [Validators.required]),
    pincode: this.builder.control('', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$')]),
    country: this.builder.control('', [Validators.required])
  })

  saveAdd() {
    console.log(this.addressForm.value);
    this.customeraddService.saveCustomerAdd(this.addressForm.value).subscribe(customerAdd => {
      console.log(customerAdd);
      
      this.addId = customerAdd.addressid;
      console.log(this.customerId);
      this.customeraddService.assignAddToCustomer(this.customerId, this.addId).subscribe(data=>{
        console.log(data);
      });
    });


    




    // this.cartService.addAddress(5,this.addressForm.value).subscribe(data=>{
    //   console.log(data);
    // });
    alert("address saved succefully");
  }


  getAdd(){

      
  }

  showPreviusAdd(){
    this.dialog.open(CustomerAddComponent, {
      // this.router.navigate(['paymentsuccess'])
      height: '73vh',
      width: '150vh',  
    });
   
  }


  payment(id:number) {
    console.log(this.cartID);

    this.dialog.open(PaymentComponent, {
      // this.router.navigate(['paymentsuccess'])
      height: '73vh',
      width: '70vh',
      data:this.total
    });




  }



}

const pincodeValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  const value = control.value;
  const isValid = /^\d{6}$/.test(value); // Check if the value contains exactly 6 digits
  return isValid ? null : { invalidPincode: true };
};
