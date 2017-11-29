$('document').ready(function() {
    $('.remove').on('click', function(e) {
        e.preventDefault();
        var toRemove = $(this);
        var url = toRemove.attr('href');
        $.ajax({
            method: 'delete',
            url: url
        }).done(function(data) {});
        window.location = '/collection'
    })
});

$('.put').on('submit', function(e) {
    e.preventDefault();
    var element = $(this);
    var url = element.attr('action');
    var formData = element.serialize();
    console.log(url)
    $.ajax({
        method: 'put',
        url: url,
        data: formData
    }).done(function(data) {
        window.location = '/collection';
    });
});
$('.noTrade').on('click', function(e) {
    e.preventDefault();
    var toRemove = $(this);
    var url = toRemove.attr('href');
    $.ajax({
        method: 'delete',
        url: url
    }).done(function(data) {});
    window.location = '/trade'
})
$('.execute').on('click', function(e) {
    e.preventDefault();
    var toRemove = $(this);
    console.log($(this))
    console.log(toRemove)
    var url = toRemove.attr('href');
    console.log(url)
    $.ajax({
        method: 'delete',
        url: url
    }).done(function(data) {});
    window.location = '/trade'
})