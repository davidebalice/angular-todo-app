import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DropEffect, EffectAllowed } from './dnd-types';
import { DndEvent } from './dnd-utils';
import * as i0 from "@angular/core";
export interface DndDropEvent {
    event: DragEvent;
    dropEffect: DropEffect;
    isExternal: boolean;
    data?: any;
    index?: number;
    type?: any;
}
export declare class DndPlaceholderRefDirective implements OnInit {
    readonly elementRef: ElementRef<HTMLElement>;
    constructor(elementRef: ElementRef<HTMLElement>);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DndPlaceholderRefDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DndPlaceholderRefDirective, "[dndPlaceholderRef]", never, {}, {}, never, never, true, never>;
}
export declare class DndDropzoneDirective implements AfterViewInit, OnDestroy {
    private ngZone;
    private elementRef;
    private renderer;
    dndDropzone?: string[] | '';
    dndEffectAllowed: EffectAllowed;
    dndAllowExternal: boolean;
    dndHorizontal: boolean;
    dndDragoverClass: string;
    dndDropzoneDisabledClass: string;
    readonly dndDragover: EventEmitter<DragEvent>;
    readonly dndDrop: EventEmitter<DndDropEvent>;
    private readonly dndPlaceholderRef?;
    private placeholder;
    private disabled;
    constructor(ngZone: NgZone, elementRef: ElementRef, renderer: Renderer2);
    set dndDisableIf(value: boolean);
    set dndDisableDropIf(value: boolean);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onDragEnter(event: DndEvent): void;
    onDragOver(event: DragEvent): void;
    onDrop(event: DragEvent): void;
    onDragLeave(event: DndEvent): void;
    private readonly dragEnterEventHandler;
    private readonly dragOverEventHandler;
    private readonly dragLeaveEventHandler;
    private isDropAllowed;
    private tryGetPlaceholder;
    private removePlaceholderFromDOM;
    private checkAndUpdatePlaceholderPosition;
    private getPlaceholderIndex;
    private cleanupDragoverState;
    static ɵfac: i0.ɵɵFactoryDeclaration<DndDropzoneDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DndDropzoneDirective, "[dndDropzone]", never, { "dndDropzone": { "alias": "dndDropzone"; "required": false; }; "dndEffectAllowed": { "alias": "dndEffectAllowed"; "required": false; }; "dndAllowExternal": { "alias": "dndAllowExternal"; "required": false; }; "dndHorizontal": { "alias": "dndHorizontal"; "required": false; }; "dndDragoverClass": { "alias": "dndDragoverClass"; "required": false; }; "dndDropzoneDisabledClass": { "alias": "dndDropzoneDisabledClass"; "required": false; }; "dndDisableIf": { "alias": "dndDisableIf"; "required": false; }; "dndDisableDropIf": { "alias": "dndDisableDropIf"; "required": false; }; }, { "dndDragover": "dndDragover"; "dndDrop": "dndDrop"; }, ["dndPlaceholderRef"], never, true, never>;
}
