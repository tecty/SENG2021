$(document).ready(function () {
 
    $('#retrieve-resources').click(function () {
    var displayResources = $('#display-resources');
    
    displayResources.text('Loading data from JSON source...');
    
    $.ajax({
    type: "GET",
    url: "test_output.json",
    dataType: "json",
    success: function()
    {
    console.log(result);
    }
    });
    
    });
   });