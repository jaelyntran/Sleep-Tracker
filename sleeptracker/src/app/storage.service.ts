import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private sleepDB: Storage | null = null;

  constructor(private storage: Storage) {
    console.log('StorageService initialized');
    this.init();
  }

  async init(): Promise<void> {
    this.sleepDB = await this.storage.create();
  }

  async set(key: string, value: any): Promise<void> {
    await this.sleepDB?.set(key, value);
  }

  async get(key: string): Promise<any> {
    return this.sleepDB?.get(key);
  }

  async remove(key: string): Promise<any> {
    await this.sleepDB?.remove(key);
  }

  async clearAll(): Promise<void> {
    const allKeys = await this.sleepDB?.keys();

    if (!allKeys || allKeys.length === 0) {
      console.log('No data to clear');
      return;
    }

    await this.sleepDB?.clear();
    console.log('All data has been cleared');
  }
}
