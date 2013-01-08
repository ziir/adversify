
app.Views.main = Backbone.View.extend({
  el: '#content',
  // Fonction appelé automatiquement lors de l'instanciation de la vue
  initialize: function () {
    // déclaration des templates
    this.templateMenu = $('#templateMenu').html();
    this.templatePerso = $('#templatePage').html();
    // on initialise le menu
    this.initMenu();
  },
  initMenu: function () {
    // On transforme notre collection en un tableau de Hash
    var elements = app.collections.elements.toJSON();
    // Création des éléments du menu en utilisant le template et nos personnages
    	//var menuHTML = _.template(this.templateMenu, { personnages: personnages });
    // On affiche le menu
    	//this.$('#menu').html(menuHTML);
  },
  displayElements: function (perso) {
    // On génère le html pour afficher la fiche du personnage
    	//var persoHTML = _.template(this.templatePerso, { perso: perso });
    // On l'affiche
    	//this.$('#content-perso').html(persoHTML)
  }
});
