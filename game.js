"use strict"; // Do NOT remove this directive!

PS.init = function(system, options) {
    PS.keyRepeat(true, 2, 2);

    PS.audioLoad("fx_hoot");
    PS.audioLoad("fx_tada");
    PS.audioLoad("fx_blip");

    PS.statusText("Crawl, Crypt, Crypt Crawl");

    GB.Clock.startLoop();

    GB.View.setViewGrid(16, 16, PS.COLOR_BLACK);

    initItemMakers();
    GB.LevelLoader.loadTheseLevels(["easter_eggs_level2"], levelOne);

    PS.statusColor(PS.COLOR_WHITE);
    PS.gridColor(PS.COLOR_BLACK);

};

function initItemMakers() {

    // YELLOW: Player!
    GB.LevelLoader.registerItem(0xFFFF00, function(x, y, cxn) {
        new Player(x, y);
    });

    // RED: Regular vertical doorway
    GB.LevelLoader.registerItem(0xFF0000, function(x, y, cxn) {
        new Doorway(
            {x:x,y:y},
            {x:x+1,y:y+1},
            {x:x+1-(GB.View.getWidth()/2), y:y+1-GB.View.getHeight()},
            {x:x+1-(GB.View.getWidth()/2), y:y+2}
        );
        new Doorway(
            {x:x,y:y+1},
            {x:x+1,y:y+2},
            {x:x+1-(GB.View.getWidth()/2), y:y+2},
            {x:x+1-(GB.View.getWidth()/2), y:y+1-GB.View.getHeight()}
        );
    });

    // BLUE: Regular horizontal doorway
    GB.LevelLoader.registerItem(0x0000FF, function(x, y, cxn) {
        new Doorway(
            {x:x,y:y},
            {x:x+1,y:y+1},
            {y:y+1-(GB.View.getHeight()/2), x:x+1-GB.View.getWidth()},
            {y:y+1-(GB.View.getHeight()/2), x:x+2}
        );
        new Doorway(
            {x:x+1,y:y},
            {x:x+2,y:y+1},
            {x:x+2, y:y+1-(GB.View.getHeight()/2)},
            {x:x+1-GB.View.getWidth(), y:y+1-(GB.View.getHeight()/2)}
        );
    });

    // MAGENTA: Death zone (kills the player when they step into it)
    GB.LevelLoader.registerItem(0xFF00FF, function(x, y, cxn) {
        new DeathZone({x:x,y:y}, {x:x,y:y});
    });

    // GREEN: Button
    GB.LevelLoader.registerItem(0x00FF00, function(x, y, cxn) {
        new Button(x, y, cxn);
    });

    // DARK GREEN: Invisible button
    GB.LevelLoader.registerItem(0x007400, function(x, y, cxn) {
        new Invisibility(new Button(x, y, cxn));
    });

    // CYAN: Disappearing wall (toggleable)
    GB.LevelLoader.registerItem(0x00FFFF, function(x, y, cxn) {
        new MobileWall(x, y, cxn);
    });

    // CERULEAN: Disappearing wall (not toggleable)
    GB.LevelLoader.registerItem(0x006dd0, function(x, y, cxn) {
        new MobileWall(x, y, cxn, false);
    });

    // LIGHT ORANGE: Victory zone, you win when you reach one of these.
    GB.LevelLoader.registerItem(0xFFAA00, function(x, y, cxn) {
        new VictoryZone({x:x, y:y}, {x:x+1, y:y});
    });

    // DARK GRAY: Camera starting point, collision.
    GB.LevelLoader.registerItem(0x696969, function(x, y, cxn) {
        GB.View.setPosition({x:x, y:y});
        GB.World.setCollisionSquare(x, y, true);
    });

    // LIGHT GRAY: Camera starting point, no collision.
    GB.LevelLoader.registerItem(0x969696, function(x, y, cxn) {
        GB.View.setPosition({x:x, y:y});
        GB.World.setCollisionSquare(x, y, false);
    });
}

function levelOne() {
    GB.LevelLoader.buildLevel("easter_eggs_level2");
}

PS.keyDown = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, true);
};

PS.keyUp = function( key, shift, ctrl, options ) {
    GB.Input.processInput(key, false);
};