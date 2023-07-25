import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataRestaurantService } from 'src/app/service/data-restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurant:Restaurant[]=[];
 

constructor(private restaurantservice:DataRestaurantService,private router:Router){}
ngOnInit(): void {
  this.restaurantservice.retriveAllRestaurant().subscribe(
    response =>{
      this.restaurant = response;
      console.log(response);
      // console.log(this.restaurant)
    }
  )
}
viewRestaurant(id:number){
  this.router.navigate(['item',id])
}

}


export class Restaurant{
constructor(
  public restid:number,
  public area:string,
  public city:string,
  public country:string,
  public pincode:number,
  public state:string,
  public pic:string,
  public restname:string,
  public managerName:string,
  public contactNumber:string
){}
}
