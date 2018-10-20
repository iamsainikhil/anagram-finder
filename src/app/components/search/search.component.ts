import { AnagramBuilderService } from './../../services/anagram-builder.service';
import { Component, AfterViewInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

  searchWord = '';
  anagrams = [];
  advancedAnagrams = [];
  favoriteAnagrams = [];
  sortedAnagrams = [];
  validAnagrams;
  showLoader = false;
  sortAnagrams = false;

  constructor(
    private anagramBuilderService: AnagramBuilderService
    ) {}

  ngAfterViewInit() {
    this.anagramBuilderService.getAnagramWords();
  }


  findFactorial(n) {
    if (n > 2) {
      return n * this.findFactorial(n - 1);
    } else if (n === 1) {
      return 1;
    }
    return 2;
  }

  /**
 * Function to find anagrams for the given string.
 *
 * @param {String} searchWord.
 */
  allAnagrams(s) {
    if (s.length === 0) {
      this.anagrams = [];
      return [''];
    }


    const result = {};
    this.showLoader = true;
    s.trim().split('').forEach((e, i) => {
        const remainingLetters = s.slice(0, i) + s.slice(i + 1);
        this.allAnagrams(remainingLetters).forEach((anagram) => {
          result[e + anagram] = true;
        });
    });

    // to disable loader once anagram find is finished
    if (Object.keys(result).length === this.findFactorial(s.length)) {
      this.showLoader = false;
      // update anagrams
      this.anagrams = [];
      Object.keys(result).forEach(e => {
        this.anagrams.push(
          {
            word: e,
            favorite: false
          }
        );
      });
      // to not lose favorite anagrams while re-roll
      if (this.favoriteAnagrams.length > 0) {
        // add favorite anagrams at the start of anagrams
        this.favoriteAnagrams.forEach(e => {
          this.anagrams.unshift(e);
        });
      }

      // to create advanced anagrams
      this.advancedAnagrams = [];
      this.advancedAnagrams = this.anagrams.slice(0, 10 - this.favoriteAnagrams.length);

      // to update sortedAnagrams w.r.t advancedAnagrams
      this.sortedAnagrams = this.advancedAnagrams.map(e => e);

      // to find valid anagrams
      // console.log(this.anagramBuilderService.findAnagram(s.trim().toLowerCase()));
      this.validAnagrams = this.anagramBuilderService.findAnagram(s.trim().toLowerCase());
    }

    return Object.keys(result);
  }

  /**
 * Function to remove or clear the last character of the search word.
 *
 * @param {String} searchWord.
 */
  reRollAnagram(w) {
    this.searchWord = w.split('').slice(0, w.length - 1).join('');
    this.allAnagrams(this.searchWord);
  }

  /**
 * Function to add or remove favoriteAnagrams from advancedAnagrams.
 *
 * @param {Number} index of advancedAnagrams.
 */
  favoriteAnagram(i) {
    this.advancedAnagrams[i].favorite = !this.advancedAnagrams[i].favorite;
    if (this.advancedAnagrams[i].favorite) {
      this.favoriteAnagrams.push(
        {
          word: this.advancedAnagrams[i].word,
          favorite: true
        }
      );
    } else {
      this.favoriteAnagrams.splice(this.favoriteAnagrams.indexOf(this.advancedAnagrams[i].word), 1);
    }
  }

  /**
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @param {String} property Key of the object to sort.
 */
  sortAnagram(property) {
  let sortOrder = 1;

  if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
  }

  return function (a, b) {
      if (sortOrder === -1) {
          return b[property].localeCompare(a[property]);
      } else {
          return a[property].localeCompare(b[property]);
      }
  };
}

/**
 * Function to build sortedAnagrams by sorting advancedAnagrams using sortAnagram.
 *
 * @param {property} property Key of the object to sort.
 */
 buildSortedAnagrams(property) {
   this.sortAnagrams = !this.sortAnagrams;
   this.sortedAnagrams = [];
   // deep copy of advancedAnagrams
   this.sortedAnagrams = this.advancedAnagrams.map(e => e);
  return this.sortedAnagrams.sort(this.sortAnagram(property));
 }

}
