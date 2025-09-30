import { MailTemplate, MailTemplateParams } from '../base';

export type WelcomeTemplateProps = MailTemplateParams;

export class WelcomeTemplate extends MailTemplate<WelcomeTemplateProps> {

  constructor(params: WelcomeTemplateProps) {
    super({
      content: [
        'Nice you finally made at least one healthy decision today by installing this app!',
        'If you enjoy using Drunk Mode please consider leaving us a review in the App Store 🙏 It would help us out greatly!',
        { text: 'Leave a Review', url: process.env.APPLE_APP_STORE_URL },
        'Fell free to also follow us on Instagram and TikTok for feature updates, polls, and early supporter event giveaways!',
        { text: 'Instagram', url: process.env.INSTAGRAM_URL ?? 'https://www.instagram.com/drunkmode.app?igsh=MWQ0dDFxNWVsYnht&utm_source=qr' },
        { text: 'TikTok', url: process.env.TIKTOK_URL ?? 'https://www.tiktok.com/@drunkmode.app?_t=8m4jP3r8J1m&_r=1' },
      ],
      params,
      subject: 'Welcome, to the Drunk Zone',
    });
  }

}