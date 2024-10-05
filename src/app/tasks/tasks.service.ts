import { Injectable } from '@angular/core';
import { NewTaskData } from './task/task.model';

const TASKS_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2024-12-31',
    },
    {
      id: 't2',
      userId: 'u2',
      title: 'Master React',
      summary:
        'Learn all the basic and advanced features of React & how to apply them.',
      dueDate: '2024-12-30',
    },
  ];

  constructor() {
    const tasks = localStorage.getItem(TASKS_KEY);

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.push({
      id: crypto.randomUUID(),
      userId: userId,
      ...taskData,
    });
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks));
  }
}
