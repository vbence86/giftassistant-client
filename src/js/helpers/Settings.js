import Storage from './Storage';

const STORAGE_KEY = 'settings';
let singleton;

class Settings {

  constructor() {
    this.reset();
  }

  set(key, value) {
    this.settings[key] = value;
    Storage.getInstance().save({
        key: STORAGE_KEY,
        data: this.settings,
        expires: null
    });
  }

  get(key) {
    if (!key) return this.settings;
    return this.settings[key];
  }

  syncFromLocalStorage() {
    return Storage.getInstance()
      .load({ key: STORAGE_KEY })
      .then(data => this.settings = data)
      .catch(data => this.reset);
  }

  reset() {
    this.settings = {};
  }
    
}

export default {

  getInstance: () => {
    if (!singleton) singleton = new Settings();
    return singleton;
  }

};


