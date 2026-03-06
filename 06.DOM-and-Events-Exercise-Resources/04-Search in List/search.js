function search() {
   let listItems = document.querySelectorAll('#towns li')
   let input = document.querySelector('input').value;
   let result = document.getElementById('result');

   let matches = 0;

   for (let li of listItems) {
      if ((li.textContent).toLowerCase().includes(input.toLowerCase())) {
         li.style.fontWeight = 'bold';
         li.style.textDecoration = 'underline';
         matches++;
      } else {
         li.style.fontWeight = '';
         li.style.textDecoration = '';
      }
   }
   result.textContent = `${matches} matches found`
}
