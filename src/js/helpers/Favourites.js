import Storage from './Storage';

const STORAGE_KEY = 'favourites';
let singleton;

class Favourites {

  constructor() {
    this.favourites = [
      {
        "asin": "asin1",
        "label": "How I Lost You",
        "price": 10,
        "formattedPrice": "$12.00",
        "description": "Jenny Blackhurst's debut psychological thriller and #1 Kindle bestseller HOW I LOST YOU was described by Clare Mackintosh as 'utterly gripping'. If you love Louise Jensen's THE SISTER or Tracy Buchanan's NO TURNING BACK you will love this.",
        "amazonURL": "amazon.com/shortURL",
        "largeImageURL": "https://images-eu.ssl-images-amazon.com/images/I/513FmahVMwL.jpg"
      },
      {
        "asin": "asin1",
        "label": "PAUL JONES® Men's Long Sleeve Shirts Button Front Cotton Slim Fit Plain Color S-XXL",
        "price": 10,
        "formattedPrice": "£6.87",
        "description": "Jenny Blackhurst's debut psychological thriller and #1 Kindle bestseller HOW I LOST YOU was described by Clare Mackintosh as 'utterly gripping'. If you love Louise Jensen's THE SISTER or Tracy Buchanan's NO TURNING BACK you will love this.",
        "amazonURL": "amazon.com/shortURL",
        "largeImageURL": "https://images-na.ssl-images-amazon.com/images/I/71mu17tCzLL._UX425_.jpg"
      }
    ];
  }

  add(gift) {
    this.favourites.push(gift);
    this.syncToLocalStorage();
  }

  remove(gift) {
    for (let i = this.favourites.length - 1; i >= 0; i -= 1) {
      if (gift.asin === this.favourites[i].asin) {
        this.favourites.splice(i, 1);
        this.syncToLocalStorage();
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
    return Promise.resolve();
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
