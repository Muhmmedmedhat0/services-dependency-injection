import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Using signal to manage the state of tasks
  private tasks = signal<Task[]>([]);

  // Getter to access the tasks
  getTasks() {
    return this.tasks.asReadonly();
  }

  // Method to add a new task
  addTask(task: Task) {
    this.tasks.update((tasks) => [
      ...tasks,
      { ...task, id: Date.now(), status: 'OPEN' },
    ]);
  }
}
