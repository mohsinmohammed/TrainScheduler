
//  Initialize Firebase


  var firebaseConfig = {
    apiKey: "AIzaSyD3aeuVh2ypSpoYrIW38JoxgL4ZJnhL3h8",
    authDomain: "bootcamp-29ed7.firebaseapp.com",
    databaseURL: "https://bootcamp-29ed7.firebaseio.com",
    projectId: "bootcamp-29ed7",
    storageBucket: "bootcamp-29ed7.appspot.com"
  };
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();




  setInterval(showClock, 1000);

  function showClock(){
    $('.current-time').text("Time: "+ moment().format('H:mm:ss'));
  }
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Get user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    // Create train object for holding train info
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    };
  
    // Uploads train information to the database
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clearing all text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // Create Firebase event for adding train to the database
  database.ref().on("child_added", function(childSnapshot) {
    // Store train object attributes to varibles .
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
  
    // Prettify the employee start
    var convertedFirstTrainTime = moment(firstTrainTime, 'HH:mm').format("X");
    var currentTime = moment().format("X");

    console.log("convertedFirst: " + convertedFirstTrainTime);
    console.log("currentTime: " + currentTime);

    var diff, moduloDiff, minutesAway, nextArrival;
    if(currentTime > convertedFirstTrainTime)
    {
      diff = currentTime - convertedFirstTrainTime;
      moduloDiff = diff % (frequency * 60);
      minutesAway = Math.round(frequency - (moduloDiff/60));
      nextArrival =  moment(moment().add(minutesAway, 'minutes')).format('H:mm');
    }
      
    else
    {
      diff = convertedFirstTrainTime - currentTime;
      moduloDiff = diff % (frequency * 60);
      minutesAway = Math.round(moduloDiff/60);
      nextArrival =  moment(moment().add(minutesAway, 'minutes')).format('H:mm');
    }

    var nextTrainCalc = currentTime + (minutesAway * 60);

    console.log("minutes away: " + minutesAway);
    console.log("next Arrival: " + nextArrival);
  
  
    // Create the new row
    var row = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#trains-table > tbody").append(row);
    
  });
  
 
  