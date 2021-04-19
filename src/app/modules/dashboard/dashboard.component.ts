import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
    
    constructor(
        private router: Router
    ) { }

    isUserAuthenticated() {
        const token: string = localStorage.getItem("jwt")
        console.log(token)
        if (token) {
            return true
        } else {
            return this.router.navigate(["login"])
        }
    }

    logOut() {
        localStorage.removeItem("jwt")
    }
}