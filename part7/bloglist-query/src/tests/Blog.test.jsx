import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

test("blog renders title and author only", async () => {
    const sampleBlog = {
        id: 'abc123',
        title: 'Testing React Components',
        author: 'A. Author',
        url: 'https://example.com/blog/testing-react',
        likes: 42,
        user: { name: 'Tester McTestface', username: 'tester' }
    };

    const { container } = render(<Blog blog={sampleBlog} />);

    const div = container.querySelector(".blog");
    const blogHead = div.querySelector(".blogHead");
    const blogBody = div.querySelector(".blogBody");

    assert.equal(blogHead.textContent, `${sampleBlog.title} ${sampleBlog.author}View/hide`);
    expect(blogBody).toHaveStyle('display: none');
});

test("blog shows details when show detail is clicked", async () => {
    const sampleBlog = {
        id: 'abc123',
        title: 'Testing React Components',
        author: 'A. Author',
        url: 'https://example.com/blog/testing-react',
        likes: 42,
        user: { name: 'Tester McTestface', username: 'tester' }
    };

    const { container } = render(<Blog blog={sampleBlog} />);

    const user = userEvent.setup();

    const detailButton = container.querySelector(".blogHead button");
    const blogBody = container.querySelector(".blogBody");

    expect(detailButton).toHaveTextContent('View/hide');
    expect(blogBody).toHaveStyle('display: none');

    await user.click(detailButton);

    // Test that the blog details are now visible
    expect(blogBody).toHaveStyle('display: block');

    const likesElement = screen.getByText(`likes ${sampleBlog.likes}`);
    expect(likesElement).toBeDefined();
});


test("like button click handler called twice when clicked twice", async () => {
    const sampleBlog = {
        id: 'abc123',
        title: 'Testing React Components',
        author: 'A. Author',
        url: 'https://example.com/blog/testing-react',
        likes: 42,
        user: { name: 'Tester McTestface', username: 'tester' }
    };
    const mockHandler = vi.fn();

    const { container } = render(<Blog blog={sampleBlog} onBlogLike={mockHandler} />);

    const user = userEvent.setup();

    // First, click the show detail button to make the like button visible
    const detailButton = container.querySelector(".blogHead button");
    await user.click(detailButton);

    // Now find and click the like button twice
    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    // Verify the handler was called twice
    expect(mockHandler).toHaveBeenCalledTimes(2);
    expect(mockHandler).toHaveBeenCalledWith(sampleBlog.id, sampleBlog.likes);
});
