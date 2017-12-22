import {AfterViewInit, Component, forwardRef, Input, Inject} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TestEditorComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'test-editor',
  template: '{{label}}<input type="text" [(ngModel)]="myText" >',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TestEditorComponent implements ControlValueAccessor {
  @Input()
  private data: any;

  @Input()
  private label: string;

  constructor(@Inject('label') private myText: string) {
    console.log(myText);
    // this.myContent = 'myText';
  }
  //The internal data model
  private _innerValue: string = '';

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): string {
    return this._innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: string) {
    if (v !== this._innerValue) {
      this._innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this._innerValue) {
      this._innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
