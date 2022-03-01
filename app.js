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
            <figure class="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="${phone.image}" alt="" width="384" height="512">
                <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <figcaption class="font-medium">
                        <div class="text-sky-500 dark:text-sky-400">
                            ${phone.brand}
                        </div>
                        <div class="text-sky-500 dark:text-sky-400">
                            ${phone.phone_name}
                        </div>
                        <button type="button" class="btn-trigger py-3 px-5 bg-slate-200 text-green-800 text-lg font-bold" onclick="loadMore('${phone.slug}')">Explore</button>
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
    const body = document.body;
    const div = document.createElement('div');
    div.classList.add('phone-details');
    div.innerHTML = `
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    body.appendChild(div);

    console.log(phoneData.image);
}

