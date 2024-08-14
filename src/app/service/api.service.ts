import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, finalize, delay } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://reqres.in/api/users';  // API base URL
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Fetch all data with pagination, including delay to visualize loading.
   * @param page The page number to fetch.
   * @param perPage The number of items per page.
   * @param searchId The ID to search for.
   * @returns Observable<ApiResponse>
   */
  getAllData(page: number = 1, perPage: number = 6, searchId: string = ''): Observable<ApiResponse> {
    this.loadingSubject.next(true); // Start loading
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}&per_page=${perPage}`)
      .pipe(
        delay(1000), // Add a delay of 1000ms (1 second) to simulate loading
        map(response => ({
          ...response,
          data: response.data.filter(user => user.id.toString().includes(searchId))
        })),
        catchError(this.handleError<ApiResponse>('getAllData')),
        finalize(() => this.loadingSubject.next(false)) // Stop loading
      );
  }

  /**
   * Fetch a single record by ID, including delay to visualize loading.
   * @param id The ID of the user to fetch.
   * @returns Observable<User>
   */
  getRecordById(id: number): Observable<User> {
    this.loadingSubject.next(true); // Start loading
    return this.http.get<{ data: User }>(`${this.apiUrl}/${id}`)
      .pipe(
        delay(1000), // Add a delay of 1000ms (1 second) to simulate loading
        map(response => response.data),
        catchError(this.handleError<User>('getRecordById')),
        finalize(() => this.loadingSubject.next(false)) // Stop loading
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
