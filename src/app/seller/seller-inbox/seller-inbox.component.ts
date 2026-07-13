import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MessageService } from '../../services/message.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-seller-inbox',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './seller-inbox.component.html',
  styleUrls: ['./seller-inbox.component.css']
})
export class SellerInboxComponent implements OnInit {

  conversations: any[] = [];

  store: any;

  constructor(

    private messageService: MessageService,

    private storeService: StoreService,

    private router: Router

  ) {}

  ngOnInit(): void {

    const ownerId = localStorage.getItem("userId");

    if (!ownerId) return;

    this.storeService.getStoreByOwner(ownerId).subscribe({

      next: (store: any) => {

        this.store = store;

        this.loadInbox();

      }

    });

  }

  loadInbox() {

    this.messageService.getInbox(

      this.store._id

    ).subscribe({

      next: (data: any) => {

        this.conversations = data;

      },

      error: err => console.log(err)

    });

  }

  openChat(customer: any) {

    this.router.navigate([

      "/seller/chat",

      customer._id

    ]);

  }

}
