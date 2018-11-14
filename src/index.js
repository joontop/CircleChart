import CircleChart from './CircleChart';

let start = function() {
  let options = {
    data: [
      {
        color: '#ff0000',
        name: '<div class="test_contents">Love</div>',
        percent: 10,
      },
      {
        color: '#00cc44',
        name: '<div class="test_contents">Passion</div>',
        percent: 15,
      },
      {
        color: '#ff9900',
        name: '<div class="test_contents">Envy</div>',
        percent: 25,
      },
      {
        color: '#3cff00',
        name: '<div class="test_contents">Good</div>',
        percent: 37,
      },
      {
        color: '#6699cc',
        name: '<div class="test_contents">Good</div>',
        percent: 3,
      },
      {
        color: '#ff0',
        name: '<div class="test_contents">Bad</div>',
        percent: 5,
      },
      {
        color: '#339900',
        name: '<div class="test_contents">Sad</div>',
        percent: 5,
      },
    ],
    donutSize: 300,
    centerSize: 150,

    isInnerContents: false,
    isItemsContents: false,
    isSort: true,

    donutOuterCircleSize: 300,
    donutInnerCircleSize: 100,
    donutOuterCircleColor: '#f00',
    donutInnerCircleColor: '#ffffff',
    target: document.querySelector('#donutTest'),


    outerColor: '#ffffff',
    innerColor: '#ffffff',
    outerSize: 300,
    innerSize: 100,



  };
  const circleChart = new CircleChart(options);
  circleChart.start();

  let options2 = {
    data: [
      {
        color: '#003366',
        name: '<div class="test_contents2">20%</div>',
        percent: 20,
      },
      {
        color: '#336699',
        name: '<div class="test_contents2">35%</div>',
        percent: 35,
      },
      {
        color: '#99ccff',
        name: '<div class="test_contents2">30%</div>',
        percent: 30,
      },
      {
        color: '#6699cc',
        name: '<div class="test_contents2">15%</div>',
        percent: 15,
      },
    ],
    donutSize: 300,
    centerSize: 200,
    isInnerContents: false,
    isItemsContents: false,
    isSort: true,
    donutOuterCircleSize: 300,
    donutInnerCircleSize: 100,
    donutOuterCircleColor: '#f00',
    donutInnerCircleColor: '#ffffff',
    target: document.querySelector('#donutTest2'),
    outerColor: '#ffffff',
    innerColor: '#ffffff',
    outerSize: 300,
    innerSize: 100,
  };
  const circleChart2 = new CircleChart(options2);
  circleChart2.start();
};
start();
