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
        pageData: {},
        appView: null,
        initialize: function() {
            _.bindAll(this, 'onSuccess');
            AppController.initialize();
            this.onSuccess = _.after(2, this.onSuccess);
            this.projects = new ProjectCollection();
            this.projects.fetch({
                success: this.onSuccess
            });
            this.getPageData();
        },

        getPageData: function() {

            $.ajax({
                context: this,
                type: "GET",
                dataType: "json",
                url: '?json=get_page&page_slug=About',
                success: this.onAboutSuccess,
                error: this.onPageError
            });
        },

        onAboutSuccess: function(aboutData) {
            this.pageData.about = aboutData.page.custom_fields;
            this.onSuccess();
        },

        onPageError: function() {
            console.log('json error');
        },

        onSuccess: function(projects) {
            this.appView = new AppView({
                'collection': this.projects,
                'model': new Backbone.Model(this.pageData)
            });
            this.appView.render();
            Router.start();

        }
    };
    // What we return here will be used by other modules
    return App;
});