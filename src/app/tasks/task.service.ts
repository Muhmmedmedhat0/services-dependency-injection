import { inject, Injectable, signal } from '@angular/core';
import type { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Using signal to manage the state of tasks
  private tasks = signal<Task[]>([]);
  private logService = inject(LoggingService);

  // Getter to access the tasks
  getAllTasks() {
    return this.tasks.asReadonly();
  }

  // Method to add a new task
  addTask(task: Omit<Task, 'id' | 'status'>) {
    this.tasks.update((tasks) => [
      ...tasks,
      { ...task, id: Date.now() + Math.random(), status: 'OPEN' },
    ]);
    this.logService.log(`Task added: ${task.title}`);
  }
  // Method to update an existing task
  updateTaskStatus(id: number, status: TaskStatus) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
    this.logService.log(`Task updated: ${id}, Status: ${status}`);
  }
}
