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

  async init() {
    this.sleepDB = await this.storage.create();
  }

  async set(key: string, value: any) {
    await this.sleepDB?.set(key, value);
  }

  async get(key: string) {
    return this.sleepDB?.get(key);
  }

  async remove(key: string) {
    await this.sleepDB?.remove(key);
  }
}
