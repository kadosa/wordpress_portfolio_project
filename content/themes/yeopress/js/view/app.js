// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/project/list.html',
    'handlebars'
], function($, _, Backbone, projectListTemplate, Handlebars) {
    'use strict';
    var ProjectListView = Backbone.View.extend({
        el: $('#page-content'),
        render: function() {
            // Using Underscore we can compile our template with data
            var page = {};
            page.projects = this.collection.toJSON();
            var compiledTemplate = Handlebars.compile(projectListTemplate)(page);
            // Append our compiled template to this Views "el"
            this.$el.append(compiledTemplate);

        }
    });
    // Our module now returns our view
    return ProjectListView;
});