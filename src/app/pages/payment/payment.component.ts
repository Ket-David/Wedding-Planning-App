import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-apps',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  id: string = this.activatedRoute.snapshot.queryParams['id'];
  pay: string = '';
  link: string | null = null;
  name: string | null = null;
  bgImage: string | undefined;

  constructor(
    private readonly service: AppService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    if (this.id === undefined) {
      this.router.navigate(['/join']).finally();
      return;
    }
    this.service.onStart(this.id);
    this.service.couple().subscribe((res: any) => {
      if (res == 1) {
        return;
      }
      this.bgImage = res?.theme.bgImage;
      this.pay = res.payment;
      this.name = res.paymentName;
      this.link = res.paymentLink;
    });
  }

}
