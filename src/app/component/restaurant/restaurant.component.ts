import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataRestaurantService } from 'src/app/service/data-restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurant:Restaurant[]=[];
   cartid:number;
   routerStateDataId:number;
id:number;
  constructor(private restaurantservice:DataRestaurantService,
    private route:ActivatedRoute
    ,private router:Router){}
  ngOnInit(): void {
    this.routerStateDataId = history.state['cartID'];
    console.log(this.routerStateDataId +'asdasd');
    //console.log(this.route.snapshot.params['cartID']);
    this.restaurantservice.retriveAllRestaurant().subscribe(
      response =>{
        this.restaurant = response;
       // console.log(response);
       // console.log(this.restaurant)
      }
      )
  //   this.route.queryParams.subscribe(params => {
  //     this.id = params['cartID'];
  //     console.log(this.id);
  // });
  }

  
  viewRestaurant(id:number){
    console.log(this.route.snapshot.params['id']);
    
    this.router.navigate(['item',id])
  }


 
}

export class Restaurant{
  constructor(
    public addressid:number,
    public area:string,
    public  city:string,
    public country:string,
    public pincode:number,
    public state:string,
    public pic:string,
    public restname:string
  ){}
}




