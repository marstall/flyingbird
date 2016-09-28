
getGradientColor = function(start_color, end_color, percent) {
  var start = new ColorMix.Color(start_color)
  var end = new ColorMix.Color(end_color)
  console.log("before percent:"+percent)
  percent = percent*100
  first_percent = 100-percent
  second_percent = percent
  console.log("percent/first/second percent:"+percent+"/"+first_percent+"/"+second_percent)
  return ColorMix.mix([start,end],[first_percent,second_percent])
 };

functions_json = {"functions":[
  {"start":0,"end":24,"function":"skyfade"},
  {"start":13.5,"end":14,"function":"fade2"}
]}

function skyfade(ft)
{
  console.log("skyfade with time:"+ft)  
  colortimes = sky_json["sky"]
  for (var i=colortimes.length-2;i>=0;--i) {
    colortime = colortimes[i]
    next_colortime = colortimes[i+1]
    start_time = colortime[0]
    end_time = next_colortime[0]
    if (ft>start_time) {
      start_color=colortime[1]
      end_color= next_colortime[1]
      console.log("start_time/end_time/current_time:"+start_time+"/"+end_time+"/"+ft)
      ratio = (ft-start_time)/(end_time-start_time)
      console.log(start_time+":"+end_time+":"+ratio)
      color = getGradientColor(start_color,end_color,ratio)
      console.log("origin/target/current color:"+start_color+"/"+end_color+"/"+color)
      $("#sky").css("background-color",color)
      break;
    }
  }
   
}

function fade2()
{
  console.log("fade2")  
}

function fraction_time()
{
  d = new Date()
  h = d.getHours()
  s = ((d.getMinutes()*60)+d.getSeconds()+1.0)/3600.0
  return h+s
}

function tick()
{
  ft = fraction_time()
  console.log("tick:"+ ft)
  ranges = functions_json["functions"]
  for (var i=0;i<ranges.length;++i) {
    range = ranges[i]
    if (ft>= range["start"] && ft< range["end"]) {
      eval(range["function"]+"("+ft+")")
    }
  }
}
setInterval(tick,1000)

// setting up some functions to use
function hide(id) {
  $("#"+id).hide()
}

function fadeIn(id,duration) {
  $("#"+id).fadeIn(duration)
}

function fadeOut(id,duration) {
  $("#"+id).fadeOut(duration)
}