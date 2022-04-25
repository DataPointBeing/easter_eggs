class MobileWall extends GB.Object {

    #frequency;
    #toggleFn;

    #active;

    constructor(x, y, freq, can_come_back = true, start_active = true) {
        super("slide_barrier");
        this.setPosition({x:x, y:y});

        this.#active = start_active;

        this.#frequency = freq;
        if(can_come_back) {
            this.#toggleFn = function() {
                this.#active = !this.#active;

                this.refresh();
            };
        }
        else {
            this.#toggleFn = function() {
                GB.World.markForDelete(this);
            };
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
        PS.alpha(pos.x, pos.y, this.#active? PS.ALPHA_OPAQUE : PS.ALPHA_TRANSPARENT);
        PS.radius(pos.x, pos.y, 10);
        PS.data(pos.x, pos.y, this.#active? 1 : null);
    }

    dePopulate(pos) {
        PS.color(pos.x, pos.y, PS.COLOR_WHITE);
        PS.alpha(pos.x, pos.y, PS.ALPHA_TRANSPARENT);
        PS.radius(pos.x, pos.y, 0);
        PS.data(pos.x, pos.y, null);
    }
}