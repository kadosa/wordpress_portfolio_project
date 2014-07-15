// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    'model/app',
    'view/thumbnail',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/project/list.html',
    'handlebars'
], function($, _, Backbone, AppModel, ProjectThumbnailView, projectListTemplate, Handlebars) {
    'use strict';
    var ProjectListView = Backbone.View.extend({
        el: $('#page-content'),

        events: {
            'mouseleave .project-thumbnail': 'onMouseLeave'
        },

        projectThumbnailListView: [],

        currentHoveredProject: null,

        initialize: function() {
            _.bindAll(this,  'onMouseLeave');
            this.listenTo(AppModel, 'change:project', this.onProjectChange);
        },

        render: function() {

            var compiledTemplate = Handlebars.compile(projectListTemplate);
            this.$el.append(compiledTemplate);
            this.$projectContainer = this.$('#project-container');
            this.createProjectThumbnailViews();
        },

        createProjectThumbnailViews: function() {
            this.collection.each(function(project) {
                var thumbnailView = new ProjectThumbnailView({
                    model: project
                });
                thumbnailView.render();
                this.$projectContainer.append(thumbnailView.$el);
                this.projectThumbnailListView.push(thumbnailView);
            }, this);
        },

        onHover: function(e) {
            var project = this.collection.get($(e.currentTarget).data("id"));
            if (this.currentHoveredProject !== project) {
                this.currentHoveredProject = project;
                console.log(this.currentHoveredProject);
            }
        },

        onMouseLeave: function(e) {
            if (!$(e.relatedTarget).hasClass('project-thumbnail') &&
                !$(e.toElement).hasClass('project-thumbnail')) {
                    this.removeHoverFromThumbnails();
            }
        },

        removeHoverFromThumbnails: function() {
            _.each(this.projectThumbnailListView, function(thumbnailView) {
                Backbone.trigger('project:hovered', null);
                thumbnailView.removeHoverState();
            });
        }


    });
    // Our module now returns our view
    return ProjectListView;
});