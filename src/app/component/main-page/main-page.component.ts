import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../../service/api.service';
import { PaginationService } from '../../service/pagination.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  users: User[] = [];
  searchText = '';
  page = 1;
  itemsPerPage = 6;
  totalItems = 0;

  constructor(
    private apiService: ApiService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(page: number = this.page): void {
    this.apiService.getAllData(page, this.itemsPerPage).subscribe(response => {
      this.users = response.data;
      this.totalItems = response.total;
    });
  }

  get filteredUsers(): User[] {
    // Use the pagination service to get the correct page of data
    const filtered = this.paginationService.getPaginatedItems(this.users, this.page, this.itemsPerPage);
    return filtered;
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchUsers(page);
  }
}
