import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface Message {
  message: string;
  sender: string;
  date: Date;
}

export class User {
  public status: boolean;
  private _username: string;
  private _fullName: string;

  private _messages: Message[] = [];
  private messagesSubscription: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  constructor(username?: string, fullName?: string, status?: boolean) {
    this._username = username;
    this._fullName = fullName;
    this.status = status;
  }

  get username(): string {
    return this._username;
  }

  get fullName(): string {
    return this._fullName;
  }

  addMessage(message: Message) {
    this._messages.push(message);
    this.messagesSubscription.next(this._messages);
  }

  resetMessages(messages: Message[]) {
    this._messages = messages;
    this.messagesSubscription.next(this._messages);
  }

  get messasges() {
    return this.messagesSubscription;
  }
}
