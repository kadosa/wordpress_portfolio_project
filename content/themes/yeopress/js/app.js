//Filename: boilerplate.js

define([
    // These are path alias that we configured in our bootstrap
    'jquery', // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone', // lib/backbone/backbone
    'router',
    'collection/projects',
    'controller/app',
    'model/app',
    'view/app'
], function(
    $,
    _,
    Backbone,
    Router,
    ProjectCollection,
    AppController,
    AppModel,
    AppView) {
    'use strict';
    // Above we have passed in jQuery, Underscore and Backbone
    // They will not be accessible in the global scope
    //
    var App = {
        appController: null,
        projects: null,
        appView: null,
        initialize: function() {
            _.bindAll(this, 'onSuccess');
            AppController.initialize();
            this.projects = new ProjectCollection();
            this.projects.fetch({
                success: this.onSuccess
            });

        },

        onSuccess: function(projects) {
            this.appView = new AppView({
                'collection': this.projects
            });
            this.appView.render();
            Router.start();

        }
    };
    // What we return here will be used by other modules
    return App;
});