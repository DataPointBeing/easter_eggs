GB.Loader.addLoad(
    function(){


        class GBObject {
            #type;
            #id;
            #position;
            #plane;

            #draw_from_outside;

            #deleted;

            constructor(type) {
                this.#type = type;
                this.#deleted = false;
                this.#position = {x: 0, y: 0};
                this.#plane = 0;
                this.#draw_from_outside = false;

                GB.World.hello(this);

                this.populate(this.#position);
            }

            setGridPlane(new_plane) {
                if(new_plane !== this.#plane) {
                    this.#dePopulateObject();
                    this.#plane = new_plane;
                    this.#populateObject();
                }
            }

            setDrawOutside(do_it = true) {
                this.#draw_from_outside = do_it;
            }

            getDrawOutside() {
                return this.#draw_from_outside;
            }

            getGridPlane() {
                return this.#plane;
            }

            getPosition() {
                return this.#position;
            }

            getPositionX() {
                return this.#position.x;
            }

            getPositionY() {
                return this.#position.y;
            }

            setPosition(new_pos) {
                let new_pos_conv;
                if(Array.isArray(new_pos)){
                    new_pos_conv = {x: new_pos[0], y: new_pos[1]};
                }
                else {
                    new_pos_conv = new_pos;
                }

                if(new_pos_conv !== this.#position && GB.World.inBounds(new_pos_conv)) {
                    this.#dePopulateObject();
                    this.#position = new_pos;
                    this.#populateObject();
                }
            }

            setPositionX(new_x) {
                if(new_x !== this.#position.x && GB.World.inBoundsX(new_x)) {
                    this.#dePopulateObject();
                    this.#position.x = new_x;
                    this.#populateObject();
                }
            }

            setPositionY(new_y) {
                if(new_y !== this.#position.y && GB.World.inBoundsY(new_y)) {
                    this.#dePopulateObject();
                    this.#position.y = new_y;
                    this.#populateObject();
                }
            }

            getType() {
                return this.#type;
            }

            getID() {
                return this.#id;
            }

            setID(new_id) {
                this.#id = new_id;
            }

            doEvent(event) {

            }

            refresh() {
                const v_pos = GB.Utility.worldToView(this.#position);
                if(GB.View.inView(v_pos) || this.#draw_from_outside) {
                    PS.gridPlane(this.#plane);
                    this.dePopulate(v_pos);
                    this.populate(v_pos);
                    PS.gridPlane(PS.DEFAULT);
                }
            }

            drawToView() {
                this.#populateObject();
            }

            removeFromView() {
                this.#dePopulateObject();
            }

            #populateObject(){
                const v_pos = GB.Utility.worldToView(this.#position);
                if(GB.View.inView(v_pos) || this.#draw_from_outside) {
                    PS.gridPlane(this.#plane);
                    this.populate(v_pos);
                    PS.gridPlane(PS.DEFAULT);
                }
            }

            #dePopulateObject(){
                const v_pos = GB.Utility.worldToView(this.#position);
                if(GB.View.inView(v_pos) || this.#draw_from_outside) {
                    PS.gridPlane(this.#plane);
                    this.dePopulate(v_pos);
                    PS.gridPlane(PS.DEFAULT);
                }
            }

            dePopulate(pos) {
                PS.color(pos.x, pos.y, PS.COLOR_WHITE);
                PS.alpha(pos.x, pos.y, PS.ALPHA_TRANSPARENT);
                PS.radius(pos.x, pos.y, 0);
                PS.data(pos.x, pos.y, null);
            }

            populate(pos) {

            }

            isDeleted() {
                return this.#deleted;
            }

            deleteObject() {
                this.#deleted = true;
                this.#dePopulateObject();

                GB.World.goodbye(this);
            }


            static #initialized = false;
            static awaken() {
                if (!this.#initialized) {
                    GB.Object = GBObject;
                }
            }
        }


        GBObject.awaken();
    }
);