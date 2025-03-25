class lru_cache {
    constructor(size) {
        if (this.size === 0) throw new Error('переделывай')
        this.size = size
        this.cache = new Map()
    }
    set(key, value) {
        // Если пара уже присутвует, то удаляем и заново вставляет уже в конец
        if (this.cache.has(key)) this.cache.delete(key)
        this._proverka()
        this.cache.set(key, value)
    }
    get(key) {
        if (!this.cache.has(key)) return undefined
        // Удаляем интересующую пару, а потом добавляем её в конец
        const value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, value)

        return value
    }

    _proverka() {
        if (this.cache.size >= this.size) {
            const firstKey = this.cache.keys().next().value
            this.cache.delete(firstKey)
        }
    }
}

const test = new lru_cache(3)
test.set('a', 1)
test.set('b', 2)
test.set('c', 3)
console.log(test)
test.set('d', 4)
console.log(test)
console.log(test.get('a'))
console.log(test.get('b'))
console.log(test)
