import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/class/admin';
import { AdminLoginService } from 'src/app/service/admin-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginData: { adminloginemail: string, adminloginpassword: string } = {

    adminloginemail: '',
   
    adminloginpassword: ''
   
   };
    constructor(private loginservice: AdminLoginService, private router: Router) { }
   
    loginValid() {
      console.log("Inside login");
      this.loginservice.getAdminByEmail(this.loginData.adminloginemail, this.loginData.adminloginpassword).subscribe(
      (data: Admin) => {
      if (data) {
      console.log("Login successful");
      sessionStorage.setItem("authenticatedAdmin",this.loginData.adminloginemail);
      console.log(data.username);
      this.router.navigate(['admin']);
   
    } else {
   
    console.log("Login failed");
   
    // Handle login failure, show error message, etc.
   
    }
   
    },
   
      (    error: any) => {
   
    console.error("Login error:", error);
   
    // Handle login error, show error message, etc.
   
    }
   
    );
   
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem('authenticateuser');
   // alert("user="+user);
    return !(user===null)
  }

  logout(){
    sessionStorage.removeItem("authenticateuser");
  }

}
