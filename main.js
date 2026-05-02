class HashMap {
  constructor(tableSize = 16) {
    this.table = new Array(tableSize);
    this.tableSize = tableSize;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.tableSize;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.table.length) {
      throw new Error("Trying to access index out of bound");
    }


    if (!this.table[index]) {
      this.table[index] = [];
    }

    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];


    if (!bucket) return null;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return null;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.table[index];

    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false;
  }
}
