
/// <reference path="Frameworks/SoundJs/soundjs-0.5.2.min.js" />


/// <reference path="Frameworks/jQuery/jQuery-2.1.0.js" />
/// <reference path="Frameworks/Knockout/knockout-3.1.0.js" />
/// <reference path="Frameworks/jsLinq/linq.min.js" />
/// <reference path="Frameworks/HashTable/HashTable.js" />

/// <reference path="ViewModels/ColorOption.js" />
/// <reference path="ViewModels/HighlightableWord.js" />
/// <reference path="ViewModels/Prompt.js" />
/// <reference path="ViewModels/ViewModelRow.js" />
/// <reference path="ViewModels/ViewModelColumn.js" />
/// <reference path="ViewModels/HistoryItem.js" />

function ViewModel() {

    var self = this;

    function RemoveSelectorGlow() {
        $("#btn-selector-blue").removeClass("glow-blue");
        $("#btn-selector-green").removeClass("glow-green");
        $("#btn-selector-orange").removeClass("glow-orange");
        $("#btn-selector-red").removeClass("glow-red");
    }

    self.ColorSelected = function (color) {
        RemoveSelectorGlow();
        $("#btn-selector-" + color).addClass("glow-" + color);

        var selColor = Enumerable.From(ColorOption.defaultColors()).Where(function (colorOption) { return colorOption.textValue == color }).First();
        self.SelectedColor(selColor);
    }

    self.SelectedColor = ko.observable();
    self.Prompt = ko.observable(Prompt.generateEmpty());

    self.ShowStart = ko.observable(true);
    self.Start = function () {
        self.ShowStart(false);
        Prompt.Seed();
        self.Prompt(Prompt.generate());
        self.Prompt().animatePrompt();
    }

    self.Refresh = function (sender) {
        RemoveSelectorGlow();
        self.SelectedColor(null);
        self.History([]);
        ResetRows();

        self.Start();
    }

    self.History = ko.observableArray();
    self.CanPlayAudio = ko.observable(false);

    self.ValidateSelection = function (selection) {
        /// <summary>Validates the selection</summary>
        /// <param name="selection" type="ViewModelColumn">the selection made by the user</param>

        var historyItem = new HistoryItem();
        historyItem.InstructedColor(self.Prompt().TargetColor);
        historyItem.InstructedNumber(self.Prompt().TargetNumber);
        historyItem.SelectedColor(VM.SelectedColor());
        historyItem.SelectedNumber(selection.numberValue);

        self.History.push(historyItem);

        var newPrompt = Prompt.generate();
        self.Prompt(newPrompt);
        newPrompt.animatePrompt();
    };

    function ResetRows() {

        self.Rows([]);

        //make the rows and columns for selecting  
        //make ten rows
        for (var i = 0; i < 10; i++) {
            self.Rows.push(new ViewModelRow(i));
        }
    }

    self.Rows = ko.observableArray();
    ResetRows();
};

var VM = new ViewModel();

$(document).ready(function () {

    ko.applyBindings(VM);

    if (createjs.Sound.initializeDefaultPlugins()) {
        var supportedWords = new Array('color', 'blue', 'green', 'orange', 'red', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred');
        var audioPath = "Content/Sound/";

        var manifest = Enumerable.From(supportedWords).Select(function (word) { return { id: word, src: word + ".m4a" }; }).ToArray();
        createjs.Sound.addEventListener("fileload", function (event) { VM.CanPlayAudio(true); });
        createjs.Sound.registerManifest(manifest, audioPath);
    }

});