/// <reference path="../Frameworks/Knockout/knockout-3.1.0.js" />
/// <reference path="ViewModelColumn.js" />


function ViewModelRow(rowIndex) {
    
    var cols = [];
    for (var i = 0; i < 10; i++) {
        cols.push(new ViewModelColumn(rowIndex, i));
    }

    this.Columns = ko.observableArray(cols);
};