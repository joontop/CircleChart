import CircleChart from './CircleChart';

let start = function() {
  let options = {
    data: [
      {
        color: '#ff0000',
        html: '<div class="test_contents">Love</div>',
        percent: 10,
      },
      {
        color: '#00cc44',
        html: '<div class="test_contents">Passion</div>',
        percent: 15,
      },
      {
        color: '#ff9900',
        html: '<div class="test_contents">Envy</div>',
        percent: 25,
      },
      {
        color: '#3cff00',
        html: '<div class="test_contents">Good</div>',
        percent: 37,
      },
      {
        color: '#6699cc',
        html: '<div class="test_contents">Good</div>',
        percent: 3,
      },
      {
        color: '#ff0',
        html: '<div class="test_contents">Bad</div>',
        percent: 5,
      },
      {
        color: '#339900',
        html: '<div class="test_contents">Sad</div>',
        percent: 5,
      },
    ],
    donutColor: '#fffff',
    donutSize: 500,
    innerCircleColor: '#ffffff',
    innerCircleSize: 200,
    isContents: true,
    isSort: true,
    target: document.querySelector('#donutTest'),
  };
  const circleChart = new CircleChart(options);
  circleChart.start();
};
start();
