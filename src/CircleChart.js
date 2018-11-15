import CONFIG from './Config';
import Options from './Options';

export default class CircleChart {
  constructor(options) {
    this.donut = null;
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
    Options.getTarget().innerHTML = '';
    this.donut = document.createElement('div');
    this.donut.className = CONFIG.CLASSNAME.DONUT;
    const donutCss = {
      width: Options.getDonutSize() + 'px',
      height: Options.getDonutSize() + 'px',
      'background-color': Options.getDonutColor(),
    };
    Object.assign(this.donut.style, CONFIG.STYLESHEET.DONUT, donutCss);
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
  }
  getInnerCircle() {
    const innerCircle = document.createElement('div');
    const innerCircleSize = Options.getInnerCircleSize();
    const innerCircleCss = {
      width: innerCircleSize + 'px',
      height: innerCircleSize + 'px',
      'margin-top': -(innerCircleSize / 2) + 'px',
      'margin-left': -(innerCircleSize / 2) + 'px',
      'background-color': Options.getInnerCircleColor(),
    };
    Object.assign(
      innerCircle.style,
      CONFIG.STYLESHEET.DONUT_INNER_CIRCLE,
      innerCircleCss
    );
    innerCircle.className = CONFIG.CLASSNAME.DONUT_INNER_CIRCLE;
    return innerCircle;
  }
  getDonutItem(data) {
    let donutItem = document.createElement('div');
    let donutLeft = document.createElement('div');
    let donutRight = document.createElement('div');
    let donutLeftBox = document.createElement('div');
    let donutRighttBox = document.createElement('div');
    Object.assign(donutItem.style, CONFIG.STYLESHEET.DONUT_ITEM);
    Object.assign(donutLeft.style, CONFIG.STYLESHEET.DONUT_LEFT);
    Object.assign(donutRight.style, CONFIG.STYLESHEET.DONUT_RIGHT);
    Object.assign(donutLeftBox.style, CONFIG.STYLESHEET.DONUT_LEFT_BOX);
    Object.assign(donutRighttBox.style, CONFIG.STYLESHEET.DONUT_RIGHT_BOX);
    donutItem.className = CONFIG.CLASSNAME.DONUT_ITEM;
    donutLeft.className = CONFIG.CLASSNAME.DONUT_LEFT;
    donutRight.className = CONFIG.CLASSNAME.DONUT_RIGHT;
    donutLeftBox.className = CONFIG.CLASSNAME.DONUT_LEFT_BOX;
    donutRighttBox.className = CONFIG.CLASSNAME.DONUT_RIGHT_BOX;
    donutLeftBox.style.backgroundColor = data.color;
    donutRighttBox.style.backgroundColor = data.color;
    const degreeByPercent = data.percent * 3.6;
    donutItem.style.webkitTransform =
      'rotate(' + this.state.currentDegree + 'deg) translateZ(0)';
    donutItem.style.transform =
      'rotate(' + this.state.currentDegree + 'deg) translateZ(0)';
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
    let itemContentsPoint = document.createElement('div');
    let itemContentsGuideline = document.createElement('div');
    let itemContents = document.createElement('div');
    Object.assign(
      itemContentsPoint.style,
      CONFIG.STYLESHEET.DONUT_CONTENTS_POINT
    );
    Object.assign(
      itemContentsGuideline.style,
      CONFIG.STYLESHEET.DONUT_CONTENTS_GUIDELINE
    );
    Object.assign(itemContents.style, CONFIG.STYLESHEET.DONUT_CONTENTS_HTML);
    itemContentsPoint.className = CONFIG.CLASSNAME.DONUT_CONTENTS_POINT;
    itemContentsGuideline.className = CONFIG.CLASSNAME.DONUT_CONTENTS_GUIDELINE;
    itemContents.className = CONFIG.CLASSNAME.DONUT_CONTENTS_HTML;
    const degreeByPercent = data.percent * 3.6;
    const centerDegree = degreeByPercent / 2 + this.state.currentContentsDegree;
    const donutHalfSize =
      (Options.getDonutSize() - Options.getInnerCircleSize()) / 2;
    const centerDonut = Options.getInnerCircleSize() / 2 + donutHalfSize / 2;
    const pointTop = -(Math.cos((centerDegree * Math.PI) / 180) * centerDonut);
    const pointLeft = Math.sin((centerDegree * Math.PI) / 180) * centerDonut;
    const pointTopByCenter = Options.getDonutSize() / 2 + pointTop;
    const pointLeftByCenter = Options.getDonutSize() / 2 + pointLeft;
    itemContentsPoint.style.top = pointTopByCenter + 'px';
    itemContentsPoint.style.left = pointLeftByCenter + 'px';
    let minWidth = donutHalfSize;
    if (donutHalfSize < 100) {
      minWidth = 100;
    }
    itemContentsGuideline.style.width = minWidth + 'px';
    itemContentsGuideline.style.marginLeft = -(minWidth / 2) + 'px';
    itemContents.innerHTML = data.html;
    this.state.currentContentsDegree =
      this.state.currentContentsDegree + degreeByPercent;
    itemContentsGuideline.appendChild(itemContents);
    itemContentsPoint.appendChild(itemContentsGuideline);
    return itemContentsPoint;
  }
}
