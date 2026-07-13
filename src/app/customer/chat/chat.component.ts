import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  storeId = "";

  customerId = "";

  messages: any[] = [];

  newMessage = "";

  constructor(

    private route: ActivatedRoute,
    private messageService: MessageService

  ) {}

  ngOnInit(): void {

    this.customerId = localStorage.getItem("userId") || "";

    this.storeId = this.route.snapshot.paramMap.get("sellerId") || "";

    this.loadMessages();

  }

  loadMessages() {

    this.messageService.getConversation(

      this.storeId

    ).subscribe({

      next: (data: any) => {

        this.messages = data;

      },

      error: err => console.log(err)

    });

  }

  sendMessage() {

    if (!this.newMessage.trim()) return;

    const message = {

  sender: this.customerId,

  customer: this.customerId,

  store: this.storeId,

  message: this.newMessage

};

    this.messageService.sendMessage(message).subscribe({

      next: () => {

        this.newMessage = "";

        this.loadMessages();

      },

      error: err => console.log(err)

    });

  }

}
