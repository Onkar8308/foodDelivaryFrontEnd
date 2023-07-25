import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/class/item';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { Restaurant } from '../restaurants/restaurants.component';
import { HardcodedAuthenticationService } from 'src/app/service/hardcoded-authentication.service';
import { CartService } from 'src/app/service/cart.service';
import { Cart } from 'src/app/class/cart';
import { Customer } from '../register/register.component';
import { CustomerdataService } from 'src/app/service/customerdata.service';
import { ItemService } from 'src/app/service/item.service';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  id:number;
  cartID:number;
  cartItem:Item
  items : Item[] = [];
  email:any;
   
  restaurant : Restaurant;
  
  customer= {};
 

  constructor(public hardcodedAuthentication:HardcodedAuthenticationService,
    private itemservice: ItemServiceService,
    private router:Router,
    private route:ActivatedRoute,
    private  cart:CartService,
    private item:ItemService){};


  ngOnInit(): void {
    this.email=  sessionStorage.getItem('authenticateduser');
    console.log(this.email);
    
    this.cart.getCartByEmail(this.email).subscribe(cartData=>{
      this.cartID = cartData.id;
      console.log(this.cartID);
      console.log(cartData);
    });
    
    
    this.id=this.route.snapshot.params['id'];
      this.itemservice.getItemByRestId(this.id).subscribe(
        data=>{
          this.items=data;
          console.log(this.items);
        }
       )
  }



  addToCart(id:number): void {
    // this.itemservice.saveItemByRestId(this.id,this.cartItem).subscribe(restaurant=>{
    //   console.log(restaurant);
    // })  
    this.itemservice.getItemById(id).subscribe(data=>{
      console.log(data)
      this.cartItem=data;  
      
      //geting item details
      
      
      this.cart.addItemToCart(this.cartID,data).subscribe(data1=>{   //asiging item to cartt
        console.log(data1);
        alert("item Added to your cart successfully");  
        
        this.item.assignItemToRestById(this.id,data.itemid).subscribe(updatedres=>{
          console.log(updatedres);
        })
    })



    
    })


  }

  updateItem(id:number): void {
    this.id = this.route.snapshot.params['id'];
    this.router.navigate(['updateItem',id,this.id]);
  }
  
  deleteItem(id:number): void {
    this.id=this.route.snapshot.params['id'];

    this.itemservice.deleteItem(id,this.id).subscribe(
      respose=>{
        this.items=respose;
        console.log(this.items);
      } 
    );
  }

  addItem(): void {
    this.id = this.route.snapshot.params['id'];
    this.router.navigate(['registerItem',this.id]);
  }
}
