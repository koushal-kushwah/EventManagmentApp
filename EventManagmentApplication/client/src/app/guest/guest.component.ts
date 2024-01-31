import { Component, OnInit } from '@angular/core';
import { GuestService } from './guest.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  guests: any[] = [];
  isUpdateMode: boolean = false;
  selectedGuest: any = {};
  newGuest: any = {};

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests(): void {
    this.guestService.fetchAllGuests().subscribe((data: any = []) => {
      this.guests = data;
    });
  }

  addGuest(): void {
    if (!this.newGuest.unique_code) {
      this.newGuest.unique_code = null;
    }
    if (!this.newGuest.designation) {
      this.newGuest.designation = null;
    }
    if (!this.newGuest.email) {
      this.newGuest.email = null;
    }
    if (!this.newGuest.phone) {
      this.newGuest.phone = null;
    }
    if (!this.newGuest.address) {
      this.newGuest.address = null;
    }
    if (!this.newGuest.type) {
      this.newGuest.type = null;
    }
    if (!this.newGuest.company) {
      this.newGuest.company = null;
    }

    this.guestService.addGuest(this.newGuest).subscribe((data) => {
      this.loadGuests();
      this.newGuest = {};
    });
  }


  updateGuest(): void {
    this.guestService.updateGuest(this.selectedGuest.id, this.selectedGuest).subscribe((data) => {
      this.loadGuests();
      this.isUpdateMode = false;
      this.selectedGuest = {};
    });
  }

  editGuest(guest: any): void {
    this.isUpdateMode = true;
    this.selectedGuest = { ...guest };
  }

  deleteGuest(id: number): void {
    this.guestService.deleteGuest(id).subscribe((data) => {
      this.loadGuests();
    });
  }



  CSV() {
    let csvContent = 'data:text/csv;charset=utf-8,';
  
    const headers = [
      'id',
      'event_id',
      'name',
      'unique_code',
      'email',
      'phone',
      'address',
      'company',
      'type'
    ];
    csvContent += headers.join(',') + '\n';
  
    this.guests.forEach((guest: any) => {
      const row = [
        guest.id,
        guest.event_id,
        guest.name,
        guest.unique_code,
        guest.email == null ? 'NULL' : guest.email,
        guest.phone,
        guest.address,
        guest.company,
        guest.type
      ];
      csvContent += row.join(',') + '\n';
    });
  
    const dataUri = encodeURI(csvContent);
  
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'mycsv.csv');
    link.click();
  }
  
}

