function solve() {
  let input = document.getElementById('text').value.toLowerCase();
  let currentCase = document.getElementById('naming-convention').value;
  let result = document.getElementById('result');

  let splited = input.split(' ');
  let string = '';

  if (currentCase == 'Camel case') {
    string += splited[0];
    for (let i = 1; i < splited.length; i++) {
      string += splited[i][0].toUpperCase() + splited[i].slice(1, splited[i].length);
    }

  } else if (currentCase == 'Pascal case') {
      for (let i = 0; i < splited.length; i++) {
        string += splited[i][0].toUpperCase() + splited[i].slice(1, splited[i].length);
    }
  } else {
    output = 'Error!';
  }

  result.textContent = string;
}