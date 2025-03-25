class lru_cache {
    constructor(size) {
        this.size = size
        this.cache = new Map()
    }
    set(key, value) {
        if (this.cache.has(key)) this.cache.delete(key)
        this.cache.set(key, value)
    }
    get(key) {
        if (!this.cache.has(key)) return undefined
        const value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, value)

        return value
    }
}

const test = new lru_cache()
test.set('a', 1)
test.set('b', 2)
test.set('c', 3)
test.set('d', 4)
test.get('a')
console.log(test)