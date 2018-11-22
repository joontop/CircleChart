import CONFIG from './Config';
import Options from './Options';

export default class CircleChart {
  constructor(options) {
    Options.setDatas(options || {});
    this.state = {};
  }

  start() {
    this.setState();
    const donut = this.getDonut();
    this.state.target.innerHTML = '';
    this.state.target.appendChild(donut);
  }

  getSin(a, b) {
    return Math.sin((a * Math.PI) / 180) * b;
  }

  getCos(a, b) {
    return Math.cos((a * Math.PI) / 180) * b;
  }

  getArea(number, degree, startDegree) {
    const endDegree = degree + startDegree;
    const element = document.createElement('area');
    let coords = this.state.outer.radius + ',' + this.state.outer.radius;
    for (let i = startDegree; i < endDegree; i++) {
      const sin = this.getSin(i, this.state.outer.radius);
      const cos = this.getCos(i, this.state.outer.radius);
      const valueLeft = parseInt(this.state.outer.radius + sin);
      const valueTop = parseInt(this.state.outer.radius - cos);
      coords = coords + ',' + valueLeft + ',' + valueTop;
    }
    element.setAttribute('shape', 'poly');
    element.setAttribute('coords', coords);
    element.setAttribute('area-number', number);
    return element;
  }

  getContents(data) {
    let element = document.createElement('div');
    element.setAttribute('class', CONFIG.CONTENTS.CLASSNAME);
    Object.assign(element.style, CONFIG.CONTENTS.CSS);
    element.innerHTML = data.html;
    return element;
  }

  getDonut() {
    let element = document.createElement('div');
    element.setAttribute('class', CONFIG.DONUT.CLASSNAME);
    Object.assign(element.style, CONFIG.DONUT.CSS, {
      backgroundColor: this.state.outer.color,
      height: this.state.outer.diameter + 'px',
      width: this.state.outer.diameter + 'px',
    });
    const items = this.getItems();
    const inner = this.getInner();
    element.appendChild(items);
    element.appendChild(inner);

    if (this.state.isContents) {
      const img = this.getImg();
      const map = this.getMap();
      const points = this.getPoints();
      element.appendChild(points);
      element.appendChild(img);
      element.appendChild(map);
    }

    return element;
  }

  getGuideline() {
    let element = document.createElement('div');
    element.setAttribute('class', CONFIG.GUIDELINE.CLASSNAME);
    Object.assign(element.style, CONFIG.GUIDELINE.CSS, {
      width: Options.getContentsMinWidth() + 'px',
      marginLeft: -(Options.getContentsMinWidth() / 2) + 'px',
    });
    return element;
  }

  getImg() {
    let element = document.createElement('img');
    element.setAttribute('usemap', '#' + CONFIG.IMG.USEMAP_ID);
    element.setAttribute('src', CONFIG.IMG.SRC);
    Object.assign(element.style, CONFIG.IMG.CSS, {
      width: this.state.outer.diameter + 'px',
      height: this.state.outer.diameter + 'px',
    });
    return element;
  }

  getInner() {
    let element = document.createElement('div');
    element.setAttribute('class', CONFIG.INNER.CLASSNAME);
    Object.assign(element.style, CONFIG.INNER.CSS, {
      backgroundColor: this.state.inner.color,
      height: this.state.inner.diameter + 'px',
      marginLeft: -this.state.inner.radius + 'px',
      marginTop: -this.state.inner.radius + 'px',
      width: this.state.inner.diameter + 'px',
    });
    return element;
  }

  getItems() {
    let startDegree = 0;
    let itemFragment = document.createDocumentFragment();
    for (let i = 0, j = this.state.data.length; i < j; i++) {
      let element = document.createElement('div');
      element.setAttribute('item-number', i);
      element.setAttribute('class', CONFIG.ITEM.CLASSNAME);
      Object.assign(element.style, CONFIG.ITEM.CSS, {
        marginLeft: -this.state.outer.radius + 'px',
        marginTop: -this.state.outer.radius + 'px',
        webkitTransform: 'rotate(' + startDegree + 'deg)',
        transform: 'rotate(' + startDegree + 'deg)',
      });
      const degree = Math.round(this.state.data[i].percent * 3.6);
      startDegree = startDegree + degree;
      const donutRight = this.getRight();
      const donutLeft = this.getLeft();
      donutRight.appendChild(this.getRightBox(this.state.data[i], degree));
      donutLeft.appendChild(this.getLeftBox(this.state.data[i], degree));
      element.appendChild(donutRight, donutLeft);
      this.state.items.push(element);
      itemFragment.appendChild(element);
    }
    return itemFragment;
  }

