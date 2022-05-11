const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/Courses.controller');

router.get('/create', courseController.create);
router.post('/store', courseController.store);

router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);

router.delete('/:id', courseController.delete);
router.delete('/:id/forced', courseController.forcedDelete);

router.patch('/:id/restore', courseController.restore)

router.get('/:slug', courseController.show);

module.exports = router;
