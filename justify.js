(function($) {
  $.fn.justify = function(options) {
    var settings = {
      container: 'body',
      targetHeight: 220,
      margin: 10,
      marginElement: null
    };
    $.extend(settings, options);

    var images = this
      , loaded = 0
      , container = $(settings.container)
      , desiredHeight = settings.targetHeight
      ;

    function layout() {
      var availableWidth = 0
        , margin = settings.margin
        , inlineBlockFix = settings.marginElement ? 0 : 4
        , widths = []
        , row = []
        , accumulatedWidth = 0
        ;

      if (settings.marginElement) {
        images.closest(settings.marginElement).css('display', 'inline-block');
      } else {
        images.css('display', 'inline-block');
      }
      
      availableWidth = container.width();

      images.each(function(index) {
        var image = this
          , width = image.width
          , height = image.height
          ;

        width = image.width;

        if (height !== desiredHeight) {
          width = Math.floor(width * (height / desiredHeight));
        }
        widths.push(width);
        row.push(image);

        accumulatedWidth += width + margin;

        if ((accumulatedWidth * 1.1) >= availableWidth) {
          var ratio = availableWidth / accumulatedWidth
            , rowHeight = Math.floor(desiredHeight * ratio)
            , rowWidth = 0
            , i = 0
            ;

          for (; i < row.length; i++) {
            var rowImage = row[i]
              , imageWidth = Math.floor(widths[i] * ratio)
              , marginElement = settings.marginElement 
                ? $(rowImage).closest(settings.marginElement) 
                : $(rowImage)
              ;
            rowWidth += imageWidth + margin;
            rowImage.width = imageWidth;

            if (i !== row.length - 1) {
              marginElement.css('margin-right', (margin - inlineBlockFix) + 'px');
            }
            marginElement.css('margin-bottom', margin + 'px');
          }

          i = 0;
          while (rowWidth > availableWidth) {
            row[i % row.length].width--;
            rowWidth--;
            i++;
          }
          while (rowWidth < availableWidth) {
            row[i % row.length].width++;
            rowWidth++;
            i++;
          }

          widths = [];
          row = [];
          accumulatedWidth = 0;
        }
      });
      container.fadeIn();
    }

    container.hide();
    images.on('load', function(e) {
      if (++loaded === images.length) {
        layout();
      }
    }).on('error', function() {
      if (++loaded === images.length) {
        layout();
      }
    });
  };
})(jQuery);