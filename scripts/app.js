$(document).ready(function () {
    var googleFontAPI = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCKDRrItgVcxrwi8AZwgqMnK4hyEC5tCoY";
    var googleFontAPI_trending = "https://www.googleapis.com/webfonts/v1/webfonts?sort=trending&key=AIzaSyCKDRrItgVcxrwi8AZwgqMnK4hyEC5tCoY";

    // Controls the sidebar toggle status
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });

    // Runs the inital json connection for the sidebar/searchbar placeholder text 
    $.getJSON(googleFontAPI_trending, function (data, status) {
        var outputTrendingBox = $('#outputTrendingBox');

        if (status === 'success') {
            console.log('Connected successfully to the Google Font API: Inital Data');

            $.each(data.items, function (i, item) {
                var content = '<div class="trending-font d-flex w-100 justify-content-between list-group-item" ><p>' + item.family + '</p><small>' + item.lastModified + '</small></div>';
                $(outputTrendingBox).append(content);
                
                if (i === 5) {
                    return false;
                }
            });

            // For the searchbar's random font name placeholder
            var fontLength = Math.floor(Math.random() * data.items.length) + 0;
            var randomFontName = data.items[fontLength].family;
            $('#searchFontsField').attr('placeholder', 'exp. ' + randomFontName);
        } else {
            console.log('Couldnt to server for searchFonts: Inital Data');
        }
    });
    /* End pre json code */

    // Parses font names to be used in two different formats
    function createUrl(fontName) {
        var apiUrl = [];
        // Take initial Link
        apiUrl.push('https://fonts.googleapis.com/css?family=');

        // Removes all whitespace in the beginning or end of the string
        fontName = fontName.trim();

        // Makes all the letter lowercase
        fontName = fontName.toLowerCase();

        // Makes all the first letters uppercase
        fontName = fontName.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

        // Addes the name and replaces the spaces with +
        apiUrl.push(fontName.replace(/ /g, '+'));

        // Takes the two haves of the string array and puts them together
        var fontUrl = apiUrl.join('');

        return {
            fontName: fontName,
            fontUrl: fontUrl
        };
    }

    var $searchFontsField = $('#searchFontsField');
    var $searchFontsButton = $('#searchFontsButton');

    // When the user selects one of the trending fonts
    $(document).on('click', '.trending-font', function () {
        var $sideBarFont = $(this).find('p').text();
        $searchFontsField.val($sideBarFont);
        $searchFontsButton.click();
    });

    // When the user presses enter instead of using the button
    $searchFontsField.keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $searchFontsButton.click();
            $searchFontsField.val('');
            return false;
        }
    });

    // All the logic for when the user wants a new font shown
    $searchFontsButton.click(function () {
        var fontName = $searchFontsField.val();
        // Create the url from the fontName
        var fonts = createUrl(fontName);
        var fontFamily = fonts.fontName;
        var fontCSS = fonts.fontUrl;

        var fontAddress = 'https://fonts.google.com/specimen/' + fonts.fontName.replace(/ /g, '+');

        var $fontHeader = $('#fontName');
        var $fontProfile = $('#fontProfile');
        $searchFontsField.val('');
        $.getJSON(googleFontAPI, function (data, status) {
            if (status === 'success') {
                console.log('Connected successfully to the Google Font API: Search Bar');

                // Adds the font stylesheet to the page head
                $("head link[rel='stylesheet']").last().after('<link rel="stylesheet" href="' + fontCSS + '">');

                // Changes the header text to the font family
                $('#fontOutput').css("font-family", fontFamily);
                $fontHeader.text(fontFamily);

                // Changes the link for the font profile link
                $fontProfile.attr('href', fontAddress);
                $fontProfile.text(fontAddress);

                // Reinstances the random font name in the search field
                fontLength = Math.floor(Math.random() * data.items.length) + 0;
                randomFontName = data.items[fontLength].family;
                $('#searchFontsField').attr('placeholder', 'exp. ' + randomFontName);

            } else {
                console.log('Couldnt to server for searchFonts: Search Bar');
            }
        });
    });
});
