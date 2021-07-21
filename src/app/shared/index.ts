import { Type } from '@angular/core';
import { NavbarMenuComponent } from '@shared/components/navbar-menu/navbar-menu.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { InputTextComponent } from '@shared/components/input-text/input-text.component';
import { InputTextareaComponent } from '@shared/components/input-textarea/input-textarea.component';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { SidebarListComponent } from '@shared/components/sidebar-list/sidebar-list.component';
import { TableComponent } from '@shared/components/table/table.component';
import { LimitToPipe } from '@shared/pipe/limit-to.pipe';

export const COMPONENTS: Type<any>[] = [
  LimitToPipe,
  NavbarMenuComponent,
  ButtonComponent,
  DropdownComponent,
  InputTextComponent,
  InputTextareaComponent,
  ToastComponent,
  SidebarListComponent,
  TableComponent
];
