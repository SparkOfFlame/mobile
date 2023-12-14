import { Http, Label, NavigatedData, Page, TextField } from '@nativescript/core'


export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  var btn= page.getViewById("sex")
  btn.on("tap",function(){
    var pole : TextField =page.getViewById("name")
    var name= pole.text;
    Http.getJSON("https://api.genderize.io?name="+name).then(
    (result) => {
      var label1 : Label = page.getViewById("result1")
      var label2 : Label = page.getViewById("result2")
      label1.text="Пол:" + result.gender
      label2.text="Вероятность:"+ (result.probability).toString()
    },
    (e) => {
      alert(e)
    }
  )
  })

  
}
