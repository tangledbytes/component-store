class Pipeline {
  store = [];

  add(fn) {
    this.store.push(fn);
  }

  async process() {
    for (const fn of this.store) {
      await fn();
    }
  }
}

module.exports = Pipeline;
