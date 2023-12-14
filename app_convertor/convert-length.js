import { Observable } from '@nativescript/core'

export function onNavigatingTo(args) {

    var page = args.object;
    const items = [`Сантиметр`, `Метр`, `Километр`]
    const depends=[1,100,1000]
    var itemIn=page.getViewById("iIn").on('selectedIndexChange', function(){
        setTimeout(function() {
            viewModel.set("ValueOut",dothe(viewModel,depends))
          }, 500);
    })
    var itemOut=page.getViewById("iOut").on('selectedIndexChange',function(){
        setTimeout(function() {
            viewModel.set("ValueOut",dothe(viewModel,depends))
          }, 500);
    })

    var valueOut=page.getViewById("cOut")
    
    var viewModel = new Observable();
    viewModel.set("items", items);
    viewModel.set("itIn",0)
    viewModel.set("itOut",1)
    viewModel.set("ValueIn","")
    viewModel.set("ValueOut","")

    viewModel.tapbutn = function (args) {
        var character = args.object.text;
        var character = args.object.text;
        var currentDisplay = viewModel.get("ValueIn");
        viewModel.set("ValueIn",currentDisplay+character)
        viewModel.set("ValueOut",dothe(viewModel,depends))
    }
    viewModel.makepoint = function (args) {
        var iIn =viewModel.get("ValueIn")
        if (iIn.indexOf(".") == -1 && iIn.length >0){
            viewModel.set("ValueIn", iIn+".")
        }
    }

    viewModel.chagemetric = function(args){
        viewModel.set("ValueOut",dothe(viewModel,depends))
    }
    viewModel.delchar = function (args){
        var currentDisplay = viewModel.get("ValueIn");
        viewModel.set("ValueIn", currentDisplay.slice(0,-1));
        viewModel.set("ValueOut",dothe(viewModel,depends))
    }
    page.bindingContext = viewModel;
}

function dothe(viewModel,depends)
{
    var currentDisplay = viewModel.get("ValueIn");
    var iIn =viewModel.get("itIn")
    var iOut = viewModel.get("itOut")
    var ans=viewModel.get("ValueIn");
    if (iIn<iOut){
        for (let index = iIn+1; index <= iOut; index++) {
            ans=parseFloat(ans/depends[index])
        }
    }
    else
    {
        if (iIn>iOut)
        {
            for (let index = iOut+1; index<=iIn; index++) 
            {
                ans=parseFloat(ans*depends[index])
                console.log(depends[index])
            }
        }
        else{
            viewModel.set("ValueOut",viewModel.get("ValueIn"))
        }
        
    }
    return ans
}   