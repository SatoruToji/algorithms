class fifo_cache {
    constructor() {
        this.cache = new Map() // Удобнее массива / объкта
    }

    set(key, value) {
        this.cache.set(key, value) // Без ограничений добавляем пары key : value
    }

    get(key) {
        return this.cache.has(key) ? this.cache.get(key) : undefined // Проверяем прежде чем вернуть
    }
}

const test = new fifo_cache()
test.set('a', 1)
test.set('b', 2)
test.set('c', 3)
test.set('d', 4)
console.log(test.get('c'))
