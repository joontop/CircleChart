import CONFIG from './Config';
import Options from './Options';

export default class CircleChart {
  constructor(options) {
    this.donut = null;
    this.innerCircle = null;
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
    this.donut.setAttribute('class', CONFIG.CLASSNAME.DONUT_WRAPPER);
    Object.assign(this.donut.style, CONFIG.STYLESHEET.DONUT_WRAPPER);
    this.donut.style.width = Options.getDonutSize() + 'px';
    this.donut.style.height = Options.getDonutSize() + 'px';
    Options.getTarget().appendChild(this.donut);

    this.data = Options.getData();
    this.dataLength = Options.getDataLength();

    this.innerCircle = document.createElement('div');
    this.innerCircle.setAttribute('class', CONFIG.CLASSNAME.DONUT_INNER_CIRCLE);
    Object.assign(this.innerCircle.style, CONFIG.STYLESHEET.DONUT_INNER_CIRCLE);
    this.innerCircle.style.width = Options.getCenterSize() + 'px';
    this.innerCircle.style.height = Options.getCenterSize() + 'px';
    this.innerCircle.style.marginTop = -(Options.getCenterSize() / 2) + 'px';
    this.innerCircle.style.marginLeft = -(Options.getCenterSize() / 2) + 'px';

    for (let i = 0; i < this.dataLength; i++) {
      let donut = this.getDonutItem(this.data[i]);
      let content = this.getItemInnerContents(this.data[i]);
      this.donut.appendChild(donut);
      this.donut.appendChild(content);
      this.donut.appendChild(this.innerCircle);
    }
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

    const degree = data.percent * 3.6;

    donutItem.style.webkitTransform =
      'rotate(' + this.state.currentDegree + 'deg) translateZ(0)';
    donutItem.style.transform =
      'rotate(' + this.state.currentDegree + 'deg) translateZ(0)';
    this.state.currentDegree = this.state.currentDegree + degree;
    if (degree > 180) {
      donutRighttBox.style.webkitTransform = 'rotate(180deg)';
      donutRighttBox.style.transform = 'rotate(180deg)';
      donutLeftBox.style.webkitTransform = 'rotate(' + degree + 'deg)';
      donutLeftBox.style.transform = 'rotate(' + degree + 'deg)';
    } else {
      donutRighttBox.style.webkitTransform = 'rotate(' + degree + 'deg)';
      donutRighttBox.style.transform = 'rotate(' + degree + 'deg)';
    }

    donutRight.appendChild(donutRighttBox);
    donutLeft.appendChild(donutLeftBox);
    donutItem.appendChild(donutRight);
    donutItem.appendChild(donutLeft);

    return donutItem;
  }
  getItemInnerContents(data) {
    let itemContentsWrap = document.createElement('div');
    let itemContentsPoint = document.createElement('div');
    let itemContentsGuideline = document.createElement('div');
    let itemContents = document.createElement('div');

    // set classname
    itemContentsWrap.className = CONFIG.CLASSNAME.ITEM_CONTENTS_WRAP;
    itemContentsPoint.className = CONFIG.CLASSNAME.ITEM_CONTENTS_POINT;
    itemContentsGuideline.className = CONFIG.CLASSNAME.ITEM_CONTENTS_GUIDELINE;
    itemContents.className = CONFIG.CLASSNAME.ITEM_CONTENTS;

    // set stylesheet
    Object.assign(itemContentsWrap.style, CONFIG.STYLESHEET.ITEM_CONTENTS_WRAP);
    Object.assign(
      itemContentsPoint.style,
      CONFIG.STYLESHEET.ITEM_CONTENTS_POINT
    );
    Object.assign(
      itemContentsGuideline.style,
      CONFIG.STYLESHEET.ITEM_CONTENTS_GUIDELINE
    );
    Object.assign(itemContents.style, CONFIG.STYLESHEET.ITEM_CONTENTS);

    const degree = data.percent * 3.6;
    const wrapRotate = degree / 2 + this.state.currentContentsDegree;
    const guidelineRotate = -wrapRotate;

    itemContentsWrap.style.webkitTransform = 'rotate(' + wrapRotate + 'deg)';
    itemContentsWrap.style.transform = 'rotate(' + wrapRotate + 'deg)';
    itemContentsGuideline.style.transform =
      'rotate(' + guidelineRotate + 'deg) translateX(-50%) translateY(-50%)';

    itemContentsGuideline.style.webkitTransform =
      'rotate(' + guidelineRotate + 'deg) translateX(-50%) translateY(-50%)';
    itemContentsGuideline.style.width =
      (Options.getDonutSize() - Options.getCenterSize()) / 2 + 'px';

    itemContents.innerHTML = data.name;

    this.state.currentContentsDegree =
      this.state.currentContentsDegree + degree;

    itemContentsPoint.style.top =
      (Options.getDonutSize() - Options.getCenterSize()) / 4 + 'px';

    itemContentsGuideline.appendChild(itemContents);
    itemContentsPoint.appendChild(itemContentsGuideline);
    itemContentsWrap.appendChild(itemContentsPoint);

    return itemContentsWrap;
  }
}
