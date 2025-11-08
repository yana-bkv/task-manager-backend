import {Task, TaskModel} from '../models/task.model';

interface TaskServiceInterface {
    listAll: () => Promise<Task[]>
    create: (title: string) => Promise<Task>
    pending: () => Promise<Task[]>
    done: () => Promise<Task[]>
    updateTitle: (id: string, title: string) => Promise<Task | null>
    updateStatus: (id: string, newStatus: boolean) => Promise<Task | null>
    delete: (id: string) => Promise<boolean>
}

export class TaskService implements TaskServiceInterface {
    listAll(): Promise<Task[]> {
        return TaskModel.find().sort({ updatedAt: -1 }).lean();
    }

    async create(title: string): Promise<Task> {
        const createdTask = await TaskModel.create({title});
        return createdTask.toObject();
    }

    pending(): Promise<Task[]> {
        return TaskModel.find({isDone: false}).lean();
    }

    done(): Promise<Task[]> {
        return TaskModel.find({isDone: true}).lean();
    }

    async updateTitle(id:string, newTitle:string): Promise<Task | null> {
        if (!id) {
            return Promise.reject(new Error('Needs id'));
        }
        if (!newTitle) {
            return Promise.reject(new Error('Needs new title'))
        }

        return TaskModel?.findByIdAndUpdate(id, {title: newTitle}, {new :true}).lean();
    }

    async updateStatus(id:string, newStatus:boolean): Promise<Task | null> {
        if (!id) {
            return Promise.reject(new Error('Needs id'));
        }

        return TaskModel?.findByIdAndUpdate(id, {isDone: newStatus}, {new :true}).lean();
    }

    async delete(id: string): Promise<boolean> {
        const res = await TaskModel.findByIdAndDelete(id).lean();
        return Boolean(res);
    }
}