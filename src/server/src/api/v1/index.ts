import { Router } from 'express';

import { ArticleRouter } from './routes';

const router = Router();

router.use('/article', ArticleRouter);

router.get('/healthz', (_, res) => res.send('OK'));

export default router;
