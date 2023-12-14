import { Observable } from '@nativescript/core'

export function onNavigatingTo(args) {

    var page = args.object;
    var label=page.getViewById("answer")
    var viewModel = new Observable();
    viewModel.set("primer", "");
    viewModel.set("err",false)
    viewModel.set("pow","X^y")
    viewModel.set("firstcharecter",true)
    viewModel.set("ischaracter",true)


    viewModel.tapbutn = function (args) {
        if (viewModel.get("err"))
        {
            viewModel.set("primer","")
            viewModel.set("err",false)
        }
        var character = args.object.text;
        var currentDisplay = viewModel.get("primer");

        if (currentDisplay.length >10 && label.style.fontSize >20){
            label.style.fontSize=label.style.fontSize-2;
        }
        else
        {
            if(currentDisplay.length == 0){
                viewModel.set("firstcharecter",true)
            }
            else
            {
                viewModel.set("firstcharecter",false)
            }
        }
        if (!isNaN(character))
        {
            viewModel.set("primer", currentDisplay + character);
            viewModel.set("ischaracter",true)
        }
        else
        {

            if ((viewModel.get("ischaracter") || viewModel.get("firstcharecter") ) && !(viewModel.get("firstcharecter") && (character == "/" || character == "*")))
            {
                if(viewModel.get("pow") == "^Y"){
                    viewModel.set("pow","X^y")
                }
                viewModel.set("ischaracter",false)
                viewModel.set("primer", currentDisplay + character);  
            }   
        }
    };

    viewModel.calculate = function (args){
        var primer = viewModel.get("primer");
        try{
            while (true){
                var pow=primer.indexOf("^")
                if (pow != -1)
                {
                    var f = 0;
                    var f1=primer.length
                    var ins=false;
                    for (let index = 0;primer.length-1 > index; index++) {
                        var ch=primer[index]
                        if (ch == "+" || ch == "-" || ch == "/" || ch =="*" || (ch=="^" && index !=pow)){
                            if(ins){
                                f1=index
                                break;
                            }
                            else{
                                f=index+1;
                            }
                            
                        }
                        if (ch=="^" && !ins)
                        {
                            
                            ins=true
                        }
                       
                    } 
                    primer=primer.replace("^",",")
                    primer=primer.slice(0,f1)+")"+primer.slice(f1)
                    primer=primer.slice(0,f)+"Math.pow("+primer.slice(f)
                    
                }
                else{
                    break;
                }
                    

                
            } 
            let ans=0;
            eval("ans=parseFloat("+primer+")");
            viewModel.set("primer", isNaN(ans) ? "Ошибка ввода" : ans);
            if (isFinite(ans) || isNaN(ans)){
                viewModel.set("err",true)
            }
        }
        catch(error)
        {
            viewModel.set("primer", "Ошибка ввода");
            viewModel.set("err",true)

        }
        
    }

    viewModel.deletecharecter = function (args){
        if (viewModel.get("err"))
        {
            viewModel.set("primer","")
            viewModel.set("err",false)
        }
        var currentDisplay = viewModel.get("primer");
        if (currentDisplay.length >10 && label.style.fontSize <50){
            label.style.fontSize=label.style.fontSize+2;
        }
        var todelete=currentDisplay.slice(-2)[0]
        if (isNaN(todelete)){
            viewModel.set("ischaracter",false)
            if (todelete == "^"){
                viewModel.set("pow","X^y")
            }
        }
        else{
            viewModel.set("ischaracter",true)
        }
        viewModel.set("primer", currentDisplay.slice(0,-1));
        
    }
    
    viewModel.deleteall = function (args){
        viewModel.set("primer", "");
        viewModel.set("ischaracter",true)
        label.style.fontSize=50;
    }

    viewModel.inpow = function(args){
        if (viewModel.get("ischaracter"))
        {
            viewModel.set("ischaracter",false)
            viewModel.set("pow","^Y")
            viewModel.set("primer", viewModel.get("primer")+"^")
        }
    }
    page.bindingContext = viewModel;
}
