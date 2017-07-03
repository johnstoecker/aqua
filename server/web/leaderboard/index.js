'use strict';


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/leaderboard',
        handler: function (request, reply) {

            reply.view('leaderboard/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/leaderboard`'
};
