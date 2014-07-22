// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/project/detail.html',
    'handlebars'
], function($, _, Backbone, projectListTemplate, Handlebars) {
    'use strict';
    var ProjectView = Backbone.View.extend({
        id: 'current-project',
        render: function() {
            var compiledTemplate = Handlebars.compile(projectListTemplate)(this.model.toJSON());
            // Append our compiled template to this Views "el"
            this.$el.append(compiledTemplate);
            console.log(this.model.toJSON());
        }
    });
    // Our module now returns our view
    return ProjectView;
});