GB.Loader.addLoad(
    function(){


        class GBWorld {
            static #master_id = 1;

            #map_colors = [];
            #map_collision = [];

            #world_objects = [];
            #interests = [];
            #bounds = {x: 1, y: 1};

            #event_categories = {};

            hello(thing) {
                this.#world_objects.push(thing);
                this.#interests.push([]);

                thing.setID(GBWorld.#master_id++);
            }

            goodbye(thing) {
                const ind = this.#world_objects.indexOf(thing);
                this.#world_objects.splice(ind, 1);
                this.#interests.splice(ind, 1);
            }

            populateAll() {
                for(let thing of this.#world_objects) {
                    if(thing !== null) {
                        thing.drawToView();
                    }
                }
            }

            dePopulateAll() {
                for(let thing of this.#world_objects) {
                    if(thing !== null) {
                        thing.removeFromView();
                    }
                }
            }

            registerInterest(thing, event) {
                const event_type = event.evType();
                if (!this.#event_categories[event_type]) {
                    this.#event_categories[event_type] = [thing];
                    this.#appendInterest(thing, event_type);
                } else if (!this.#event_categories[event_type].contains(thing)) {
                    this.#event_categories[event_type].push(thing);
                    this.#appendInterest(thing, event_type);
                }
            }

            #appendInterest(thing, event_type) {
                let index;

                if (this.#world_objects[this.#world_objects.length - 1] === thing) {
                    index = this.#world_objects.length - 1;
                } else {
                    index = this.#world_objects.indexOf(thing);
                }

                this.#interests[index].push(event_type);
            }

            sendEvent(event) {
                let interested = this.#event_categories[event.getType()];

                if (interested) {
                    for (let thing of this.#world_objects) {
                        if (thing != null) {
                            thing.doEvent(event);
                        }
                    }
                }
            }

            setBounds(x_dim, y_dim) {
                this.#bounds = {x: x_dim, y: y_dim};

                this.#map_colors = [];
                this.#map_collision = [];
                for(let i_y = 0; i_y < y_dim; i_y++) {
                    this.#map_colors.push([]);
                    this.#map_collision.push([]);
                    for(let i_x = 0; i_x < x_dim; i_x++) {
                        this.#map_colors[i_y].push(PS.COLOR_WHITE);
                        this.#map_collision[i_y].push(false);
                    }
                }
            }

            getBoundsX() {
                return this.#bounds.x;
            }

            getBoundsY() {
                return this.#bounds.y;
            }

            inBounds(pos) {
                let x, y;
                if(Array.isArray(pos)) {
                    x = pos[0];
                    y = pos[1];
                }
                else {
                    x = pos.x;
                    y = pos.y;
                }

                return x >= 0 && y >= 0 && x < this.getBoundsX() && y < this.getBoundsY();
            }

            inBoundsX(x_p) {
                return x_p >= 0 && x_p < this.getBoundsX();
            }

            inBoundsY(y_p) {
                return y_p >= 0 && y_p < this.getBoundsX();
            }


            // A variation on the singleton pattern
            constructor() {
                if(GBWorld.#initialized) {
                    throw "Attempt to re-initialize " + this.constructor.name;
                }
            }

            static #initialized = false;
            static awaken() {
                if (!this.#initialized) {
                    GB.World = new GBWorld();
                    this.#initialized = true;
                }
            }

            collision(x, y) {
                const to_vw = GB.Utility.worldToView({x: x, y: y});
                const x_bd = to_vw.x;
                const y_bd = to_vw.y;
                return !this.inBounds({x: x, y: y}) || this.#map_collision[y][x] || (GB.View.inView({x: x_bd, y: y_bd}) && PS.data(x_bd, y_bd) === 1);
            }
        }



        GBWorld.awaken();
    }
);