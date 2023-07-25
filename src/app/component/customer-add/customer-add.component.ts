import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerAddress } from 'src/app/class/customer-address';
import { CustomerAddresssService } from 'src/app/service/customer-addresss.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  email:any;
  public customerAddress:any;
  selectedAdd:CustomerAddress;
  constructor(private customerService:CustomerService,
    private customerAddService:CustomerAddresssService,
    private matDialogref:MatDialogRef<CustomerAddComponent>) { }

  ngOnInit(): void {

    this.email = sessionStorage.getItem('authenticateduser');
    console.log(this.email);


    this.customerService.getCustomerAddByEmail(this.email).subscribe(customerAdd=>{
      console.log(customerAdd);
      this.customerAddress=customerAdd;
    })
  }

  getSelectedADd(id:number){
     this.customerAddService.getCustomerAddById(id).subscribe(data=>{
        console.log(data);
        this.selectedAdd=data;
      })
    alert( 
      `your order will be delivered to following Address
      area = ${this.selectedAdd.area}
      city = ${this.selectedAdd.city}
      state = ${this.selectedAdd.state}
      country = ${this.selectedAdd.country}
      pincode = ${this.selectedAdd.pincode}`
      
    );

      this.matDialogref.close()
  

  }

}

