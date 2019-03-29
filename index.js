function PureRangeSlider(selector, props) {
    this.containerClass = 'js-pure-range-container';
    this.lineClass = "js-pure-range-line";
    this.sliderClass = "js-pure-range-slider";
    this.start = 0;
    this.finish = 100;
    this.values = false;
    this.step = 1;
    this.selector = false;

    if (!(this instanceof PureRangeSlider)) {
        return new PureRangeSlider(selector, props = {});
    }

    this.elem = document.querySelector(selector);
};


PureRangeSlider.prototype.init = function init() {

};

module.exports = PureRangeSlider;