import CircleChart from './CircleChart';

let start = function() {
  let options = {
    data: [
      {
        color: '#336699',
        html: '<div class="test_contents">Love</div>',
        percent: 9,
      },
      {
        color: '#4477aa',
        html: '<div class="test_contents">Passion</div>',
        percent: 16,
      },
      {
        color: '#5588bb',
        html: '<div class="test_contents">Envy</div>',
        percent: 25,
      },
      {
        color: '#6699cc',
        html: '<div class="test_contents">Good</div>',
        percent: 32,
      },
      {
        color: '#77aadd',
        html: '<div class="test_contents">Good</div>',
        percent: 8,
      },
      {
        color: '#88bbee',
        html: '<div class="test_contents">Bad</div>',
        percent: 5,
      },
      {
        color: '#99ccff',
        html: '<div class="test_contents">Sad</div>',
        percent: 5,
      },
    ],
    donutColor: '#fffff',
    donutSize: 300,
    innerCircleColor: '#ffffff',
    innerCircleSize: 150,
    isContents: true,
    isSort: true,
    contentsMinWidth: 150,
    target: document.querySelector('#donutTest'),
  };
  const circleChart = new CircleChart(options);
  circleChart.start();
};
start();
