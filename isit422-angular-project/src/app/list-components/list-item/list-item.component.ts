import { Component, OnInit } from '@angular/core';
import { LIST_ITEM } from '../list-component-interfaces/mock-list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  listItem = LIST_ITEM;

  constructor() { }

  ngOnInit(): void {
  }

}
