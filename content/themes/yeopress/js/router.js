define(["backbone","underscore"],function(Backbone,_) {

    var Router = Backbone.Router.extend({

        routes: {
          'home': 'onHome',
          'work/:id': 'onWork',
          'about': 'onAbout'
        },

        start: function() {
            console.log('i started');
            Backbone.history.start();
        },

        onHome: function() {
          console.log('onhome');
        },

        onWork: function(id) {

          console.log('onwork', id);
        },

        onAbout: function() {
          console.log('onabout');
        },


    });

    return new Router();
});