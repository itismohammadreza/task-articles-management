export type NgMessageSeverities = 'success' | 'info' | 'warn' | 'error';

export class NgMessage {
  severity?: NgMessageSeverities;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;

  constructor() {
    this.severity = 'info';
    this.life = 3000;
    this.sticky = false;
    this.closable = true;
    this.summary = null;
    this.detail = null;
    this.id = null;
    this.data = null;
  }
}
