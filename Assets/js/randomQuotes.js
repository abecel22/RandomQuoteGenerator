$(document).ready(function() {
    var quote;
    var author;

    function getNewQuote() {
        $.ajax({
            url: 'http://api.forismatic.com/api/1.0/',
            jsonp: 'jsonp',
            dataType: 'jsonp',
            data: {
                method: 'getQuote',
                lang: 'en',
                format: 'jsonp'
            },
            success: function(response) {
                quote = response.quoteText;
                author = response.quoteAuthor;
                $('#quote').text(quote);

                if (author) {
                    $('#author').text('- ' + response.quoteAuthor);
                } else {
                    $('#author').text('- Unknown');
                }
            }
        });
    }
    getNewQuote();

    $('.toggle').click(function() {
        getNewQuote();
        $('#machine').each(function() {
            var classes = ['class1', 'class2', 'class3'];
            this.className =
                classes[
                    ($.inArray(this.className, classes) + 1) % classes.length
                ];
        });
    });

    $('#twitterButton').on('click', function(event) {
        event.preventDefault();
        window.open(
            'https://twitter.com/intent/tweet?text=' +
                encodeURIComponent(quote + '--' + author)
        );
    });
});
