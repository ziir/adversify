
var app = {
  // Classes
  Collections: {},
  Models: {},
  Views: {},
  // Instances
  collections: {},
  views: {},
  init: function (elements) {
    // Initialisation de la collection Personnages
    this.collections.elements = new this.Collections.elements(elements);
    // Initialisation du router, c'est lui qui va instancier notre vue
    this.router = new app.Router();
    // On précise à Backbone JS de commencer à écouter les changement de l'url afin d’appeler notre routeur
    Backbone.history.start();
  }
};

$(document).ready(function () {
    var elements = [
        { route: 'cartman', name: 'Eric Cartman', image: 'assets/images/cartman.jpg', bio: "Eric Théodore Cartman fait partie des personnages principaux de la série télévisée d'animation South Park avec Kyle, Stan et Kenny. Cartman est un antihéros : souvent opposé moralement à ses « meilleurs amis » qu'il hait ouvertement et qu'il hésite rarement à trahir, il est égoïste, manipulateur, profiteur, égocentrique, possessif, grossier, homophobe, xénophobe, sadique, raciste, machiavélique, antisémite, paranoïaque, pro-Hitlérien, sexiste, cupide et prêcheur de sa propre version de la religion. Il hait particulièrement les juifs, les hippies, les roux, les personnes âgées, les asiatiques, les pauvres, la série Les Griffin et Scott Tenorman.", from: 'South Park', link: 'http://www.southparkstudios.com', quotes: ["« Je suis pas gros ! J'ai une ossature lourde ! »", "« Je suis pas gros ! Je suis jovial et épanoui ! »", "« Je suis pas gros ! J'ai fait un choix de vie différent ! »" ,"« Je vous hais les mecs, je vous hais ! »", "« Ça troue le cul ! »"] },
        { route: 'bart', name: 'Bart Simpson', image: 'assets/images/bart.jpg', bio: "Âgé de dix ans, Bart est le seul garçon d'Homer et Marge, et le frère aîné de Lisa et Maggie. Les traits de caractère les plus importants de Bart sont son espièglerie, son attitude rebelle et son manque de respect envers l'autorité. Il est apparu dans d'autres médias sur le thème des Simpson, dont des jeux vidéo, un film, The Simpsons Ride, des publicités et des bandes dessinées, et a inspiré toute une gamme de produits dérivés.", from: 'Les Simpson', link: 'http://www.thesimpsons.com', quotes: ["« J'aimerais parler à Monsieur Cochet, prénom : Rick »", "« J'aimerais parler à Némar, prénom : Jean »", "« J'aimerais parler à Sapétéaulit, prénom : James »", "« J'aimerais parler à Al, nom de famille : Coolique »", "« J'aimerais parler à Monsieur Chaud, prénom : arti »"] },
        { route: 'naruto', name: 'Naruto', image: 'assets/images/naruto.jpg', bio: "Héros de la série éponyme, Naruto a connu une enfance très malheureuse. En effet, il était rejeté et rongé par la solitude car en lui est scellé le démon Kyûbi, créature ayant terrorisé le village. Ses habitants ne voient que le démon en lui.Il n'a jamais été reconnu à sa juste valeur, et le seul moyen d'attirer l'attention sur lui était de faire des bêtises, seul son senseï Iruka peut comprendre sa situation car il a lui aussi perdu ses parents dès son jeune âge.", from: "Naruto", link: 'http://www.naruto.com', quotes: ["« Je deviendrai Hokage ! »", "« C´est ainsi que je conçois ma voie de ninja »", "« RAAAASEEEENNNGGAANNN ! »", "« Sasukeeeee ! »"] }
    ];
    // On lance l'application une fois que notre HTML est chargé
    app.init(elements);
}) ;
