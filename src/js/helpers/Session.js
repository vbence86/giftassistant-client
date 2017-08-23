import Storage from './Storage';
import EventEmitter from 'es6-event-emitter';

const STORAGE_KEY = 'session';
let singleton;

class Session extends EventEmitter {

  constructor() {
    super();
    this.session = {};
  }

  add(key, value) {
    this.session[key] = value;
    this.syncToLocalStorage();
    this.trigger('update', { key, value });
  }

  remove(key) {
    this.session[key] = null;
    this.syncToLocalStorage();
    this.trigger('update', { key });
  }

  get(key) {
    if (!key) return this.session;
    return this.session[key];
  }

  empty() {
    this.session = {};
    syncToLocalStorage();
  }
 
  syncToLocalStorage() {
    Storage.getInstance().save({
        key: STORAGE_KEY,
        data: this.session,
        expires: null
    });    
  }

  syncFromLocalStorage() {
    return Storage.getInstance()
      .load({ key: STORAGE_KEY })
      .then(data => this.session = data)
      .catch(err => this.session = {};
  }  
  
}

export default {

  getInstance: () => {
    if (!singleton) {
      singleton = new Session();
    }
    return singleton;
  }

};

