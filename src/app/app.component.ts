import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

  constructor() {
    this.transformationOptions = [
      { label: 'Encrypt', value: 'encrypt' },
      { label: 'Decrypt', value: 'decrypt' },
    ];
  }

  onEncrypt() {
    this.numberOfRows = Math.ceil(this.input.length / this.password.length);
    this.numberOfColumns = this.password.length;
    this.splittedMessage = [...this.input.toLowerCase()];

    let rows: string[][] | [any] = [];
    let sortedIndices;

    this.slicing(rows, this.numberOfRows, this.numberOfColumns);
    this.pairing();
    this.transpose(rows);
    sortedIndices = this.sortIndex();
    sortedIndices.map((idx) => {
      this.output += this.columnsObj[idx as keyof typeof this.columnsObj];
    });
  }

  onDecrypt() {
    this.numberOfRows = Math.ceil(this.input.length / this.password.length);
    this.numberOfColumns = this.password.length;
    this.splittedMessage = [...this.input.toLowerCase()];

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

  clear() {
    this.password = '';
    this.input = '';
    this.output = '';
  }
}
