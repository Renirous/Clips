import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private visible = false;

  constructor() { }

  isModelOpen (){
    return this.visible
  }

  toggeleModel(){
    this.visible = !this.visible;
  }
}
