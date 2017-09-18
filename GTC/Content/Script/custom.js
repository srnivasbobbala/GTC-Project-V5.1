// -------------------------------------------------------
// Javascript Document for GTC Dashboard (Broker & Client)
// Last Edit: 2017 - 08 - 02
// Editted by: Christo Smuts <christo@falcorp.co.za>
// Version: 0.7
// -------------------------------------------------------
// USING HIGHCHARTS FOR GRAPHS, CHARTS, ETC - V5
// -------------------------------------------------------

// ----------------------------------------------------------------------------------
// FOR THE DEVELOPERS DATA FROM SLIDERS:
// to get slider data: document.getElementById('ID_of_Slider').noUiSlider.get()
//        for example: document.getElementById('slider-retirement').noUiSlider.get()
// ----------------------------------------------------------------------------------

// ---------
// VARIABLES
// ---------

let newWidth = $('.content-section').width(); // Width of Content Section
let inputField = $('form .input-field-group input'); // Form Input
let selectField = $('form .input-field-group select'); // Form Select
let documentHash = window.location.hash; // find the hash location in the URL
let totalWealthAnchor = $('[data-totalwealth]'); // Assign data-totalwealth to variable

// -------------
// END VARIABLES
// -------------

// ---------
// FUNCTIONS
// ---------

// Following function closes the popout menu from the top nav bar.
function closeMenu() {
  $(".white-out").fadeOut(200); // fade out the white background covering the content
  $('.popout-menu').slideUp(200); // Slide up and hide the popout menu
  $('.profile-icons').removeClass('open'); // remove the 'open' class from the profile icon that is now purple as if being selected.
}

// Function to scroll to the top of the page.
function scrollToTop() {
  $('html, body').animate({
    scrollTop: 0
  }, 700);
}

// Function that resizes the content section to orignal width (with the correct screen width)
function resizeContentSection() {
  if ($(window).width() <= 1024) { // check what screen width it is resizing for
    $('.content-section').css({
      width: 'calc(100% - 240px)' // change the css width for the content section
    });
  } else {
    $('.content-section').css({
      width: 'calc(100% - 290px)' // change the css width for the content section
    });
  }
}

// Function for close button on left side navigation
function closeSideNav(contentWidthSubtraction) {
  // Resets content section to original width
  resizeContentSection();

  // The following section resets the newWidth variable to orignal width size.
  let paddingSize = parseInt($(".content-section").css('padding'));

  if ($(window).width() <= 1024) {
    newWidth = $(document).width() - 240;
  } else {
    newWidth = $(document).width() - 290;
  }

  newWidth = newWidth - (paddingSize * 2);

  // Collapses the side nav
  $('#menu').multilevelpushmenu('collapse', 0);
}

function initMenu(menuWidth) {
  $('#menu').multilevelpushmenu({
    container: $('#menu'), // Defining what menu to apply the script to, '#menu'
    containersToPush: [$('.content-section')], // Defining which container to push out, in this case it is 'content-section'
    backItemIcon: 'menuback-icon',
    groupIcon: '',
    menuWidth: menuWidth, // Width of menu changes on smaller screens
    menuHeight: '100%',
    onExpandMenuStart: function () {
      $('.content-section').width(newWidth -= 40); // when menu items open, the content section width decreases by 40px
      // Troubleshooting: console.log(newWidth + ' on Expand');
    },
    onCollapseMenuStart: function () {
      $('.content-section').width(newWidth += 40); // when menu items close, the content section width increases again by 40px
      // Troubleshooting: console.log(newWidth + ' on Collapse');
    }
  });
}

// Function to assign closeMenu() to a certain element
function closeMenuTrigger(elementClicked) {
  elementClicked.on('click touch', function () {
    closeMenu();
  });
}

// Function to call on the data attribute in pure javascript or the slider.
function data(element, key){
	return element.getAttribute('data-' + key);   
}

// Function to create a element in HMLT and add an attribute and class to it
function createElement(tag, attribute, attributeValue, className) {
  let elementCreated = document.createElement(tag); 
  let elementCreatedAtt = document.createAttribute(attribute);
  elementCreatedAtt.value = attributeValue;
  elementCreated.setAttributeNode(elementCreatedAtt);

  $(elementCreated).addClass(className);

  return elementCreated;
}

// Function to insert element after another element
function insertAfter(elementBefore, elementAfter) {
  elementBefore.parentNode.insertBefore(elementAfter, elementBefore.nextSibling);
}

