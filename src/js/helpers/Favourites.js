
let singleton;

class Favourites {

  constructor() {
    this.favourites = [
      {
        "asin": "1",
        "label": "The Silent Wife: A gripping emotional page turner with a twist that will take your breath away",
        "price": 10,
        "formattedPrice": "$12.85",
        "amazonURL": "amazon.com/shortURL",
        "description": "This is a description of the product and should provide further informations about the given gift.",
        "largeImageURL": "https://images-eu.ssl-images-amazon.com/images/I/51UUcbFtpXL.jpg"
      },
      {
        "asin": "2",
        "label": "Rogue One: A Star Wars Story [DVD] [2016] [2017]",
        "price": 9.99,
        "formattedPrice": "$9.99",
        "amazonURL": "amazon.com/shortURL",
        "description": "This is a description of the product and should provide further informations about the given gift.",
        "largeImageURL": "https://images-na.ssl-images-amazon.com/images/I/912ud5CJkEL._SL1500_.jpg"
      },
      {
        "asin": "3",
        "label": "Swimming glass",
        "price": 29.99,
        "formattedPrice": "$29.99",
        "amazonURL": "amazon.com/shortURL",
        "description": "This is a description of the product and should provide further informations about the given gift.",
        "largeImageURL": "https://images-na.ssl-images-amazon.com/images/I/61T9Y0Hl98L._SL1000_.jpg"
      }     
    ];
  }

  add(gift) {
    this.favourites.push(gift);
  }

  remove(gift) {
    for (let i = this.favourites.length - 1; i >= 0; i -= 1) {
      if (gift.asin === this.favourites[i].asin) {
        this.favourites.splice(i, 1);
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
