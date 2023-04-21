import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar[name],[photo]',
  templateUrl: './avatar.component.html',
  styles: [`
    .avatar {
      width: 20vw !important;
      height: 20vw !important;
    }`]
})
export class AvatarComponent {

  @Input() name!: string;
  @Input() photo!: string;

  get getUrl(): string {
    return `url(${this.photo})`;
  }
}
