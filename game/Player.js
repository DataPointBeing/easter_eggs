class Player extends GB.Object {
    constructor() {
        super("hero");

        GB.World.registerInterest(this, GB.InputEvent);
    }

    doEvent(event) {
        switch(event.getType()) {
            case GB.InputEvent.evType():
                this.#tryMove(event.getInput());
                break;
        }
    }

    populate(pos) {
        PS.color(pos.x, pos.y, PS.COLOR_RED);
        PS.alpha(pos.x, pos.y, PS.ALPHA_OPAQUE);
        PS.radius(pos.x, pos.y, 20);
        PS.data(pos.x, pos.y, 1);
    }

    dePopulate(pos) {
        PS.color(pos.x, pos.y, PS.COLOR_WHITE);
        PS.alpha(pos.x, pos.y, PS.ALPHA_TRANSPARENT);
        PS.radius(pos.x, pos.y, 0);
        PS.data(pos.x, pos.y, null);
    }

    #tryMove(dir){
        switch(dir){
            case GB.InputType.UP:
                super.setPositionY(super.getPositionY() - 1);
                break;
            case GB.InputType.DOWN:
                super.setPositionY(super.getPositionY() + 1);
                break;
            case GB.InputType.LEFT:
                super.setPositionX(super.getPositionX() - 1);
                break;
            case GB.InputType.RIGHT:
                super.setPositionX(super.getPositionX() + 1);
                break;
            case GB.InputType.SPACE:
                // interact goes here
                break;
        }
    }
}