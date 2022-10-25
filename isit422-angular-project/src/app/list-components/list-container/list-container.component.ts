import { Component, OnInit } from '@angular/core';
import { LIST_OVERVIEW } from '../list-component-interfaces/mock-list-overview';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css']
})
export class ListContainerComponent implements OnInit {

  listOverview = LIST_OVERVIEW;

  constructor() { }

  ngOnInit(): void {
  }

}
