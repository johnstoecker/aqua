'use strict';


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/intro',
        handler: function (request, reply) {

            reply.view('intro/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/intro'
};
