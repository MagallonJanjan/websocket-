
$(document).ready(function(){
  //Defining a variable for time
  var timeStamp = new Date();
  var time = timeStamp.toDateString();
  var panahon = timeStamp.getHours() + ":" + timeStamp.getMinutes() + ":" + timeStamp.getSeconds();

//  Function use to connect to the broker 
$('#connect_btn').click(function(){
    console.log("Connecting to " + document.getElementById('broker_input').value);
    var client = mqtt.connect(document.getElementById('broker_input').value)
   
    
    client.on('connect', function(){
       $('#display-status').val("Successfully Connected!");
      console.log("Successfully connected to " + document.getElementById('broker_input').value);
    })
  
  //Function for Publishing
  $('#publish-button').click(function(){
    var topic= $("#publish-input").val();
    var payLoad = $("#publish-input-payload").val();
    var row = "<tr><td>"+ topic +"</td><td>"+ payLoad+"</td><td>" + time + " " +  panahon +  "</td></tr>";
    console.log("You are Publishing to  { topic: " + topic + "; payload: " + payLoad + " }");
    $("#tbl-body-pub").append(row);
    client.publish(topic,payLoad);
    
  })
 
  //Function for Subscribing
  $('#subscribe-button').click(function(){
        var subTopic = $('#subscribe-input').val();
        var roW = "<tr><td>" + subTopic + "</td><td>"  + time + " " + panahon +  "</td></tr>";
        console.log("You are subscribing to { topic: " + subTopic);
        $('#tbl-body-sub').append(roW);
        client.subscribe(subTopic);
      })

      //Receiving message
      client.on("message", function (topic, payLoad) {
        var topic= $("#publish-input").val();
        var payLoad = $("#publish-input-payload").val();
        var row = "<tr><td>"+ topic +"</td><td>"+ payLoad+"</td><td>" + time + " " +  panahon +  "</td></tr>";
        $("#tbl-body").append(row);
      })
   
   })

})

 
   