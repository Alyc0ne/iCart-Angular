import { Directive, ElementRef, HostListener } from '@angular/core';

declare function AddCommaNumberFloat(data): any;
declare function RemoveCommaNumber(data): any;

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {

  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  inputElement: HTMLElement
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement
    const value = this.getValueElement();
    console.log(this.inputElement)
    if (value) {
      
    }
  }

  @HostListener('input', ['$event'])
  onInput(e: KeyboardEvent) {
    console.log('input')
  }

  @HostListener('focus', ['$event'])
  onFocus(e: KeyboardEvent) {
    console.log('focus')
    var value = RemoveCommaNumber(this.getValueElement())
    if (!!value) this.inputElement['value'] = value
  }

  @HostListener('change', ['$event'])
  @HostListener('blur', ['$event'])
  onChangeBlur(e: KeyboardEvent) {
    console.log('Change Blur')
    var value = this.getValueElement()
    if (value != '' && value != undefined) if (isFinite(value)) this.inputElement['value'] = AddCommaNumberFloat(value)
  }

  @HostListener('keydown', ['$event'])
  onKeyDowsn(e: KeyboardEvent) {
    console.log('keydown')
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) || isNaN(parseInt(e.key))) && e.keyCode != 110) e.preventDefault();

    console.log('eee')
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    console.log('paste')
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); // get a digit-only string
    document.execCommand('insertText', false, pastedInput);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    console.log('drop')
    event.preventDefault();
    const textData = event.dataTransfer.getData('text').replace(/\D/g, '');
    this.inputElement.focus();
    document.execCommand('insertText', false, textData);
  }

  getValueElement() {
    return this.inputElement['value']
  }
}