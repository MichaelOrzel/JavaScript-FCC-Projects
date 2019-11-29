function rot13(str) {
  return (str
      .split("")
      .map(letter => {
        var code = letter.charCodeAt(0);

        if(code > 90 || code < 65) { // Outside of ASCII code range
          return String.fromCharCode(code);
        } else if(code < 78) { // Lower half ASCII code
          return String.fromCharCode(code + 13);
        }

        return String.fromCharCode(code - 13); // Upper half ASCII code
      })
      .join(""));
}
