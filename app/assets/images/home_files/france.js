var maphover_fill = "#1d2a4b";
var maphover_fill_genepi = "#b5bd41";
var maphover_fill_framboise = "#ff2258";
var maphover_fill_coing = "#ffd143";
var maphover_fill_myrthe = "#2a4c89";
var maphover_fill_mirabelle = "#f0a840";
var maphover_fill_fraise = "#ea3838";
var maphover_fill_prunelle = "#9ca6d9";
var maphover_fill_cassis = "#462043";
var maphover_fill_citron = "#fdde46";
var maphover_fill_violette = "#630c9a";
var maphover_fill_pomme = "#a7c67c";
var maphover_fill_genievre = "#4473ce";
var mapstroke = "#B7B7B7";
var mapstroke_width = 1.2;
var mapWidth=800;
var mapHeight=800;

var paths = {
Z1: {
    title: "Grand-Est <tspan class='prod' x='200' dy='1.5em'>mirabelle</tspan>",
    color: maphover_fill_mirabelle,
    x: 200,
    y: 80,
    url: "/produit/liqueur-mirabelle/"
},
Z2: {
    title: "Nouvelle<tspan x='110' dy='1.2em'>Aquitaine</tspan><tspan class='prod' x='113' dy='1.3em'>prunelle</tspan>",
    color: maphover_fill_prunelle,
    x: 111,
    y: 170,
    url: "/produit/liqueur-de-prunelle/"
},
Z3: {
    title: "Auvergne<tspan x='185' dy='1.2em'>Rhône-Alpes</tspan><tspan class='prod' x='193' dy='1.3em'>g&eacute;n&eacute;pi</tspan>",
    color: maphover_fill_genepi,
    x: 189,
    y: 175,
    url: "/produit/liqueur-de-genepi/"
},
Z4: {
    title: "Bourgogne<tspan x='185' dy='1.2em'>Franche-Comté</tspan><tspan class='prod' x='199' dy='1.3em'>cassis</tspan>",
    color: maphover_fill_cassis,
    x: 190,
    y: 125,
    url: "/produit/creme-de-cassis-region-bourgogne-franche-comte/"
},
Z5: {
    title: "Bretagne <tspan class='prod' x='45' dy='1.3em'>fraise</tspan>",
    color: maphover_fill_fraise,
    x: 45,
    y: 97,
    url: "/produit/liqueur-de-fraise-de-plougastel/"
},
Z6: {
    title: "Centre<tspan x='128' dy='1.2em'>Val de Loire</tspan><tspan class='prod' x='135' dy='1.3em'>framboise</tspan>",
    color: maphover_fill_framboise,
    x: 133,
    y: 115,
    url: "/produit/liqueur-de-framboise/"
},
Z7: {
    //    title: "Corse<tspan class='prod' x='238' dy='1.3em'>myrte</tspan>",
    title: "Corse<tspan class='prod' x='264' dy='1.1em'>myrte</tspan>",
    color: maphover_fill_myrthe,
    //    x: 239,
    x: 265,
    //    y: 266,
    y: 263,
    url: "/produit/liqueur-de-myrte/"
},
Z8: {
    title: "Occitanie<tspan class='prod' x='150' dy='1.3em'>Violette</tspan>",
    color: maphover_fill_violette,
    x: 146,
    y: 230,
    url: "/produit/liqueur-de-violette-region-occitanie/"
},
Z9: {
    title: "Ile-de<tspan x='152' dy='1.2em'>France</tspan><tspan class='prod' x='152' dy='1.3em'>à venir</tspan>",
    color: mapstroke,
    x: 152,
    y: 78,
    url: ""
},
Z10: {
    title: "Hauts<tspan x='153' dy='1.4em'>de-France</tspan><tspan class='prod' x='158' dy='1.5em'>genièvre</tspan>",
    color: maphover_fill_genievre,
    x: 158,
    y: 40,
    url: "/produit/liqueur-de-genievre-region-hautsdefrance/"
},
Z11: {
    title: "Normandie <tspan class='prod' x='95' dy='1.2em'>pomme</tspan>",
    color: maphover_fill_pomme,
    x: 95,
    y: 73,
    url: "/produit/liqueur-de-pomme-region-normandie/"
},
Z12: {
    title: "Pays de<tspan x='87' dy='1.2em'>la Loire</tspan><tspan class='prod' x='87' dy='1.3em'>coing</tspan>",
    color: maphover_fill_coing,
    x: 87,
    y: 110,
    url: "/produit/liqueur-de-coing/"
},
Z13: {
    title: "Provence-Alpes<tspan x='228' dy='1.2em'>Côte d'Azur<tspan><tspan class='prod' x='231' dy='1.3em'>citron</tspan>",
    color: maphover_fill_citron,
    x: 223,
    y: 231,
    url: "/produit/limoncello-region-provence-alpes-cote-dazur/"
}
};

(function($) {
    $( document ).ready(function() {
        if ($('.bloc-map-fr').length) {
            $("#carte_map svg path").click(function () {
                var color = $(this).data('color');
                $(this).css('fill', color);

                // var title = $(this).attr('title');
                // $("#text_map").html(title);
            });

            $("#carte_map svg path").hover(function () {
                var color = $(this).data('color');
                var id = $(this).attr('id');
                var title = $(this).attr('title');

                $(this).css('fill', color);
                $('#text-' + id).css('display', 'block');
            }, function () {
            	var id = $(this).attr('id');

                $(this).css('fill', '#ffffff');
                $('#text-' + id).css('display', 'none');
            });

            $("#carte_map svg text").hover(function () {
                var id = $(this).data('zone');
                var color = $('#' + id).data('color');

                $(this).css('display', 'block');
                $('#' + id).css('fill', color);
            }, function () {
            	var id = $(this).data('zone');
            	$('#' + id).css('fill', '#ffffff');

                $(this).css('display', 'none');
            });
        }
    });
}) (jQuery);
