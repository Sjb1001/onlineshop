import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seller-management',
  templateUrl: './seller-management.component.html',
  styleUrls: ['./seller-management.component.css']
})
export class SellerManagementComponent implements OnInit {

  sellers: any[] = [];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.loadSellers();

  }

  loadSellers() {

    this.userService.getSellers().subscribe({

      next: (data: any) => {

        this.sellers = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  changeStatus(seller: any) {

  const newStatus =
    seller.status === 'Active'
      ? 'Inactive'
      : 'Active';

  this.userService
      .updateSellerStatus(seller._id, newStatus)
      .subscribe({

        next: () => {

          seller.status = newStatus;

          alert('Seller status updated.');

        },

        error: (err) => {

          console.log(err);

        }

      });

}

}