  getMap() {
    let element = document.createElement('map');
    element.setAttribute('name', CONFIG.IMG.USEMAP_ID);
    element.setAttribute('id', CONFIG.IMG.USEMAP_ID);

    let startDegree = 0;
    let areasFragment = document.createDocumentFragment();
    for (let i = 0; i < this.state.data.length; i++) {
      const degree = Math.round(this.state.data[i].percent * 3.6);
      const area = this.getArea(i, degree, startDegree);
      areasFragment.appendChild(area);
      startDegree = startDegree + degree;
    }

    element.addEventListener(
      'mouseover',
      function(e) {
        for (let i = 0; i < this.state.data.length; i++) {
          this.state.items[i].classList.remove('on');
          this.state.points[i].classList.remove('on');
        }
        if (e.target && e.target.getAttribute('area-number')) {
          const number = e.target.getAttribute('area-number');
          if (
            this.state.items[number].className.indexOf(' on') === -1 &&
            this.state.points[number].className.indexOf(' on') === -1
          ) {
            this.state.items[number].classList.add('on');
            this.state.points[number].classList.add('on');
          }
        }
      }.bind(this)
    );

    element.appendChild(areasFragment);
    return element;
  }

  getPoints() {
    let pointFragment = document.createDocumentFragment();
    let startDegree = 0;
    for (let i = 0, j = this.state.data.length; i < j; i++) {
      let element = document.createElement('div');
      element.setAttribute('contents-number', i);
      element.setAttribute('class', CONFIG.POINT.CLASSNAME);
      const degree = Math.round(this.state.data[i].percent * 3.6);
      const centerDegree = degree / 2 + startDegree;
      const sin = this.getSin(centerDegree, this.state.centerRadius);
      const cos = this.getCos(centerDegree, this.state.centerRadius);
      const pointLeftByCenter = Math.round(this.state.outer.radius + sin);
      const pointTopByCenter = Math.round(this.state.outer.radius - cos);
      Object.assign(element.style, CONFIG.POINT.CSS, {
        top: pointTopByCenter + 'px',
        left: pointLeftByCenter + 'px',
      });
      startDegree = startDegree + degree;
      const guideline = this.getGuideline();
      const contents = this.getContents(this.state.data[i]);
      guideline.appendChild(contents);
      element.appendChild(guideline);
      this.state.points.push(element);
      pointFragment.appendChild(element);
    }
    return pointFragment;
  }

  getRight() {
    let element = document.createElement('div');
    element.setAttribute('class', CONFIG.RIGHT.CLASSNAME);
    Object.assign(element.style, CONFIG.RIGHT.CSS);
    return element;
  }

  getLeft() {
    let element = document.createElement('div');
    element.setAttribute('class', CONFIG.LEFT.CLASSNAME);
    Object.assign(element.style, CONFIG.LEFT.CSS);
    return element;
  }

  getRightBox(data, degree) {
    const rightBoxDegree = degree > 180 ? 180 : degree;
    let element = document.createElement('div');
    element.setAttribute('class', CONFIG.RIGHT_BOX.CLASSNAME);
    Object.assign(element.style, CONFIG.RIGHT_BOX.CSS, {
      backgroundColor: data.color,
      webkitTransform: 'rotate(' + rightBoxDegree + 'deg)',
      transform: 'rotate(' + rightBoxDegree + 'deg)',
    });
    return element;
  }

  getLeftBox(data, degree) {
    const leftBoxDegree = degree > 180 ? degree : 180;
    let element = document.createElement('div');
    element.setAttribute('class', CONFIG.LEFT_BOX.CLASSNAME);
    Object.assign(element.style, CONFIG.LEFT_BOX.CSS, {
      backgroundColor: data.color,
      webkitTransform: 'rotate(' + leftBoxDegree + 'deg)',
      transform: 'rotate(' + leftBoxDegree + 'deg)',
    });
    return element;
  }

  setState() {
    this.state = {
      data: Options.getData(),
      inner: {
        color: Options.getInnerColor(),
        diameter: Options.getInnerDiameter(),
        radius: Options.getInnerDiameter() / 2,
      },
      isContents: Options.getIsContents(),
      outer: {
        color: Options.getOuterColor(),
        diameter: Options.getOuterDiameter(),
        radius: Options.getOuterDiameter() / 2,
      },
      target: Options.getTarget(),
      items: [],
      points: [],
    };
    this.state.centerRadius =
      this.state.inner.radius +
      (this.state.outer.radius - this.state.inner.radius) / 2;
  }
}
