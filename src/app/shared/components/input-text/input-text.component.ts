import { Component, EventEmitter, forwardRef, InjectFlags, Injector, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel
} from '@angular/forms';
import { NgError } from '@shared/models/forms';

@Component({
  selector: 'ng-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() errors: NgError;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string;
  @Input() type: string;
  @Output() onInput = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onKeydown = new EventEmitter();
  @Output() onKeyup = new EventEmitter();

  inputId: string;
  controlContainer: FormGroupDirective;
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
    const inputElement = event.target as HTMLInputElement;
    this.onChange.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onInput(event) {
    const inputElement = event.target as HTMLInputElement;
    this.onInput.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onBlur() {
    this.onModelTouched();
  }

  _onKeydown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.onKeydown.emit(event);
    this.onModelChange(inputElement.value);
  }

  _onKeyup(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.onKeyup.emit(event);
    this.onModelChange(inputElement.value);
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
