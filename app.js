const searchPhone = () => {
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    // fetch url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);    
    fetch(url)
    .then(res => res.json())
    .then(data => getData(data));
}


const getData = name => {
    const phones = name.data.slice(0,20);
    const phoneDiv = document.getElementById('phones');
    // buddyElement.innerHTML = name[0].name;
    if (phones.length > 0) {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('phone');
            div.innerHTML = `
            <figure class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
                <img class="w-24 h-24 md:w-40 md:h-auto md:rounded-none rounded-full mx-auto" src="${phone.image}" alt="" width="384" height="512">
                <div class="pt-6 md:p-8 md:pb-0 text-center md:text-left space-y-4">
                    <figcaption class="font-medium text-center">
                        <div class="text-zinc-900 dark:text-sky-400 text-3xl font-bold">
                            ${phone.phone_name}
                        </div>
                        <div class="text-zinc-600 dark:text-sky-400 text-2xl font-bold">
                            ${phone.brand}
                        </div>
                        <button type="button" onclick="loadMore('${phone.slug}')" class="text-white text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-3 text-center mt-5 mr-2 mb-2">Explore</button>   
                    </figcaption>
                </div>
            </figure>
            `;
            phoneDiv.appendChild(div);
            // console.log(phone);
        });
    } else {
        phoneDiv.innerHTML = `
        <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4">
                <div class="text-2xl text-sky-500 dark:text-sky-400">
                    No results found
                </div>
            </div>
        </div>
        `;
    }
}

const loadMore = name => {
    const url = `https://openapi.programming-hero.com/api/phone/${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => phoneDetails(data));
    // console.log(url); 
}

const phoneDetails = details => {
    const phoneData = details.data;
    const sensors = phoneData.mainFeatures.sensors;
    const keys = phoneData.others ? Object.entries(phoneData.others) : [];
    const releaseDate = phoneData.releaseDate ? phoneData.releaseDate : '';

    
    const modelDetails = document.getElementById('phone-details');
    modelDetails.innerHTML = `
    <div class="container mx-auto px-4 lg:px-0">
        <div class="flex flex-wrap -mx-4">
            <div class="w-full md:w-1/2 px-4">
                <div class="relative">
                    <img class="w-full" src="${phoneData.image}" alt="">
                    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                </div>
            </div>
            <div class="w-full md:w-1/2 px-4">
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full px-4">
                        <div class="text-2xl text-sky-500 dark:text-sky-400">
                            ${phoneData.name}
                        </div>
                        <div class="text-lg text-sky-500 dark:text-sky-400">
                            ${phoneData.brand}
                        </div>
                        <div class="text-lg text-sky-500 dark:text-sky-400">
                            ${phoneData.slug}
                        </div>
                        <div class="text-lg text-sky-500 dark:text-sky-400">
                            ${phoneData.mainFeatures.storage}
                        </div>
                        <div class="text-lg text-sky-500 dark:text-sky-400">
                            ${releaseDate}
                        </div>
                        <div class="text-lg text-sky-500 dark:text-sky-400">
                            <ul>
                                ${sensors.map(sensor => `<li>${sensor}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="text-lg text-sky-500 dark:text-sky-400">
                            <ul>
                                ${keys.map((value) => `<li>${value[0]} : ${value[1]}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    // body.appendChild(div);

    console.log(releaseDate);
}

