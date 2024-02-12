$(function () {
  // Function to update the time block classes
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Function to load saved tasks from local storage
  function loadTasks() {
    $(".time-block").each(function() {
      var taskId = $(this).attr("id");
      var savedTask = localStorage.getItem(taskId);
      if (savedTask) {
        $(this).find(".description").val(savedTask);
      }
    });
  }

  // Function to save a task to local storage
  function saveTask(taskId, task) {
    localStorage.setItem(taskId, task);
  }

  // Display the current date
  $("#currentDay").text("Today is: " + dayjs().format("MM-DD-YYYY"));

  // Load saved tasks from local storage
  loadTasks();

  // Set initial time block classes
  updateTimeBlocks();

  // Store task in local storage when save button is clicked
  $(".saveBtn").on("click", function(event) {
    var taskId = $(this).parent().attr("id");
    var task = $(this).siblings(".description").val();
    saveTask(taskId, task);
  });
});