// Function to create a money slider with one single handle
function createMoneySlider(moneySlider) {
  // Create the slider with the initialising script below
  noUiSlider.create(moneySlider, {
      start: [0],
      connect: false,
      step: Number(data(moneySlider, 'step')) || 1,
      range: {
          'min': Number(data(moneySlider, 'range-min')) || 0,
          'max': Number(data(moneySlider, 'range-max')) || 1
      },
  });

  // Creates the divs and adds the data attribute with value.
  let moneyValue = createElement('div', 'data-slider-value', 'single', 'range-value');

  // Inserts the div next to the money slider.
  insertAfter(moneySlider, moneyValue);

  // Script to update the value element to that of the slider value.
  moneySlider.noUiSlider.on('update', function (values, handle) {
    // Add the Rand Value to the div created above
    moneyValue.innerHTML = 'R ' +  values[handle];
  });
}

// Function to create a money slider with one single handle
function createRangeSlider(rangeSlider) {
  // Create the slider with the initialising script below
  noUiSlider.create(rangeSlider, {
      start: [Number(data(rangeSlider, 'start-from')) || 1, Number(data(rangeSlider, 'start-to')) || 1], // the default start for the from and to values
      connect: true,
      step: Number(data(rangeSlider, 'step')) || 1, // the amount that changes at one single time when moving the sliders.
      range: {
          'min': Number(data(rangeSlider, 'range-min')) || 0, // the minimum amount
          'max': Number(data(rangeSlider, 'range-max')) || 1  // the maximum amount
      },
  });

  // Creates the divs and adds the data attribute with value.
  // From Value
  let rangeValueFrom = createElement('div', 'data-slider-value', 'from', 'range-value from');

  // To Value
  let rangeValueTo = createElement('div', 'data-slider-value', 'to', 'range-value to');

  // Inserts the div next to the money slider.
  insertAfter(rangeSlider, rangeValueFrom);
  insertAfter(rangeSlider, rangeValueTo);

  // create an object with the from and to values.
  let money_fromtoValues = [
    rangeValueFrom,
    rangeValueTo
  ];

  // Script to update the from and to values to that of the sliders values.
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    // Add the Rand Value to the divs created above
    money_fromtoValues[handle].innerHTML = 'R ' + values[handle];
  });
}

// Function for Retirement Slider with Age value
function createRetirementSlider(sliderRetirement) {
  noUiSlider.create(sliderRetirement, {
    start: Number(data(sliderRetirement, 'start')) || 0,
    step: 1,
    range: { // to align the pointer to the right numbers below the slider
      'min': 16,
      '3%': 20,
      '9%': 25,
      '15%': 30,
      '20.5%': 35,
      '26%': 40,
      '32%': 45,
      '38%': 50,
      '44%': 55,
      '50%': 60,
      '55.5%': 65,
      '61.3%': 70,
      '67%': 75,
      '72.8%': 80,
      '78.5%': 85,
      '84%': 90,
      '90%': 95,
      '96%': 100,
      'max': 110
    }
  });

  // Update the text in the handle element of the slider.
  sliderRetirement.noUiSlider.on('update', function (values, handle) {
    $(sliderRetirement).find($('.noUi-handle')).text(Math.round(values[handle]));
  });
}

// -------------
// END FUNCTIONS
// -------------

// -------
// SCRIPTS
// -------

// Script to show content section if now hash is in the URL
$(document).ready(function() {
  if(documentHash === '') { // check if the hash is there
    $('.content-section:nth-of-type(1)').addClass('show-section'); // then show first content section
  } else {
    $('.content-section').removeClass('show-section');
    $(documentHash).addClass('show-section'); // otherwise show content section defined in hash
    scrollToTop(); // scroll to the top of the page
  }
});

if ($(window).width() <= 1024) { // If screen width is smaller than 1024px then execute the code below 
  // Call function to initialize menu with width
  initMenu('200px');
} else { // else If screen width is larger then execute the code below 
  // Call function to initialize menu with width
  initMenu('250px');
}

// When the close button is clicked or tapped, then do the following function
$('.close-icon').on('click touch', function () {
  // Call function to close side menu and reset content width
  closeSideNav();
  // Call the close menu function to close the top right menu if open.
  closeMenu();
});

