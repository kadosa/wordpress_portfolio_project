// Filename: model/project
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';
    var AppModel = Backbone.Model.extend({
        defaults: {
            menuOpen: false,
            hoveredProject: null,
            project: null
        }
    });
    // Return the model for the module
    return new AppModel();
});