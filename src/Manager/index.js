export default class Manager {
  refs = {};

  add(collection, ref) {
    if (!this.refs[collection]) {
      this.refs[collection] = [];
    }

    this.refs[collection].push(ref);
  }

  remove(collection, ref) {
    const index = this.getIndex(collection, ref);

    if (index !== -1) {
      this.refs[collection].splice(index, 1);
    }
  }

  isActive() {
    return this.active;
  }

  getActive() {
    // eslint-disable-next-line no-console
    console.log('getActive', {
      active: this.active,
    });
    if (!this.active || !this.active.collection || !this.refs) return;

    return this.refs[this.active.collection].find(
      // eslint-disable-next-line eqeqeq
      ({node}) => node.sortableInfo.index == this.active.index,
    );
  }

  getIndex(collection, ref) {
    return this.refs[collection].indexOf(ref);
  }

  getOrderedRefs(col) {
    console.log('getOrderedRefs', col);
    let collection = col;
    if (!col && this.active && this.active.collection) {
      collection = this.active.collection;
    } else {
      return [];
    }

    return this.refs[collection].sort(sortByIndex);
  }
}

function sortByIndex(
  {
    node: {
      sortableInfo: {index: index1},
    },
  },
  {
    node: {
      sortableInfo: {index: index2},
    },
  },
) {
  return index1 - index2;
}
