import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../app.service';

@Component({
  selector: 'app-header[back],[id]',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() back: boolean = false;
  @Input() id: string = '';
  cover: string = '';
  color: string = '#ffffff';
  date: Date = new Date();
  bride: string = 'Bride';
  groom: string = 'Groom';
  bridePhoto: string = '';
  groomPhoto: string = '';
  showTime: string = '';
  seconds = 0;
  languageCode: any = null;
  heart: boolean = false;

  constructor(
    private readonly service: AppService,
    private readonly _router: Router
  ) {
  }

  ngOnInit(): void {
    this.service.couple().subscribe(res => {
      if (res == null) {
        this._router.navigate(['/join']).finally();
        return;
      }
      if (res == 1) {
        return;
      }
      this.color = res.theme.headerColor;
      this.bride = res.bride;
      this.bridePhoto = res.bridePhoto;
      this.groom = res.groom;
      this.groomPhoto = res.groomPhoto;
      this.cover = res.cover;
      this.heart = res.heart;
      this.date = res.date.toDate();
      const now = new Date();
      this.seconds = Math.round((this.date.getTime() - now.getTime()) / 1000);
      this.convertTime();
    });
  }

  convertTime(): void {
    setInterval(() => {
      const seconds = this.seconds;
      if (seconds <= 0) {
        this.showTime = 'Congratulations';
        return;
      }
      let dayTime = 60 * 60 * 24;
      const day = Math.floor(seconds / dayTime);
      let remainingTime = seconds - dayTime * day;
      let hoursTime = 60 * 60;
      const hour = Math.floor(remainingTime / hoursTime);
      remainingTime = remainingTime - hoursTime * hour;
      let minTime = 60;
      const minute = Math.floor(remainingTime / minTime);
      remainingTime = remainingTime - minTime * minute;
      const second = Math.floor(remainingTime);
      this.seconds--;
      this.showTime = `${day}:${hour}:${minute}:${second}`;
    }, 1000);
  }

  get getUrl(): string {
    return `url(${this.cover})`;
  }

  onBack(): void {
    if (!this.back) return;
    this._router.navigateByUrl(`/apps?id=${this.id}`).finally();
  }
}
