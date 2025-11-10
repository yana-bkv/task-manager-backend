import { Request, Response, RequestHandler } from 'express'
import {TaskService} from "./task.service";

export class TaskController {
    constructor(private taskService: TaskService) {}

    listAll: RequestHandler = async (_req: Request, res: Response) => {
        const tasks = await this.taskService.listAll()
        await res.json(tasks.map(t=> ({id: t._id, title: t.title, isDone: t.isDone})))
    }

    create = async (req: Request, res: Response) => {
        try {
            const newTitle = req.body?.title;
            if (!newTitle) {
                res.status(400).json({ message: 'Title is required' })
                return
            }
            const { title, _id, isDone } = await this.taskService.create(newTitle);
            res.status(201).json({id: _id, title, isDone})
        } catch (error) {
            res.status(400).json({message:error || 'Error creating task'})
        }
    }

    listPending = async (_req: Request, res: Response) => {
        const tasks = await this.taskService.pending()
        await res.json(tasks.map(t=> ({id: t._id, title: t.title, isDone: t.isDone})))
    }

    listDone = async (_req: Request, res: Response) => {
        const tasks = await this.taskService.done()
        await res.json(tasks.map(t=> ({id: t._id, title: t.title, isDone: t.isDone})))
    }

    updateTitle = async (req: Request, res: Response) => {
        try {
            const newTitle = req.body?.title
            const id = req.params?.id
            const updatedTask = await this.taskService.updateTitle(id, newTitle)
            if (updatedTask) {
                res.status(201).json({
                    id: updatedTask._id,
                    title: updatedTask.title,
                    isDone: updatedTask.isDone
                })
            }
        } catch (error) {
            res.status(400).json({message: error || 'Error updating task'})
        }
    }

    updateStatus = async (req: Request, res: Response) => {
        try {
            const newStatus = req.body?.isDone
            const id = req.params?.id
            const updatedTask = await this.taskService.updateStatus(id, newStatus)
            if (updatedTask) {
                res.status(201).json({
                    id: updatedTask._id,
                    title: updatedTask.title,
                    isDone: updatedTask.isDone
                })
            }
        } catch (error) {
            res.status(400).json({message: error || 'Error updating task status'})
        }
    }

     delete = async (req: Request, res: Response) => {
        try {
            const id = req.params?.id
            this.taskService.delete(id);
            res.status(201).json({message: 'Task deleted'})
        } catch (error) {
            res.status(400).json({message:error || 'Error deleting task'})
        }
    }
}