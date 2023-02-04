// All input Variables
let title = document.getElementById("title")
let omar = document.getElementById("omar")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let tbl1 = document.getElementById("tbl1")
let count = document.getElementById("count")
let category = document.getElementById("category")
let search = document.getElementById("search");
let currUpdateBtn;
let searchedItem = "title";
let tbody = document.getElementById("tbody");


// Check for Product List in Local Storage
let prodList = [];
if (localStorage.getItem("products")){
    prodList = JSON.parse(localStorage.getItem("products"))
    console.log("found local storage");
}else {
    console.log("no local storage found");
}

// Calculate Total Price
function getTotalPrice(){
    if (price.value != "") {
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.backgroundColor = "rgb(56, 146, 56)"
    }else {
        total.style.backgroundColor = "rgb(75, 5, 5)";
        total.innerHTML = ""
    }
}






// Create Product
function createProd(c) {
    if(c == ""){
        c = 1;
    }
    for (let i = 0; i < c; i++) {
        let thisProd = {
            title:title.value,
            omar:omar.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            tbl1:tbl1.innerHTML,
            category:category.value
        }
        prodList.push(thisProd);
        saveProd();
    }
    clearInput();
    showData();
    getTotalPrice();
}









// Save Data in LocalStorage
function saveProd(){
localStorage.setItem("products", JSON.stringify(prodList));
console.log("done!");
}




// Clear Inputs after creating a product
function clearInput(){
title.value = "";
omar.value = "";
price.value = "";
taxes.value = "";
ads.value = "";
discount.value = "";
total.innerHTML = "";
tbl1.innerHTML = "";
count.value = "";
category.value = "";
}



// Read and Show Data In Table (output)
function showData() {
    let table = ``;
    for (let i = 0; i < prodList.length; i++) {
        table +=`           <tr>
                        <td>${i+1}</td>
                        <td>${prodList[i].title}</td>
                        <td>${prodList[i].omar}</td>
                        <td>${prodList[i].price}</td>
                        <td>${prodList[i].taxes}</td>
                        <td>${prodList[i].ads}</td>
                        <td>${prodList[i].discount}</td>
                        <td>${prodList[i].total}</td>
                        <td>${prodList[i].category}</td>
                        <td><input onclick="updateProd(${i})" type="button" value="Update"></td>
                        <td><input onclick="deleteProd(${i})" type="button" value="Delete"></td>
                    </tr>`
        
    }
    tbody.innerHTML = table;
    
    let deleteAllBtn = document.getElementById("deleteAll");
    if (prodList.length < 1) {
        deleteAllBtn.style.display = "none";
    }else {deleteAllBtn.style.display = "block";
    deleteAllBtn.setAttribute("value",`Delete All ( ${prodList.length} )`)
}
}








// Delete a product
function deleteProd(i) {
    prodList.splice(i,1);
    localStorage.products = JSON.stringify(prodList);
    showData();
}


// Submit button ( Create Or Update)
function submit(counter){
    if (title.value != "" && price.value !="" && category.value != ""){
    let btnValue = document.getElementById("create").getAttribute("value")
    console.log(btnValue)
    if ( btnValue == "Create") {
        createProd(counter);
    }else if (btnValue == "Update") {
        submitUpdate(currUpdateBtn);
    }
}
}




// Update a product
function updateProd(i) {
    currUpdateBtn = i;
    title.value = prodList[i].title;
    omar.value = prodList[i].omar;
    price.value = prodList[i].price;
    taxes.value = prodList[i].taxes;
    ads.value = prodList[i].ads;
    discount.value = prodList[i].discount;
    total.innerHTML = prodList[i].total;
    category.value = prodList[i].category;
    document.getElementById("create").setAttribute("value","Update");
    document.getElementById("count").setAttribute("disabled","true");
    getTotalPrice();
    scroll({
        top: 0,
        behavior: "smooth"
    })

}
function submitUpdate(i){ 
    prodList[i].title = title.value;
    prodList[i].omar = omar.value;
    prodList[i].price = price.value;
    prodList[i].taxes = taxes.value;
    prodList[i].ads = ads.value;
    prodList[i].discount = discount.value;
    prodList[i].total = total.innerHTML;
    prodList[i].category = category.value;
    localStorage.products = JSON.stringify(prodList);
    showData();
    document.getElementById("create").setAttribute("value","Create");
    clearInput();
    document.getElementById("count").setAttribute("disabled","false");
    getTotalPrice();
}






// Delete All
function deleteAll() {
    prodList = [];
    localStorage.products = JSON.stringify(prodList);
    showData();
    document.getElementById("create").setAttribute("value","Create");
}


// Search
function searchName(id=searchedItem){
    searchedItem = id;
    let table = ``;
    search.setAttribute("placeholder",`Search by ${id}`)
    for (let i = 0; i < prodList.length; i++) {
        if(prodList[i][id].toLowerCase().includes(search.value.toLowerCase())){
        
        table +=`           <tr>
                        <td>${i+1}</td>
                        <td>${prodList[i].title}</td>
                        <td>${prodList[i].omar}</td>
                        <td>${prodList[i].price}</td>
                        <td>${prodList[i].taxes}</td>
                        <td>${prodList[i].ads}</td>
                        <td>${prodList[i].discount}</td>
                        <td>${prodList[i].total}</td>
                        <td>${prodList[i].category}</td>
                        <td><input onclick="updateProd(${i})" type="button" value="Update"></td>
                        <td><input onclick="deleteProd(${i})" type="button" value="Delete"></td>
                    </tr>`
        
    
    

        }else{
                console.log("false");
            }
}
tbody.innerHTML = table;
}





showData();