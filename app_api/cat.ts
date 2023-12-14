import { View, ItemEventData, NavigatedData, Page, Http, Label } from '@nativescript/core'


export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  getcatfackt(page)
  

}


function getcatfackt(page :Page){

  Http.getJSON("https://catfact.ninja/fact").then(
    (result) => {
      var label : Label = page.getViewById("cat")
      label.text=result.fact
    },
    (e) => {
      console.log(e)
    }
  )
}

