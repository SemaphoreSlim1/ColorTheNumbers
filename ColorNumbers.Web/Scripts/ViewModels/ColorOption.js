function ColorOption(text, value) {
    /// <summary>Creates a new ColorOption object </summary>
    /// <param name="text" type="String">The text of this color option</param>
    /// <param name="value" type="String">The value and css class name that will be used to identify this color option</param>
    this.textValue = text;
    this.class = value;
}

ColorOption.defaultColors = function () {
    var colors = [];
    colors.push(new ColorOption('red', 'btn-danger'));
    colors.push(new ColorOption('green', 'btn-success'));
    colors.push(new ColorOption('blue', 'btn-primary'));
    colors.push(new ColorOption('orange', 'btn-warning'));

    return colors;
}
