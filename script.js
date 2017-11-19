$(document).ready(function() {

    var characterTemplate = $("#character-template").html();
    var compiledCharacterTemplate = Handlebars.compile(characterTemplate);
    
    $.ajax("./data/cast.json").done(function(cast) {
    	console.log(cast);
    	// $(".character-list-container").html(compiledCharacterTemplate(cast));
    });

});
