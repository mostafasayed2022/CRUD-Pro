let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood='create';
let tmp;

function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#ee1b0b";
  }
}

let datapro;
if (localStorage.product != null) {
  // ارجعها ل اصلها
datapro = JSON.parse(localStorage.product);
} else {
datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.value,
    count: count.value,
    category: category.value,
};

if(title.value !=''&& price.value!=''&&taxes.value!=''&&ads.value!=''
&&discount.value!=''&&category.value!=''&&newpro.count<100)
{
    if(mood==='create'){
if(newpro.count > 1){
for(let i=0;i<newpro.count;i++)
{
    datapro.push(newpro);
}
}
else{
    datapro.push(newpro);
}
}
else{
datapro[tmp]=newpro;
mood='create';
submit.innerHTML='create';
count.style.display='block';
}

clearData();

}

localStorage.setItem("product", JSON.stringify(datapro));
showData();
};
// clearData
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// read

function showData() {
    gettotal()
  let table = '';
  for (let i = 0; i < datapro.length; i++) 
  {
    table += `
    <tr>
<td>${i}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>
`
}
document.getElementById("tbody").innerHTML = table;
// delete all
let btndelete=document.getElementById('deleteAll');
if(datapro.length > 0){
    btndelete.innerHTML=`
    <button onclick="deleteAll()"> delete All(${datapro.length})</button>
    `
}
else{
    btndelete.innerHTML='';
}
}

showData();

// delate product
function deleteData(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showData();
}


function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData()
}

// update
function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    // count.value=datapro[i].count;
    gettotal();
    count.style.display='none';
    category.value=datapro[i].category;
    submit.innerHTML='update';
    mood='update'
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
    total.style.background = "#ee1b0b";
    
}

// search
let searchmood='title';
function getSearchMode(id){
    let search=document.getElementById('search')
if(id=='searchTitle')
{
    searchmood='title';
    search.placeholder='search By Title';
}
else{
    searchmood='category';
    search.placeholder='search By Category';
}
search.focus();
search.value='';
showData();
}

function searchData(value){
    let table='';
    for(let i=0;i<datapro.length;i++){
    if(searchmood=='title')
    {
            if(datapro[i].title.toLowerCase().includes(value.toLowerCase()))
            {
                table += `
                <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
            }
    }
    else{
            if(datapro[i].category.toLowerCase().includes(value.toLowerCase()))
            {
                table += `
                <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
            }
    }
}
    document.getElementById("tbody").innerHTML = table;

}