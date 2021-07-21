import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { Type } from '@angular/core';

export const MODULES: Type<any>[] = [
  ButtonModule,
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule,
  InputTextModule,
  InputTextareaModule,
  InputSwitchModule,
  MessageModule,
  RippleModule,
  SidebarModule,
  ToastModule,
  PaginatorModule
];
