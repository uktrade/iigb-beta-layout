function showcontent() {
  $('.dit-outer-wrap').show();
}

function removeloading() {
  $('.dit-loading').fadeOut(300);
}

function enhance() {
  enhance_videobg();
}

function enhance_videobg() {
  if ($('#bgVid').length > 0 || $('#bgImg').length > 0) {
    $('.jumbotron').addClass('bg--transparent');
  }
}

function onLoaded() {
  smoothScroll();
  addActive();
  checkHeight();
  setGradientHeight();
  prepareForm();
  formAutocomplete();
  checkFormStatus();
  ifOtherSelected();
  search();
  jsSearch();
  submitForm();
}

function smoothScroll() {
  //smoothscrolling and positioning
  $('a[href^="#"]').on('click', function(e) {
    // prevent default anchor click behavior
    e.preventDefault();
    // store hash
    var hash = this.hash;
    // animate
    $('html, body').stop().animate({
      scrollTop: $(hash).offset().top
    }, 600, 'swing', function() {
      window.location.hash = hash;
    });
  });
}

function addActive() {
  var url = window.location.pathname;
  var language = url.match(/\/\w{2,3}\//);
  var child = '';
  if (url.match(/\/industries\//)) {
    child = 'industries/';
  } else if (url.match(/\/setup-guide\//)) {
    child = 'setup-guide/';
    //        } else if (url.match('\/help\/')) {
    //            child = 'help/';
  } else if (url.match(/\/\w{2,3}\/$/)) {
    child = '';
  }

  if ($('ul.nav a') && language) {
    $('ul.nav a[href="' + language[0] + child + '"]').parent().addClass('active');
  }
}

function checkHeight() {

  var elem = $('div').find('.check-height');
  if (elem.length > 0) {
    equalheight(elem);
  }
}

function setGradientHeight() {
  var textHeight = $('.jumbotron>.container').height();
  if (textHeight) {
    var gradientHeight = textHeight + 70;
    $('head').append('<style>.jumbotron:before {height: ' + gradientHeight + 'px;}</style>');
  }
}

function openNav() {
  var contentLastMarginLeft = 0;
  $('#searchInput').focus();
  var box = $('#dit-search-overlay');
  var newValue = contentLastMarginLeft;
  contentLastMarginLeft = box.css('margin-left');

  box.animate({
    'margin-top': '40px',
    'height': '70px'
  }, 100);

  box.animate({
    'margin-left': newValue
  }, 400);

  box.animate({
    'margin-top': '0',
    'height': '100%'
  }, 1000, function() {
    $('body').addClass('overlay-open');
  });
}

/* Close */
function closeNav() {

  var contentLastMarginLeft = 0;
  $('body').removeClass('overlay-open');
  $('#searchInput').val('');
  $('#search-options').empty();
  var box = $('#dit-search-overlay');
  var newValue = contentLastMarginLeft;
  contentLastMarginLeft = box.css('margin-left');

  box.animate({
    'margin-top': '40px',
    'height': '70px'
  }, 500);

  box.animate({
    'margin-left': '100%'
  }, 900);

}

function checkFormStatus() {
  var field = 'enquiryId';
  var url = window.location.href;
  var formLeftSide = $('.dit-form-section__info');
  var formRightSide = $('.dit-form-section__body');
  var formSuccess = $('#formSuccess');
  var enquiryId = $('#enquiry_Id');
  if (url.indexOf('?' + field + '=') !== -1) {
    formLeftSide.hide();
    formRightSide.hide();
    formSuccess.show();
    $('html, body').animate({
      scrollTop: $('.dit-form-section').offset().top
    }, 2000);
    enquiryId.text(getUrlVar());
  } else if (url.indexOf('&' + field + '=') !== -1) {
    formLeftSide.hide();
    formRightSide.hide();
    formSuccess.show();
    $('html, body').animate({
      scrollTop: formSuccess.offset().top
    }, 2000);
    enquiryId.text(getUrlVar());
  }
}

function ifOtherSelected() {
  var industry = $('#industry');
  $('#other').hide();

  industry.change(function(e) {
    if ($('#industry option:selected').text() == 'Other') {
      $('#other').show();
    } else {
      $('#other').hide();
    }
  });
}

function getUrlVar() {
  var id, hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    id = hash[1];
  }
  return "IIGB-" + id;
}

function prepareForm() {

  $('.js_switch').attr('value', 'true');
  $('.stepwizard').show();
  $('.nextBtn').show();
  $('.prevBtn').show();
  $('.location_block').show();
  $('.submitBtn').hide();
  $('.dit-form-section__step').css('min-height', '58rem');
  $('.dit-form-section__step').removeClass('final_step');



  var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn'),
    allPrevBtn = $('.prevBtn'),
    submitBtn = $('.submitBtn'),
    locationSelectors = $('#location_selectors'),
    locationRadioYes = $('#location_radio_yes'),
    locationRadioNo = $('#location_radio_no');
  allWells.hide();
  locationSelectors.hide();

  locationRadioYes.click(function(e) {
    locationSelectors.show();
  });

  locationRadioNo.click(function(e) {
    $('#location').prop('selectedIndex', 0);
    locationSelectors.hide();
  });

  $('#step-2').on('click', '.radio-group a', function() {
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    $(this).parent().next('.' + tog).prop('value', sel);
    $(this).parent().find('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
    $(this).parent().find('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
  });

  navListItems.click(function(e) {
    e.preventDefault();
    var $target = $($(this).attr('href')),
      $item = $(this);

    if (!$item.hasClass('disabled')) {
      navListItems.removeClass('active-selection');
      $item.addClass('active-selection');
      allWells.hide();
      $target.show();
      $target.find('input:eq(0)').focus();
    }
  });

  var theStep, theWidth, totalWidth;

  $(function() {
    theWidth = $('.dit-form-section__body').width();
    theStep = $('.setup-content');
    $(theStep).each(function() {
      $(this).css('width', theWidth);
    });
    //wrap into mother div
    $('.dit-form-wrapper').wrap('<div id="mother" />');
    //assign height width and overflow hidden to mother
    $('#mother').css({
      width: function() {
        return theWidth;
      },
      height: function() {
        return theStep.height();
      },
      position: 'relative !important',
      overflow: 'hidden'
    });
    //get total of image sizes and set as width for ul
    totalWidth = (theStep.length) * theWidth + 5;
    $('.dit-form-wrapper').css({
      width: function() {
        return totalWidth;
      }
    });
  });

  allNextBtn.click(function() {
    var curStep = $(this).closest(".setup-content"),
      curStepValue = parseInt(curStep.attr("id").split('-')[1]),
      nextStepWizard = $('div.setup-panel div a[href="#step-' + curStepValue + '"]').parent().next().children("a"),
      curInputs = curStep.find("input[type='text'],input[type='email'], #location_radio_yes, #turnover, #country, #industry, #start_date_month, #start_date_year, #staff,input[type='date']"),
      isValid = true;

    $(".form-group").removeClass("has-error");
    for (var i = 0; i < curInputs.length; i++) {
      if (curInputs[i].hasAttribute('required') && curInputs[i].value === '') { //changed for IE8 compatibility
        isValid = false;
        $(curInputs[i]).closest(".form-group").addClass("has-error");
      }
    }

    if (isValid) {
      $('.dit-form-wrapper').animate({
        "margin-left": -(curStepValue * theWidth)
      }, 500);
      nextStepWizard.removeAttr('disabled').trigger('click');
    }
  });

  allPrevBtn.click(function() {
    var curStep = $(this).closest(".setup-content"),
      curStepValue = parseInt(curStep.attr("id").split('-')[1]),
      prevStepWizard = $('div.setup-panel div a[href="#step-' + curStepValue + '"]').parent().prev().children("a"),
      curInputs = curStep.find("input[type='text'],input[type='email'], #turnover:selected, #staff:selected, #country:selected, #location:selected"),
      isValid = true;

    if (isValid) {
      $('.dit-form-wrapper').animate({
        "margin-left": -((curStepValue - 2) * theWidth)
      }, 500);
      prevStepWizard.removeAttr('disabled').trigger('click');
    }
  });
}

function submitForm() {

  $('#dit_form').submit(function(e) {
    formLoading();

    var windowUrl = window.location.pathname;
    var language = windowUrl.match(/\/\w{2,3}\//)[0];
    var postUrl = $('form').attr('action');

    $.ajax({
      type: 'POST',
      url: postUrl,
      data: $('#dit_form').serialize(),
      success: function(data) {
        window.location.href = language + 'enquiries/confirmation/?enquiryId=' + data.enquiryId;
      },
      error: function(xhr, textstatus, error) {
        window.location.href = language + 'enquiries/error/?errorCode=' + 500;
      }
    });
    e.preventDefault();
  });

  function formLoading() {

    $t = $('.dit-form-section__body');
    var submitBtn = $('.submitBtn');

    $('#loading-overlay').css({
      opacity: 0.5,
      display: 'block',
    });

    $('#img-load').css({
      left: $t.outerWidth() / 2 - ($('#img-load').width() / 2),
      top: $t.outerHeight() / 2,
    });

    submitBtn.click(function() {
      $('#loading-overlay').fadeIn();
    });

  }
}

var searchResultsSize = 10;

function getResults(size, start) {

  var URL = $(location).attr('href');

  var language = URL.split('/')[3];

  var searchArea = $('#search-options');
  var searchInput = $('#searchInput').val();

  var gateway = "https://pdumary9i4.execute-api.eu-west-1.amazonaws.com/staging";

  if (searchInput === '') {
    searchArea.html("");
  } else {
    $.ajax({
      type: "GET",
      url: gateway + "/" + language + "?q=(or boost=2 pagetitle:'" + searchInput + "' content:'" + searchInput + "' intro:'" + searchInput + "')&size=" + size + "&start=" + start + "&q.parser=structured",
      success: function(results) {
        console.log(results);
        searchArea.html("");
        if ('hits' in results) {
          var searchResults = results.hits.hit;
          searchResults.forEach(function(result) {
            var htmlStr = '<div class="search-result"><h3><a href="/' + result.fields.url + '">' + result.fields.pagetitle + '</a></h3>' +
              '<p class="search-result-link">' + "www.great.gov.uk/" + result.fields.url + '</p>' +
              '<p class="search-result-snippet">' + result.fields.intro + '</p></div>';
            if (result.fields.pagetitle !== '') {
              $("#search-options").append(htmlStr);
            }
          });
          if (results.hits.found > searchResultsSize) {

            $('.pagination')
              .show()
              .empty()
              .append('<li><a class="pagination-links"     onclick="getResults(' + searchResultsSize + ',0)">1</a></li>');

            var count = Math.floor(results.hits.found / searchResultsSize);

            if ((Math.floor(results.hits.found % searchResultsSize) !== 0)) {
              count += 1;
            }
            for (var x = 2; x <= count; x++) {
              $('.pagination').append('<li><a style="cursor:pointer;" onclick="getResults(' + searchResultsSize + ',' + (searchResultsSize * x - (searchResultsSize - 1)) + ')">' + x + '</a></li>');
            }
          } else if (results.hits.found === 0) {
            $("#search-options").append('<p><h3>' + $('.no-results').text() + ' "' + searchInput + '"</h3></p>');
          }
        } else {
          $("#search-options").append('<p><h3>' + $('.search-error').text() + '</h3></p>');
        }
      },
      error: function(xhr, textstatus, error) {}
    });
  }
}

function jsSearch() {
  var searchButton = $('.search-button');

  searchButton.click(function(e) {
    e.preventDefault();
    searchButton.removeAttr('href');
    openNav();
  });
}

function search() {
  var debouncedSearch = debounce(function() {
    getResults(searchResultsSize, 0);
  }, 500);
  $('#searchInput').on('input', debouncedSearch);
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
