/// <reference path="../ViewModel.js" />
/// <reference path="../Frameworks/SoundJs/soundjs-0.5.2.min.js" />


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
      
        if (VM.CanPlayAudio() == false)
        { return; }

        createjs.Sound.play(self.TextValue().toLowerCase());
    }
}