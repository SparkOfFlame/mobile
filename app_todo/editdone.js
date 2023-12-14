import {ApplicationSettings} from '@nativescript/core'
var timer

export function onNavigatingTo(args) 
{

  const page = args.object
  
  var textwiev = page.getViewById("inp")
  textwiev.on('textChange',function(){
    try{
      clearTimeout(timer);
    }
    catch{

    }
    var a=page.bindingContext.key
    var b=page.bindingContext.description
    timer= setTimeout(onchange,5000,a,b)
   
})
  page.bindingContext = args.context
}
  
  export function onchange(a,b){
    ApplicationSettings.setString(a,b);

  }

  export function onBackButtonTap(args) {
    const view = args.object
    const page = view.page
    ApplicationSettings.setString(page.bindingContext.key,page.bindingContext.description);
    page.frame.goBack()
  }

  export function deletetask(args){
    const view = args.object
    const page = view.page
    try{
      clearTimeout(timer);
    }
    catch{

    }
    ApplicationSettings.remove(page.bindingContext.key);
    page.frame.goBack()
  }

  export function completetask(args){
    try{
      clearTimeout(timer);
    }
    catch{

    }
    const view = args.object
    const page = view.page
    var a=page.bindingContext.key
    var b=page.bindingContext.description
    a="task" + a.split("done")[1]
    ApplicationSettings.remove(page.bindingContext.key);
    ApplicationSettings.setString(a,b)
    page.frame.goBack()
  }