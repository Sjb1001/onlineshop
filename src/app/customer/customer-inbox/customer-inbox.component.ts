import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-customer-inbox',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './customer-inbox.component.html',
  styleUrls: ['./customer-inbox.component.css']
})
export class CustomerInboxComponent implements OnInit {

  conversations: any[] = [];

  constructor(

    private messageService: MessageService,

    private router: Router

  ) {}

  ngOnInit(): void {

    const customerId = localStorage.getItem("userId");

    if (!customerId) return;

    this.messageService.getCustomerInbox(customerId).subscribe({

      next: (data: any) => {

        this.conversations = data;

      },

      error: err => console.log(err)

    });

  }

  openChat(store: any) {

    this.router.navigate([

      "/chat",

      store._id

    ]);

  }

}
