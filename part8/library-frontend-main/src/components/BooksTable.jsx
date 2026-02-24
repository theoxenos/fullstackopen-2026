const BooksTable = ({books = []}) => (
    <table>
        <tbody>
        <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
        </tr>
        {books.map((book) => (
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published < 0 ? `${Math.abs(book.published)} BCE` : book.published}</td>
            </tr>
        ))}
        </tbody>
    </table>
)

export default BooksTable