import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class ClipComponent implements OnInit{
  @ViewChild('videoPlayer') target? : ElementRef
  player? : Player

  public id :string = ''

  constructor(
    private route : ActivatedRoute
  ){}

    ngOnInit(): void {
        this.player = videojs(this.target?.nativeElement)

        this.route.params.subscribe((params : Params)=>{
         this.id = params['id']
        })
    }
}
