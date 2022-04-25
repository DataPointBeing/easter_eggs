class MobileWall extends GB.Object {

    #frequency;
    #toggleFn;

    #active = true;

    constructor(x, y, freq, can_come_back = true, start_active = true) {
        super("slide_barrier");
        super.setPosition({x:x, y:y});

        this.#frequency = freq;
        if(can_come_back) {
            this.#toggleFn = function() {
                if(this.#active) {

                }
                else {

                }

                super.refresh();
            }
        }
        else {
            this.#toggleFn = function() {
                GB.World.markForDelete(this);
            }
        }

        GB.World.registerInterest(this, ButtonEvent);
    }

    doEvent(event) {
        switch(event.getType()) {
            case ButtonEvent.evType():
                if(event.getFrequency() === this.#frequency) {
                    this.#toggleFn();
                }
                break;
        }
    }

    populate(pos) {
        PS.color(pos.x, pos.y, 0x636363);
        PS.alpha(pos.x, pos.y, PS.ALPHA_OPAQUE);
        PS.radius(pos.x, pos.y, 10);
        PS.data(pos.x, pos.y, 1);
    }

    dePopulate(pos) {
        PS.color(pos.x, pos.y, PS.COLOR_WHITE);
        PS.alpha(pos.x, pos.y, PS.ALPHA_TRANSPARENT);
        PS.radius(pos.x, pos.y, 0);
        PS.data(pos.x, pos.y, null);
    }
}