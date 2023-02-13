import { Injectable } from '@angular/core';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  passwordDetails: Character[] = [];

  characterDetails(password: string) {
    let splittedPassword = [...password];
    let sortedPassword = splittedPassword.sort();
    splittedPassword.map(char => this.passwordDetails.push({letter: char, originalPosition: splittedPassword.indexOf(char)}));
    console.log(this.passwordDetails);
    console.log(sortedPassword)
  }

}
