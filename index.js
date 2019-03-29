

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
        transform: 'translate(-50%, -50%)'
    };
    this.containerStyle = {
        position: 'relative',
        height: '40px',
        width: '100%'
    };
    this.sliderStyle = {
        position: 'absolute',
        height: '20px',
        top: '50%',
        backgroundColor: '#3c3d8f',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
    };
    this.stepStyle = {
        width: '2px',
        height: '10px',
        position: 'absolute',
        backgroundColor: '#380f4d',
        top: '50%',
        transform: 'translate(50%,-50%)',
    };

    if (!(this instanceof PureRangeSlider)) {
        return new PureRangeSlider(selector, props = {});
    }

    Object.assign(this,props);

    this.elem = document.querySelector(selector);

    this.createSlider = function(){
        this.line = document.createElement('div');
        this.line.classList.add(this.lineClass);
        Object.assign(this.line.style,this.lineStyle);

        this.elem.append(this.line);

        this.slider = document.createElement('div');
        this.slider.classList.add(this.sliderClass);
        Object.assign(this.slider.style,this.sliderStyle);

        if(!this.values){
            this.slider.style.width = (this.finish - this.start) / 100 + '%';
        }else{
            this.slider.style.width = this.values.length / 100 + '%';
        }

        this.elem.append(this.slider);

        this.elem.classList.add(this.containerClass);
        Object.assign(this.elem, this.containerStyle);

        this.createStops();
        this.initSliding();
    };

    this.createStops = function(){
        if(!this.values){
            for(let i = this.start; i <= this.finish; i+=this.step){
                let step = document.createElement('span');
                step.dataset.value = i;
                step.style.left = (this.elem.clientWidth / this.finish) * i + 'px';
                Object.assign(step.style,this.stepStyle);
                this.elem.append(step);
            }
        }
    };
    this.initSliding = function(){
        this.slider.onmousedown = function(){
            // let elem = this;
            let startPosition = this.getBoundingClientRect().x;
            document.onmousemove = (e) => {
                this.style.left = startPosition + e.pageX + 'px';
            };
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        };
    }


    this.createSlider();
};


module.exports = PureRangeSlider;