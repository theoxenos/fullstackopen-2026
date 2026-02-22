import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0;

    return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) return null;

    return blogs.reduce((prev, blog) => (prev.likes > blog.likes ? prev : blog));
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    return _.chain(blogs)
        .countBy('author')
        .map((blogCount, author) => ({ author, blogs: blogCount }))
        .maxBy('blogs')
        .value();
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;

    return _.chain(blogs)
        .groupBy('author')
        .map((authorBlogs, author) => ({
            author,
            likes: _.sumBy(authorBlogs, 'likes'),
        }))
        .maxBy('likes')
        .value();
};

export default {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes,
};
