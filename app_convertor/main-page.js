import { Observable } from '@nativescript/core'
export function onNavigatingTo(args) {

    var page = args.object;
    var viewModel = new Observable();
    viewModel.tolng = function (args) {
        page.frame.navigate('convert-length')
    }
    viewModel.mem = function (args) {
        page.frame.navigate('convert-memory')
    }
    viewModel.mon = function (args) {
        page.frame.navigate('convert-money')
    }
    viewModel.vl = function (args) {
        page.frame.navigate('convert-volume')
    }
    viewModel.sq = function (args) {
        page.frame.navigate('convert-square')
    }

    page.bindingContext = viewModel;
}