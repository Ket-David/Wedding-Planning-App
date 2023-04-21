import {Component, OnInit} from '@angular/core';
import {Agenda} from 'src/app/app.model';
import {AppService} from 'src/app/app.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-apps',
  templateUrl: './join.component.html',
})
export class JoinComponent implements OnInit {

  agendas: Agenda[] = [];

  constructor(
    private readonly router: Router,
    private readonly service: AppService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if (id) {
      this.router.navigateByUrl(`/apps?id=${id}`).finally();
    }
  }
}
