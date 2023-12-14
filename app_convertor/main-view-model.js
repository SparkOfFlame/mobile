export function tolng(args) {
  alert("adasd")
  const view = args.view
  const page = view.page

  page.frame.navigate({
    moduleName: 'convert-length',
    context: tappedItem,
    animated: true,
    transition: {
      name: 'slide',
      duration: 200,
      curve: 'ease',
    },
  })
}

