'use strict';

$(document).ready(function(){
    var price = 100,
        ersparnis = 20,
        exslider = $('#exslider').slider(),
        button = $('.btn'),
        url = window.location.href,
        searchFor = 'clientId=',
        index = url.indexOf(searchFor),
        clientId = url.substr(index + searchFor.length, url.length);

    exslider.on('slide', function(slideEvt) {
      $('#price').text(price * slideEvt.value);
      $('#ersparnis').text(ersparnis * slideEvt.value);
      $('#count').text(slideEvt.value);
    });

    console.log($('#count').val());

    button.popover({placement:'top'});

    button.click(function(){
      event.preventDefault();
      $.ajax({
        type: 'OPTIONS',
        url: 'http://peaceful-badlands-3356.herokuapp.com/api/events',
        data: {
          type: 'ItemBought',
          clientId: clientId,
          zoneId: 'KMINOGUE',
          timestamp: new Date().getTime()
        },
        success: function() {},
        dataType: 'json'
      });
    });

    $('body').on('click', function (e) {
      if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('.popover.in').length===0) {
        $('[data-toggle="popover"]').popover('hide');
      }
    });
  });

