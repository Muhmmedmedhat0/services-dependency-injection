import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  constructor(private taskService: TaskService) {}

  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  onAddTask(title: string, description: string) {
    this.taskService.addTask({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
