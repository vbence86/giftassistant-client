import Storage from './Storage';
const package require('../../../../package.json');

const STORAGE_KEY = 'settings';
let singleton;

class Settings {

  constructor() {
    this.settings = {
      version: package.version,
    };
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
      .catch(data => this.settings = {});
  }
    
}

export default {

  getInstance: () => {
    if (!singleton) singleton = new Settings();
    return singleton;
  }

};


