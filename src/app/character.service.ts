import { Injectable } from '@angular/core';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  passwordDetails: Character[] = [];
  
  characterDetails(password: string) {
    let splittedPassword = [...password];
    
      // add index to get original order
      let splittedPasswordWithIndex = new Array();
      splittedPassword.forEach((password,idx) => splittedPasswordWithIndex.push([password,idx]));

      // sort password and add index for the sorted order
      let sorted =[...splittedPasswordWithIndex].sort((a, b) => a[0] > b[0] ? 1 : -1);
      sorted.forEach((element,idx)=> element.push(idx)) 
      
      // for each array in 'sorted' build the character object
      sorted.map((element:Array<any>) => {
        let char = element[0];
        
        let  character =  {
          letter: char,
          originalPosition: element[1],
          sortedPosition: element[2],
        } 
        
        this.passwordDetails.push(character);
      })
    
    console.log(this.passwordDetails)
  }
}

