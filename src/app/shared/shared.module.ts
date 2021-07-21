import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { COMPONENTS } from '.';
import { PrimeNgModule } from '@shared/prime-modules/prime-ng.module';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PrimeNgModule
  ],
  exports: [
    ...COMPONENTS,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class SharedModule {
}
