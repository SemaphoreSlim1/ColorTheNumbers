/// <reference path="../Frameworks/jsLinq/linq.min.js" />
/// <reference path="../Frameworks/Knockout/knockout-3.1.0.js" />

/// <reference path="ColorOption.js" />
/// <reference path="HighlightableWord.js" />


function Prompt(words, color, num) {
    /// <summary>Generates a new prompt object</summary>
    /// <param name="words" type="Array" elementType="HighlightableWord">the words used to build the textual prompt</param>
    /// <param name="color" type="ColorOption">the color the user should select</param>
    /// <param name="num" type="int">the number the user should select</param>

    this.Words = ko.observableArray(words);
    this.TargetColor = color;
    this.TargetNumber = num;

    this.animatePrompt = function () {

        var totalDuration = 0;

        for (var i = 0; i < this.Words().length; i++) {
            var word = this.Words()[i];
            setTimeout(word.focus, totalDuration);
            setTimeout(word.play, totalDuration);
            setTimeout(word.loseFocus, totalDuration + word.Duration);
            totalDuration = totalDuration + word.Duration;
        }
    };
}

Prompt.generateEmpty = function () {
    var words = [];
    var color = ColorOption.defaultColors()[0];
    var number = 0;

    return new Prompt(words, color, 0);
}

Prompt.TargetNumbers = [];
Prompt.TargetColors = [];

Prompt.Seed = function () {
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var targetNumbers = [];
    for (var i = 0; i < 100; i++) {
        targetNumbers.push(i+1);
    }

    Prompt.TargetNumbers = shuffle(targetNumbers);

    var defaultColors = ColorOption.defaultColors();
    var targetColors = [];

    ko.utils.arrayForEach(ColorOption.defaultColors(), function (opt) {
        for (var i = 0; i < 25; i++) {
            targetColors.push(opt)
        }
    });

    Prompt.TargetColors = shuffle(targetColors);
}

Prompt.generate = function () {

    function numberToWord(num) {
        ///<summary>Converts numbers 1 to 999 to words</summary>
        ///<param name="num">The number to convert to a word</param>

        var ones = new Array('', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen');
        var tens = new Array('', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety');
        var hundred = 'hundred';
        var output = '';
        var numString = num.toString();

        if (num == 0) {
            return 'zero';
        }

        //the case of 10, 11, 12 ,13, .... 19 
        if (num < 20) {
            output = ones[num];
            return output.trim();
        }

        //100 and more
        if (numString.length == 3) {
            output = ones[parseInt(numString.charAt(0))] + ' ' + hundred + ' ';
            output += tens[parseInt(numString.charAt(1))] + ' ';
            output += ones[parseInt(numString.charAt(2))];
            return output.trim();
        }

        output += tens[parseInt(numString.charAt(0))];
        output += ' ';
        output += ones[parseInt(numString.charAt(1))];

        return output.trim();
    }

    //get the target number, and convert it to a word
    var targetNum = Prompt.TargetNumbers[0];
    Prompt.TargetNumbers = Prompt.TargetNumbers.slice(1);
    var targetWord = numberToWord(targetNum);

    //get the target color, and extract it
    var targetColor = Prompt.TargetColors[0];
    Prompt.TargetColors = Prompt.TargetColors.slice(1);

    var words = [];
    words.push('Color');
    words = words.concat(targetWord.split(' '));
    words.push(targetColor.textValue);

    words = Enumerable.From(words).Select(function (w) { return new HighlightableWord(w); }).ToArray();

    return new Prompt(words, targetColor, targetNum);
};