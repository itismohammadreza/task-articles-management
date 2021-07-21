import { Component, EventEmitter, forwardRef, InjectFlags, Injector, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  FormGroupName,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel
} from '@angular/forms';
import { NgError } from '@shared/models/forms';

@Component({
  selector: 'ng-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() errors: NgError;
  @Input() options: any[];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() disabled: boolean = false;
  @Input() placeholder: string;
  @Output() onChange = new EventEmitter();

  inputId: string;
  controlContainer: FormGroupName | FormGroupDirective;
  ngControl: NgControl;

  constructor(private injector: Injector) {
  }

  onModelChange: any = (_: any) => {
  };

  onModelTouched: any = () => {
  };

  ngOnInit() {
    let parentForm: FormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.inputId = this.getId();
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      InjectFlags.Optional || InjectFlags.Host || InjectFlags.SkipSelf
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    if (this.controlContainer && this.ngControl) {
      parentForm = this.controlContainer.control;
      rootForm = this.controlContainer.formDirective as FormGroupDirective;
      if (this.ngControl instanceof NgModel) {
        currentControl = this.ngControl.control;
      }
      else if (this.ngControl instanceof FormControlName) {
        currentControl = parentForm.get(this.ngControl.name.toString());
      }
      rootForm.ngSubmit.subscribe(() => {
        if (!this.disabled) {
          currentControl.markAsTouched();
        }
      });
    }
  }

  _onChange(event) {
    this.onChange.emit(event);
    this.onModelChange(event.value);
  }

  _onBlur() {
    this.onModelTouched();
  }

  getId() {
    return Math.random().toString(36).substr(2, 9);
  }

  isInvalid(formControl: AbstractControl) {
    return (
      (formControl.invalid && formControl.touched) ||
      (formControl.invalid && formControl.dirty)
    );
  }

  showError(errorType: string): boolean {
    return (
      this.isInvalid(this.ngControl.control) &&
      this.ngControl.control.hasError(errorType.toLowerCase())
    );
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
  }
}
