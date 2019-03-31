function PureRangeSlider(selector, props) {
    this.containerClass = 'js-pure-range-container';
    this.lineClass = "js-pure-range-line";
    this.sliderClass = "js-pure-range-slider";
    this.stopClass = "js-pure-range-stop";
    this.start = 0;
    this.finish = 100;
    this.values = false;
    this.step = 1;
    this.selector = false;



    if (!(this instanceof PureRangeSlider)) {
        return new PureRangeSlider(selector, props = {});
    }

    Object.assign(this,props);

    this.elem = document.querySelector(selector);

    this.createSlider = function(){
        this.line = document.createElement('div');
        this.line.classList.add(this.lineClass);
        this.elem.append(this.line);

        this.slider = document.createElement('div');
        this.slider.classList.add(this.sliderClass);

        if(!this.values){
            this.slider.style.width = 1 / (this.finish - this.start) * 100 + '%';
        }else{
            this.slider.style.width = this.values.length / 100 + '%';
        }

        this.elem.append(this.slider);

        this.elem.classList.add(this.containerClass);
        this.defaultStyles();
        this.createStops();
        this.initSliding();
    };
    this.createStops = function(){
        if(!this.values){
            for(let i = this.start; i <= this.finish; i+=this.step){
                let step = document.createElement('span');
                step.classList.add(this.stopClass);
                step.dataset.value = i;
                step.style.left = (this.elem.clientWidth / (this.finish - this.start)) * (i - this.start) + 'px';
                Object.assign(step.style,this.stepStyle);
                this.elem.append(step);
            }
        }
    };
    this.initSliding = function(){
        this.slider.onmousedown = function(){
            // let elem = this;
            let left = this.elem.offsetLeft;
            let right = this.elem.offsetLeft + this.elem.offsetWidth;

            document.onmousemove = (e) =>{
                let delta = e.pageX - left;

                if(delta < left){
                    this.slider.style.left = 0;
                    return;
                }
                if(delta > right){
                    this.slider.style.left = right - (this.slider.offsetWidth/2);
                    return;
                }
                this.slider.style.left = delta - (this.slider.offsetWidth/2) + 'px';
            };
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }.bind(this);
        return false;
    };
    this.defaultStyles = function(){
        this.lineStyle = {
            position: 'absolute',
            width: '100%',
            height: '2px',
            backgroundColor: '#333',
            top: '50%',
            left: '50%',
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
            transform: 'translate(-50%,-50%)',
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

        Object.assign(this.line.style,this.lineStyle);
        Object.assign(this.slider.style,this.sliderStyle);
        Object.assign(this.elem.style, this.containerStyle);
    };


    this.createSlider();
};


module.exports = PureRangeSlider;