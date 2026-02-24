export const updateCache = (cache, query, addedBook) => {
    cache.updateQuery(query, (data) => {
        if (!data) return null

        const isAlreadyInCache = data.allBooks.some(b => b.id === addedBook.id)

        if (isAlreadyInCache) {
            return data
        }

        return {
            allBooks: [...data.allBooks, addedBook],
        }
    })
}