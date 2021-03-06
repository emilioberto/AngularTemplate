import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  get<T>(persistenceKey: string): T {
    const item = localStorage.getItem(persistenceKey);
    if (!item) {
      return null;
    }
    return JSON.parse(item);
  }

  set(persistenceKey: string, value: any): void {
    localStorage.setItem(persistenceKey, JSON.stringify(value));
  }

  clear(): void {
    localStorage.clear();
  }

}
