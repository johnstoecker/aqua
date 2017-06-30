'use strict';


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/splash',
        handler: function (request, reply) {

            reply.view('splash/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/splash'
};
