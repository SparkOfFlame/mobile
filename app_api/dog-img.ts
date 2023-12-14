import { NavigatedData, Page,Http, PageBase, ImageSource, Image } from '@nativescript/core'


export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  var btn= page.getViewById("refresh")
  btn.on("tap",function(){
    getdogimage(page)
  })
  getdogimage(page)
}




function getdogimage(page :Page){

  var img :Image= page.getViewById("img")
  Http.getJSON("https://dog.ceo/api/breeds/image/random").then(
    (result) => {

        Http.getImage(result.message).then(
        (res: ImageSource) => {
          img.src=res;
        },
        (e) => {
          console.log(e)
        }
      )
    },
    (e) => {
      alert(e)
    }
  )

  

}
