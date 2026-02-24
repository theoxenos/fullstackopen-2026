import { useMutation } from "@tanstack/react-query";
import blogService from "../services/blog-service.js";
import { queryClient } from "../queryClient.js";

// export const getBlogListMutation = useMutation({
//     mutationFn: blogService.getAllBlogs,
//     onSuccess: (blogs) => queryClient.setQueryData(['blogs'], blogs),
// });

export const useCreateBlogMutation = () => {
    return useMutation({
        mutationFn: blogService.createBlog,
        onSuccess: (newBlog) => {
            queryClient.setQueryData(['blogs'], (oldBlogList) => {
                return oldBlogList ? [...oldBlogList, newBlog] : [newBlog];
            });
        },
        onError: (error) => error,
    });
};

export const useLikeBlogMutation = () => {
    return useMutation({
        mutationFn: blogService.likeBlog,
        onSuccess: (updatedBlog) => {
            queryClient.setQueryData(['blogs'], (oldBlogList) => {
                return oldBlogList.map((blog) => {
                    return blog.id === updatedBlog.id ? updatedBlog : blog;
                })
            });
            
            queryClient.setQueryData(['blog', updatedBlog.id], updatedBlog);
        },
        onError: (error) => error,
    });
};

export const useDeleteBlogMutation = () => {
    return useMutation({
        mutationFn: blogService.removeBlog,
        onSuccess: (deletedBlog) => {
            queryClient.setQueryData(['blogs'], (oldBlogList) => {
                return oldBlogList.filter(blog => blog.id !== deletedBlog.id);
            });
        }
    });
};

export const useCreateCommentMutation = () => {
    return useMutation({
        mutationFn: blogService.createComment,
        onSuccess: (updatedBlog) => {
            queryClient.setQueryData(['blogs'], (oldBlogList) => {
                return oldBlogList.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog);
            });

            queryClient.setQueryData(['blog', updatedBlog.id], updatedBlog);
        }
    });
};