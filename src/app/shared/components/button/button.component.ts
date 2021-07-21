import { Component, Input, OnInit } from '@angular/core';
import { NgColor } from '@shared/models/color';
import { NgButtonAppearance, NgButtonType } from '@shared/models/button';

@Component({
  selector: 'ng-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {'[class.full]': 'full'}
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() appearance: NgButtonAppearance;
  @Input() disabled: boolean = false;
  @Input() full: boolean = false;
  @Input() type: NgButtonType = 'button';
  @Input() color: NgColor = 'primary';

  constructor() {
  }

  ngOnInit(): void {
  }
}
