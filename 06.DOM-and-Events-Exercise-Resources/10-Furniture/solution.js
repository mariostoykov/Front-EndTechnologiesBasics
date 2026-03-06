function solve() {
  let tableBody = document.getElementsByTagName("tbody")[0];
  const [input, output] = document.getElementsByTagName("textarea");
  const [generateBtn, buyBtn] = document.getElementsByTagName("button");

  generateBtn.addEventListener('click', generateRows);
  buyBtn.addEventListener('click', buyItems);

  function generateRows() {
    let items = JSON.parse(input.value);

    for (let i = 0; i < items.length; i++) {
      let tableRow = document.createElement("tr");

      // add td for image
      let imageTableData = document.createElement("td");
      let image = document.createElement("img");
      image.src = items[i].img;
      imageTableData.appendChild(image);
      tableRow.appendChild(imageTableData);

      // add td for name
      let nameTableData = document.createElement("td");
      let nameParagraph = document.createElement("p");
      nameParagraph.textContent = items[i].name;
      nameTableData.appendChild(nameParagraph);
      tableRow.appendChild(nameTableData);

      // add td for price
      let priceTableData = document.createElement("td");
      let priceParagraph = document.createElement("p");
      priceParagraph.textContent = items[i].price;
      priceTableData.appendChild(priceParagraph);
      tableRow.appendChild(priceTableData);

      // add td for decoration factor
      let decFactorTableData = document.createElement("td");
      let decFactorParagraph = document.createElement("p");
      decFactorParagraph.textContent = items[i].decFactor;
      decFactorTableData.appendChild(decFactorParagraph);
      tableRow.appendChild(decFactorTableData);

      // add td for mark
      let markTableData = document.createElement("td");
      let markInput = document.createElement("input");
      markInput.type = "checkbox";
      markTableData.appendChild(markInput);
      tableRow.appendChild(markTableData);

      // add tableData(td) to the tableBody(tb)
      tableBody.appendChild(tableRow);
    }
  }

  function buyItems() {
    let furniture = [];
    let price = 0;
    let decorationSum = 0;
    let itemsCount = 0;

    let tableRows = document.getElementsByTagName("tr");

    for (let i = 1; i < tableRows.length; i++) {
      let isMarkChecked = tableRows[i].children[4].children[0].checked;
      
      if (isMarkChecked) {
        furniture.push(tableRows[i].children[1].children[0].textContent);
        price += Number(tableRows[i].children[2].children[0].textContent);
        decorationSum += Number(tableRows[i].children[3].children[0].textContent);
        itemsCount++
      }
    }

    let averageDecoration = decorationSum / itemsCount;

    output.value = `Bought furniture: ${furniture.join(', ')}
    Total price: ${price.toFixed(2)}
    Average decoration factor: ${averageDecoration}`;

  }
}