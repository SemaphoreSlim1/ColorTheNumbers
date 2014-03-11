/// <reference path="../Frameworks/BufferedLoader/BufferedLoader.js" />


function HighlightableWord(text) {
    /// <summary>Creates a new highlightable word</summary>
    /// <param name="text" type="String">The text of this word</param>

    var self = this;
    self.TextValue = ko.observable(text);
    self.StyleValue = ko.observable();
    self.Duration = 600;

    this.focus = function () {
        self.StyleValue('focused-text');
    };
    this.loseFocus = function () {
        self.StyleValue('');
    };

    this.play = function () {        
      
        var snd = new Audio('Content/Sound/' + self.TextValue().toString().toLowerCase() + '.m4a');
        snd.play();
    }
}

HighlightableWord.ValidWords = new Array('blue','green','orange','red','one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety','hundred');