import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../../services/message.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-seller-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './seller-chat.component.html',
  styleUrls: ['./seller-chat.component.css']
})
export class SellerChatComponent implements OnInit {

  customerId = "";

  store: any;

  messages: any[] = [];

  newMessage = "";

  sellerId = "";

  constructor(

    private route: ActivatedRoute,

    private messageService: MessageService,

    private storeService: StoreService

  ) {}

  ngOnInit(): void {

    this.customerId = this.route.snapshot.paramMap.get("customerId") || "";

    this.sellerId = localStorage.getItem("userId") || "";

    this.storeService.getStoreByOwner(this.sellerId).subscribe({

      next: (store: any) => {

        this.store = store;

        this.loadMessages();

      }

    });

  }

  loadMessages() {

  console.log("Store ID:", this.store._id);
  console.log("Customer ID:", this.customerId);

  this.messageService.getStoreCustomerConversation(

    this.store._id,

    this.customerId

  ).subscribe({

    next: (data: any) => {

      console.log("Messages:", data);

      this.messages = data;

    },

    error: (err: any) => {

      console.log(err);

    }

  });

}

  sendMessage() {

    const body = {

      sender: this.sellerId,

      customer: this.customerId,

      store: this.store._id,

      message: this.newMessage

    };

    this.messageService.sendMessage(body).subscribe({

      next: () => {

        this.newMessage = "";

        this.loadMessages();

      }

    });

  }

}
