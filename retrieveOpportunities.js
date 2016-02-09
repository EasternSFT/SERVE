// Retrieve the best opportunity based on the user's preferences;
function retrieveOpportunities(time_preference, activity_preference, location_preference,
                           	time_importance, activity_importance, location_importance) {
  // convert string preferences into numeric weights
  var location_weight = importanceWeight(location_importance);
  var time_weight = importanceWeight(time_importance);
  var activity_weight = importanceWeight(activity_importance);
  // retrieve opportunities data;
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Opportunities");
  var data = sheet.getDataRange().getValues();
  Logger.log(data.length);
  var opportunities = [];
  for (var i = 1; data[i][0]; i++) {            	// loop until you hit an empty row
	var location = data[i][3];
	var activity = data[i][5];
	var time = data[i][6];
	if (location_preference == location) {
  	var location_match = 1;
	} else {
  	var location_match = 0;
	}
	if (activity_preference == activity) {
  	var activity_match = 1;
	} else {
  	var activity_match = 0;
	}
	if (time_preference == time) {
  	var time_match = 1;
	} else {
  	var time_match = 0;
	}
	// score each opportunity
	var score = location_match * location_weight + time_match * time_weight + activity_match * activity_weight;   
	var opportunity = {name: data[i][1],
                   	email: data[i][4],
                   	website: data[i][9],
                   	address: data[i][2],
                   	phone: data[i][8],
                   	score: score};
	// save each opportunity to our array of opportunities
	opportunities.push(opportunity);
  }
  // Sort our array of opportunities by their scores
  opportunities.sort(function(a, b) {return b["score"] - a["score"]})
  Logger.log("opportunities");
  Logger.log(opportunities);
  // Find the set of opportunities with the highest score (there may be a tie)
  var best_opportunities = []
  var best_score = opportunities[0].score;
  for (var i=0; i < opportunities.length; i++) {
	if (opportunities[i].score == best_score) {
  	best_opportunities.push(opportunities[i])
	}
  }
  // Randomly select one of the highest scored opportunities
  best_opportunity = best_opportunities[Math.floor(Math.random() * best_opportunities.length)];
  return best_opportunity;
}  


// Convert a string indicating the importance of a factor into a number for use in our scoring algorithm
function importanceWeight(importance) {
  var weight;
  if (importance == "Most important") {
	weight = 3;
  } else if (importance == "Least important") {
	weight = 1;
  } else if (importance == "Important") {
	weight = 2;
  } else {
	weight = 0;
  }
  return weight;
}  
 
