import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../service/api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;
  totalPages: number = 0;
  searchId: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(page: number = this.currentPage): void {
    this.apiService.getAllData(page, this.itemsPerPage).subscribe(response => {
      this.users = response.data;
      this.totalItems = response.total;
      this.totalPages = response.total_pages;
      this.filterUsers();  // Apply search filter after fetching data
    });
  }

  filterUsers(): void {
    if (this.searchId) {
      this.filteredUsers = this.users.filter(user =>
        user.id.toString().includes(this.searchId)
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchUsers(page);
  }

  onSearchChange(): void {
    this.filterUsers();
  }
}
