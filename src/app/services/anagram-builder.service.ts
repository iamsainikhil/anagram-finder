import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnagramBuilderService {
  anagramWordMap = {};

  constructor(private http: HttpClient) { }

  getAnagramWords() {
    const url = 'http://localhost:4200/assets/anagrams.txt';
    this.http.get(url, {responseType: 'text'})
    .subscribe(data => {
      this.anagramLookup(data);
    });
  }

/**
 * Function to build dictionary of valid anagrams from the words in txt file.
 *
 * @param {string} data.
*/
  anagramLookup(words) {
    const w = words.split('\n');
    w.forEach(e => {
      const serializeWord = e.split('').sort().join('');
      if (serializeWord in this.anagramWordMap) {
        this.anagramWordMap[serializeWord].push(e);
      } else {
        this.anagramWordMap[serializeWord] = [e];
      }
    });
    // console.log(Object.keys(this.anagramWordMap));
  }

/**
* Function to find valid anagrams for the given string.
*
* @param {String} searchWord.
*/
  findAnagram(s) {
    const sw = s.split('').sort().join('');
    if (sw in this.anagramWordMap) {
      return this.anagramWordMap[sw];
    }
  }
}
