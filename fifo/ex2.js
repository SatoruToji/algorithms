class fifo_cache {
    constructor(size) {
        if (this.size <= 0)
            // Проверка чтоб ты не создал алгоритм на 0 ячеек
            throw new Error('Не создавай алгоритм с 0 ячеек балбес')
        this.size = size
        this.cache = new Map()
    }
    set(key, value) {
        this._proverka()
        this.cache.set(key, value)
    }
    get(key) {
        return this.cache.has(key) ? this.cache.get(key) : undefined
    }
    _proverka() {
        if (this.cache.size >= this.size) {
            // proverka удалит лишнюю (первую/старую) пару, если колекция переполнится
            const firstKey = this.cache.keys().next().value //идея fifo "первым зашел - первым удалился"
            this.cache.delete(firstKey)
        }
    }
}

const test = new fifo_cache(3)
test.set('a', 1)
test.set('b', 2)
test.set('c', 3)
test.set('d', 4)
console.log(test.get('a'))
console.log(test.get('c'))
