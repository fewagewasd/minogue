$(document).ready(function(){
    var price = 100,
        ersparnis = 20,
        exslider = $('#exslider').slider(),
        button = $('.btn'),
        url = window.location.href,
        searchFor = 'clientId=',
        index = url.indexOf(searchFor),
        clientId = url.substr(index + searchFor.length, url.length),
        count = 1;

    exslider.on('slide', function(slideEvt) {
      $('#price').text(price * slideEvt.value);
      $('#ersparnis').text(ersparnis * slideEvt.value);
      $('#count').text(slideEvt.value);
      count = slideEvt.value;
    });

    button.popover({placement:'top'});

    button.click(function(event){
      event.preventDefault();
      for(var i = 0;i<count;i++) {
        $.ajax({
          type: 'POST',
          url: 'http://peaceful-badlands-3356.herokuapp.com/api/events',
          contentType: 'application/json',
          accept: 'application/json',
          crossDomain: true,
          data: JSON.stringify({
            type: 'ItemBought',
            clientId: clientId,
            zoneId: 'KMINOGUE',
            timestamp: new Date().getTime()
          }),
          success: function() {
          },
          dataType: 'json'
        });
      }
    });

    $('body').on('click', function (e) {
      if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('.popover.in').length===0) {
        $('[data-toggle="popover"]').popover('hide');
      }
    });
  });
