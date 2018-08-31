function connectToDB() {
  // Connect to database
  var conn = indexedDB.open('test-db', 5);
  console.log('conn');

  // Listen for success and bind save button and load data
  conn.addEventListener('success', function(evt) {
    console.log('connected event', evt)
    var db = evt.target.result;
    console.log(db);

  });

  // Listen for error event and show the error
  conn.addEventListener('error', function(evt) {
    console.log('error connecting', evt.target.error);
  });

  // Listen for the uppgradeneeded event
  // Create an object store to track people
  // use keyPath to store the ID value
  conn.addEventListener('upgradeneeded',function(evt) {
    console.log('upgrade needed', evt)
     var db = evt.target.result;
    console.log(db);

  });
}

console.log('reload');
document.addEventListener('DOMContentLoaded', connectToDB);
