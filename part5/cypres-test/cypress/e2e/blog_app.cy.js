describe("blog app", () => {
    beforeEach(() => {
        cy.request('POST', '/api/testing/reset');

        cy.register('root', 'root', 'password');
        cy.register('user', 'username', 'password');

        cy.visit("");
    });

    describe('when not logged in', () => {
        it("frontpage can be opened", () => {
            cy.contains("Blogs");
        });

        describe('login', () => {
            it('succeeds with correct credentials', function (){
                cy.contains('label','Username').type('root');
                cy.contains('label','Password').type('password');
                cy.contains('button[type="submit"]', 'Login').click();

                cy.contains('root has logged in');
            });


            it('fails with invalid credentials', function (){
                cy.contains('label','Username').type('invalid');
                cy.contains('label','Password').type('password');
                cy.contains('button[type="submit"]', 'Login').click();

                cy.contains('wrong credentials');
            });
        });
    });

    describe('when logged in', () => {
        beforeEach(function(){
            cy.login('root', 'password');
        });

        it('a new blog can be created', function (){
            cy.contains('new blog').click();
            cy.get('input[name="title"]').type('Test Blog Title');
            cy.get('input[name="author"]').type('Test Blog Author');
            cy.get('input[name="url"]').type('http://example.com');
            cy.contains('button[type="submit"]', 'Submit').click();

            cy.contains('.blogHead', 'Test Blog Title Test Blog Author');
        });

        describe('when a blog exists', function () {
            beforeEach(function () {
                cy.addBlog({
                        title: 'Test Blog Title',
                        author: 'Test Blog Author',
                        url: 'https://example.com',
                    },
                    'root',
                    'password'
                );
            });

            it('a blog can be liked', function () {
                cy.get('.blogHead > button').click();
                cy.contains('button', 'Like').click();
                cy.contains('has been liked');
                cy.contains('likes 1');
            });

            it('a blog can be removed', function () {
                cy.get('.blogHead > button').click();
                cy.contains('.blogBody > button', 'remove').click();

                cy.contains('has been removed');
                cy.get('.blog').should('not.exist');
            });

            it('a blog by another user can not be removed', function () {
                cy.addBlog({
                        title: 'Second Test Blog Title',
                        author: 'Second Test Blog Author',
                        url: 'https://example.com',
                    },
                    'username',
                    'password'
                );

                cy.contains('Second Test Blog Title').as('secondBlog').contains('button', 'View/hide').click();
                cy.get('@secondBlog').parent().contains('button', 'remove').should('not.be.enabled');
            });
        });

        describe('when multiple blogs exists', function () {
            beforeEach(function () {
                cy.addBlog({
                        title: 'The title with the second most likes',
                        author: 'Test Blog Author',
                        url: 'https://example.com',
                    },
                    'root',
                    'password'
                );

                cy.addBlog({
                    title: 'The title with the most likes',
                    author: 'Test Blog Author',
                    url: 'https://example.com',
                },
                    'root',
                    'password'
                );

                cy.login('root', 'password');
            });

            it('blog with most likes is on top of the list', function () {
                cy.contains('The title with the most likes').as('mostLiked').contains('button', 'View/hide').click();
                cy.get('@mostLiked').parent().contains('button', 'Like').click();

                cy.contains('button', 'sort by likes').click();

                cy.get('.blog').eq(0).should('contain', 'The title with the most likes');
                cy.get('.blog').eq(1).should('contain', 'The title with the second most likes');
            });
        })
    });
});
