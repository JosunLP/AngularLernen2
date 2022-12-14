import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from 'src/app/components/star/star.component';

@NgModule({
  declarations: [StarComponent],
  imports: [CommonModule,],
  exports: [StarComponent, CommonModule, FormsModule],
})
export class SharedModule {}
