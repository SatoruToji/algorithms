class fifo_cache {
    constructor() {
        this.cache = new Map()
    }

    set(key, value) {
        this.cache.set(key, value)
    }

    get(key) {
        return this.cache.get(key)
    }
}

const test = new fifo_cache()
test.set('a', 1)
test.set('b', 2)
test.set('c', 3)
test.set('d', 4)

console.log(test.get('c'))
console.log(test)