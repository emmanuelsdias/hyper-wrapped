export function getDays() {
  var days = [];
  for (var i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
}

export function getEveryOtherDay(n) {
  var everyOtherDays = [];
  for (var i = 1; i <= 31; i++) {
    if (i % n == 0)
      everyOtherDays.push(i);
    else
      everyOtherDays.push('');
  }
  return everyOtherDays;
}

export function nth(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

export function getMonthsNames() {
  return [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September',
    'October', 
    'November', 
    'December'
  ];
}

export function getMonthsInitials() {
  return  ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
}

