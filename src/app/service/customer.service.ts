import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../class/customer';
import { CustomerAddress } from '../class/customer-address';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  baseUrl:string="http://localhost:9999";
  public getCustomerAddByEmail(email:string){
    return  this.http.get<CustomerAddress>(`${this.baseUrl}/getCustomerAddByEmail/${email}`);
  }

  public getCustomerByEmail(email:string){
    return  this.http.get<Customer>(`${this.baseUrl}/getCustomerByEmail/${email}`);
  }
}
