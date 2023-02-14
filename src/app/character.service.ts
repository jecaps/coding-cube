import { Injectable } from '@angular/core';
import { Character } from './character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  passwordDetails: Character[] = [];

  characterDetails(password: string, message: string) {
    // create an array of arrays that correspond to the characters in the column
    let transposedValues: any[] = [];
    let copiedMessage = [...message];
    let numOfCols = password.length;
    let numOfRows = Math.ceil(message.length / numOfCols);
    this.sliceMessage(transposedValues, copiedMessage, numOfRows, numOfCols);
    transposedValues = transposedValues[0].map((_: [], colIndex: number) =>
      transposedValues.map((row) => row[colIndex])
    );

    // add index to get original order and insert the array in transposed values at index position
    let splitPassword = [...password];
    let splitPasswordWithIndex: any[] = [];
    splitPassword.forEach((password, idx) => {
      splitPasswordWithIndex.push([password, idx, transposedValues[idx]]);
    });

    // sort password and add index for the sorted order
    let sorted = [...splitPasswordWithIndex].sort((a, b) =>
      a[0] >= b[0] ? 1 : -1
    );
    sorted.forEach((element, idx) => element.push(idx));

    // map array in 'sorted' to build the character object
    sorted.map((element: any[]) => {
      let character = {
        letter: element[0],
        originalPosition: element[1],
        characterColumns: element[2],
        sortedPosition: element[3],
      };
      this.passwordDetails.push(character);
    });
  }

	// slice message according to length of password
  sliceMessage(
    array: any[],
    splitMessage: String[],
    numberToLoop: number,
    numberToCompare: number
  ) {
    for (let i = 0; i < numberToLoop; i++) {
      if (splitMessage.length < numberToCompare) {
        while (splitMessage.length < numberToCompare) {
          splitMessage.push(' ');
        }
      }
      array.push(splitMessage.splice(0, numberToCompare));
    }
  }
}
