"use strict"; // Do NOT remove this directive!

PS.init = function(system, options ) {
    PS.keyRepeat(true, 2, 2);

    GB.Clock.startLoop();

    GB.View.setViewGrid(16, 16);
    GB.World.setBounds(5, 5);

    GB.LevelLoader.loadTheseLevels(["easter_eggs_level"], levelOne);

    PS.statusColor(PS.COLOR_WHITE);
    PS.gridColor(PS.COLOR_BLACK);

    let haheeho = new Player();
    //let other_thing = new Doorway({x:3, y:5}, {x:4, y:6}, {x:2, y:1}, {x:1, y:7});
    //let other_other_thing = new Doorway({x:3, y:6}, {x:4, y:7}, {x:1, y:7}, {x:2, y:1});
    haheeho.setPosition({x: 3, y: 3});

    GB.View.setPosition({x: 2, y: 1});
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

PS.keyDown = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, false);
};