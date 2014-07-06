//Filename: boilerplate.js

define([
    // These are path alias that we configured in our bootstrap
    'jquery', // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone', // lib/backbone/backbone
    'collection/projects',
    'view/app'
], function($, _, Backbone, ProjectCollection, AppView) {
    'use strict';
    // Above we have passed in jQuery, Underscore and Backbone
    // They will not be accessible in the global scope
    //
    var App = {
        projects: null,
        appView: null,
        initialize: function() {
            _.bindAll(this, 'onSuccess');
            this.projects = new ProjectCollection();
            this.projects.fetch({
                success: this.onSuccess
            });

            console.log('App initialized');
        },

        onSuccess: function(projects) {
            console.log(projects);
            this.appView = new AppView({
                'collection': this.projects
            });
            this.appView.render();
        }
    };
    // What we return here will be used by other modules
    return App;
});