import { Component, OnInit } from '@angular/core';
import { PaymentModuleComponent } from '../payment-module/payment-module.component';
import { Invoice } from 'src/app/class/invoice';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from 'src/app/service/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit{

  public invoiceData:Invoice[]=[]
  currentInvoice!:Invoice;
  constructor(private invoice:InvoiceService,
    private dialogue:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
  this.invoice.getAllInvoice().subscribe(data=>{
    this.invoiceData=data;
   // console.log(data);
  })
  }

  getInvoiceDetails(id:number){
    this.invoice.getInvoiceById(id).subscribe(data=>{
      this.currentInvoice=data;
     console.log(this.currentInvoice);
    })

  }



  openDialogue(id:number,date:Date,cost:number,totalitem:number,status:string){
    this.router.navigate(['cart']);
    //   this.dialogue.open(CartComponent,{
    //   height:'90vh',
    //   width:'160vh',

    //   data:{
    //     id:id,
    //     cost:cost,
    //     date:date,
    //     totalitem:totalitem,
    //     status:status,
    //     cartId:1
    //   }
    // });
    
  }

}
