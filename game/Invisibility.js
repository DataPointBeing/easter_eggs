class Invisibility {
    #inner_thing;

    constructor(thing) {
        this.#inner_thing = thing;

        thing.addPopOverride(function() {

        });
        thing.addDePopOverride(function() {

        });
    }
}