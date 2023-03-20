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