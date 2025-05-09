import { Router } from 'express';

const router = Router();

router.get('/dummy', (req, res) => {
    res.json({ message: 'This is a dummy endpoint!' });
});

export default router;