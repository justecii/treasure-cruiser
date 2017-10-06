$('document').ready(function() {
    $('.remove').on('click', function(e) {
        e.preventDefault();
        var toRemove = $(this);
        console.log(toRemove + "938438287327237727272727272772727")
        var url = toRemove.attr('href');
        console.log(url + "AKJHFKJHSJHFHFJHS")

        $.ajax({
            method: 'delete',
            url: url
        }).done(function(data) {
            console.log(data);
        });
        window.location = '/collection'
    })
})