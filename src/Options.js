class Options {
  constructor() {
    this.options = {
      data: [],
      donutColor: '#ffffff',
      donutSize: '500',
      innerCircleColor: '#ffffff',
      innerCircleSize: '200',
      isContents: false,
      isSort: false,
      target: null,
    };
  }
  setDatas(datas) {
    Object.assign(this.options, datas);
    if (this.options.isSort) {
      this.options.data.sort(function(a, b) {
        if (a.percent > b.percent) {
          return -1;
        }
        if (a.percent < b.percent) {
          return 1;
        }
        return 0;
      });
    }
  }
  getData() {
    return this.options.data;
  }
  getDataLength() {
    return this.options.data.length;
  }
  getDonutColor() {
    return this.options.donutColor;
  }
  getDonutSize() {
    return this.options.donutSize;
  }
  getInnerCircleColor() {
    return this.options.innerCircleColor;
  }
  getInnerCircleSize() {
    return this.options.innerCircleSize;
  }
  getIsContents() {
    return this.options.isContents;
  }
  getTarget() {
    return this.options.target;
  }
}
export default new Options();
