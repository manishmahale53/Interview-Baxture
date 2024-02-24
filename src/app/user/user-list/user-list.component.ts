import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  allUsers:any = []
  showToast:boolean = false;

  constructor(private router: Router, private service: DataService){}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.service.getData().subscribe((res)=> {
      if(res){
        this.allUsers = res
        console.log('table data', this.allUsers)
      }
    })
  }

  deleteUserData(id: number){
    this.service.deleteData(id).subscribe((res)=> {
      if(res){
        console.log('user deleted')
      }
      this.getUserData();
      this.showToast = true;
      setTimeout(() => {
        this.hideToast();
      }, 2000) 
    })
  }

  editUserData(user:number){
    console.log('edit user', user)
    this.service.getDataFromTable(user)
    this.router.navigate(['/user-upsert'])
  }

  hideToast(){
    this.showToast = false;
  }

 

  goToAddUser(){
    this.router.navigate(['/user-upsert'])
    this.service.getDataFromTable()
  }

}
