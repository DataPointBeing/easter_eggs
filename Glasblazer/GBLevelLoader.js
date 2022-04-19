GB.Loader.addLoad(
    function(){


        class GBLevelLoader {

            static level_path = "levels/";

            static #backgrounds = {};
            static #collisions = {};

            static done_loading = 0;
            static needed = 0;

            static nextOrderOfBusiness;

            static dunzo() {
                this.done_loading++;
                if (this.done_loading === this.needed) {
                    this.nextOrderOfBusiness();
                }
            }

            loadTheseLevels(levels, onComplete) {
                GBLevelLoader.nextOrderOfBusiness = onComplete;
                for(let lev of levels) {
                    if(lev !== null){
                        GBLevelLoader.needed += 2;
                        let bg = function(imageData){
                            GBLevelLoader.#backgrounds[lev] = imageData;
                            GBLevelLoader.dunzo();
                        }
                        let col = function(imageData){
                            GBLevelLoader.#collisions[lev] = imageData;
                            GBLevelLoader.dunzo();
                        }

                        PS.imageLoad(GBLevelLoader.level_path + lev + ".gif", bg);
                        PS.imageLoad(GBLevelLoader.level_path + lev + "_OBJECTS.gif", col);
                    }
                }
            }

            makeItem(x, y, color) {
                switch(color) {
                    case 0xFF0000:
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
                        PS.debug("spawned")
                        break;
                }
            }

            buildLevel(level) {
                const coll = GBLevelLoader.#collisions[level];
                const bg = GBLevelLoader.#backgrounds[level];

                GB.World.setBounds(coll.width, coll.height);

                const coll_bools = [];
                const bg_colors = [];
                for(let i_y = 0; i_y < coll.height; i_y++) {
                    coll_bools.push([]);
                    bg_colors.push([]);
                    for(let i_x = 0; i_x < coll.width; i_x++) {
                        const k_x = (i_x +(i_y*coll.width)) * 4;

                        //PS.debug(bg.data[k_x] + ", " + bg.data[k_x+1] + ", " + bg.data[k_x+2] + "\n");
                        const bg_c = PS.makeRGB(bg.data[k_x], bg.data[k_x+1], bg.data[k_x+2]);
                        bg_colors[i_y].push(bg_c);

                        const b_c = PS.makeRGB(coll.data[k_x], coll.data[k_x+1], coll.data[k_x+2]);
                        coll_bools[i_y].push(b_c === 0xFFFFFF);
                        this.makeItem(i_x, i_y, b_c);
                    }
                }

                GB.World.setBackgroundArray(bg_colors);
                GB.World.setCollisionArray(coll_bools);

                GB.World.dePopulateAll();
                GB.World.populateAll();
            }


            // A variation on the singleton pattern
            constructor() {
                if(GBLevelLoader.#initialized) {
                    throw "Attempt to re-initialize " + this.constructor.name;
                }
            }

            static #initialized = false;
            static awaken() {
                if (!this.#initialized) {
                    GB.LevelLoader = new GBLevelLoader();
                    this.#initialized = true;
                }
            }

        }



        GBLevelLoader.awaken();
    }
);