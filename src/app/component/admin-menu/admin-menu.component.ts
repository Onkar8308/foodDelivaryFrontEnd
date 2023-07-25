import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent {

  constructor(private router:Router){}
  
  customerview(){ 
    this.router.navigate(['customer']); 
  }
  resturantview(){
    this.router.navigate(['restaurant'])
  }

}