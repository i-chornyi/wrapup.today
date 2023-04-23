import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Autolinker from 'autolinker';
import { Wrapup } from '@wrapup/api-interfaces';

@Component({
  selector: 'wrapup-wrapup-card',
  templateUrl: './wrapup-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapupCardComponent implements OnInit, OnChanges {
  @Input() wrapup!: Wrapup;

  done!: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.done = changes['wrapup'].currentValue.done.replace(/\n/g, '<br />');
    // const links = this.done.match(/^(http|https):\/\/\S+.\S{2,}$/gim);
    const links = this.done.match(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gim,
    );
    console.log(links);
    this.done = Autolinker.link(this.done);
    console.log(this.done);
    // this.done = this.done.replace(//g);
  }
}
