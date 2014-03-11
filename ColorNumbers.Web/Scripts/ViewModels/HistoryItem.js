/// <reference path="../Frameworks/Knockout/knockout-3.1.0.js" />


function HistoryItem() {
    var self = this;

    self.InstructedColor = ko.observable();
    self.InstructedNumber = ko.observable();

    self.SelectedColor = ko.observable();
    self.SelectedNumber = ko.observable();

    self.Status = ko.computed(function () {
        if (self.InstructedColor() == null || self.InstructedNumber() == null || self.SelectedColor() == null || self.SelectedNumber() == null)
        { return ""; }
        
        var colorsMatch = self.InstructedColor().textValue == self.SelectedColor().textValue;
        var numbersMatch = self.InstructedNumber() == self.SelectedNumber();

        if (colorsMatch && numbersMatch)
        { return "success"; }
        if((colorsMatch && numbersMatch == false) || (colorsMatch == false && numbersMatch))
        { return "warning"; }
        else
        { return "danger";}        
    });

    self.GlyphIcon = ko.computed(function () {

        var icon = "glyphicon ";
        switch (self.Status()) {
            case "success": icon += "glyphicon-ok";
                break;
            case "warning": icon += "glyphicon-warning-sign";
                break;
            case "danger": icon += "glyphicon-remove";
                break;
            default: icon += "glyphicon-minus";
                break;
        }

        return icon;
    });
}