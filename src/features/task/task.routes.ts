import {Router} from 'express'
import {TaskController} from "./task.controller"
import {TaskService} from "./task.service";

const service = new TaskService()
const controller = new TaskController(service)

export const taskRouter = Router();

taskRouter.get('/', controller.listAll)
taskRouter.post('/', controller.create)
taskRouter.get('/pending', controller.listPending)
taskRouter.get('/done', controller.listDone)
taskRouter.patch('/:id/title', controller.updateTitle)
taskRouter.patch('/:id/status', controller.updateStatus)
taskRouter.delete('/:id', controller.delete)
