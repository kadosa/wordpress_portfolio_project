require.config({
    "baseUrl": "content/themes/yeopress/js",
    "paths": {
        "jquery": "vendor/jquery/jquery",
        "backbone": "vendor/backbone/backbone",
        "underscore": "vendor/underscore/underscore",
        "text": "vendor/requirejs-text/text"
    }
});

require(['jquery', 'backbone', 'app'], function($, Backbone, App) {
    "use strict";
    console.log('Working!!!!!!');
    App.initialize();
    console.log(Backbone);
});