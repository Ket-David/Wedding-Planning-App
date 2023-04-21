import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {App, Couple, Theme} from 'src/app/app.model';
import {AppService} from 'src/app/app.service';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styles: [
    `
      .circle-card {
        width: 40vw !important;
        height: 40vw !important;

      }

      .circle-card .icon {
        width: 20vw !important;
        height: 20vw !important;
      }
    `
  ]
})
export class AppsComponent implements OnInit {

  id: string = this.activatedRoute.snapshot.queryParams['id'];
  apps: App[] = [];
  bgImage: string | undefined;
  background: string | undefined
  color: string | undefined;
  frame: string | undefined;

  constructor(
    private readonly service: AppService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    if (this.id === undefined) {
      this.router.navigate(['/join']).finally();
      return;
    }
    this.service.onStart(this.id);
    this.service.couple().subscribe(res => {
      if (res == 1){
        return;
      }
      this.bgImage = res?.theme.bgImage;
      this.background = res?.theme.bgColor;
      this.color = res?.theme.textColor;
      this.frame = `url(${res?.frame})`;
    });
    this.service.apps.subscribe(res => {
      this.apps = res;
    });
  }

  onApp(item: App): void {
    if (item.disabled) {
      this.snackBar.open('Can not open Now!');
      return;
    }
    let path = `${item.path}?id=${this.id}`;
    if (item.value) {
      path = `${path}&map=${item.value}&title=${item.name}`;
    }
    this.router.navigateByUrl(path).finally();
  }
}
