var place = 0;
var currentInput = 0;
var calculatorDecimal = false;
var prevType = 'default';
var calculatorInput = [];

function calculator(value) {
  //Combine Numbers
  if (typeof value === 'number' || value === '.') {
    switch (prevType) {
      case 'number':
        currentInput = parseFloat(currentInput.toString() + value);
        break;
      case 'float':
        currentInput = parseFloat(currentInput.toString() + '.' + value);
        break;
      default:
        currentInput = value;
        break;
    }
    if (value === '.') {
      prevType = 'float';
      $('#float').addClass('disabled');
    } else {
      prevType = 'number';
    }
    $('#currentInput').val(currentInput)
  } else {
    $('#float').removeClass('disabled');
    switch (value) {
      case 'AC':
        calculatorInput = [0];
        currentInput = 0;
        prevType = 'clear';
        $('#currentInput').val(currentInput)
        break;
      case 'CE':
        currentInput = 0;
        prevType = 'operator';
        $('#currentInput').val(currentInput)
        break;
      case '=':
        calculatorInput.push(currentInput)
        currentInput = calculate(calculatorInput);
        prevType = 'equals';
        break;
      default:
        calculatorInput.push(currentInput)
        calculatorInput.push(value);
        prevType = 'operator';
        $('#currentInput').val(currentInput)
        currentInput = 0;
        break;
    }

  }
}

function calculate(input) {
  for (i = 0; i < input.length; i++) {
    if (input[i] === '%') {
      input[i - 1] = input[i - 1] / 100
      input.splice(i, 2)
    }
  }
  for (i = input.length; i > 0; i--) {
    input = input.reverse();
    if (input[i] === '^') {
      input[i - 1] = Math.pow(input[i + 1], input[i - 1])
      input.splice(i, 2)
    }

    input = input.reverse();
  }
  for (i = 0; i < input.length; i++) {
    if (input[i] === 'x') {
      input[i - 1] = input[i - 1] * input[i + 1]
      input.splice(i, 2)
    } else if (input[i] === '/') {
      input[i - 1] = input[i - 1] / input[i + 1]
      input.splice(i, 2)
    }
  }

  for (i = 0; i < input.length; i++) {
    if (input[i] === '+') {
      input[i - 1] = input[i - 1] + input[i + 1]
      input.splice(i, 2)
    } else if (input[i] === '-') {
      input[i - 1] = input[i - 1] - input[i + 1]
      input.splice(i, 2)
    }
  }
  $('#currentInput').val(input[input.length - 1]);
  currentInput = 0;
  return input[input.length - 1];
}