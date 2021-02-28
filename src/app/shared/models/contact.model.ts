export class Contact {
  email: string;
  type: string;
  message: string;
  token: string;

  constructor() {
    this.email = '';
    this.type = 'message';
    this.message = '';
    this.token = '';
  }
}
