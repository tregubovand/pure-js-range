

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

    this.createSlider = function(){
        let line = document.createElement('div');
        line.class = this.lineClass;
        this.elem.appendChild(line);

        let slider = document.createElement('div')
        slider.class = this.sliderClass;
        this.elem.appendChild(line);

        this.elem.classList.add(this.containerClass);
    }

    this.createSlider();
};


module.exports = PureRangeSlider;