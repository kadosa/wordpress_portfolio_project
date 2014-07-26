define(["backbone", "underscore"], function(Backbone, _) {
    "use strict";
    var Router = Backbone.Router.extend({

        routes: {
            'home': 'onHome',
            'work/:id': 'onWork',
            'about': 'onAbout'
        },

        start: function() {
            console.log('i started');
            Backbone.history.start({
                pushState: true
            });
        },

        onHome: function() {
            console.log('onhome');
        },

        onWork: function(id) {

            console.log('onwork', id);
        },

        onAbout: function() {
            console.log('onabout');
        }


    });

    return new Router();
});