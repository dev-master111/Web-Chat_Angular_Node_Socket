import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {
  @Input() message: Message = {
    message: '',
    sender: '',
    date: new Date()
  };

  constructor() { }

  ngOnInit() {
  }
}
