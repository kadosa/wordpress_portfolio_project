// Filename: collections/projects
define([
    'underscore',
    'backbone',
    // Pull in the Model module from above
    'model/project'
], function(_, Backbone, ProjectModel) {
    'use strict';
    var ProjectCollection = Backbone.Collection.extend({
        model: ProjectModel,
        url: 'http://dev.giles.com/?json=get_recent_posts',
        parse: function(response) {
            return response.posts;
        }
    });
    // You don't usually return a collection instantiated
    return ProjectCollection;
});