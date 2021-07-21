export class NgDropdownItem {
  label?: string;
  value: any;
}

export type NgErrorType =
  | 'min'
  | 'max'
  | 'required'
  | 'email'
  | 'minLength'
  | 'maxLength'
  | 'requiredTrue'
  | 'pattern'
  | 'nullValidator';

export type NgError = {
  [errorTypes in NgErrorType]: string;
};

export type NgInputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
