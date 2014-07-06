// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/project/list.html'
], function($, _, Backbone, projectListTemplate) {
    'use strict';
    var ProjectListView = Backbone.View.extend({
        el: $('#page-content'),
        render: function() {
            // Using Underscore we can compile our template with data
            var data = {};
            data = this.collection.toJSON();
            console.log(data);
            var compiledTemplate = _.template(projectListTemplate, data);
            // Append our compiled template to this Views "el"
            this.$el.append(compiledTemplate);
            console.log(this.collection);
        }
    });
    // Our module now returns our view
    return ProjectListView;
});