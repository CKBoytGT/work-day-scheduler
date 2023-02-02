// run this once all the html elements have been rendered
$( document ).ready(function() {

  // when a save button is clicked
  $( ".saveBtn" ).click(function() {
    // get the hour of the whole time block using the id of the parent element
    const time = $(this).parent().attr('id');
    // get the text input from the description field within the same parent as the button clicked
    const text = $(this).siblings(".description").val();

    // store text in local storage under the hour-# id
    localStorage.setItem(time, text);

    // display the "appointment added" message
    $('#apptAdded').removeClass('d-none');

    // hide the message after 2.5 seconds
    setTimeout(function() {
      $('#apptAdded').addClass('d-none');
    }, 2500);
  });

  // for each time block that exists on the page
  $( ".time-block" ).each(function() {
    // get the just the numerical hour of the time block from the id by removing "hour-"
    const blockHour = ($(this).attr('id')).replace("hour-", "");
    // get the current hour in 24 hr time
    const currentHour = dayjs().hour();

    // change the time block's class depending on the current hour
    if (blockHour < currentHour) {
      $(this).addClass("past");
    // use loose equality rather than strict since blockHour is a string
    } else if (blockHour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // for every description field that exists on the page
  $( ".description" ).each(function() {
    // get the hour of the time block using the id of the parent element
    const parentId = $(this).parent().attr('id');

    // display the text that has been stored under the parent's id
    $(this).val(localStorage.getItem(parentId));
  });

  // displays the current date in the header of the page.
  const today = dayjs();
  $("#currentDay").text(today.format('dddd, MMMM D'));

});