// Initialize Spaces
function initSpaces(){
	
	// Define Global Var state
	state = {};
		
	// Base URL for Density.IO API
	state.api_url = 'https://sandbox.density.io/v1/'

	// Density.IO API Settings
	state.api_settings = {
		"async": true,
		"crossDomain": true,
		"url": "",
		"method": "",
		"headers": {
			'Authorization': '[INSERT AUTHORIZATION TOKEN]'
		}
	}

	// Defined Spaces { Density.IO ID : {Element ID, type} }
	state.spaces = {			
		'6tBpvOgoA4kEgIH8WMHN4B': {'e_id': 'ws1-2204', 's_type': 'office'},
		'2oScPLc0d89SLmUHsg67tg': {'e_id': 'ws1-2221', 's_type': 'office'},
		'5pey0FaXhiiPrc9hx9j96i': {'e_id': 'ws1-2223', 's_type': 'conference'},
		'4ysJnu86WxcJG84v6a4Hvt': {'e_id': 'ws1-2224', 's_type': 'queit_room'},
		'2SZCtq6Kw8R9b5e30AQqh4': {'e_id': 'ws1-2203', 's_type': 'conference'},
		'6jxvjJS6pgJXVvOLDM8zn9': {'e_id': 'ws1-2226', 's_type': 'flex'},
		'1EvRIPuVgmoxrN4lJo3ez9': {'e_id': 'ws1-2205', 's_type': 'conference'},
		'1RlFisqosu8KslgxJDtrl1': {'e_id': 'ws1-2211-2212-2213', 's_type': 'conference'},
		'1cvsmXssvhjR5dytUHzTyS': {'e_id': 'ws1-2216', 's_type': 'office'},
		'5CHhOnGyYZocortAiYYufH': {'e_id': 'ws1-2209', 's_type': 'conference'},
		'3lmRvZG9p8yv0R5ZuUisMv': {'e_id': 'ws1-2202', 's_type': 'conference'},
		'3EMz5f5HHOXpYCspdOr086': {'e_id': 'ws1-2217', 's_type': 'office'},
		'2FYJOPWOiilPWINgooOCyT': {'e_id': 'ws1-2207', 's_type': 'office'}
	}
	
	// Define Sensors { Element ID : {Density.IO ID} }
	state.sensors = {
		's-ws1-2211-2212-2213-1': {'id': '4m5QAXh9MFcBdAkPAkZJdn'},
		's-ws1-2211-2212-2213-2': {'id': '1cC2BN2gnRkChSL6guGnK5'},
		's-ws1-2205': {'id': '1IOXzPcXUkGlxRn8goq0h9'},
		's-ws1-2204-1': {'id': '47Vmm9wP9MoYraGX8aRguN'},
		's-ws1-2204-2': {'id': '3VDg2S0Ft67pg8YWG5W4ii'},
		's-ws1-2207': {'id': '7M2HOTVUcMGCAenmR7roF2'},
		's-ws1-2203': {'id': '7sgYmXsGsfO95zn2cvulky'},
		's-ws1-2202': {'id': '48Kv85IauKrsrLAT9nYDdU'},
		's-ws1-2209': {'id': '7pOGv6wwA49C5bDPaIS6kD'},
		's-ws1-2216': {'id': '1HSYF0uOza9BBROnEDfGeL'},
		's-ws1-2217': {'id': '2rQJGIedpSjHlYDairsNTD'},
		's-ws1-2221': {'id': '1kw987BOkK6ML78u7XQGxB'},
		's-ws1-2223': {'id': '3v1n05OXuePSoXZxBlP7G7'},
		's-ws1-2224': {'id': 'qoN9mbBAtSoEa5SoTNDnl'},
		's-ws1-2226': {'id': 'sjA0EGX6FgO2KNqgswUvR'}
	};

}

// Get Spaces status from Density.IO
function getSpacesDIO(responseFunction){
	
	// GLOBAL VAR: state
	
	$('#action').text('Getting Spaces from density.io...')
	var settings = state.api_settings;
	settings['url'] = state.api_url + 'spaces/';
	settings['method'] = 'GET'

	// AJAX GET to Density.IO
	$.ajax(settings).done(function (response) {
		//console.log(response);
		state.response = response;
		if(isFunction(responseFunction)){
			responseFunction(response.results)
		}
		$('#action').text('')
	});
	
}

// Get Doorways status from Density.IO
function getDoorwaysDIO(){
	
	// GLOBAL VAR: state
	
	$('#action').text('Getting Doorways from density.io...')
	var settings = state.api_settings;
	settings['url'] = state.api_url + 'doorways/';
	settings['method'] = 'GET'
	
	// AJAX GET to Density.IO
	$.ajax(settings).done(function (response) {
		//console.log(response);
		state.response = response;
		
		$('#action').text('')
	});
}

// Simulate Sensor Event (by Direction) to Density.IO
function postSimulatedEventDIO(sensor_id, direction){
	
	// GLOBAL VAR: state
	
	$('#action').text('Simulated event with density.io...')
	var settings = state.api_settings;
	settings['url'] = state.api_url + 'events/';
	settings['method'] = 'POST'
	settings['data'] = {
		'sensor_id': sensor_id,
		'direction': direction
	}
	
	// AJAX GET to Density.IO
	$.ajax(settings).done(function (response) {
		//console.log(response);
		state.response = response;
		
		$('#action').text('')
	});
}

// Check Space status by Element ID and current count (assume room specification)
function checkSpaceStatus(e_id, current_count){
	
	// GLOBAL VAR: state
			
	var space_status = -1
		
	var capacity_count = state.room_specs[e_id]['capacity']['count'];
	var capacity_type = state.room_specs[e_id]['capacity']['type'];
	
	// SPACE_STATUS
	// -1 : UNKNOWN
	// 0 : FREE
	// 1 : BUSY
	// 2 : SHARED

	if(capacity_type == 0){ // BINARY AVAILABLE/OCCUPIED
		if(current_count <= 0){
			space_status = 0	
		}else{
			space_status = 1	
		}
	}else if(capacity_type == 1){ // SHARING
		if(current_count <= 0){
			space_status = 0
		}else if(current_count > 0 & current_count <= capacity_count){
			space_status = 2
		}else if(current_count == capacity_count){
			space_status = 1
		}
	}
	
	return space_status
}

// Check function
function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

// Check string vs array
function isInArray(s,your_array) {
    for (var i = 0; i < your_array.length; i++) {
        if (your_array[i].toLowerCase() === s.toLowerCase()) return true;
    }
    return false;
}