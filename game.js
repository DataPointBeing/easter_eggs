"use strict"; // Do NOT remove this directive!

PS.init = function(system, options ) {
    PS.gridColor(PS.COLOR_BLUE);

    GB.Clock.startLoop();

    GB.View.setViewGrid(5, 5, PS.COLOR_YELLOW);
    GB.World.setBounds(5, 5);

    let haheeho = new Player();
};

PS.keyDown = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, true);
};

PS.keyDown = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, false);
};