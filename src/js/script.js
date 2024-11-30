const cardContainer = document.getElementById('card-container');
//fetch API data
const loadData = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await response.json();
    const phoneData = data.data;
    displayData(phoneData);
}

const displayData = (phones) =>{
    phones.forEach( phone =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 w-full md:w-80 lg:w-96 shadow-xl">
                <figure class="px-5 pt-10 ">
                    <img src="${phone.image}" alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title font-bold">${phone.phone_name}</h2>
                    <p class="text-gray-500">Offers a stunning ProMotion display, advanced A-series chip, and a powerful triple-camera system</p>
                    <p class="font-bold pb-2">Price : <span>$999</span></p>
                    <div class="card-actions">
                        <button
                            class="btn bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg px-8 py-3 text-white rounded font-bold ">SHOW
                            DETAILS</button>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(div);
})
}

const handleSearch = () =>{
    console.log("Search");
}
loadData()