// This following script shows/hides the content section of the respective menu item being clicked/tapped
$('#menu li a[data-open]').on('click touchend', function () {
  let trigger = $(this).data("open"); // find the ID for the content section through the data-open attribute in the HTML

  $('.content-section').removeClass('show-section'); // Removes the show-section class and hides that content-section
  $('#' + trigger).addClass('show-section'); // Find the respective content-section and add the class show-section to make it visible

  window.location.hash = '#' + trigger;
  scrollToTop();

  $('#menu li').removeClass('active'); // remove the class that makes the menu item appear active

  // The following script adds the 'active' class to the respective menu item.
  if ($(this).parents().eq(1).hasClass('second-level')) {
    $(this).parents().eq(3).addClass('active');
  } else {
    $(this).parent().addClass('active');
  }
});

$('#menu li a').on('click touchend', function () {
  if($(this).data('open') == null) {
    window.location.href = $(this).attr('href');
  }
});

// Top right nav script
$('.open-menu-trigger').on('click touch', function () {

  $(this).find('.popout-menu').slideToggle(200); // Toggle show/hide of the popout menu
  $(this).find('.profile-icons').toggleClass('open'); // Toggle 'open' class for highlighting the menu trigger
  $(".white-out").fadeToggle(200); // Toggle the show/hide of the white layer
  
  // Close the side menu
  closeSideNav();

  // Minus the newWidth variable by 40 (for some reason the settings menu resets the newWidth with an extra 40px)
  newWidth = newWidth - 40;

  resizeContentSection(); // calls the resize content section function
});

// Assign triggers to the close menu function
closeMenuTrigger($(".white-out"));
closeMenuTrigger($('#menu'));
closeMenuTrigger($('#menu li a'));

// if esc is pressed it also closes the menu
$(document).keyup(function (e) {
  if (e.keyCode == 27 && $(".white-out").is(':visible')) {
    closeMenu();
  }
});

// Script to create animation for input fields and labels
inputField.focus(function () {
  $(this).parent().find('label').addClass('label-focus'); // add class that causes the label to move up
});
inputField.blur(function () {
  if ($(this).val()) {
    // When the user types in the input field keep the label above it even when clicking off the input
    $(this).parent().find('label').addClass('label-focus'); 
  } else {
    // When the user clears that input field and clicks off it, make the label move down again.
    $(this).parent().find('label').removeClass('label-focus');
  }
});


// Script to change the colour of the select form element when something is either selected or not.
selectField.change(function () {
  if ($(this).children('option:first-child').is(':selected')) {
    $(this).css({
      color: '#c5c5c5'
    });
  } else {
    $(this).css({
      color: '#363636'
    });
  }
});

// Help popover enable script
$('a[data-toggle="popover"]').popover();

// Initialize Slider script for Retirement
Array.prototype.forEach.call(document.querySelectorAll('div[data-slider="retirement-slider"]'), createRetirementSlider);

// Slider for money values
Array.prototype.forEach.call(document.querySelectorAll('div[data-slider="money-slider"]'), createMoneySlider);

// Slider for money values (from and to)
Array.prototype.forEach.call(document.querySelectorAll('div[data-slider="range-slider"]'), createRangeSlider);

// Make the whole table row clickable from the link inside client name
$('.client-list tr').click( function() {
    window.location = $(this).find('a').attr('href');
});

// Toggle selected class to btn-filter when clicked/tapped
$('.btn-filter').on('click touch', function() {
  if($('.btn-filter').hasClass('selected')) {
    $('.btn-filter').removeClass('selected'); // if other buttons has the class, then remove it
  }
  $(this).addClass('selected');
});

// Custom select filter
$('select[data-select="tag-selection"]').selectize({
    allowEmptyOption: true
});
// Script to remove option from the selectize select filter
$(document).on('click', 'div.selectize-input div.item', function(e) {
    var select = $(this).parents().eq(3).find($('[data-select="tag-selection"]')).selectize();
    var selectSizeControl = select[0].selectize;
    // 1. Get the value
    var selectedValue = $(this).attr("data-value");
    // 2. Remove the option 
    select[0].selectize.removeItem(selectedValue);

    select[0].selectize.refreshItems();
    select[0].selectize.refreshOptions();
});

// Script for Collapse and Expand function of the module header with body
$('.collapse-section').on('click touch', function() {
  $(this).next().slideToggle(); // Show and Hide body when header is clicked
  $(this).toggleClass('round-borders'); // Add the class open and round-borders
});

