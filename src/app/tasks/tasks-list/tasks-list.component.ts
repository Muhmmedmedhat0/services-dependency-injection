import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private taskService = inject(TaskService);
  private selectedFilter = signal<string>('all');

  tasks = computed(() => {
    const allTasks = this.taskService.getAllTasks();
    switch (this.selectedFilter()) {
      case 'open':
        return allTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return allTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return allTasks().filter((task) => task.status === 'DONE');
      default:
        return allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
