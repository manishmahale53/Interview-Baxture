import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrl: './user-upsert.component.css'
})
export class UserUpsertComponent implements OnInit {
  showToast:boolean = false;
  allUsers:any = []
  msg:string = ''
  userToEdit:any

  constructor(private router: Router, private fb: FormBuilder, private service: DataService){}

  ngOnInit(): void {
    this.getAllUsers();
    this.getTableData();
  }

  userForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    address: ['', Validators.required]
  })

  onSubmit(){
    if(this.checkIfUserExists()){
      console.log('user already exists')
      this.msg = 'User already exists !!'
      this.showToast = true;
      setTimeout(()=> {
        this.hideToast();
      }, 2000)
    }else{
      this.service.addData(this.userForm.value).subscribe((res)=>{
        if(res){
        }
      })
      this.showToast = true;
    }

    this.updateUserData(this.userToEdit.id, {...this.userToEdit,...this.userForm.value})
    this.router.navigate(['/user-list'])
  }

  getFormFieldErrors(formControl: string){
    return this.userForm.get(formControl)?.errors
  }

  getAllUsers(){
    this.service.getData().subscribe((res)=> {
      if(res){
        this.allUsers = res;
        console.log('users in form', this.allUsers)
      }
    })
  }

  checkIfUserExists(){
    let result = false
    this.allUsers.forEach((user:any)=> {
       if(user.firstName == this.userForm.value.firstName && user.email == this.userForm.value.email){
          result = true
       }
    })
    return result;
  }

  hideToast(){
    this.showToast = false;
  }

  getTableData(){
     this.userToEdit = this.service.userSubject
    if(this.userToEdit){
      console.log(this.userToEdit)
      this.userForm.patchValue(this.userToEdit)
    }
  }

  updateUserData(id:any, obj:any){
    this.service.updateData(id, obj).subscribe((res)=> {
      if(res){
        console.log('user updated')
      }
    })
  }

  goToList(){
    this.router.navigate(['/user-list'])
  }

}
