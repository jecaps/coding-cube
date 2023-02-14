import { Injectable } from '@angular/core';
import { Character } from './character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  passwordDetails: Character[] = [];

  characterDetails(password: string, message: string) {
    let splitPassword = [...password];
    let copiedMessage = [...message]
    let numOfCols = password.length;
    let numOfRows = Math.ceil(message.length / numOfCols);

    let rows: any[] = [];
    this.sliceMessage(rows, copiedMessage, numOfRows, numOfCols)
    let transposedValues = rows[0].map((_:[], colIndex: number) => rows.map(row => row[colIndex]));


    // add index to get original order
    let splitPasswordWithIndex: any[] = [];
    splitPassword.forEach((password, idx) =>
      splitPasswordWithIndex.push([password, idx])
    );

    // sort password and add index for the sorted order
    let sorted = [...splitPasswordWithIndex].sort((a, b) =>
      a[0] > b[0] ? 1 : -1
    );
    sorted.forEach((element, idx) => element.push(idx));

    // for each array in 'sorted' build the character object
    sorted.map((element: any[]) => {
      let char = element[0];

      let character = {
        letter: char,
        originalPosition: element[1],
        sortedPosition: element[2],
      };

      this.passwordDetails.push(character);
    });
    
    console.log(this.passwordDetails);
    console.log(rows)
    console.log(transposedValues)
  }

  getPasswordDetails() {
    return this.passwordDetails;
  }

  sliceMessage(array: any[], splitMessage: String[], numberToLoop: number, numberToCompare: number) {
    for (let i = 0; i < numberToLoop; i++) {
      if (splitMessage.length < numberToCompare) {
        while (splitMessage.length < numberToCompare) {
          splitMessage.push(" ");
        }
      }
      array.push(splitMessage.splice(0, numberToCompare));
    }
  }
}
