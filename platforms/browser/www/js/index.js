/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	
	listContacts: function() {
	  
        function onSuccess(contacts) {
          alert("Encontrado " + contacts.length + " contatos.");
        }			
		
		function onError(contactError) {
          alert("onError!");
        }
		
		var options = new ContactFindOptions();
		options.multiple = true;
		options.desiredFields = [navigator.contacts.fieldType.id];
		var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
		
		navigator.contacts.find(fields, onSuccess, onError, options);
	},
	
	createContact: function() {
	  
        function onSuccess(contact) {
			alert("Save Success");
		};

		function onError(contactError) {
			alert("Error = " + contactError.code);
		};

		// create a new contact object
		var contact = navigator.contacts.create();
		contact.displayName = "AAA";
		contact.nickname = "Teste PhoneGap";            // specify both to support all devices

		// populate some fields
		var name = new ContactName();
		name.givenName = "BBB";
		name.familyName = "PhoneGap";
		contact.name = name;

		// save to device
		contact.save(onSuccess,onError);

	},
	
	pickContact: function() {
		
	  navigator.contacts.pickContact(function(contact){
			alert('The following contact has been selected:' + JSON.stringify(contact));
		},function(err){
			console.log('Error: ' + err);
		});
	
	}
};

app.initialize();