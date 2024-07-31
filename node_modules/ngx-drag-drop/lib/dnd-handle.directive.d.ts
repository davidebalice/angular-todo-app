import { OnInit } from '@angular/core';
import { DndDraggableDirective } from './dnd-draggable.directive';
import { DndEvent } from './dnd-utils';
import * as i0 from "@angular/core";
export declare class DndHandleDirective implements OnInit {
    draggable: boolean;
    dndDraggableDirective: DndDraggableDirective;
    ngOnInit(): void;
    onDragEvent(event: DndEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DndHandleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DndHandleDirective, "[dndHandle]", never, {}, {}, never, never, true, never>;
}
