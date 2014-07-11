require.config({
    "baseUrl": "content/themes/yeopress/js",
    "paths": {
        "jquery": "vendor/jquery/jquery",
        "backbone": "vendor/backbone/backbone",
        "underscore": "vendor/underscore/underscore",
        "handlebars": "vendor/handlebars/handlebars.min",
        "text": "vendor/requirejs-text/text"
    },

    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require(['jquery', 'backbone', 'app'], function($, Backbone, App) {
    "use strict";
    console.log('Working!!!!!!');
    App.initialize();
    console.log(Backbone);
});