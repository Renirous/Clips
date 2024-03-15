import { Component } from '@angular/core';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public model : ModelService){}

    openModel($event : Event){
      $event.preventDefault();
      this.model.toggeleModel();
    }
}
