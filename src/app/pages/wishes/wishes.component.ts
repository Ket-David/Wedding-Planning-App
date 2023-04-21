import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Wish } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { WishComponent } from '../wish/wish.component';

@Component({
  selector: 'app-apps',
  templateUrl: './wishes.component.html'
})
export class WishesComponent implements OnInit {

  wishes: Wish[] = [];
  constructor(private readonly service: AppService, private readonly dialog: MatDialog,) { }

  ngOnInit(): void {
    this.service.wishes.subscribe(res => {
      this.wishes = res;
    });
  }

  onWish(item: Wish): void {
    this.dialog.open(WishComponent, { data: item, maxHeight: '90vh' });
  }

  getUrl(path: string): string {
    return `url(${path})`;
  }
}
