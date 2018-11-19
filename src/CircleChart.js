import CONFIG from './Config';
import Options from './Options';

export default class CircleChart {
  constructor(options) {
    this.donut = null;
    this.img = null;
    this.map = null;
    this.data = [];
    this.state = {
      currentDegree: 0,
      currentContentsDegree: 0,
    };
    Options.setDatas(options || {});
  }
  start() {
    this.setDonut();
  }
  setDonut() {
    this.img = document.createElement('img');
    this.map = document.createElement('map');
    this.img.setAttribute('usemap', '#imageMap');
    this.img.setAttribute('src', CONFIG.TRANSPARENT_BASE64);
    this.img.width = Options.getDonutSize();
    this.img.height = Options.getDonutSize();
    this.map.setAttribute('name', 'imageMap');
    this.map.setAttribute('id', 'imageMap');

    Object.assign(this.img.style, CONFIG.STYLESHEET.IMG);

    Options.getTarget().innerHTML = '';
    this.donut = document.createElement('div');
    this.donut.className = CONFIG.CLASSNAME.DONUT;

    Object.assign(this.donut.style, CONFIG.STYLESHEET.DONUT, {
      width: Options.getDonutSize() + 'px',
      height: Options.getDonutSize() + 'px',
      'background-color': Options.getDonutColor(),
    });
    Options.getTarget().appendChild(this.donut);

    this.data = Options.getData();
    this.dataLength = Options.getDataLength();

    for (let i = 0; i < this.dataLength; i++) {
      let donut = this.getDonutItem(this.data[i]);
      this.donut.appendChild(donut);
      if (Options.getIsContents()) {
        let contents = this.getItemInnerContents(this.data[i]);
        this.donut.appendChild(contents);
      }
    }
    const innerCircle = this.getInnerCircle();
    this.donut.appendChild(innerCircle);
    this.donut.appendChild(this.img);
    this.donut.appendChild(this.map);

    // this.map.addEventListener('mouseover', function (e) {
    //   console.log(e.target);
    //
    // });
  }
  getInnerCircle() {
    const innerCircle = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_INNER_CIRCLE,
      CONFIG.CLASSNAME.DONUT_INNER_CIRCLE
    );
    const innerCircleSize = Options.getInnerCircleSize();
    Object.assign(innerCircle.style, {
      backgroundColor: Options.getInnerCircleColor(),
      marginLeft: -(innerCircleSize / 2) + 'px',
      marginTop: -(innerCircleSize / 2) + 'px',
      width: innerCircleSize + 'px',
      height: innerCircleSize + 'px',
    });
    return innerCircle;
  }
  getDonutItem(data) {
    let donutLeftBox = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_LEFT_BOX,
      CONFIG.CLASSNAME.DONUT_LEFT_BOX
    );
    let donutRighttBox = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_RIGHT_BOX,
      CONFIG.CLASSNAME.DONUT_RIGHT_BOX
    );
    let donutLeft = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_LEFT,
      CONFIG.CLASSNAME.DONUT_LEFT
    );
    let donutRight = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_RIGHT,
      CONFIG.CLASSNAME.DONUT_RIGHT
    );
    let donutItem = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_ITEM,
      CONFIG.CLASSNAME.DONUT_ITEM
    );
    donutLeftBox.style.backgroundColor = data.color;
    donutRighttBox.style.backgroundColor = data.color;
    const degreeByPercent = data.percent * 3.6;
    donutItem.style.webkitTransform =
      'rotate(' +
      this.state.currentDegree +
      'deg) translateZ(0) translateX(-50%) translateY(-50%)';
    donutItem.style.transform =
      'rotate(' +
      this.state.currentDegree +
      'deg) translateZ(0) translateX(-50%) translateY(-50%)';
    this.state.currentDegree = this.state.currentDegree + degreeByPercent;
    if (degreeByPercent > 180) {
      donutRighttBox.style.webkitTransform = 'rotate(180deg)';
      donutRighttBox.style.transform = 'rotate(180deg)';
      donutLeftBox.style.webkitTransform = 'rotate(' + degreeByPercent + 'deg)';
      donutLeftBox.style.transform = 'rotate(' + degreeByPercent + 'deg)';
    } else {
      donutRighttBox.style.webkitTransform =
        'rotate(' + degreeByPercent + 'deg)';
      donutRighttBox.style.transform = 'rotate(' + degreeByPercent + 'deg)';
    }
    donutRight.appendChild(donutRighttBox);
    donutLeft.appendChild(donutLeftBox);
    donutItem.appendChild(donutRight);
    donutItem.appendChild(donutLeft);
    return donutItem;
  }
  getItemInnerContents(data) {
    let itemContentsPoint = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_CONTENTS_POINT,
      CONFIG.CLASSNAME.DONUT_CONTENTS_POINT
    );
    let itemContentsGuideline = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_CONTENTS_GUIDELINE,
      CONFIG.CLASSNAME.DONUT_CONTENTS_GUIDELINE
    );
    let itemContents = this.getDivFragment(
      CONFIG.STYLESHEET.DONUT_CONTENTS_HTML,
      CONFIG.CLASSNAME.DONUT_CONTENTS_HTML
    );

    const degreeByPercent = data.percent * 3.6;
    const startDegree = this.state.currentContentsDegree;
    const centerDegree = degreeByPercent / 2 + this.state.currentContentsDegree;
    const endDegree = degreeByPercent + this.state.currentContentsDegree;

    const donutHalfSize =
      (Options.getDonutSize() - Options.getInnerCircleSize()) / 2;
    const centerDonut = Options.getInnerCircleSize() / 2 + donutHalfSize / 2;
    const pointLeft = Math.sin((centerDegree * Math.PI) / 180) * centerDonut;
    const pointTop = Math.cos((centerDegree * Math.PI) / 180) * centerDonut;
    const pointLeftByCenter = Options.getDonutSize() / 2 + pointLeft;
    const pointTopByCenter = Options.getDonutSize() / 2 - pointTop;

    // Area Coords Poly 만들기
    let area = document.createElement('area');
    area.setAttribute('shape', 'poly');
    let coords = Options.getDonutSize() / 2 + ',' + Options.getDonutSize() / 2;
    for (let i = startDegree; i < endDegree; i++) {
      let sin = Math.sin((i * Math.PI) / 180) * (Options.getDonutSize() / 2);
      let cosin = Math.cos((i * Math.PI) / 180) * (Options.getDonutSize() / 2);
      let valueLeft = parseInt(Options.getDonutSize() / 2 + sin);
      let valueTop = parseInt(Options.getDonutSize() / 2 - cosin);
      coords = coords + ',' + valueLeft + ',' + valueTop;
    }
    area.setAttribute('coords', coords);
    area.addEventListener('mouseover', function() {
      itemContentsPoint.classList.add('on');
    });
    area.addEventListener('mouseout', function() {
      itemContentsPoint.classList.remove('on');
    });
    this.map.appendChild(area);

    Object.assign(itemContentsPoint.style, {
      top: pointTopByCenter + 'px',
      left: pointLeftByCenter + 'px',
    });

    Object.assign(itemContentsGuideline.style, {
      width: Options.getContentsMinWidth() + 'px',
      marginLeft: -(Options.getContentsMinWidth() / 2) + 'px',
    });

    itemContents.innerHTML = data.html;
    this.state.currentContentsDegree =
      this.state.currentContentsDegree + degreeByPercent;
    itemContentsGuideline.appendChild(itemContents);
    itemContentsPoint.appendChild(itemContentsGuideline);

    return itemContentsPoint;
  }

  getDivFragment(stylesheet, classname) {
    let div = document.createElement('div');
    let fragment = document.createDocumentFragment();
    Object.assign(div.style, stylesheet);
    div.className = classname;
    fragment.appendChild(div);
    return fragment.firstChild;
  }
}
