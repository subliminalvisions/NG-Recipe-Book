import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  // @Output() stateEvent = new EventEmitter<string>();
  // crrState: string;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
  }
  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }
  onFetchData(): void {
    this.dataStorageService.fetchRecipes();
  }

  // emitState(value: string) {
  //   if (value) {
  //     this.crrState = value;
  //     this.stateEvent.emit(this.crrState);
  //   } else {value=''}
  // }

}
