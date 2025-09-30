import admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging';

import { BaseService } from '../base';

export class FirebaseService extends BaseService {

  static client: admin.app.App;

  // auth

  static prepare() {
    if (!this.client) {
      this.client = admin.initializeApp({ credential: admin.credential.cert(JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, 'base64').toString('ascii'))) });
    }
  }
  
  static async notify(messages: Message[]) {
    this.prepare();
    while (messages.length > 500) {
      const batch = messages.splice(0, 500);
      await this.notify(batch);
    }
    const messaging = this.client.messaging();
    await messaging.sendEach(messages);
    console.log('notified!');
  }

}