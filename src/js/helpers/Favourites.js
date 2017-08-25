import Storage from './Storage';
import EventEmitter from 'es6-event-emitter';

const STORAGE_KEY = 'favourites';
let singleton;

class Favourites extends EventEmitter {

  constructor() {
    super();
    this.favourites = [];
  }

  add(gift) {
    this.favourites.push(gift);
    this.syncToLocalStorage();
    this.trigger('update', this.favourites.length);
  }

  remove(gift) {
    for (let i = this.favourites.length - 1; i >= 0; i -= 1) {
      if (gift.asin === this.favourites[i].asin) {
        this.favourites.splice(i, 1);
        this.syncToLocalStorage();
        this.trigger('update', this.favourites.length);
        return;
      }
    }
  }

  get(idx) {
    if (!idx) return this.favourites;
    return this.favourites[idx];
  }

  empty() {
    while (this.favourites.length) this.favourites.pop();
    syncToLocalStorage();
  }

  syncToLocalStorage() {
    Storage.getInstance().save({
        key: STORAGE_KEY,
        data: this.favourites,
        expires: null
    });    
  }

  syncFromLocalStorage() {
    return Storage.getInstance()
      .load({ key: STORAGE_KEY })
      .then(data => this.favourites = data)
      .catch(err => this.favourites = []);
  }  
  
}

export default {

  getInstance: () => {
    if (!singleton) {
      singleton = new Favourites();
    }
    return singleton;
  }

};
