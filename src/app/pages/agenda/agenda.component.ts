import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-apps',
  templateUrl: './agenda.component.html',
  styles: [
    `
      .title {
        font-family: 'Moul', cursive !important;
      }
      .agenda {
        font-family: 'Preahvihear', sans-serif !important;
      }
      .time {
        min-width: 8rem !important;
      }
    `
  ]
})
export class AgendaComponent implements OnInit {

  id: string = this.activatedRoute.snapshot.queryParams['id'];
  bgImage: string | undefined;
  agendas: Agenda[] = [];
  constructor(
    private readonly service: AppService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

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
    });
    this.service.agendas.subscribe(res => {
      this.agendas = res;
    });
  }

}
