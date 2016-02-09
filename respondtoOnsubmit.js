function respondToOnSubmit(e) {
  Logger.log('respondToOnSubmit');
  // Get opportunity;
  var time_preference = e.values[1];
  var activity_preference = e.values[2];
  var location_preference = e.values[3];
  var time_importance = e.values[4];
  var activity_importance = e.values[5];
  var location_importance = e.values[6];
  var email = e.values[7];
  var name = e.values[8];
  var opportunity = retrieveOpportunities(time_preference, activity_preference, location_preference,
                                      	time_importance, activity_importance, location_importance);
  var last_row = e.range.getLastRow();
  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetname = sheet.getSheetName();
  if (sheetname === 'Students') {
	var opportunityCell = sheet.getRange(last_row, 24);
	opportunityCell.setValue(opportunity.name);
	Logger.log('opportunity set to ' + opportunity);
	var message = "Hi " + name + ",\n\n" +
  	"Based on your preferences, our matching algorithm indicates that " + opportunity.name + ", located at " + opportunity.address + ", is your ideal volunteer opportunity.  You can learn more by visiting " + opportunity.website + ", or by calling " + opportunity.phone + ".  You can also e-mail " + opportunity.email + " or respond directly to this email.\n\n" +
    	"Happy Volunteering,\n\n" +
      	"SERVE\n" +
        	"Students @ Eastern Recommending Volunteer Opportunities\n" +
          	"http://easternsft.wix.com/serve" ;
	var subject = name + "'s Community Service Match";
	MailApp.sendEmail(email, subject, message, {name: 'SERVE', replyTo: opportunity.email});
  }
}



