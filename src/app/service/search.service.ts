import { Injectable } from '@angular/core';

interface HasStringIndex {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() { }

  // Function to filter items by a search term
  filterItems<T extends HasStringIndex>(items: T[], searchTerm: string, searchKey: string): T[] {
    if (!searchTerm) return items;

    const lowerCaseTerm = searchTerm.toLowerCase();
    return items.filter(item => 
      item[searchKey]?.toString().toLowerCase().includes(lowerCaseTerm)
    );
  }
}
