import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

export type ButtonSize = 's' | 'm' | 'l';
export type ButtonTheme = 'primary' | 'default' | 'negative';

const BASE_BUTTON_CLASSES: string[] = [
  'flex',
  'items-center',
  'border',
  'font-medium',
  'whitespace-nowrap',
  'cursor-pointer',
  'bg-opacity-30',
  'hover:bg-opacity-50',
];

const BUTTON_SIZE_CLASSES: { [key in ButtonSize]: string[] } = {
  s: ['h-7', 'px-4', 'text-sm', 'rounded-lg', 'border-2'],
  m: ['h-10', 'px-8', 'text-base', 'rounded-xl'],
  l: ['h-14', 'px-14', 'text-lg', 'rounded-2xl'],
};

const BUTTON_THEME_CLASSES: { [key in ButtonTheme]: string[] } = {
  default: ['bg-gray-600', 'border-gray-600', 'border-2'],
  primary: [
    'border-blue-500',
    'border-4',
    'text-grey-700',
    'bg-blue',
    'hover:bg-blue-hover',
  ],
  negative: ['bg-red-700', 'border-4', 'border-red-700', 'text-red'],
};

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[wrapupButton]',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() theme: ButtonTheme = 'default';
  @Input() size: ButtonSize = 'm';
  @Input() disabled = false;

  @Input() beforeIcon!: string;
  @Input() afterIcon!: string;

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {}

  ngOnInit() {
    this.applyBaseClasses();
    this.applySizeClasses();
    this.applyThemeClasses();
  }

  applyBaseClasses() {
    this.addClassesToHostElement(BASE_BUTTON_CLASSES);
  }

  applySizeClasses() {
    this.addClassesToHostElement(BUTTON_SIZE_CLASSES[this.size]);
  }

  applyThemeClasses() {
    this.addClassesToHostElement(BUTTON_THEME_CLASSES[this.theme]);
  }

  addClassesToHostElement(classes: string[]) {
    this.elementRef.nativeElement.classList.add(...classes);
  }
}
