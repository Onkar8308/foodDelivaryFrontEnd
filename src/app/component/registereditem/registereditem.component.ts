import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/class/item';
import { ItemServiceService } from 'src/app/service/item-service.service';


@Component({
  selector: 'app-registereditem',
  templateUrl: './registereditem.component.html',
  styleUrls: ['./registereditem.component.css']
})
export class RegistereditemComponent implements OnInit {
  id:number;

  // items : Item[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private data:ItemServiceService){};

  registrationForm = new FormGroup({
    itemname : new FormControl(''),
    itemstatus : new FormControl(''),
    itemcost : new FormControl('')
  });

  ngOnInit(): void {
    // this.id=this.route.snapshot.params['id'];

    // this.data.getItemByRestId(this.id).subscribe(
    //   response=>{
      
    //   console.log(response);
    //   this.items=response;
    //   }
    //  )
  }

  saveItem(): void {

    this.id=this.route.snapshot.params['id'];

    console.log(this.registrationForm.value)

    const Items = {
      itemname : this.registrationForm.value.itemname,
      itemstatus : this.registrationForm.value.itemstatus,
      itemcost : this.registrationForm.value.itemcost
    };

    this.data.saveItemByRestId(this.id,Items).subscribe(
      (response:any) => {
        console.log(response);
        this.router.navigate(['item',this.id]);
      },

      (error:any) => {
        console.log(error);
      }
    )

    // this.data.saveItem(Items).subscribe(
    // (response : any) => {
    //   console.log(response);
    // },
    // (error:any) => {
    //       console.log(error);
    //     }
    //   )
  }
}

