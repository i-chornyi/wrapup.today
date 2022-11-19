import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'wrapup-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() theme: 'primary' | 'secondary' | 'default' | 'negative' = 'default';
  @Input() disabled = false;

  @Input() beforeIcon!: string;
  @Input() afterIcon!: string;

  constructor() {}

  get classes() {
    const classes = '';

    // switch (this.type) {
    //   case 'primary':
    //     classes += ' border-blue bg-blue-transparent';
    //     break;
    // }

    return classes;
  }

  get color() {
    switch (this.theme) {
      // case 'primary':
      //   return 'text-blue border-blue bg-blue-transparent hover:bg-blue-hover';

      case 'default':
        return 'bg-grey-50 border-grey-300 text-grey-700 hover:bg-grey-200';
      case 'primary':
        return 'bg-blue-50 border-blue text-blue hover:bg-blue-100';
      case 'negative':
        return 'bg-red-50 border-red text-red hover:bg-red-100';
      default:
        return '';
    }
  }
}
