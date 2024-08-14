import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, User } from '../../service/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  user: User | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.fetchUserDetails(Number(this.userId));  // Ensure ID is a number
    }
  }

  fetchUserDetails(id: number): void {
    this.apiService.getRecordById(id).subscribe(userResponse => {
      // Extract user data from the response
      this.user = userResponse;
    });
  }
}
