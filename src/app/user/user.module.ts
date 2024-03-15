import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModelComponent } from './auth-model/auth-model.component';
import { SharedModule } from '../shared/shared.module'; 
// import { ModelService } from '../services/model.service';



@NgModule({
  declarations: [
    AuthModelComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    AuthModelComponent
  ],
  // providers:[
  //   ModelService
  // ]
})
export class UserModule { }