// Script for Dashboard Doughnut Graph and Progress bars
function initChart(chartID, _data) {

  Highcharts.setOptions({
     colors: [
      $('.progress-bar-highest').css('color'),
      $('.progress-bar-high').css('color'),
      $('.progress-bar-medium').css('color'),
      $('.progress-bar-low').css('color'),
      $('.progress-bar-lowest').css('color')
    ]
  });

  $.getJSON(_data, function(jsonData) {

    $.each(jsonData.stats, function (d) {
      var targetStats = $(document).find($('#' + jsonData.stats[d].target));
    
      targetStats.find($('.stats-titles span')).text(jsonData.stats[d].name + ' ');
      targetStats.find($('[class^="stat-value-"')).text(jsonData.stats[d].y + '%');
      targetStats.find($('.progress-bar')).css({ 'width': jsonData.stats[d].y + '%' }).attr('aria-valuenow', jsonData.stats[d].y);
      targetStats.find($('.sr-only')).text(jsonData.stats[d].y + '% Complete');
    });

    $('.graph-vlaue span').text(jsonData.totalWealth);

    chartID.highcharts({
      chart: {
        animation: false,
        type: "pie",
        backgroundColor: null,
        margin: [0, 0, 0, 0]
      },
      title: { text: null },
      plotOptions: {
        pie: {
          dataLabels: { enabled: false },
          size: "100%"
        },
        series: { enableMouseTracking: false }
      },
      series: [{
        animation: {
          duration: 750,
          easing: "easeOutQuad"
        },
        data: jsonData.stats,
        innerSize: "55%"
      }]
    });
  });
}

initChart($('#dashboard-chart'), '../Content/data/totalwealth.json');

// Script for Capture form in modal window -----
$('button[data-next-step="step2"]').on('click touchend', function() {
  let sectionToShow = $(this).data('next-step');

  let showSection = $(this).parents().eq(1).find($('.' + sectionToShow));
  let hideSection = $(this).parents().eq(1).find($('.step1'));

  hideSection.css({ 'transform': 'translate(-110%, 0)' });
  showSection.css({ 'transform': 'translate(0, 0)' });

  $(this).fadeOut(200, function() {
    $(this).text("Add information").fadeIn(300);
  });
  $(this).attr('data-next-step', 'submit');
});

$('#advancedSearch').on('click touchend', function() {
  $('.advanced-search-box').slideToggle();
});

// end script for modal window -----

// Script for List / Grid view of content -----
$('.sortby-form .list-icon').on('click touchend', function(){
  $(this).parents().eq(1).find($('.grid-icon')).parent().removeClass('active');
  $(this).parent().addClass('active');
  $(this).parents().eq(7).find($('.grid-style')).removeClass('grid-style').addClass('list-style');
  
  $(this).parents().eq(7).find($('.list-style')).find('.col-sm-6.col-md-3').each(function() {
    $(this).removeClass('col-sm-6 col-md-3');
    $(this).addClass('col-xs-12');
  });

  $(this).parents().eq(7).find($('.list-style')).find($('.hover-state img[src="images/edit-icon.svg"')).each(function() {
    $(this).attr('src', 'images/edit-icon-white.svg');
  });
  $(this).parents().eq(7).find($('.list-style')).find($('.hover-state img[src="images/delete-icon.svg"')).each(function() {
    $(this).attr('src', 'images/delete-icon-white.svg');
  });

});

$('.sortby-form .grid-icon').on('click touchend', function(){
  $(this).parents().eq(1).find($('.list-icon')).parent().removeClass('active');
  $(this).parent().addClass('active');
  $(this).parents().eq(7).find($('.list-style')).removeClass('list-style').addClass('grid-style');

  $(this).parents().eq(7).find($('.grid-style')).find('.col-xs-12').each(function() {
    $(this).removeClass('col-xs-12');
    $(this).addClass('col-sm-6 col-md-3');
  });

  $(this).parents().eq(7).find($('.grid-style')).find($('.hover-state img[src="images/edit-icon-white.svg"')).each(function() {
    $(this).attr('src', 'images/edit-icon.svg');
  });
  $(this).parents().eq(7).find($('.grid-style')).find($('.hover-state img[src="images/delete-icon-white.svg"')).each(function() {
    $(this).attr('src', 'images/delete-icon.svg');
  });

});
// end of the list / grid view script -----


// -----------
// END SCRIPTS
// -----------