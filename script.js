function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Custom expression helper
Handlebars.registerHelper('formatName', function(property1, property2) {
    return new Handlebars.SafeString("Hello my name is <strong>" + property1 + "</strong> and I live in <strong>" + property2 + "</strong>");
});

Handlebars.registerHelper('formatPhoneNumber', function(property) {
    if (property) {
        var phone = property.toString();
        return "(" + phone.substr(0, 3) + ")" + phone.substr(3, 3) + "-" + phone.substr(6, 4);
    }
});

//Custom block hepler
Handlebars.registerHelper('makeBold', function(options) {
    return new Handlebars.SafeString("<strong>" + options.fn(this) + "</strong>");
});

Handlebars.registerHelper('toLower', function(options) {
    return options.fn(this).toLowerCase();
});

$(document).ready(function() {

    var characterTemplate = $("#character-template").html();
    var compiledCharacterTemplate = Handlebars.compile(characterTemplate);
    var characterId = getParameterByName("id");

    $.ajax({
        type: "GET",
        url: "../data/cast.json",
        success: function(cast) {
            if ($("body").hasClass("page-cast-details")) {
                $(".character-list-container").html(compiledCharacterTemplate(cast.characters[characterId]));
            } else {
                $(".character-list-container").html(compiledCharacterTemplate(cast));
            }
        },
        error: function(err) {
            console.log(err);
        }
    });

    // $(".character-list-container").on("click",".view-details", function(e) {
    //     e.preventDefault();
    //     console.log('button clicked');
    // });
});