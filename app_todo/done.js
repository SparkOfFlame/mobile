import { fromObject } from '@nativescript/core'
import {ApplicationSettings} from '@nativescript/core'


export function onNavigatingTo(args) {

  const component = args.object
  var viewModel = fromObject({items: [],})
  var keys=ApplicationSettings.getAllKeys();
  try{
    for (let index = 0; index < keys.length; index++) {
      if (keys[index].indexOf("done") >= 0){
        var text= ApplicationSettings.getString(keys[index]);
        if (text.length<1){
            ApplicationSettings.remove(keys[index])
        }
        else{
            viewModel.items.push({key: keys[index], description: text ,})
        }
      }
      
    }
    upd(component)
        
    
  }
    catch {
      alert(err)
    }
  component.bindingContext = viewModel
}

export function Edit(args) {
  const view = args.view
  const page = view.page
  var mark = view.bindingContext

  page.frame.navigate({
    moduleName: 'editdone',
    context: mark,
    animated: true,
    transition: {
      name: 'slide',
      duration: 200,
      curve: 'ease',
    },
  })
}

function upd(component){
  setTimeout(function() {
    var keys=ApplicationSettings.getAllKeys();
    var viewModel = fromObject({items: [],})
    for (let index = 0; index < keys.length; index++) {
      if (keys[index].indexOf("done") >= 0){
        var text= ApplicationSettings.getString(keys[index]);
        if (text.length<1){
            ApplicationSettings.remove(keys[index])
        }
        else{
            viewModel.items.push({key: keys[index], description: text ,})
        }
      }
    }
    component.bindingContext = viewModel
    upd(component)
  }, 5000);
}