require.config({
    "baseUrl": "content/themes/yeopress/js",
    "paths": {
        "jquery": "vendor/jquery/jquery",
        "backbone": "vendor/backbone/backbone",
        "underscore": "vendor/underscore/underscore",
        "handlebars": "vendor/handlebars/handlebars.min",
        "tweenlite": "vendor/greensock/src/minified/TweenLite.min",
        "scrollto": "vendor/greensock/src/minified/plugins/ScrollToPlugin.min",
        "ease": "vendor/greensock/src/minified/easing/EasePack.min",
        "text": "vendor/requirejs-text/text",
        "waypoints": 'vendor/jquery-waypoints/waypoints'
    },

    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'tweenlite': {
            exports: 'TweenLite'
        },

        'scrollto': {
            deps: ['tweenlite'],
            exports: 'ScrollTo'
        },
        'ease': {
            deps: ['tweenlite'],
            exports: 'Ease'
        }
    }
});

require(['jquery', 'backbone', 'app', 'ease', 'waypoints'], function($, Backbone, App) {
    "use strict";
    App.initialize();
});