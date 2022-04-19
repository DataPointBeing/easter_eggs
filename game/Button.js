class Button extends Interactable {

    constructor(x, y) {
        super("button");
        super.setPosition({x:x,y:y});
        GB.World.registerInterest(this, InteractEvent)
    }

    populate(pos) {
        super.populate(pos);
    }

    dePopulate(pos) {
        super.dePopulate(pos);
    }

    handleInteract() {
        PS.audioPlay("fx_blip", {volume: 0.2});
    }

}