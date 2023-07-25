import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../component/restaurants/restaurants.component';

@Injectable({
  providedIn: 'root'
})
export class DataRestaurantService {

  constructor(private http:HttpClient) { }

  retriveAllRestaurant(){
    return this.http.get<Restaurant[]>
      (`http://localhost:9999/getAllRestaurant`);
  }
  deleterest(id:number){
    return this.http.delete<Restaurant[]>
      (`http://localhost:9999/deleteRestaurantById/${id}`);
  }
}
