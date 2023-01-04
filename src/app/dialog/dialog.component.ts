import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input()
  outputText!: string;
  @Input()
  transType!: string;
  @Input()
  dispOutput!: boolean;

  @Output('copy') copy: EventEmitter<any> = new EventEmitter();
  @Output('close') close: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  copyToClipboard() {
    this.copy.emit();
  }

  closeDialog() {
    this.close.emit();
  }
}
