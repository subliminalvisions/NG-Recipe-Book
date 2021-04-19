import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() stateEvent = new EventEmitter<string>();
  crrState: string;
   
  constructor() { }

  ngOnInit(): void {
  }

  emitState(value: string) {    
    if (value) {  
      this.crrState = value;
      this.stateEvent.emit(this.crrState);
    } else {value=''}
  }

}
