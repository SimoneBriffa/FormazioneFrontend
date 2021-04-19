import { Component, OnInit } from '@angular/core';
import { ItemLentService } from 'src/service/itemlent.service';
import { ItemLentDTO } from 'src/dto/itemlentdto';
import { EmployeeService } from 'src/service/employee.service';
import { EmployeeDTO } from 'src/dto/employeedto';
import { ItemDTO } from 'src/dto/itemdto';
import { ItemService } from 'src/service/item.service';

@Component({
  selector: 'app-itemstracking',
  templateUrl: './itemstracking.component.html',
  styleUrls: ['./itemstracking.component.css']
})
export class ItemsTrackingComponent implements OnInit {

  constructor(private service: ItemLentService, private itemService: ItemService) { }

  itemsLent: ItemLentDTO[];
  listItems: ItemDTO[];
  filter: string;
  filteredList: ItemLentDTO[];
  results: string;

  ngOnInit() {
    this.trackItems();
    this.getItems();
  }

  filterList(filter: string): string{
    this.filteredList = [];
    for(let item of this.itemsLent) {
      if(item.itemName === filter)
        this.filteredList.push(item);
    }

    if(this.filteredList.length == 1){
      this.results = this.filteredList.length + " result for " + filter;
    } else {
      this.results = this.filteredList.length + " results for " + filter;
    }
    return this.results;

  }

  getItems(){
    this.itemService.getAll().subscribe(listItems => this.listItems = listItems);
  }

  trackItems() {
    this.service.getAll().subscribe(itemsLent => this.itemsLent = itemsLent);
  }

  downloadStandard(){
    this.service.downloadStandard().subscribe(() => this.itemsLent);
  }

  downloadTable(){
    this.service.downloadTable().subscribe(() => this.itemsLent);
  }
}
