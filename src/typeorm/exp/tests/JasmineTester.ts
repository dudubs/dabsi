export class JasmineTester {
    protected _focus = false;
    protected _debug = false;
    protected debugging = false;
    protected description = "";

    describe(description) {
        this.description += " " + description;
        return this;
    }


    get foucs(): this {
        this._focus = true;
        return this;
    }

    get debug(): this {
        this._debug = true;
        this.debugging = true;
        return this;
    }

    test(callback) {
        const {_debug, description, _focus} = this;
        this.description = "";
        this._debug = false;
        this._focus = false;
        this.debugging = false;
        (_focus ? fit : it)(description, async () => {
            this._debug = _debug;
            await callback();
            this._debug = false;
        });
    }

}
