// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    'controller/app',
    'model/app',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'handlebars'
], function(
    $,
    _,
    Backbone,
    AppController,
    AppModel,
    Handlebars) {
    'use strict';
    var FooterView = Backbone.View.extend({
        className: 'overlay',

        events: {
            'click': 'onClick'
        },

        initialize: function() {
            this.listenTo(AppModel, 'change:menuOpen', this.onMenuToggled);
            this.$el.append(this.$el);
        },

        onMenuToggled: function(appModel, isMenuOpen) {
            isMenuOpen ? this.showOverlay() : this.hideOverlay();
        },

        showOverlay: function() {
            this.$el.addClass('active');
        },

        hideOverlay: function() {
            console.log('deactivate');
            this.$el.removeClass('active');
        },

        onClick: function() {
            console.log('overlay clicked');
            Backbone.trigger('menu:toggled');
        }
    });
    // Our module now returns our view
    return FooterView;
});