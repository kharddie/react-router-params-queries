import React, { Component } from 'react';
import mojs from 'mo-js';

/* ADD CUSTOM SHAPE SOMEWHERE IN YOUR CODE */
class Heart extends mojs.CustomShape {
    getShape() { return '<path id="shape" d="M54.73,95.693c0,0-19.012,0.314-19.012,0s2.436-20.27,3.692-32.368c1.257-12.099,0.628-13.356-0.471-16.734c-1.1-3.378-2.75-10.527-2.907-13.12c-0.157-2.593-0.786-2.985-1.729-5.107c-0.943-2.121-3.457-7.699-4.164-9.506c-0.707-1.807,0.707-2.2,1.886-2.2c1.178,0,3.3,4.714,4.242,6.442c0.943,1.729,2.357,3.536,3.457,4.007c1.1,0.471,0.864-1.493,0.628-2.436c-0.236-0.943-2.907-11.078-3.457-13.67c-0.55-2.593,1.964-2.357,2.671-1.964s3.378,8.563,4.557,12.728c1.179,4.164,2.043,3.771,2.907,3.221c0.864-0.55,0.786-3.143,0.864-5.342c0.078-2.2,0.55-11.234,0.942-13.356c0.393-2.121,1.807-2.121,2.671-2.121s1.021,1.571,1.146,2.278c0.125,0.707,0.269,8.485,0.033,14.22c-0.236,5.735,0.864,4.635,1.408,4.557s1.026-1.964,1.341-2.592c0.314-0.629,2.043-6.521,2.672-8.642c0.628-2.121,1.885-4.95,3.963-4.636c2.078,0.314,1.144,3.143,0.829,4.321s-3.143,9.821-4.479,15.32c-1.335,5.5,1.179,7.621,1.965,7.228c0.785-0.393,1.414-2.042,2.277-3.614c0.864-1.571,3.143-3.692,4.479-3.928s3.771,0.55,2.593,1.964c-1.178,1.414-0.628,1.021-2.305,2.907c-1.676,1.885-1.466,3.667-3.248,7.228c-1.78,3.562-3.246,5.028-6.599,8.066c-3.352,3.038-2.828,4.4-3.352,7.228c-0.524,2.828,0.628,39.282,0.628,39.282L54.73,95.693z"></path>'; }
}

mojs.addShape('heart', Heart); // passing name and Bubble class

//add timeline
const timeline = new mojs.Timeline({
    delay: 1000,
    repeat: 0,
    onUpdate(ep, p, isForward) {
        console.log(`on timeline update: ${ep}, ${p}`);
    }
}).stop();

const Burst = React.createClass({
    render() {
        return (<div id="hand"></div>);
    },

    shouldComponentUpdate() {
        // this.props.isPlay && this._burst.replay();
        // return false;
        // timeline.play( 2000 );
        if (this.props.isPlay)
            timeline.play();
    },

    resetPlay() {
        this.setState({ isPlay: false });
        alert("finished playing")
    },

    componentDidMount() {
        this.hand = new mojs.Shape({
            parent: "#hand",
            shape: 'heart', // <--- shape of heart is now available!
            fill: 'blue',
            stroke: 'none',
            strokeDasharray: '100%',
            opacity: { 0: 1 },
            duration: 1000,
            easing: 'quad.out',
            delay: 100,
            isShowStart: false,
            bottom: '0',
        }).then ({
            y: 100,
          });

          this.hand3 = new mojs.Shape({
            parent: "#hand",
            shape: 'heart', // <--- shape of heart is now available!
            fill: 'blue',
            stroke: 'none',
            strokeDasharray: '100%',
            opacity: { 0: 1 },
            duration: 1000,
            easing: 'quad.out',
            delay: 250,
            isShowStart: false,
            bottom: '0',
        }).then ({
            y: 100,
          });

        this.hand2 = new mojs.Shape({
            parent: "#hand",
            shape: 'heart', // <--- shape of heart is now available!
            fill: 'red',
            stroke: 'none',
            strokeDasharray: '100%',

            duration: 1300,
            easing: 'quad.out',
            delay: 200,
            isShowStart: false,
            bottom: '0',
        }).then ({
            y: -40,
          });

        this.hand
            .tune({ x: 0,y:400, scale: 4 })
        //.replay();

        this.hand2
            .tune({ x: 100, y: 600, scale: 6 })
        //.replay();
        this.hand3
        .tune({ x: 200, y: 600, scale: 4.5 })

        timeline.add(this.hand, this.hand2, this.hand3);
    }
});

export default Burst