// Filename: model/project
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';
    var ProjectModel = Backbone.Model.extend({
        defaults: {
            name: 'Harry Potter'
        }
    });
    // Return the model for the module
    return ProjectModel;
});