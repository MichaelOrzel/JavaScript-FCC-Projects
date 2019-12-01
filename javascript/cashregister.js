var denominator_value = [
  { name: "ONE HUNDRED", val: 100.0 },
  { name: "TWENTY", val: 20.0 },
  { name: "TEN", val: 10.0 },
  { name: "FIVE", val: 5.0 },
  { name: "ONE", val: 1.0 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 }
];

function checkCashRegister(price, cash, cid) {
  var change = cash - price;
  var output = { status: null, change: [] };
  // Create register drawer object from cid (Add 'total' money value)
  var register = cid.reduce(
    function(acc, curr) {
      acc.total += curr[1];
      acc[curr[0]] = curr[1];
      return acc;
    },
    { total: 0 }
  )

  // Not enough money in register
  if(register.total < change) { 
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }

  // Exact amount of money in register
  if(register.total === change) { 
    output.status = "CLOSED";
    output.change = cid;
    return output;
  }

  // Enough money in register, loop through denomination array to create change array
  var change_arr = denominator_value.reduce(function(acc, curr) {
    var value = 0;

    // While money of this type is still in the drawer, and
    // Denominator (money value) is smaller than change amount
    while(register[curr.name] > 0 && curr.val <= change) {
      change -= curr.val;
      register[curr.name] -= curr.val;
      value += curr.val;

      // Round change, handles percision errors
      change = Math.round(change * 100) / 100;
    }

    // Add money from denomination if it was used
    if(value > 0) {
      acc.push([curr.name, value]);
    }

    return acc; // Return current change array
  }, []);

  // If we have leftover change, or
  // If there are no elements in change_arr
  if(change > 0 || change_arr.length < 1) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }

  // Change available and given to customer
  output.status = "OPEN";
  output.change = change_arr;
  return output;
}
