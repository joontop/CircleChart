import CONFIG from './Config';

class Options {
  constructor() {
    this.options = {
      data: [],
      isSort: false,
      donutSize: '500',
      centerSize: '200',
      target: null,
    };
  }
  setDatas(datas) {
    Object.assign(this.options, datas);

    if (this.options.isSort) {
      this.options.data.sort(function (a, b) {
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
  getDonutSize() {
    return this.options.donutSize;
  }
  getCenterSize() {
    return this.options.centerSize;
  }
  getTarget() {
    return this.options.target;
  }
}
export default new Options();
