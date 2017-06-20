let singleton;

class Settings {

    constructor() {
      this.settings = {};
    }

    set(key, value) {
        this.settings[key] = value;
    }

    get(key) {
        if (!key) return this.settings;
        return this.settings[key];
    }
    
}

export default {

    getInstance: () => {
        if (!singleton) singleton = new Settings();
        return singleton;
    }

};


