
$(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active')
    });

    function lowerCaseAllWordsExceptFirstLetters(fontName) {
        return fontName.replace(/\w\S*/g, function (word) {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    }

    function parseFontName(fontName) {
        // Makes all the characters uppercase
        fontName = fontName.toUpperCase();
        // Makes all the characters lowercase except the first letters
        fontName = lowerCaseAllWordsExceptFirstLetters(fontName);
        // Delete all the whitespace at the beginning and end of a string
        fontName = fontName.trim();
        // Replaces all the remaining spaces with + signs
        fontUrl = fontName.replace(/ /g, "+");
        return fontUrl;
    }

    function getFont(fontUrl) {
        alert(fontUrl);
    }

    $("#fontNameInput").keyup(function (ev) {
        if (ev.keyCode === 13) {
            var fontName = $("#fontNameInput").val();
            parseFontName(fontName);
            getFont(fontUrl);
        }
    });
});
