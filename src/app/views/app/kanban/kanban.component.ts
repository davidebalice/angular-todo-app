import { Component,OnInit } from '@angular/core';
import { CommonModule,DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
//  Drag and drop
import { DndModule,DndDropEvent } from 'ngx-drag-drop';
// Data Get
import { Task } from './kanban.model';
import { kanbanService } from './kanban.service';


@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule,DndModule,RouterLink],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
  providers: [kanbanService, DecimalPipe]
})
export class KanbanComponent implements OnInit{
  
  todoTasks!: Task[];
  inprogressTasks!: Task[];
  reviewsTasks!: Task[];
  completedTasks!: Task[];
  revisedTasks!: Task[];
  TaskList!: Observable<Task[]>;
  alltask?: any;

  constructor(public service: kanbanService) {
    this.TaskList = service.companies$;        
  }

  ngOnInit(): void {
    /**
     * Data Get Function
     */
    this._fetchData();
  }


   /**
   * on dragging task
   * @param item item dragged
   * @param list list from item dragged
   */
   onDragged(item: any, list: any[]) {   
    const index = list.indexOf(item);
    list.splice(index, 1);
  }


  /**
   * On task drop event
   */
  onDrop(event: DndDropEvent, filteredList?: any[], targetStatus?: string) {
    if (filteredList && event.dropEffect === 'move') {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = filteredList.length;
      }

      filteredList.splice(index, 0, event.data);
    }
  }

   /**
   * Data Fetch
   */
   private _fetchData() {
    // all tasks
    setTimeout(() => {
        this.TaskList.subscribe((x: any) => {
          this.alltask = Object.assign([], x);
          this.todoTasks = this.alltask.filter((t: any) => t.status === 'todo');
          this.inprogressTasks = this.alltask.filter((t: any) => t.status === 'inprogress');
          this.reviewsTasks = this.alltask.filter((t: any) => t.status === 'reviews');
          this.completedTasks = this.alltask.filter((t: any) => t.status === 'completed');
          this.revisedTasks = this.alltask.filter((t: any) => t.status === 'revised');
        });      
      }, 1000);         
  }

}
