import { Component } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
    constructor( public model : ModelService){}

    closeModel($event : Event){
      this.model.toggeleModel()
    }
}
