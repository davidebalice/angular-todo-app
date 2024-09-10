import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  FormGroup,
  FormsModule,
  NgControlStatus,
  PatternValidator,
  ReactiveFormsModule
} from "./chunk-UHQ7LUMV.js";
import {
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  NgStyle
} from "./chunk-PWP7MF3D.js";
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  NgModule,
  Output,
  Pipe,
  setClassMetadata,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate
} from "./chunk-B3FPXQV3.js";
import "./chunk-SG3BCSKH.js";
import "./chunk-SAVXX6OM.js";
import "./chunk-PQ7O3X3G.js";
import "./chunk-J4B6MK7R.js";

// node_modules/ng-otp-input/fesm2020/ng-otp-input.mjs
function NgOtpInputComponent_div_0_input_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 4, 0);
    ɵɵlistener("paste", function NgOtpInputComponent_div_0_input_1_Template_input_paste_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.handlePaste($event));
    })("keyup", function NgOtpInputComponent_div_0_input_1_Template_input_keyup_0_listener($event) {
      const i_r3 = ɵɵrestoreView(_r1).index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onKeyUp($event, i_r3));
    })("input", function NgOtpInputComponent_div_0_input_1_Template_input_input_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onInput($event));
    })("keydown", function NgOtpInputComponent_div_0_input_1_Template_input_keydown_0_listener($event) {
      const i_r3 = ɵɵrestoreView(_r1).index;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onKeyDown($event, i_r3));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMapInterpolate1("otp-input ", ctx_r1.config.inputClass, "");
    ɵɵproperty("pattern", ctx_r1.config.allowNumbersOnly ? "\\d*" : "")("type", ctx_r1.inputType)("placeholder", (ctx_r1.config == null ? null : ctx_r1.config.placeholder) || "")("ngStyle", ctx_r1.config.inputStyles)("formControl", ctx_r1.otpForm.controls[item_r4])("id", ctx_r1.getBoxId(i_r3));
  }
}
function NgOtpInputComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, NgOtpInputComponent_div_0_input_1_Template, 2, 9, "input", 3);
    ɵɵpipe(2, "keys");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("ng-otp-input-wrapper wrapper ", ctx_r1.config.containerClass, "");
    ɵɵpropertyInterpolate1("id", "c_", ctx_r1.componentKey, "");
    ɵɵproperty("ngStyle", ctx_r1.config.containerStyles);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind1(2, 7, ctx_r1.otpForm == null ? null : ctx_r1.otpForm.controls));
  }
}
var KeyboardUtil = class {
  static ifTab(event) {
    return this.ifKey(event, "Tab");
  }
  static ifDelete(event) {
    return this.ifKey(event, "Delete;Del");
  }
  static ifBackspace(event) {
    return this.ifKey(event, "Backspace");
  }
  static ifRightArrow(event) {
    return this.ifKey(event, "ArrowRight;Right");
  }
  static ifLeftArrow(event) {
    return this.ifKey(event, "ArrowLeft;Left");
  }
  static ifSpacebar(event) {
    return this.ifKey(event, "Spacebar; ");
  }
  static ifKey(event, keys) {
    let keysToCheck = keys.split(";");
    return keysToCheck.some((k) => k === event.key);
  }
};
var KeysPipe = class {
  transform(value) {
    return Object.keys(value);
  }
};
KeysPipe.ɵfac = function KeysPipe_Factory(t) {
  return new (t || KeysPipe)();
};
KeysPipe.ɵpipe = ɵɵdefinePipe({
  name: "keys",
  type: KeysPipe,
  pure: true
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KeysPipe, [{
    type: Pipe,
    args: [{
      name: "keys"
    }]
  }], null, null);
})();
var NgOtpInputComponent = class {
  constructor(keysPipe, document) {
    this.keysPipe = keysPipe;
    this.document = document;
    this.config = {
      length: 4
    };
    this.onInputChange = new EventEmitter();
    this.inputControls = new Array(this.config.length);
    this.componentKey = Math.random().toString(36).substring(2) + (/* @__PURE__ */ new Date()).getTime().toString(36);
  }
  get inputType() {
    return this.config?.isPasswordInput ? "password" : this.config?.allowNumbersOnly ? "tel" : "text";
  }
  ngOnInit() {
    this.otpForm = new FormGroup({});
    for (let index = 0; index < this.config.length; index++) {
      this.otpForm.addControl(this.getControlName(index), new FormControl());
    }
    this.otpForm.valueChanges.subscribe((v) => {
      this.keysPipe.transform(this.otpForm.controls).forEach((k) => {
        var val = this.otpForm.controls[k].value;
        if (val && val.length > 1) {
          if (val.length >= this.config.length) {
            this.setValue(val);
          } else {
            this.rebuildValue();
          }
        }
      });
    });
  }
  ngAfterViewInit() {
    if (!this.config.disableAutoFocus) {
      const containerItem = this.document.getElementById(`c_${this.componentKey}`);
      if (containerItem) {
        const ele = containerItem.getElementsByClassName("otp-input")[0];
        if (ele && ele.focus) {
          ele.focus();
        }
      }
    }
  }
  getControlName(idx) {
    return `ctrl_${idx}`;
  }
  onKeyDown($event, inputIdx) {
    const prevInputId = this.getBoxId(inputIdx - 1);
    const currentInputId = this.getBoxId(inputIdx);
    if (KeyboardUtil.ifSpacebar($event)) {
      $event.preventDefault();
      return false;
    }
    if (KeyboardUtil.ifBackspace($event)) {
      if (!$event.target.value) {
        this.clearInput(prevInputId, inputIdx - 1);
        this.setSelected(prevInputId);
      } else {
        this.clearInput(currentInputId, inputIdx);
      }
      this.rebuildValue();
      return;
    }
  }
  onInput($event) {
    let newVal = this.currentVal ? `${this.currentVal}${$event.target.value}` : $event.target.value;
    if (this.config.allowNumbersOnly && !this.validateNumber(newVal)) {
      $event.target.value = "";
      $event.stopPropagation();
      $event.preventDefault();
      return;
    }
  }
  onKeyUp($event, inputIdx) {
    if (KeyboardUtil.ifTab($event)) {
      inputIdx -= 1;
    }
    const nextInputId = this.getBoxId(inputIdx + 1);
    const prevInputId = this.getBoxId(inputIdx - 1);
    const currentInputId = this.getBoxId(inputIdx);
    if (KeyboardUtil.ifRightArrow($event)) {
      $event.preventDefault();
      this.setSelected(nextInputId);
      return;
    }
    if (KeyboardUtil.ifLeftArrow($event)) {
      $event.preventDefault();
      this.setSelected(prevInputId);
      return;
    }
    if (KeyboardUtil.ifDelete($event)) {
      if (!$event.target.value) {
        this.clearInput(prevInputId, inputIdx - 1);
        this.setSelected(prevInputId);
      } else {
        this.clearInput(currentInputId, inputIdx);
      }
      this.rebuildValue();
      return;
    }
    if (!$event.target.value) {
      return;
    }
    if (this.ifValidKeyCode($event)) {
      this.setSelected(nextInputId);
    }
    this.rebuildValue();
  }
  validateNumber(val) {
    return val && /^[0-9]+$/.test(val);
  }
  getBoxId(idx) {
    return `otp_${idx}_${this.componentKey}`;
  }
  clearInput(eleId, inputIdx) {
    let ctrlName = this.getControlName(inputIdx);
    this.otpForm.controls[ctrlName]?.setValue(null);
    const ele = this.document.getElementById(eleId);
    if (ele && ele instanceof HTMLInputElement) {
      ele.value = null;
    }
  }
  setSelected(eleId) {
    this.focusTo(eleId);
    const ele = this.document.getElementById(eleId);
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }
  ifValidKeyCode(event) {
    const inp = event.key;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile || /[a-zA-Z0-9-_]/.test(inp);
  }
  focusTo(eleId) {
    const ele = this.document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }
  // method to set component value
  setValue(value) {
    if (this.config.allowNumbersOnly && isNaN(value)) {
      return;
    }
    this.otpForm.reset();
    if (!value) {
      this.rebuildValue();
      return;
    }
    value = value.toString().replace(/\s/g, "");
    Array.from(value).forEach((c, idx) => {
      if (this.otpForm.get(this.getControlName(idx))) {
        this.otpForm.get(this.getControlName(idx)).setValue(c);
      }
    });
    if (!this.config.disableAutoFocus) {
      const containerItem = this.document.getElementById(`c_${this.componentKey}`);
      var indexOfElementToFocus = value.length < this.config.length ? value.length : this.config.length - 1;
      let ele = containerItem.getElementsByClassName("otp-input")[indexOfElementToFocus];
      if (ele && ele.focus) {
        ele.focus();
      }
    }
    this.rebuildValue();
  }
  rebuildValue() {
    let val = "";
    this.keysPipe.transform(this.otpForm.controls).forEach((k) => {
      if (this.otpForm.controls[k].value) {
        let ctrlVal = this.otpForm.controls[k].value;
        let isLengthExceed = ctrlVal.length > 1;
        let isCaseTransformEnabled = !this.config.allowNumbersOnly && this.config.letterCase && (this.config.letterCase.toLocaleLowerCase() == "upper" || this.config.letterCase.toLocaleLowerCase() == "lower");
        ctrlVal = ctrlVal[0];
        let transformedVal = isCaseTransformEnabled ? this.config.letterCase.toLocaleLowerCase() == "upper" ? ctrlVal.toUpperCase() : ctrlVal.toLowerCase() : ctrlVal;
        if (isCaseTransformEnabled && transformedVal == ctrlVal) {
          isCaseTransformEnabled = false;
        } else {
          ctrlVal = transformedVal;
        }
        val += ctrlVal;
        if (isLengthExceed || isCaseTransformEnabled) {
          this.otpForm.controls[k].setValue(ctrlVal);
        }
      }
    });
    if (this.formCtrl?.setValue) {
      this.formCtrl.setValue(val);
    }
    this.onInputChange.emit(val);
    this.currentVal = val;
  }
  handlePaste(e) {
    let clipboardData = e.clipboardData || window["clipboardData"];
    if (clipboardData) {
      var pastedData = clipboardData.getData("Text");
    }
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData || this.config.allowNumbersOnly && !this.validateNumber(pastedData)) {
      return;
    }
    this.setValue(pastedData);
  }
};
NgOtpInputComponent.ɵfac = function NgOtpInputComponent_Factory(t) {
  return new (t || NgOtpInputComponent)(ɵɵdirectiveInject(KeysPipe), ɵɵdirectiveInject(DOCUMENT));
};
NgOtpInputComponent.ɵcmp = ɵɵdefineComponent({
  type: NgOtpInputComponent,
  selectors: [["ng-otp-input"]],
  inputs: {
    config: "config",
    formCtrl: "formCtrl"
  },
  outputs: {
    onInputChange: "onInputChange"
  },
  decls: 1,
  vars: 1,
  consts: [["inp", ""], [3, "class", "id", "ngStyle", 4, "ngIf"], [3, "id", "ngStyle"], ["autocomplete", "one-time-code", 3, "pattern", "type", "placeholder", "ngStyle", "class", "formControl", "id", "paste", "keyup", "input", "keydown", 4, "ngFor", "ngForOf"], ["autocomplete", "one-time-code", 3, "paste", "keyup", "input", "keydown", "pattern", "type", "placeholder", "ngStyle", "formControl", "id"]],
  template: function NgOtpInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NgOtpInputComponent_div_0_Template, 3, 9, "div", 1);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.otpForm == null ? null : ctx.otpForm.controls);
    }
  },
  dependencies: [NgIf, NgStyle, NgForOf, DefaultValueAccessor, PatternValidator, NgControlStatus, FormControlDirective, KeysPipe],
  styles: [".otp-input[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.ng-otp-input-wrapper[_ngcontent-%COMP%]   .otp-input[_ngcontent-%COMP%]:not(:last-child){margin-right:8px}@media screen and (max-width: 767px){.otp-input[_ngcontent-%COMP%]{width:40px;font-size:24px;height:40px}}@media screen and (max-width: 420px){.otp-input[_ngcontent-%COMP%]{width:30px;font-size:18px;height:30px}}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgOtpInputComponent, [{
    type: Component,
    args: [{
      selector: "ng-otp-input",
      template: `<div class="ng-otp-input-wrapper wrapper {{config.containerClass}}" id="c_{{componentKey}}" *ngIf="otpForm?.controls"\r
  [ngStyle]="config.containerStyles">\r
  <input (paste)="handlePaste($event)" [pattern]="config.allowNumbersOnly ? '\\\\d*' : ''" [type]="inputType"  [placeholder]="config?.placeholder || ''"\r
    [ngStyle]="config.inputStyles" \r
    class="otp-input {{config.inputClass}}" autocomplete="one-time-code" *ngFor="let item of otpForm?.controls | keys;let i=index"\r
    [formControl]="otpForm.controls[item]" #inp [id]="getBoxId(i)" \r
    (keyup)="onKeyUp($event,i)" (input)="onInput($event)" (keydown)="onKeyDown($event,i)" >\r
</div>`,
      styles: [".otp-input{width:50px;height:50px;border-radius:4px;border:solid 1px #c5c5c5;text-align:center;font-size:32px}.ng-otp-input-wrapper .otp-input:not(:last-child){margin-right:8px}@media screen and (max-width: 767px){.otp-input{width:40px;font-size:24px;height:40px}}@media screen and (max-width: 420px){.otp-input{width:30px;font-size:18px;height:30px}}\n"]
    }]
  }], function() {
    return [{
      type: KeysPipe
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, {
    config: [{
      type: Input
    }],
    onInputChange: [{
      type: Output
    }],
    formCtrl: [{
      type: Input
    }]
  });
})();
var NgOtpInputModule = class {
};
NgOtpInputModule.ɵfac = function NgOtpInputModule_Factory(t) {
  return new (t || NgOtpInputModule)();
};
NgOtpInputModule.ɵmod = ɵɵdefineNgModule({
  type: NgOtpInputModule,
  declarations: [NgOtpInputComponent, KeysPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [NgOtpInputComponent]
});
NgOtpInputModule.ɵinj = ɵɵdefineInjector({
  providers: [KeysPipe],
  imports: [[CommonModule, FormsModule, ReactiveFormsModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgOtpInputModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      declarations: [NgOtpInputComponent, KeysPipe],
      exports: [NgOtpInputComponent],
      providers: [KeysPipe]
    }]
  }], null, null);
})();
var Config = class {
};
export {
  NgOtpInputComponent,
  Config as NgOtpInputConfig,
  NgOtpInputModule
};
//# sourceMappingURL=ng-otp-input.js.map
