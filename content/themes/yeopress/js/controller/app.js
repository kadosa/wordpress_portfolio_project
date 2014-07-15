//Filename: boilerplate.js

define([
    // These are path alias that we configured in our bootstrap
    'jquery', // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone', // lib/backbone/backbone
    'model/app',
], function($, _, Backbone, AppModel) {
    'use strict';
    // Above we have passed in jQuery, Underscore and Backbone
    // They will not be accessible in the global scope
    //
    var AppController = function() {};
    _.extend(AppController.prototype, Backbone.Events);
    _.extend(AppController.prototype, {

        initialize: function() {
            _.bindAll(this, 'onProjectSelected', 'onProjectHovered');
            Backbone.on('project:selected', this.onProjectSelected);
            Backbone.on('project:hovered', this.onProjectHovered);
        },

        onProjectSelected: function(project) {
            AppModel.set('project', project);
        },

        onProjectHovered: function(project) {
            AppModel.set('hoveredProject', project);
        },

        getCurrentProject: function() {
            return AppModel.get('project');
        },

        getHoveredProject: function() {
            return AppModel.get('hoveredProject');
        }

    });

    // What we return here will be used by other modules
    return new AppController();
});