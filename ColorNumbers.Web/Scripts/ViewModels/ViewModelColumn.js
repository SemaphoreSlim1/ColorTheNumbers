/// <reference path="../Frameworks/jQuery/jQuery-2.1.0.js" />
/// <reference path="../Frameworks/Knockout/knockout-3.1.0.js" />
/// <reference path="../ViewModel.js" />
/// <reference path="ColorOption.js" />

function ViewModelColumn(rowIndex, columnIndex) {
    ///<summary>Creates a new ViewModelColumn </summary>
    ///<param name="rowIndex" type="Number">The index of the row on which this column resides</param>
    ///<param name="columnIndex" type="Number">The index of the column on which this column resides</param>
    ///<field name="numberValue" type="Number">The numerical value of this column on the row</field>
    ///<field name="textValue" type="String">The textual value of this column on the row</field>
    ///<field name="colorValue" type="String">The currently selected color value for this column on the row</field>

    this.numberValue = (rowIndex * 10) + columnIndex + 1;
    this.textValue = this.numberValue.toString();
    this.colorValue = ko.observable();

    this.picked = function (sender, e) {

        var hasCurrentlySelectedColor = $(e.target).hasClass(VM.SelectedColor().class);

        ko.utils.arrayForEach(ColorOption.defaultColors(), function (opt) {
            $(e.target).removeClass(opt.class)
        });
        
        $(e.target).removeClass("btn-default");

        if (hasCurrentlySelectedColor)
        { $(e.target).addClass("btn-default"); } //clear it out if we're clicking on it with the same color
        else
        { $(e.target).addClass(VM.SelectedColor().class); } //otherwise, set it to the new color

        VM.ValidateSelection(sender);
    };
}