import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-apps',
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {

  id: string = this.activatedRoute.snapshot.queryParams['id'];
  home: string = '';
  restaurant: string = '';
  homeTitle: string = '';
  restaurantTitle: string = '';
  custom: string = '';
  customTitle: string = '';
  bgImage: string | undefined;

  constructor(
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {

    if (this.id === undefined) {
      this.router.navigate(['/join']).finally();
      return;
    }
    this.appService.onStart(this.id);
    this.appService.couple().subscribe(res => {
      if (res == 1){
        return;
      }
      this.bgImage = res?.theme.bgImage;
      const map = this.activatedRoute.snapshot.queryParams['map'];
      if (map !== undefined) {
        this.custom = map;
        this.customTitle = this.activatedRoute.snapshot.queryParams['title'];
      } else {
        this.home = res?.home ?? '';
        this.restaurant = res?.restaurant ?? '';
        this.homeTitle = res?.homeTitle ?? 'ទីតាំងមង្គលការ';
        this.restaurantTitle = res?.restaurantTitle ?? 'ទីតាំងពិសារភោជនាហារ';
      }
    });
  }

  getClass(): string {
    if (this.restaurant != '') {
      return 'md:grid-cols-2';
    }
    return '';
  }
}
