const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/';
const MONGODB_DB_MAIN = 'blog_db';
const MONGO_URI = `${MONGODB_URI}${MONGODB_DB_MAIN}`;

const connectOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);

// const User = require('../components/Auth/model');

// const users = [
//     new User({
//         name: 'User1',
//         email: 'testuser232@gmail.com',
//         password: 'dwdwdwd2312314234',
//         refreshToken: 'refreshTokenrefreshTokenrefreshToken'
//     }),
//     new User({
//         name: 'User2',
//         email: 'awdaw2d@gmail.com',
//         password: 'dwdwdwd22312314234',
//         refreshToken: 'refreshToknrefreshTokenrefreshToken'
//     }),
// ];
// let done = 0;
// for (let i = 0; i < users.length; i++) {
//     users[i].save(function(err, result) {
//         done++;
//         if (done === users.length) {
//             exit();
//         }
//     });
// }

const Post = require('../components/Post/model');

const posts = [
    new Post({
        likes: [1, 2, 3, 4, 5, 6, 7],
        title: 'Lorem Ipsum 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b514f0971d13bdbbe',
        author_name: 'Captein Price',

    }),
    new Post({
        likes: [1],
        title: 'Lorem Ipsum 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b514f0971d13bdbbe',
        author_name: 'Captein Price',

    }),
    new Post({
        likes: [1, 2, 3],
        title: 'Lorem Ipsum 3',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b514f0971d13bdbbe',
        author_name: 'Captein Price',

    }),
    new Post({
        likes: [],
        title: 'Lorem',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b514f1871d13bdbbe',
        author_name: 'Best Author',

    }),
    new Post({
        likes: [1, 2, 3],
        title: 'Lorem Ipsum1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b514f1871d13bdbbe',
        author_name: 'Best Author',

    }),
    new Post({
        likes: [1, 2, 3, 4, 5],
        title: 'Lorem Ipsum1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b503f1871d13bdbbe',
        author_name: 'Test',

    }),
    new Post({
        likes: [1, 2, 3, 4, 5, 6, 7],
        title: 'Lorem Ipsum1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b514f1871d13bdbbe',
        author_name: 'Best Author',
    }),
    new Post({
        likes: [1, 2],
        title: 'Lorem Ipsum1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b503f1871d13bdbbe',
        author_name: 'Test',

    }),
    new Post({
        likes: [1],
        title: 'Lorem Ipsum1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b503f1871d13bdbbe',
        author_name: 'Test',

    }),
    new Post({
        likes: [],
        title: 'Lorem Ipsum1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b503f1871d13bdbbe',
        author_name: 'Test',

    }),
    new Post({
        likes: [1, 2, 3, 4, 5],
        title: 'Lorem Ipsum1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b503f1871d13bdbbe',
        author_name: 'Test',

    }),
    new Post({
        likes: [1, 2, 3, 4],
        title: 'Lorem Ipsum1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        author_id: '5f48026b503f1871d13bdbbe',
        author_name: 'Test',

    }),
];
let done = 0;
for (let i = 0; i < posts.length; i++) {
    posts[i].save(function(err, result) {
        done++;
        if (done === posts.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}