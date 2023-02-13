import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Character } from './character';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent {
  password: string = '';
  input: string = '';
  output: string = '';
  indices: string[][] = [];
  columnsObj: {} = {};
  numberOfRows = 0;
  numberOfColumns = 0;
  splittedMessage: string[] = [];
  transposedValues: any[] = [];
  transformationOptions: any[] = [];
  transformationType: string = 'encrypt';
  displayOutput: boolean = false;

  loesungswort: Character[] = [];

  constructor(private messageService: MessageService, private characterService: CharacterService) {
    this.transformationOptions = [
      { label: 'Encrypt', value: 'encrypt' },
      { label: 'Decrypt', value: 'decrypt' },
    ];
  }

  print(): void {
    this.characterService.characterDetails(this.password)
  }

  onEncrypt() {
    this.password = this.password.toLowerCase();
    this.numberOfRows = Math.ceil(this.input.length / this.password.length);
    this.numberOfColumns = this.password.length;
    this.splittedMessage = [...this.input];

    let rows: string[][] | [any] = [];
    let sortedIndices;

    this.slicing(rows, this.numberOfRows, this.numberOfColumns);
    this.pairing();
    this.transpose(rows);
    sortedIndices = this.sortIndex();
    sortedIndices.map((idx) => {
      this.output += this.columnsObj[idx as keyof typeof this.columnsObj];
    });
    this.displayOutput = true;
  }

  onDecrypt() {
    this.password = this.password.toLowerCase();
    this.numberOfRows = Math.ceil(this.input.length / this.password.length);
    this.numberOfColumns = this.password.length;
    this.splittedMessage = [...this.input];

    let cols: string[][] | [any] = [];
    let sortedIndices;

    this.pairing();
    sortedIndices = this.sortIndex();
    this.slicing(cols, this.numberOfColumns, this.numberOfRows);

    let sortedCols = sortedIndices
      .map((e, i) => {
        let mappedCols = [+e, cols[i]];
        return mappedCols;
      })
      .sort((a: any, b: any) => a[0] - b[0])
      .map((cols) => cols[1]);

    this.transpose(sortedCols);
    this.transposedValues.map(
      (value: any[]) => (this.output += value.join(''))
    );
    this.displayOutput = true;
  }

  slicing(
    arrayType: string[][] | [any],
    numberToLoop: number,
    numberToCompoare: number
  ) {
    for (let i = 0; i < numberToLoop; i++) {
      if (this.splittedMessage.length <= numberToCompoare) {
        while (this.splittedMessage.length < numberToCompoare) {
          this.splittedMessage.push(' ');
        }
      }
      arrayType.push(this.splittedMessage.splice(0, numberToCompoare));
    }
  }

  pairing() {
    for (let j = 0; j < this.password.length; j++) {
      this.indices.push([String(j), this.password[j]]);
    }
  }

  transpose(arrayType: string[][] | [any]) {
    this.transposedValues = arrayType[0].map((_: [], column: number) => {
      return arrayType.map((row) => row[column]);
    });

    for (let k = 0; k < this.transposedValues.length; k++) {
      this.columnsObj = {
        ...this.columnsObj,
        [k]: this.transposedValues[k].join(''),
      };
    }
  }

  sortIndex() {
    return Object.values(this.indices)
      .sort((a: any, b: any) => {
        if (a[1] < b[1]) {
          return -1;
        }
        if (a[1] > b[1]) {
          return 1;
        }
        return 0;
      })
      .map((idx) => idx[0]);
  }

  close() {
    this.password = '';
    this.input = '';
    this.output = '';
    this.indices = [];
    this.columnsObj = {};
    this.numberOfRows = 0;
    this.numberOfColumns = 0;
    this.splittedMessage = [];
    this.transposedValues = [];
    this.displayOutput = false;
  }

  copy() {
    navigator.clipboard.writeText(this.output);
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      detail: 'Copied to Clipboard',
      life: 2000,
      closable: false,
    });
  }
}
