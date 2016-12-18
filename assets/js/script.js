var positionField = function() {
  var element = document.getElementById('grid-snap'),
      x = 0, y = 0;

  // don't reinitialize
  if ($(element).hasClass('loaded')) return;

  // container dimensions
  var box = {
    width: $(element).parent().innerWidth(),
    height: $(element).parent().innerHeight(),
  };

  // store position
  var translate = {
    x: 0,
    y: 0
  }

  // stored value
  var pos = {
    size: $(element).data('size'),
    left: $(element).data('left'),
    top: $(element).data('top'),
  }

  var ratio = $(element).data('ratio');

  // set initial position
  x = (pos.left * box.width / 100);
  y = (pos.top * box.height / 100);

  // set initial size
  var width = (pos.size / 100 * box.width);
  var height = width / ratio;

  if (height > box.height) {
    width = ratio * box.height;
    height = width / ratio;
  }

  element.style.width = width + 'px';
  element.style.height = height + 'px';


  element.style.webkitTransform =
  element.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

  // text indicators
  var text = {
    size: $(element).children('.size'),
    top: $(element).children('.top'),
    left: $(element).children('.left')
  }

  interact(element)
    .draggable({
      restrict: {
        restriction: element.parentNode,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
      }
    })
    .resizable({
      preserveAspectRatio: true,
      edges: { left: true, right: true, bottom: true, top: true },
      invert: 'reposition',
      restrict: {
        restriction: 'parent',
      }
    })
    .on('dragmove', function (event) {
      x += event.dx;
      y += event.dy;

      translate.y = y;
      translate.x = x;

      event.target.style.webkitTransform =
      event.target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

      pos.left = Math.round(translate.x / box.width * 100);
      pos.top = Math.round(translate.y / box.height * 100);
      
      $(element).attr({
        "data-left": pos.left,
        "data-top": pos.top
      });

      $(text.left).text(pos.left);
      $(text.top).text(pos.top);

      populate();
    })
    .on('resizemove', function (event) {      
      var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

      // prevent box from exceeding restraint
      if (event.rect.height + translate.y >= box.height) {
        return false;
      }

      // update the element's style
      target.style.width  = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);

      pos.size = Math.round(event.rect.width / box.width * 100);
      
      $(element).attr('data-size', pos.size);
      $(text.size).text(pos.size);

      populate();
    });

    $(element).addClass('loaded');

    var populate = function() {
      $('#js-field-position input').val(JSON.stringify(pos));
    }
};

$("label.fieldtoggle, nav.fileview-nav").on('click', positionField);

$(document).ready(function() {
  if ($('div.interact-container').length !== 0) {
    positionField();
  }
});

$(document).ajaxComplete(function(event, xhr, settings) {
  if ($('div.interact-container').length !== 0) {
    positionField();
  }
});