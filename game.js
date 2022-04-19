"use strict"; // Do NOT remove this directive!

PS.init = function(system, options ) {
    PS.keyRepeat(true, 2, 2);

    GB.Clock.startLoop();

    GB.View.setViewGrid(6, 5, PS.COLOR_YELLOW);
    GB.World.setBounds(5, 5);

    let haheeho = new Player();
};

PS.keyDown = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, true);
};

PS.keyDown = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, false);
};