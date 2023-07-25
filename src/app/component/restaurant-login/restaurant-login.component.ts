import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantLogin, RestaurantLoginService } from 'src/app/service/restaurant-login.service';


@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.css']
})
export class RestaurantLoginComponent implements OnInit {

  restloginname:string="";
  restloginmobilenumber:number=+91;
  restloginemail:string="";
  password:string="";
  res:RestaurantLogin=new RestaurantLogin(this.restloginname,this.restloginmobilenumber,this.restloginemail,this.password);

  constructor(private loginservice:RestaurantLoginService,private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.restloginname=this.route.snapshot.params['restloginname']; 
    
    this.res=new RestaurantLogin(this.restloginname,this.restloginmobilenumber,this.restloginemail,this.password);
  }

  saveRestaurant(){
    console.log("Inside register"+this.restloginname);
    this.loginservice.addRestaurant(this.res).subscribe(
      data=>{
        this.res=data;
        console.log(data);
        this.router.navigate(['RestaurantSignup']);
      }
  
    )
  }

}
