function convertToRoman(num) {
  var numeric_values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var roman_numerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  var answer = "";
  
  for(var i = 0; i < numeric_values.length; i++) {
     while(numeric_values[i] <= num) {
         answer += roman_numerals[i];
         num -= numeric_values[i];
     }
 }
 
 return answer;
}
