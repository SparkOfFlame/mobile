
import { fromObject } from '@nativescript/core'
import {ApplicationSettings} from '@nativescript/core'
import { Observable } from '@nativescript/core'


export function onNavigatingTo(args) 
{
  var page = args.object;
  
  var viewModel = new Observable();
  viewModel.set("message", "");
  page.getViewById("inp").on('blur',function(){

   
   if (viewModel.get("message").length>0){

    if (viewModel.get("message").length>0){
    
      ApplicationSettings.setString(createnewtask(),viewModel.get("message"));
      viewModel.set("message","")
     }
   }
  })

  page.bindingContext = viewModel;
}

function createnewtask(){
    var max=0;
    var keys=ApplicationSettings.getAllKeys();
    for (let index = 0; index < keys.length; index++) {
      if (keys[index].indexOf("task") >= 0){
        var temp=keys[index].split("task")[1]
        if (max<temp){
          max=temp
        }
      }
    }
    max+=1;
    return "task"+max;

    page.bindingContext = args.viewModel
  }