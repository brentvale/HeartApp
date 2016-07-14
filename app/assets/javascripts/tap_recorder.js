var ACCURACY_RANGE_LIMIT = 10; //each individual heart rate must be within ACCURACY_RANGE_LIMIT
                               //of the average of the last X number of heart rates
var LAST_X_HEART_RATES = 5;    //number of heart rates summed to calculate a floating average
                               //example: 5 => last 5 chartData points summed to create average

function TapRecorder() {
  //array of raw data Timestamps from when user 'taps' screen
  this.tapsArray = [];
  //array of heart rate objects containing beats per minute and index (for graphing purposes) 
  //calculated as difference between two adjacent items in this.tapsArray
  this.chartData = [];
  //initial dummy data to populate a screen with empty chart before enough data is gathered
  //to plot
  this.initialChartData = [{rate: 50, index: 0, rate: 100, index: 0 }];
  //a heart rate is accurate and a scenario 'ends' when each of the user's last 5 taps are
  //within 10 beats per minute of the average of the last 5 taps
  this.accuracyAchieved = false;
  this.currentAverage = 0;
}

TapRecorder.prototype = {
  //every time the user 'clicks' or 'taps' add date to tapsArray
  addTap: function(tap){
    this.tapsArray.push(tap);
    //there must exist 2 elements in tapsArray to start calculating data points for chartData
    if(this.tapsArray.length > 1){
      this.createNewChartData();
    }
  },
  calcAndSetAverageHeartRate: function(){
    var sum = 0, 
        average = 0;
        
    if(this.chartData.length < LAST_X_HEART_RATES){      
      for(var i = 0; i < this.chartData.length; i++){
        sum += this.chartData[i].rate;
      }
      average = parseInt(sum / this.chartData.length);
    } else {
      //sum last 5 rates from chartData to calculate average
      for(var i=1; i < 6; i++){
        sum += this.chartData[this.chartData.length-i].rate;
      }
      average = parseInt(sum / 5);
    }
    this.currentAverage = average;
    
    return this.currentAverage;
  },
  createNewChartData: function(){
    var endIdx = this.tapsArray.length - 1;
    var penultIdx = this.tapsArray.length - 2;
    
    var timeBetweenBeats = this.tapsArray[endIdx].date - this.tapsArray[penultIdx].date;
    
    var calculatedRate = 60/(timeBetweenBeats/1000);
    var newObj = {rate: calculatedRate, index: this.chartData.length - 1}
    
    this.chartData.push(newObj);
  },
  isAccuracyAchieved: function(){
    if(this.chartData.length < LAST_X_HEART_RATES){
      return false;
    } else {
      //current accuracy range set as +/- 10 beats/min defined by ACCURACY_RANGE_LIMIT above
      var outOfRange = false;
      for(var i=1; i < (LAST_X_HEART_RATES + 1); i++){
        if(Math.abs((this.chartData[this.chartData.length-i].rate)-this.currentAverage) > ACCURACY_RANGE_LIMIT){
          outOfRange = true;
        }
      }
      if(!outOfRange){
        this.accuracyAchieved = true;
        return this.accuracyAchieved;
      }
    }
  },
}