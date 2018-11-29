import CircleChart from 'joontop-circlechart';

let start = function() {
  let options = {
    data: [
      {
        color: '#f2911b', // 색상
        html: '<div class="coin">Ethereum<br>30%</div>', // 보여줄 텍스트를 HTML로
        percent: 30, // 합이 100 이 되도록
      },
      {
        color: '#f2b872',
        html: '<div class="coin">Bitcoin<br>25%</div>',
        percent: 25,
      },
      {
        color: '#f58616',
        html: '<div class="coin">Bitcoin Cash<br>22%</div>',
        percent: 22,
      },
      {
        color: '#bf8b5e',
        html: '',
        percent: 13,
      },
      {
        color: '#f2f2f2',
        html: '',
        percent: 10,
      },
    ],
    outerDiameter: 234, // 실제 도넛의 width,height
    innerDiameter: 200, // 안쪽원의 크기,  0이면 없음
    outerColor: '#99ccff', // 도넛의 기본 색상
    innerColor: '#ffffff', // 안쪽원의 색상
    isContents: true, // 텍스트의 유무
    isDesc: true, // 가장 큰 percent 부터 시계방향 표시
    contentsMinWidth: 150, // 표시되는 텍스트영역의 최소값
    target: document.querySelector('#donutTest'), // chart 가 들어갈 영역지정
  };
  const circleChart = new CircleChart(options);
  circleChart.start();
};
start();