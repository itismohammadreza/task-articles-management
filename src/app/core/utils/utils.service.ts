import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { NgMessage } from '@shared/models/overlay';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private resolver: ComponentFactoryResolver
  ) {
  }

  showToast(
    message: NgMessage,
    vcRef: ViewContainerRef
  ) {
    if (vcRef.length == 0) {
      const factory = this.resolver.resolveComponentFactory(ToastComponent);
      vcRef.createComponent(factory);
    }
    const _message = new NgMessage();
    Object.assign(_message, message);
    setTimeout(() => {
      this.messageService.add(_message);
    }, 0);
  }

  successfullToast(message: string, vcRef: ViewContainerRef): void {
    return this.showToast(
      {
        summary: 'Well Done',
        detail: message,
        severity: 'success'
      },
      vcRef
    );
  }
}
