//Filename: boilerplate.js

define([
    // These are path alias that we configured in our bootstrap
    'jquery', // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone', // lib/backbone/backbone
    'router',
    'model/app',
], function($, _, Backbone, Router, AppModel) {
    'use strict';
    // Above we have passed in jQuery, Underscore and Backbone
    // They will not be accessible in the global scope
    //
    var AppController = function() {};
    _.extend(AppController.prototype, Backbone.Events);
    _.extend(AppController.prototype, {

        initialize: function() {
            _.bindAll(this, 'onProjectSelected', 'onProjectHovered');
            this.listenTo(Backbone, 'project:selected', this.onProjectSelected);
            this.listenTo(Backbone, 'project:hovered', this.onProjectHovered);
            this.listenTo(Backbone, 'menu:toggled', this.onMenuToggled);
            this.listenTo(Backbone, 'navitem:clicked', this.onNavItemClicked);
            this.listenTo(Backbone, 'page:scrolledto', this.onPageScrolledTo);
        },

        onProjectSelected: function(project) {
            AppModel.set('project', project);
        },

        onProjectHovered: function(project) {
            AppModel.set('hoveredProject', project);
        },

        onMenuToggled: function() {
            var menuOpen = AppModel.get('menuOpen');
            AppModel.set('menuOpen', !menuOpen);
        },

        getCurrentProject: function() {
            return AppModel.get('project');
        },

        getHoveredProject: function() {
            return AppModel.get('hoveredProject');
        },

        onNavItemClicked: function(url) {
            Router.navigate('/' + url);
            this.onMenuToggled();
            AppModel.set('currentPage', url);
            Backbone.trigger('page:navigatedto', url);
        },

        onPageScrolledTo: function(url) {
            Router.navigate('/' + url);
            AppModel.set('currentPage', url);
        }

    });

    // What we return here will be used by other modules
    return new AppController();
});