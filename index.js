

function PureRangeSlider(selector, props) {
    this.containerClass = 'js-pure-range-container';
    this.lineClass = "js-pure-range-line";
    this.sliderClass = "js-pure-range-slider";
    this.start = 0;
    this.finish = 100;
    this.values = false;
    this.step = 1;
    this.selector = false;

    this.lineStyle = {
        position: 'absolute',
        width: '100%',
        height: '2px',
        backgroundColor: '#333',
        top: '50%',
        transform: 'translateY(-50%)'
    };
    this.sliderStyle = {
        position: 'absolute',
        width: '10%',
        height: '20px',
        top: '50%',
        backgroundColor: '#3c3d8f',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
    };

    if (!(this instanceof PureRangeSlider)) {
        return new PureRangeSlider(selector, props = {});
    }

    this.elem = document.querySelector(selector);

    this.createSlider = function(){
        let line = document.createElement('div');
        line.classList.add(this.lineClass);
        Object.assign(line.style,this.lineStyle);

        this.elem.append(line);

        let slider = document.createElement('div')
        slider.classList.add(this.sliderClass);
        Object.assign(slider.style,this.sliderStyle);

        this.elem.append(slider);

        this.elem.classList.add(this.containerClass);
        this.createStops();
    };

    this.createStops = function(){
        if(!this.values){
            for(let i = 0; i < this.finish; i+=this.step){
                let step = document.createElement('span');
                step.dataset.value = i;
                step.style.left = (this.elem.clientWidth / this.finish) * i + 'px';
                this.elem.append(step);
            }
        }
    };

    this.createSlider();
};


module.exports = PureRangeSlider;