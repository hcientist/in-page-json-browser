// assumes element in page with class json-panel

var x = {
  key1: 37,
  key2: [
    {
      someKey: {
        anotherObj: ["whatever", "you want"]
      }
    },
    {
      differentObjWithAKey: 38
    }
  ]
};

function jsonBrowser(jsonObj, startCollapsed) {

  var destination = $('.json-panel');
  if (!destination.length > 0) {
    destination = $('body');
  }

  var results = innerStep(jsonObj, startCollapsed);
  destination.append(results);

  $('dl.json-browser dt').each(function(idx, el){
    var sibs = $(el).nextAll();
    console.log(sibs);
    var defs = [];
    for (var i=0; i<sibs.length; i++) {
      console.log($(sibs[i]).prop("tagName"));
      if ($(sibs[i]).prop("tagName") == "DT") {
        break;
      }
      defs.push($(sibs[i]));
    }
    console.log(el, defs);
    $(el).click(function(){
      $.each(defs, function(ind, ob){
        $(ob).toggle();
      })
    });
  });

  return results;

}

function innerStep(jsonObj, startCollapsed) {

  var output = $('<dl class="json-browser"></dl>');

  for (var k in jsonObj) {
    var term = $('<dt>'+k+'</dt>');
    var innerVal = jsonObj[k];
    if (typeof innerVal == "object" || innerVal.constructor === Array) {
      innerVal = innerStep(innerVal);
      term.addClass('has-children');
      term.css('text-decoration', 'underline');
      output.append(term);
      var dd = $('<dd></dd>');
      if (startCollapsed) {
        dd.css('display', 'none');
      } 
      output.append(dd.append(innerVal));
    } else {
      output.append(term);
      output.append($('<dd>'+innerVal+'</dd>')); //this isn't tail recursion, so maybe your objects are big enough this can cause a problem?
    }
  }

  console.log(output[0]);
  return output;
  
}

var y = jsonBrowser(x, true);