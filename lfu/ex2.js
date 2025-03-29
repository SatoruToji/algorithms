class LFUCache {
    constructor(size) {
        this.size === 0 ? console.error('переделывай') : this.size = size
        this.cache = new Map() // { key -> { value, freq } }
        this.frequency = new Map() // { freq -> Set(keys) }
        this.minFreq = 0
    }

    get(key) {
        if (!this.cache.has(key)) return undefined
        this._updateFreq(key)
        return this.cache.get(key)
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.get(key).value = value
            this._updateFreq(key)
            return
        }

        if (this.cache.size >= this.size) this._evict()

        this.cache.set(key, { value, freq: 1 })
        if (!this.frequency.has(1)) this.frequency.set(1, new Set())
        this.frequency.get(1).add(key)
        this.minFreq = 1
    }

    _updateFreq(key) {
        let { value, freq } = this.cache.get(key)
        this.cache.set(key, { value, freq: freq + 1 })

        this.frequency.get(freq).delete(key)
        if (!this.frequency.get(freq).size) {
            this.frequency.delete(freq)
            if (this.minFreq === freq) this.minFreq++
        }

        if (!this.frequency.has(freq + 1))
            this.frequency.set(freq + 1, new Set())
        this.frequency.get(freq + 1).add(key)
    }

    _evict() {
        let keyToRemove = this.frequency.get(this.minFreq).values().next().value
        this.frequency.get(this.minFreq).delete(keyToRemove)
        if (!this.frequency.get(this.minFreq).size)
            this.frequency.delete(this.minFreq)
        this.cache.delete(keyToRemove)
    }
}

// Тест
const cache = new LFUCache(3)
cache.set('a', 1)
cache.set('b', 2)
cache.set('c', 3)
cache.get('a') // a: freq = 2
cache.get('a') // a: freq = 3
cache.set('d', 4) // Удаляется "b", так как у него freq = 1 (наименьшее)

console.log(cache)
