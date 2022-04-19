GB.Loader.addLoad(
    function(){


        class GBUtility {

            static worldToView(pos) {
                let x, y;
                if(Array.isArray(pos)) {
                    x = pos[0];
                    y = pos[1];
                }
                else {
                    x = pos.x;
                    y = pos.y;
                }

                return {x: x - GB.View.getPositionX(), y: y - GB.View.getPositionY()};
            }

            static viewToWorld(pos) {
                let x, y;
                if(Array.isArray(pos)) {
                    x = pos[0];
                    y = pos[1];
                }
                else {
                    x = pos.x;
                    y = pos.y;
                }

                return {x: x + GB.View.getPositionX(), y: y + GB.View.getPositionY()};
            }

            // Static-ish class
            constructor() {
                throw "Attempt to instantiate " + this.constructor.name;
            }

            static #initialized = false;
            static awaken() {
                if (!this.#initialized) {
                    GB.Utility = GBUtility;
                    this.#initialized = true;
                }
            }
        }



        GBUtility.awaken();
    }
);