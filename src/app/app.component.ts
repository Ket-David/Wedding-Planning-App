import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, Observable} from 'rxjs';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  back: boolean = false;
  readonly couple$: Observable<any>;

  constructor(
    readonly router: Router,
    readonly activatedRoute: ActivatedRoute,
    private readonly service: AppService
  ) {
    // activatedRoute.queryParams
    //   // .pipe(filter((f) => f['id']))
    //   .subscribe((params: any) => {
    //     console.log(params);
    //     if (params['id']) {
    //       this.service.onStart(params.id);
    //     } else {
    //       // router.navigate(['/']).finally();
    //     }
    //   });
    router.events
      .pipe(filter((f) => f instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.back = res.url !== '/' && res.url !== '/apps';
      });
    this.couple$ = this.service.couple();
  }

  ngOnInit(): void {

  }


}
