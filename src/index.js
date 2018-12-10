import CircleChart from 'joontop-circlechart';

let start = function() {
  let options = {
    data: [
      {
        color: '#f2911b', // 색상
        html: '<div class="coin">Ethereum<br>30%</div>', // 보여줄 텍스트를 HTML로
        percent: 60, // 합이 100 이 되도록
      },
      {
        color: '#f2b872',
        html: '<div class="coin">Bitcoin<br>25%</div>',
        percent: 15,
      },
      {
        color: '#f58616',
        html: '<div class="coin">Bitcoin Cash<br>22%</div>',
        percent: 12,
      },
      {
        color: '#bf8b5e',
        html: '',
        percent: 8,
      },
      {
        color: '#f2f2f2',
        html: '',
        percent: 5,
      },


    ],
    outerDiameter: 234, // 실제 도넛의 width,height
    innerDiameter: 170, // 안쪽원의 크기,  0이면 없음
    outerColor: '#99ccff', // 도넛의 기본 색상
    innerColor: '#ffffff', // 안쪽원의 색상
    isContents: true, // 텍스트의 유무
    isDesc: true, // 가장 큰 percent 부터 시계방향 표시
    contentsMinWidth: 150, // 표시되는 텍스트영역의 최소값
    target: document.querySelector('#donutTest'), // chart 가 들어갈 영역지정
  };
  const circleChart = new CircleChart(options);
  circleChart.start();

  let options2 = {
    data: [
      {
        color: '#ffdf9a', // 색상
        html: '<div class="percent">15%</div>', // 보여줄 텍스트를 HTML로
        percent: 15, // 합이 100 이 되도록
      },
      {
        color: '#ff8d73',
        html: '<div class="percent">25%</div>',
        percent: 25,
      },
      {
        color: '#ff5277',
        html: '<div class="percent">20%</div>',
        percent: 20,
      },
      {
        color: '#b24775',
        html: '<div class="percent">40%</div>',
        percent: 40,
      },
    ],
    outerDiameter: 234, // 실제 도넛의 width,height
    innerDiameter: 50, // 안쪽원의 크기,  0이면 없음
    outerColor: '#99ccff', // 도넛의 기본 색상
    innerColor: '#ffffff', // 안쪽원의 색상
    isContents: true, // 텍스트의 유무
    isDesc: false, // 가장 큰 percent 부터 시계방향 표시
    contentsMinWidth: 150, // 표시되는 텍스트영역의 최소값
    target: document.querySelector('#donutTest2'), // chart 가 들어갈 영역지정
  };
  const circleChart2 = new CircleChart(options2);
  circleChart2.start();
};
start();