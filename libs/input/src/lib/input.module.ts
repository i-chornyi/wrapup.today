import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from './components/textarea/textarea.component';
import { FormControlErrorPipe } from './pipes/form-control-error.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputComponent, TextareaComponent, FormControlErrorPipe],
  exports: [InputComponent, TextareaComponent, FormControlErrorPipe],
})
export class InputModule {}
