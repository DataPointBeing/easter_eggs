"use strict"; // Do NOT remove this directive!

PS.init = function(system, options ) {
    PS.keyRepeat(true, 2, 2);

    PS.audioLoad("fx_hoot");
    PS.audioLoad("fx_tada");

    GB.Clock.startLoop();

    GB.View.setViewGrid(16, 16, PS.COLOR_BLACK);
    GB.View.setPosition({x: 18, y: 52});

    GB.LevelLoader.loadTheseLevels(["easter_eggs_level"], levelOne);

    PS.statusColor(PS.COLOR_WHITE);
    PS.gridColor(PS.COLOR_BLACK);

};

function levelOne() {
    GB.LevelLoader.buildLevel("easter_eggs_level");
}

function test(){
    PS.debug("perfect");
}

PS.keyDown = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, true);
};

PS.keyUp = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, false);
};