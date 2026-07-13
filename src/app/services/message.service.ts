  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { environment } from 'src/environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class MessageService {

    apiUrl = environment.apiUrl + "/messages";

    constructor(private http: HttpClient) { }

    sendMessage(message: any) {

      return this.http.post(this.apiUrl, message);

    }

    getConversation(storeId: string) {

      return this.http.get(

        this.apiUrl + "/" + storeId

      );

    }

    getInbox(storeId: string) {

    return this.http.get(

      this.apiUrl + "/store/" + storeId + "/inbox"

    );

  }

  getStoreCustomerConversation(storeId: string, customerId: string) {

    return this.http.get(

      this.apiUrl +

      "/store/" +

      storeId +

      "/customer/" +

      customerId

    );

  }

  }
