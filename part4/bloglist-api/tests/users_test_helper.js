import user from '../models/user.js';

const singleUserForTesting = {
    username: 'root',
    name: 'root',
    password: 'password',
};

const multipleUsersForTesting = [
    {
        ...singleUserForTesting,
    },
    {
        username: 'test1',
        name: 'Test User 1',
        password: 'test1password',
    },
    {
        username: 'test2',
        name: 'Test User 2',
        password: 'test2password',
    },
];

const getUsersFromDb = async () => {
    const users = await user.find({});

    return users.map((u) => u.toJSON());
};

export default {
    getUsersFromDb,
    singleUserForTesting,
    multipleUsersForTesting,
};
