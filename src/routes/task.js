
// export default router

import express from 'express';
import taskController from '../controllers/task.js';

const router = express.Router();

router.post('/create', taskController.createTask);
router.put('/submit/:taskId', taskController.submitTask);
router.get('/taskID/:taskId', taskController.getTaskbyTaskId);
router.get('/user', taskController.getTaskById);
router.get('/tasks/status', taskController.getTasksByStatus);
router.get('/tasks', taskController.getAllTask);
router.put('/edit/:taskId', taskController.editTask);
router.delete('/delete/:taskId', taskController.deleteTask);

export default router;