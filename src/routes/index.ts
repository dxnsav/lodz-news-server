import { Router } from 'express';
import { getNews, addNews, updateNews } from '../controllers/news';

const router: Router = Router();

router.get('/news', getNews);
router.post('/add-news', addNews);
router.put('/update-news/:id', updateNews);

export default router;
