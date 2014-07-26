// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    'controller/app',
    'model/app',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/header.html',
    'handlebars'
], function(
    $,
    _,
    Backbone,
    AppController,
    AppModel,
    template,
    Handlebars) {
    'use strict';
    var HeaderView = Backbone.View.extend({
        id: 'page-header',
        section: 'header',

        events: {
            'click .nav-icon-container': 'onMenuClick',
            'click .navitem': 'onNavItemClick'
        },

        initialize: function() {
            _.bindAll(this, 'onMenuClick');
            this.listenTo(AppModel, 'change:menuOpen', this.onMenuToggled);
            this.listenTo(AppModel, 'change:hoveredProject', this.onHoveredProjectChange);
            var compiledTemplate = Handlebars.compile(template);
            this.$el.append(compiledTemplate);
        },

        onMenuClick: function() {
            Backbone.trigger('menu:toggled');
        },

        onNavItemClick: function(event) {
            Backbone.trigger('navitem:clicked', $(event.currentTarget).data('id'));
        },

        onMenuToggled: function(AppModel, isMenuOpen) {
            isMenuOpen ? this.showMenu() : this.closeMenu();
        },

        showMenu: function() {
            this.$el.addClass('active');
        },

        closeMenu: function() {
            this.$el.removeClass('active');
        }
    });
    // Our module now returns our view
    return HeaderView;
});