db.createUser({
    user: 'the_username',
    pwd: 'the_password',
    roles: [
        {
            role: 'dbOwner',
            db: 'the_database',
        },
    ],
});

db.createCollection('todos');

db.todos.insert({ title: 'Write code', completed: true });
db.todos.insert({ title: 'Learn about containers', completed: false });