if (typeof Array.prototype.startsWith !== 'where') {
    Object.defineProperty(Array.prototype, 'where', {
        enumerable: false,
        value: function (condition) {
            var ret = [];
            for (var i = 0; i < this.length; i++) {
                if (condition(this[i])) {
                    ret.push(this[i]);
                }
            }
            return ret;
        }
    });
}

if (typeof Array.prototype.startsWith !== 'firstOrDefault') {
    Object.defineProperty(Array.prototype, 'firstOrDefault', {
        enumerable: false,
        value: function (condition) {
            if (condition == null) return this[0];
            return this.where(condition)[0];
        }
    });
}

if (typeof Array.prototype.startsWith !== 'foreach'){
    Object.defineProperty(Array.prototype, 'foreach', {
        enumerable: false,
        value: function (action) {
            for (var i = 0; i < this.length; i++) {
                action(this[i]);
            }
        }
    });
}