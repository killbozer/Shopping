document.addEventListener('DOMContentLoaded', function() {
	
	var db = undefined;

	function saveData() {
		var btnInput = document.getElementById('save');
		var itmInput = document.getElementById('item');
		
		btnInput.addEventListener('click', function(evt) {
			evt.preventDefault();
			console.log('clicked');
			
			var transaction = db.transaction('items', 'readwrite');
			console.log('transaction', transaction);
			var store = transaction.objectStore('items');
			
			var data = store.add({name: itmInput.value});
			data.addEventListener('success', function(evt) {
				console.log('success', evt.target.result);
			});
			data.addEventListener('error', function(err) {
				console.log(err);
			});
		});
	}




	function connectToDB() {
	  // Connect to database
	  var conn = indexedDB.open('test-db', 5);
	  console.log('conn');

	  // Listen for success and bind save button and load data
	  conn.addEventListener('success', function(evt) {
		console.log('connected event', evt)
		db = evt.target.result;
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
		
		var objectStore = db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
		console.log(objectStore);
		objectStore.createIndex('name', 'item', {unique: false});
		objectStore.transaction.addEventListener('complete', function(evt) {
		 console.log('Store created');
		});

	  });
	}

	console.log('reload');
	
	document.getElementById('save').addEventListener('click', saveData);
	
	connectToDB();
	
});