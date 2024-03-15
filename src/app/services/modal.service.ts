import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private visible = false;

  constructor() { }

  ismodalOpen (){
    return this.visible
  }

  toggelemodal(){
    this.visible = !this.visible;
  }
}
