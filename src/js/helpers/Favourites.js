
let singleton;

class Favourites {

	constructor() {
		this.favourites = [];
	}

	add(gift) {
		this.favourites.push(gift);
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
