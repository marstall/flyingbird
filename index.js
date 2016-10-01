
getGradientColor = function(start_color, end_color, percent) {
  var start = new ColorMix.Color(start_color)
  var end = new ColorMix.Color(end_color)
//  console.log("before percent:"+percent)
  percent = percent*100
  first_percent = 100-percent
  second_percent = percent
//  console.log("percent/first/second percent:"+percent+"/"+first_percent+"/"+second_percent)
  return ColorMix.mix([start,end],[first_percent,second_percent])
 };


function skyfade(fTime,percent_progress,argument)
{
  colortimes = sky_json["sky"]
  for (var i=colortimes.length-2;i>=0;--i) {
    colortime = colortimes[i]
    next_colortime = colortimes[i+1]
    start_time = colortime[0]
    end_time = next_colortime[0]
    if (fTime>start_time) {
      start_color=colortime[1]
      end_color= next_colortime[1]
//      console.log("start_time/end_time/current_time:"+start_time+"/"+end_time+"/"+fTime)
      ratio = (fTime-start_time)/(end_time-start_time)
      color = getGradientColor(start_color,end_color,ratio)
      console.log("skyfade from "+start_color+" to"+end_color+", currently at"+color)
      $("#sky").css("background-color",color)
      break;
    }
  }
   
}

function animateCSS(fTime,percent_progress,argument)
{
  argument = JSON.parse(argument)
  selectors = argument["selectors"]
  transition = argument["transition"]
  property = transition[0]
  start_value = transition[1]
  end_value = transition[2]
  current_value = start_value + ((end_value-start_value)*percent_progress)
  for (i=0;i<selectors.length;++i) {
    selector = selectors[i]
    console.log("animateCSS is animating "+selector+"'s "+property+". Going from "+start_value+" to "+end_value+", currently at "+current_value)
    $(selector).css(property,""+current_value)
  }
}

function time_as_float()
{
  d = new Date()
  h = d.getHours()
  s = ((d.getMinutes()*60)+d.getSeconds()+1.0)/3600.0
  return h+s
}

function tick()
{
  fTime = time_as_float()
//  console.log("tick:"+ fTime)
  ranges = functions_json["functions"]
  for (var i=0;i<ranges.length;++i) {
    range = ranges[i]
    if (fTime>= range["start"] && fTime< range["end"]) {
      percent_progress = (fTime-range["start"])/(range["end"]-range["start"])
      argument = JSON.stringify(range["argument"])
      eval(range["function"]+"("+fTime+","+percent_progress+",'"+argument+"')")
    }
  }
}
setInterval(tick,1000)

