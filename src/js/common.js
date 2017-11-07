/**
 * Disables button after clicking it once
 */
$('.disableOnClick').on('click', (function() {
  const clickedItems = {};
  return function() {
    if (clickedItems[this]) return false;
    clickedItems[this] = true;
    $(this).addClass('disabled');
    return true;
  };
}()));

/**
 * Display flash messages
 */
$.notify.defaults({
  autoHideDelay: 15000,
});

_.forEach(flash, function(val, key) {
  const len = val.length;
  for (let i = 0; i < len; i++) {
    $.notify(val[i], key);
  }
});

/** Vertical Centering**/
const windowHeight = $(window).height();
const htmlHeight = $('html').height();
$('#fill-view').addClass('align-items-center');
const fillView = $('#fill-view').height();
if (htmlHeight + 5 < windowHeight) {
  const dif = windowHeight - htmlHeight;
  $('#fill-view').animate({
    'min-height': fillView + dif,
  }, 300);
}
