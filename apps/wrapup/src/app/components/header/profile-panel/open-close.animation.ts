import { animate, style, transition, trigger } from '@angular/animations';

export const openCloseAnimation = trigger('openClose', [
  transition(':enter', [
    style({ transform: 'translateY(-10px)', opacity: 0 }),
    animate('100ms', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('100ms', style({ transform: 'translateY(-10px)', opacity: '0' })),
  ]),
]);
