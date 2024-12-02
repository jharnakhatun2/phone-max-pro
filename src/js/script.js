// Utility functions
const getId = id => document.getElementById(id);

// Select Elements
const cardContainer = getId('card-container');
const searchInput = getId('search-input');
const messageContainer = getId('message-container');
const loader = getId('loader');
const showAllBtn = getId('show-all-btn');
const phoneDetailModal = getId('card-modal');

// Variable to store fetched data
let fetchedPhones = [];

// Fetch API data
const loadData = async (userText) => {
    loadingSpinner(true);
    messageContainer.textContent = ''; // Clear message on new search
    showAllBtn.classList.add('hidden'); // Hide the button initially

    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${userText}`);
        const data = await response.json();
        fetchedPhones = data.data; // Store fetched data
        displayData(fetchedPhones, false);
    } catch (error) {
        messageContainer.innerHTML = `<p class="text-xl sm:text-3xl text-center text-red-500 font-bold py-10">Something went wrong. Please try again later.</p>`;
        loadingSpinner(false);
    }
}

// Display fetched API data
const displayData = (phones, isShowAll) => {

    // Clear card container
    cardContainer.textContent = '';

    // Handle "No phones found"
    if (!phones || phones.length === 0) {
        messageContainer.innerHTML = `<p class="text-xl sm:text-3xl text-center text-red-500 font-bold py-10">No phones found. Please try a different search term.</p>`;
        showAllBtn.classList.add('hidden');
        loadingSpinner(false);
        return;
    }

    // Determine if "Show All" button should appear
    if (phones.length > 9 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
        phones = phones.slice(0, 9); // Show only first 9 items
    } else {
        showAllBtn.classList.add('hidden'); // Hide button if fewer than 10 items or all items shown
    }

    // Render phone cards
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 w-full md:w-80 lg:w-96 shadow-xl">
                <figure class="px-5 pt-10 ">
                    <img src="${phone.image}" alt="${phone.phone_name}"
                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title font-bold">${phone.phone_name}</h2>
                    <p class="text-gray-500">Offers a stunning ProMotion display, advanced A-series chip, and a powerful triple-camera system</p>
                    <p class="font-bold pb-2">Price : <span>$999</span></p>
                    <div class="card-actions">
                        <button onclick="phone_detail_modal.showModal(); handleShowDetails('${phone.slug}')"
                            class="btn bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-lg px-8 py-3 text-white rounded font-bold">SHOW DETAILS</button>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });

    loadingSpinner(false);
}

// Search function
const handleSearch = () => {
    const inputValue = searchInput.value.trim();
    if (inputValue === '') {
        loadData();
        messageContainer.innerHTML = `<p class="text-xl sm:text-3xl text-center text-red-500 font-bold py-10">Please enter a search term.</p>`;
        return;
    }
    loadData(inputValue);

    searchInput.value = ''; //reset search input field
}

// Loading function
const loadingSpinner = (isLoading) => {
    if (isLoading) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

// "Show All" Button function
const handleShowAll = () => {
    // Display all data without fetching again
    displayData(fetchedPhones, true);
}

//Show Details in modal
const handleShowDetails = async(id) =>{
    try{
      const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
      const data = await response.json();
      const dataDetails = data.data;
      displayDetailsInModal(dataDetails);
    }catch(error){
        console.error(error);
    }
}

//disply show Details data in modal
const displayDetailsInModal = (details) =>{
    phoneDetailModal.textContent = '';
    console.log(details);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class='w-full bg-indigo-100 rounded-2xl py-5'>
                    <img src="${details.image}"
                        alt="" class="mx-auto rounded-2xl">
                        </div>
                    <div class="space-y-2 py-5">
                        <h2 class="font-bold text-2xl"> ${details?.name || 'No name available'}</h2>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a
                            page when looking at its layout.</p>
                        <p><span class="font-bold">Storage :</span> ${details?.mainFeatures?.storage || 'No storage available'}</p>
                        <p><span class="font-bold">Display Size :</span> ${details?.mainFeatures?.displaySize || 'Display no available'}</p>
                        <p><span class="font-bold">Chipset :</span> ${details?.mainFeatures?.chipSet || 'No Chipset available'}</p>
                        <p><span class="font-bold">Memory :</span> ${details?.mainFeatures?.memory || 'No memory available'}</p>
                        <p><span class="font-bold">Slug :</span> ${details?.slug || 'No slug available'}</p>
                        <p><span class="font-bold">Release date :</span> ${details?.releaseDate || 'No release date'}</p>
                        <p><span class="font-bold">Brand :</span> ${details?.brand || 'Brand no available'}</p>
                        <p><span class="font-bold">GPS :</span> ${details?.others?.GPS || 'No GPS available'}</p>
                    </div>
    `;
    phoneDetailModal.appendChild(div);
    phone_detail_modal.showModal();
}

// Initial load
loadData('iphone');
