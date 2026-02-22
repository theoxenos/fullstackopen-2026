import Blog from '../models/blog.js';

const initialBlogs = [
    {
        title: 'test',
        author: 'Jerry',
        url: '/123',
        likes: 12,
    },
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    },
];

const singleBlogForTesting = {
    title: 'Testing',
    author: 'Testing',
    url: 'http://example.com',
    likes: 420,
};

const blogsFromDb = async () => {
    const blogs = await Blog.find({}).populate('user');
    return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
    const blog = await Blog.create({ title: 'deletthis', url: 'http://delete.me', author: 'deleteme' });
    await blog.deleteOne();

    return blog._id.toString();
};

export default {
    initialBlogs, nonExistingId, singleBlogForTesting, blogsFromDb,
};
