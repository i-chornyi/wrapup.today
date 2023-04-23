import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputComponent, TextareaComponent],
  exports: [InputComponent, TextareaComponent],
})
export class InputModule {}
