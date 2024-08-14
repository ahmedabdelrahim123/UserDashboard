import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define the interfaces for the API response and user data
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

export interface UserResponse {
  data: User;
  support: {
    url: string;
    text: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://reqres.in/api/users';  // API base URL

  constructor(private http: HttpClient) { }

  /**
   * Fetch all data with pagination.
   * @param page The page number to fetch.
   * @param perPage The number of items per page.
   * @returns Observable<ApiResponse>
   */
// Updated API Service
getAllData(page: number = 1, perPage: number = 6, searchId: string = ''): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}&per_page=${perPage}`)
    .pipe(
      map(response => ({
        ...response,
        data: response.data.filter(user => user.id.toString().includes(searchId))
      })),
      catchError(this.handleError<ApiResponse>('getAllData'))
    );
}


  /**
   * Fetch a single record by ID.
   * @param id The ID of the user to fetch.
   * @returns Observable<User>
   */
  getRecordById(id: number): Observable<User> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data),  // Extract the `data` property
        catchError(this.handleError<User>('getRecordById'))
      );
  }

  /**
   * Handle HTTP operation errors.
   * @param operation The name of the operation that failed.
   * @param result The default result to return in case of an error.
   * @returns A function that takes an error and returns an Observable.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}