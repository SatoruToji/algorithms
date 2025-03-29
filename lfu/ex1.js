class lfu_cache {
    constructor(size) {
        this.size = size
        this.cache = new Map()
    }

    set(key, value) {
        if (this.cache.has(key)) this.cache.delete(key)

        this.cache.set(key, { value, counter: this.size })
        this._proverka(key)
    }

    get(key) {
        if (!this.cache.has(key)) return undefined
        const entry =  this.cache.get(key).counter += 1
        return entry.value
    }

    _proverka(key) {
        if (this.cache.size > this.size) this._updateFrequently(key)
    }
    _updateFrequently(exceptOne) {
        this.cache.forEach((value, key) => {
            if (key !== exceptOne) {
                value.counter -= 1
                if (value.counter <= 0) this.cache.delete(key)
            }
        })
    }
}

const test = new lfu_cache(5)
test.set('a', 1)
test.set('b', 2)
test.set('c', 3)
test.set('f', 5)
console.log(test.get('a'))

console.log(test.get('d'))
console.log(test.get('f'))
console.log(test.get('f'))
console.log(test.get('d'))

console.log(test)
