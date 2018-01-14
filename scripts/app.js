$(document).ready(function () {
    var googleFontAPI = "https://www.googleapis.com/webfonts/v1/webfontskey=AIzaSyCKDRrItgVcxrwi8AZwgqMnK4hyEC5tCoY";

    var googleFontAPI_trending = "https://www.googleapis.com/webfonts/v1/webfonts?sort=trending&key=AIzaSyCKDRrItgVcxrwi8AZwgqMnK4hyEC5tCoY";

    // Controls the sidebar toggle status
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });

    // Runs the inital json connection for the sidebar/searchbar placeholder text 
    $.getJSON(googleFontAPI_trending, function (data, status) {
        var outputTrendingBox = $('#outputTrendingBox');

        if (status === 'success') {
            console.log('Connected successfully to the Google Font API');
            // For the sidebar
            $.each(data.items, function (i, item) {
                var content = '<div class="d-flex w-100 justify-content-between list-group-item"><p>' + item.family + '</p><small>' + item.lastModified + '</small></div>';
                $(outputTrendingBox).append(content);

                if (i === 5) {
                    return false;
                }
            });
            
            // For the searchbar
            var fontLength = Math.floor(Math.random() * data.items.length) + 0;
            var randomFontName = data.items[fontLength].family;
            $('#searchFontsField').attr('placeholder', 'exp. ' + randomFontName);
            
        } else {
            console.log('Cannot connect to the Google Font API Sadly');
        }
    });
});
