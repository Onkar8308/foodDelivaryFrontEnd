import { Customer } from "./customer";
import { Item } from "./item";

export class Cart {

    constructor(
        public id:number,
       public  cust:Customer,
        public itemList:Item[],
        public paymentStatus:string
     ){
 
     }
}
