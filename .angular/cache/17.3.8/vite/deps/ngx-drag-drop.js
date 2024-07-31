import {
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  forwardRef,
  inject,
  setClassMetadata,
  ɵɵattribute,
  ɵɵcontentQuery,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-Z5AG4KVC.js";
import "./chunk-SAVXX6OM.js";
import "./chunk-SG3BCSKH.js";
import "./chunk-PQ7O3X3G.js";
import "./chunk-ASLTLD6L.js";

// node_modules/ngx-drag-drop/fesm2022/ngx-drag-drop.mjs
var DROP_EFFECTS = ["move", "copy", "link"];
var CUSTOM_MIME_TYPE = "application/x-dnd";
var JSON_MIME_TYPE = "application/json";
var MSIE_MIME_TYPE = "Text";
function mimeTypeIsCustom(mimeType) {
  return mimeType.substr(0, CUSTOM_MIME_TYPE.length) === CUSTOM_MIME_TYPE;
}
function getWellKnownMimeType(event) {
  if (event.dataTransfer) {
    const types = event.dataTransfer.types;
    if (!types) {
      return MSIE_MIME_TYPE;
    }
    for (let i = 0; i < types.length; i++) {
      if (types[i] === MSIE_MIME_TYPE || types[i] === JSON_MIME_TYPE || mimeTypeIsCustom(types[i])) {
        return types[i];
      }
    }
  }
  return null;
}
function setDragData(event, data, effectAllowed) {
  const mimeType = CUSTOM_MIME_TYPE + (data.type ? "-" + data.type : "");
  const dataString = JSON.stringify(data);
  try {
    event.dataTransfer?.setData(mimeType, dataString);
  } catch (e) {
    try {
      event.dataTransfer?.setData(JSON_MIME_TYPE, dataString);
    } catch (e2) {
      const effectsAllowed = filterEffects(DROP_EFFECTS, effectAllowed);
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = effectsAllowed[0];
      }
      event.dataTransfer?.setData(MSIE_MIME_TYPE, dataString);
    }
  }
}
function getDropData(event, dragIsExternal) {
  const mimeType = getWellKnownMimeType(event);
  if (dragIsExternal === true) {
    if (mimeType !== null && mimeTypeIsCustom(mimeType)) {
      return JSON.parse(event.dataTransfer?.getData(mimeType) ?? "{}");
    }
    return {};
  }
  if (mimeType !== null) {
    return JSON.parse(event.dataTransfer?.getData(mimeType) ?? "{}");
  }
  return {};
}
function filterEffects(effects, allowed) {
  if (allowed === "all" || allowed === "uninitialized") {
    return effects;
  }
  return effects.filter(function(effect) {
    return allowed.toLowerCase().indexOf(effect) !== -1;
  });
}
function getDirectChildElement(parentElement, childElement) {
  let directChild = childElement;
  while (directChild.parentNode !== parentElement) {
    if (!directChild.parentNode) {
      return null;
    }
    directChild = directChild.parentNode;
  }
  return directChild;
}
function shouldPositionPlaceholderBeforeElement(event, element, horizontal) {
  const bounds = element.getBoundingClientRect();
  if (horizontal) {
    return event.clientX < bounds.left + bounds.width / 2;
  }
  return event.clientY < bounds.top + bounds.height / 2;
}
function calculateDragImageOffset(event, dragImage) {
  const dragImageComputedStyle = window.getComputedStyle(dragImage);
  const paddingTop = parseFloat(dragImageComputedStyle.paddingTop) || 0;
  const paddingLeft = parseFloat(dragImageComputedStyle.paddingLeft) || 0;
  const borderTop = parseFloat(dragImageComputedStyle.borderTopWidth) || 0;
  const borderLeft = parseFloat(dragImageComputedStyle.borderLeftWidth) || 0;
  return {
    x: event.offsetX + paddingLeft + borderLeft,
    y: event.offsetY + paddingTop + borderTop
  };
}
function setDragImage(event, dragImage, offsetFunction) {
  const offset = offsetFunction(event, dragImage) || {
    x: 0,
    y: 0
  };
  event.dataTransfer.setDragImage(dragImage, offset.x, offset.y);
}
var _dndState = {
  isDragging: false,
  dropEffect: "none",
  effectAllowed: "all",
  type: void 0
};
function startDrag(event, effectAllowed, type) {
  _dndState.isDragging = true;
  _dndState.dropEffect = "none";
  _dndState.effectAllowed = effectAllowed;
  _dndState.type = type;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = effectAllowed;
  }
}
function endDrag() {
  _dndState.isDragging = false;
  _dndState.dropEffect = void 0;
  _dndState.effectAllowed = void 0;
  _dndState.type = void 0;
}
function setDropEffect(event, dropEffect) {
  if (_dndState.isDragging === true) {
    _dndState.dropEffect = dropEffect;
  }
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = dropEffect;
  }
}
function getDropEffect(event, effectAllowed) {
  const dataTransferEffectAllowed = event.dataTransfer ? event.dataTransfer.effectAllowed : "uninitialized";
  let effects = filterEffects(DROP_EFFECTS, dataTransferEffectAllowed);
  if (_dndState.isDragging === true) {
    effects = filterEffects(effects, _dndState.effectAllowed);
  }
  if (effectAllowed) {
    effects = filterEffects(effects, effectAllowed);
  }
  if (effects.length === 0) {
    return "none";
  }
  if (event.ctrlKey && effects.indexOf("copy") !== -1) {
    return "copy";
  }
  if (event.altKey && effects.indexOf("link") !== -1) {
    return "link";
  }
  return effects[0];
}
function getDndType(event) {
  if (_dndState.isDragging === true) {
    return _dndState.type;
  }
  const mimeType = getWellKnownMimeType(event);
  if (mimeType === null) {
    return void 0;
  }
  if (mimeType === MSIE_MIME_TYPE || mimeType === JSON_MIME_TYPE) {
    return void 0;
  }
  return mimeType.substr(CUSTOM_MIME_TYPE.length + 1) || void 0;
}
function isExternalDrag() {
  return _dndState.isDragging === false;
}
var dndState = _dndState;
var DndDragImageRefDirective = class _DndDragImageRefDirective {
  dndDraggableDirective = inject(forwardRef(() => DndDraggableDirective));
  elementRef = inject(ElementRef);
  ngOnInit() {
    this.dndDraggableDirective.registerDragImage(this.elementRef);
  }
  static ɵfac = function DndDragImageRefDirective_Factory(t) {
    return new (t || _DndDragImageRefDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _DndDragImageRefDirective,
    selectors: [["", "dndDragImageRef", ""]],
    standalone: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DndDragImageRefDirective, [{
    type: Directive,
    args: [{
      selector: "[dndDragImageRef]",
      standalone: true
    }]
  }], null, null);
})();
var DndDraggableDirective = class _DndDraggableDirective {
  dndDraggable;
  dndEffectAllowed = "copy";
  dndType;
  dndDraggingClass = "dndDragging";
  dndDraggingSourceClass = "dndDraggingSource";
  dndDraggableDisabledClass = "dndDraggableDisabled";
  dndDragImageOffsetFunction = calculateDragImageOffset;
  dndStart = new EventEmitter();
  dndDrag = new EventEmitter();
  dndEnd = new EventEmitter();
  dndMoved = new EventEmitter();
  dndCopied = new EventEmitter();
  dndLinked = new EventEmitter();
  dndCanceled = new EventEmitter();
  draggable = true;
  dndHandle;
  dndDragImageElementRef;
  dragImage;
  isDragStarted = false;
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  ngZone = inject(NgZone);
  set dndDisableIf(value) {
    this.draggable = !value;
    if (this.draggable) {
      this.renderer.removeClass(this.elementRef.nativeElement, this.dndDraggableDisabledClass);
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, this.dndDraggableDisabledClass);
    }
  }
  set dndDisableDragIf(value) {
    this.dndDisableIf = value;
  }
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.elementRef.nativeElement.addEventListener("drag", this.dragEventHandler);
    });
  }
  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener("drag", this.dragEventHandler);
    if (this.isDragStarted) {
      endDrag();
    }
  }
  onDragStart(event) {
    if (!this.draggable) {
      return false;
    }
    if (this.dndHandle != null && event._dndUsingHandle == null) {
      event.stopPropagation();
      return false;
    }
    startDrag(event, this.dndEffectAllowed, this.dndType);
    this.isDragStarted = true;
    setDragData(event, {
      data: this.dndDraggable,
      type: this.dndType
    }, dndState.effectAllowed);
    this.dragImage = this.determineDragImage();
    this.renderer.addClass(this.dragImage, this.dndDraggingClass);
    if (this.dndDragImageElementRef != null || event._dndUsingHandle != null) {
      setDragImage(event, this.dragImage, this.dndDragImageOffsetFunction);
    }
    const unregister = this.renderer.listen(this.elementRef.nativeElement, "drag", () => {
      this.renderer.addClass(this.elementRef.nativeElement, this.dndDraggingSourceClass);
      unregister();
    });
    this.dndStart.emit(event);
    event.stopPropagation();
    setTimeout(() => {
      this.renderer.setStyle(this.dragImage, "pointer-events", "none");
    }, 100);
    return true;
  }
  onDrag(event) {
    this.dndDrag.emit(event);
  }
  onDragEnd(event) {
    if (!this.draggable || !this.isDragStarted) {
      return;
    }
    const dropEffect = dndState.dropEffect;
    this.renderer.setStyle(this.dragImage, "pointer-events", "unset");
    let dropEffectEmitter;
    switch (dropEffect) {
      case "copy":
        dropEffectEmitter = this.dndCopied;
        break;
      case "link":
        dropEffectEmitter = this.dndLinked;
        break;
      case "move":
        dropEffectEmitter = this.dndMoved;
        break;
      default:
        dropEffectEmitter = this.dndCanceled;
        break;
    }
    dropEffectEmitter.emit(event);
    this.dndEnd.emit(event);
    endDrag();
    this.isDragStarted = false;
    this.renderer.removeClass(this.dragImage, this.dndDraggingClass);
    window.setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, this.dndDraggingSourceClass);
    }, 0);
    event.stopPropagation();
  }
  registerDragHandle(handle) {
    this.dndHandle = handle;
  }
  registerDragImage(elementRef) {
    this.dndDragImageElementRef = elementRef;
  }
  dragEventHandler = (event) => this.onDrag(event);
  determineDragImage() {
    if (typeof this.dndDragImageElementRef !== "undefined") {
      return this.dndDragImageElementRef.nativeElement;
    } else {
      return this.elementRef.nativeElement;
    }
  }
  static ɵfac = function DndDraggableDirective_Factory(t) {
    return new (t || _DndDraggableDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _DndDraggableDirective,
    selectors: [["", "dndDraggable", ""]],
    hostVars: 1,
    hostBindings: function DndDraggableDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("dragstart", function DndDraggableDirective_dragstart_HostBindingHandler($event) {
          return ctx.onDragStart($event);
        })("dragend", function DndDraggableDirective_dragend_HostBindingHandler($event) {
          return ctx.onDragEnd($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("draggable", ctx.draggable);
      }
    },
    inputs: {
      dndDraggable: "dndDraggable",
      dndEffectAllowed: "dndEffectAllowed",
      dndType: "dndType",
      dndDraggingClass: "dndDraggingClass",
      dndDraggingSourceClass: "dndDraggingSourceClass",
      dndDraggableDisabledClass: "dndDraggableDisabledClass",
      dndDragImageOffsetFunction: "dndDragImageOffsetFunction",
      dndDisableIf: "dndDisableIf",
      dndDisableDragIf: "dndDisableDragIf"
    },
    outputs: {
      dndStart: "dndStart",
      dndDrag: "dndDrag",
      dndEnd: "dndEnd",
      dndMoved: "dndMoved",
      dndCopied: "dndCopied",
      dndLinked: "dndLinked",
      dndCanceled: "dndCanceled"
    },
    standalone: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DndDraggableDirective, [{
    type: Directive,
    args: [{
      selector: "[dndDraggable]",
      standalone: true
    }]
  }], null, {
    dndDraggable: [{
      type: Input
    }],
    dndEffectAllowed: [{
      type: Input
    }],
    dndType: [{
      type: Input
    }],
    dndDraggingClass: [{
      type: Input
    }],
    dndDraggingSourceClass: [{
      type: Input
    }],
    dndDraggableDisabledClass: [{
      type: Input
    }],
    dndDragImageOffsetFunction: [{
      type: Input
    }],
    dndStart: [{
      type: Output
    }],
    dndDrag: [{
      type: Output
    }],
    dndEnd: [{
      type: Output
    }],
    dndMoved: [{
      type: Output
    }],
    dndCopied: [{
      type: Output
    }],
    dndLinked: [{
      type: Output
    }],
    dndCanceled: [{
      type: Output
    }],
    draggable: [{
      type: HostBinding,
      args: ["attr.draggable"]
    }],
    dndDisableIf: [{
      type: Input
    }],
    dndDisableDragIf: [{
      type: Input
    }],
    onDragStart: [{
      type: HostListener,
      args: ["dragstart", ["$event"]]
    }],
    onDragEnd: [{
      type: HostListener,
      args: ["dragend", ["$event"]]
    }]
  });
})();
var DndPlaceholderRefDirective = class _DndPlaceholderRefDirective {
  elementRef;
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  ngOnInit() {
    this.elementRef.nativeElement.style.pointerEvents = "none";
  }
  static ɵfac = function DndPlaceholderRefDirective_Factory(t) {
    return new (t || _DndPlaceholderRefDirective)(ɵɵdirectiveInject(ElementRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _DndPlaceholderRefDirective,
    selectors: [["", "dndPlaceholderRef", ""]],
    standalone: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DndPlaceholderRefDirective, [{
    type: Directive,
    args: [{
      selector: "[dndPlaceholderRef]",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], null);
})();
var DndDropzoneDirective = class _DndDropzoneDirective {
  ngZone;
  elementRef;
  renderer;
  dndDropzone = "";
  dndEffectAllowed = "uninitialized";
  dndAllowExternal = false;
  dndHorizontal = false;
  dndDragoverClass = "dndDragover";
  dndDropzoneDisabledClass = "dndDropzoneDisabled";
  dndDragover = new EventEmitter();
  dndDrop = new EventEmitter();
  dndPlaceholderRef;
  placeholder = null;
  disabled = false;
  constructor(ngZone, elementRef, renderer) {
    this.ngZone = ngZone;
    this.elementRef = elementRef;
    this.renderer = renderer;
  }
  set dndDisableIf(value) {
    this.disabled = value;
    if (this.disabled) {
      this.renderer.addClass(this.elementRef.nativeElement, this.dndDropzoneDisabledClass);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, this.dndDropzoneDisabledClass);
    }
  }
  set dndDisableDropIf(value) {
    this.dndDisableIf = value;
  }
  ngAfterViewInit() {
    this.placeholder = this.tryGetPlaceholder();
    this.removePlaceholderFromDOM();
    this.ngZone.runOutsideAngular(() => {
      this.elementRef.nativeElement.addEventListener("dragenter", this.dragEnterEventHandler);
      this.elementRef.nativeElement.addEventListener("dragover", this.dragOverEventHandler);
      this.elementRef.nativeElement.addEventListener("dragleave", this.dragLeaveEventHandler);
    });
  }
  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener("dragenter", this.dragEnterEventHandler);
    this.elementRef.nativeElement.removeEventListener("dragover", this.dragOverEventHandler);
    this.elementRef.nativeElement.removeEventListener("dragleave", this.dragLeaveEventHandler);
  }
  onDragEnter(event) {
    if (event._dndDropzoneActive === true) {
      this.cleanupDragoverState();
      return;
    }
    if (event._dndDropzoneActive == null) {
      const newTarget = document.elementFromPoint(event.clientX, event.clientY);
      if (this.elementRef.nativeElement.contains(newTarget)) {
        event._dndDropzoneActive = true;
      }
    }
    const type = getDndType(event);
    if (!this.isDropAllowed(type)) {
      return;
    }
    event.preventDefault();
  }
  onDragOver(event) {
    if (event.defaultPrevented) {
      return;
    }
    const type = getDndType(event);
    if (!this.isDropAllowed(type)) {
      return;
    }
    this.checkAndUpdatePlaceholderPosition(event);
    const dropEffect = getDropEffect(event, this.dndEffectAllowed);
    if (dropEffect === "none") {
      this.cleanupDragoverState();
      return;
    }
    event.preventDefault();
    setDropEffect(event, dropEffect);
    this.dndDragover.emit(event);
    this.renderer.addClass(this.elementRef.nativeElement, this.dndDragoverClass);
  }
  onDrop(event) {
    try {
      const type = getDndType(event);
      if (!this.isDropAllowed(type)) {
        return;
      }
      const data = getDropData(event, isExternalDrag());
      if (!this.isDropAllowed(data.type)) {
        return;
      }
      event.preventDefault();
      const dropEffect = getDropEffect(event);
      setDropEffect(event, dropEffect);
      if (dropEffect === "none") {
        return;
      }
      const dropIndex = this.getPlaceholderIndex();
      if (dropIndex === -1) {
        return;
      }
      this.dndDrop.emit({
        event,
        dropEffect,
        isExternal: isExternalDrag(),
        data: data.data,
        index: dropIndex,
        type
      });
      event.stopPropagation();
    } finally {
      this.cleanupDragoverState();
    }
  }
  onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event._dndDropzoneActive == null) {
      if (this.elementRef.nativeElement.contains(event.relatedTarget)) {
        event._dndDropzoneActive = true;
        return;
      }
    }
    this.cleanupDragoverState();
    setDropEffect(event, "none");
  }
  dragEnterEventHandler = (event) => this.onDragEnter(event);
  dragOverEventHandler = (event) => this.onDragOver(event);
  dragLeaveEventHandler = (event) => this.onDragLeave(event);
  isDropAllowed(type) {
    if (this.disabled) {
      return false;
    }
    if (isExternalDrag() && !this.dndAllowExternal) {
      return false;
    }
    if (!this.dndDropzone) {
      return true;
    }
    if (!type) {
      return true;
    }
    if (!Array.isArray(this.dndDropzone)) {
      throw new Error("dndDropzone: bound value to [dndDropzone] must be an array!");
    }
    return this.dndDropzone.indexOf(type) !== -1;
  }
  tryGetPlaceholder() {
    if (typeof this.dndPlaceholderRef !== "undefined") {
      return this.dndPlaceholderRef.elementRef.nativeElement;
    }
    return this.elementRef.nativeElement.querySelector("[dndPlaceholderRef]");
  }
  removePlaceholderFromDOM() {
    if (this.placeholder !== null && this.placeholder.parentNode !== null) {
      this.placeholder.parentNode.removeChild(this.placeholder);
    }
  }
  checkAndUpdatePlaceholderPosition(event) {
    if (this.placeholder === null) {
      return;
    }
    if (this.placeholder.parentNode !== this.elementRef.nativeElement) {
      this.renderer.appendChild(this.elementRef.nativeElement, this.placeholder);
    }
    const directChild = getDirectChildElement(this.elementRef.nativeElement, event.target);
    if (directChild === null || directChild === this.placeholder) {
      return;
    }
    const positionPlaceholderBeforeDirectChild = shouldPositionPlaceholderBeforeElement(event, directChild, this.dndHorizontal);
    if (positionPlaceholderBeforeDirectChild) {
      if (directChild.previousSibling !== this.placeholder) {
        this.renderer.insertBefore(this.elementRef.nativeElement, this.placeholder, directChild);
      }
    } else {
      if (directChild.nextSibling !== this.placeholder) {
        this.renderer.insertBefore(this.elementRef.nativeElement, this.placeholder, directChild.nextSibling);
      }
    }
  }
  getPlaceholderIndex() {
    if (this.placeholder === null) {
      return void 0;
    }
    const element = this.elementRef.nativeElement;
    return Array.prototype.indexOf.call(element.children, this.placeholder);
  }
  cleanupDragoverState() {
    this.renderer.removeClass(this.elementRef.nativeElement, this.dndDragoverClass);
    this.removePlaceholderFromDOM();
  }
  static ɵfac = function DndDropzoneDirective_Factory(t) {
    return new (t || _DndDropzoneDirective)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _DndDropzoneDirective,
    selectors: [["", "dndDropzone", ""]],
    contentQueries: function DndDropzoneDirective_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DndPlaceholderRefDirective, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dndPlaceholderRef = _t.first);
      }
    },
    hostBindings: function DndDropzoneDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("drop", function DndDropzoneDirective_drop_HostBindingHandler($event) {
          return ctx.onDrop($event);
        });
      }
    },
    inputs: {
      dndDropzone: "dndDropzone",
      dndEffectAllowed: "dndEffectAllowed",
      dndAllowExternal: "dndAllowExternal",
      dndHorizontal: "dndHorizontal",
      dndDragoverClass: "dndDragoverClass",
      dndDropzoneDisabledClass: "dndDropzoneDisabledClass",
      dndDisableIf: "dndDisableIf",
      dndDisableDropIf: "dndDisableDropIf"
    },
    outputs: {
      dndDragover: "dndDragover",
      dndDrop: "dndDrop"
    },
    standalone: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DndDropzoneDirective, [{
    type: Directive,
    args: [{
      selector: "[dndDropzone]",
      standalone: true
    }]
  }], () => [{
    type: NgZone
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    dndDropzone: [{
      type: Input
    }],
    dndEffectAllowed: [{
      type: Input
    }],
    dndAllowExternal: [{
      type: Input
    }],
    dndHorizontal: [{
      type: Input
    }],
    dndDragoverClass: [{
      type: Input
    }],
    dndDropzoneDisabledClass: [{
      type: Input
    }],
    dndDragover: [{
      type: Output
    }],
    dndDrop: [{
      type: Output
    }],
    dndPlaceholderRef: [{
      type: ContentChild,
      args: [DndPlaceholderRefDirective]
    }],
    dndDisableIf: [{
      type: Input
    }],
    dndDisableDropIf: [{
      type: Input
    }],
    onDrop: [{
      type: HostListener,
      args: ["drop", ["$event"]]
    }]
  });
})();
var DndHandleDirective = class _DndHandleDirective {
  draggable = true;
  dndDraggableDirective = inject(DndDraggableDirective);
  ngOnInit() {
    this.dndDraggableDirective.registerDragHandle(this);
  }
  onDragEvent(event) {
    event._dndUsingHandle = true;
  }
  static ɵfac = function DndHandleDirective_Factory(t) {
    return new (t || _DndHandleDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _DndHandleDirective,
    selectors: [["", "dndHandle", ""]],
    hostVars: 1,
    hostBindings: function DndHandleDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("dragstart", function DndHandleDirective_dragstart_HostBindingHandler($event) {
          return ctx.onDragEvent($event);
        })("dragend", function DndHandleDirective_dragend_HostBindingHandler($event) {
          return ctx.onDragEvent($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("draggable", ctx.draggable);
      }
    },
    standalone: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DndHandleDirective, [{
    type: Directive,
    args: [{
      selector: "[dndHandle]",
      standalone: true
    }]
  }], null, {
    draggable: [{
      type: HostBinding,
      args: ["attr.draggable"]
    }],
    onDragEvent: [{
      type: HostListener,
      args: ["dragstart", ["$event"]]
    }, {
      type: HostListener,
      args: ["dragend", ["$event"]]
    }]
  });
})();
var DndModule = class _DndModule {
  static ɵfac = function DndModule_Factory(t) {
    return new (t || _DndModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DndModule,
    imports: [DndDragImageRefDirective, DndDropzoneDirective, DndHandleDirective, DndPlaceholderRefDirective, DndDraggableDirective],
    exports: [DndDraggableDirective, DndDropzoneDirective, DndHandleDirective, DndPlaceholderRefDirective, DndDragImageRefDirective]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DndModule, [{
    type: NgModule,
    args: [{
      exports: [DndDraggableDirective, DndDropzoneDirective, DndHandleDirective, DndPlaceholderRefDirective, DndDragImageRefDirective],
      imports: [DndDragImageRefDirective, DndDropzoneDirective, DndHandleDirective, DndPlaceholderRefDirective, DndDraggableDirective]
    }]
  }], null, null);
})();
export {
  DndDragImageRefDirective,
  DndDraggableDirective,
  DndDropzoneDirective,
  DndHandleDirective,
  DndModule,
  DndPlaceholderRefDirective
};
//# sourceMappingURL=ngx-drag-drop.js.map
