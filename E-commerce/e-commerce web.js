        let filterby = document.getElementById("filterby");
        let sortby = document.getElementById("sortby");
        let mens = document.querySelector(".mens-clothing");
        let womens = document.querySelector(".womens-clothing");
        let jewelery = document.querySelector(".jewelery");
        let electronics = document.querySelector(".electronics");
        let h2 = document.querySelectorAll("h2");
        let div = document.querySelectorAll(".div");
        let nav = document.querySelector("nav");

        const URL = 'https://fakestoreapi.com/products';

        async function fetchData(url) {
            const fet = await fetch(url);
            const finalData = await fet.json()
            return finalData;
        }

        function makecard(finaldata) {
            mens.innerHTML = "";
            womens.innerHTML = "";
            jewelery.innerHTML = "";
            electronics.innerHTML = "";

            for (const items of finaldata) {
                const makecard = `<div class="cards">
                                <div class="card">
                                    <img src="${items.image}" alt="">
                                    <title>${items.title}</title>
                                    <div class="card-body">
                                        <span>ratting: ${items.rating.rate}</span>
                                        <span> (${items.rating.count})</span>
                                        <p>price: ${items.price}$</p>
                                    </div>
                                </div>
                            </div>`;

                if (items.category === "men's clothing") {
                    mens.innerHTML += makecard;
                }
                if (items.category === "women's clothing") {
                    womens.innerHTML += makecard;
                }
                if (items.category === "electronics") {
                    electronics.innerHTML += makecard;
                }
                if (items.category === "jewelery") {
                    jewelery.innerHTML += makecard;
                }
            }
        }

        async function init() {
            const data = await fetchData(URL)
            makecard(data);

        }
        init()

        sortby.addEventListener("change", async () => {
            const data = await fetchData(URL);
            let sortedList;
            if (sortby.value === "low-to-high") {
                sortedList = data.sort((a, b) => a.price - b.price);
            } 
            console.log(sortby.value)
            if (sortby.value === "high-to-low") {
                sortedList = data.sort((a, b) => b.price - a.price);
            }
            // console.log(sortedList)
            makecard(sortedList);
        });

        filterby.addEventListener("change", async () => {
            const data = await fetchData(URL);
            const filteredList = data.filter(item => {
                let final = item.category === filterby.value;
                
                for (let heading of h2) {
                    if(heading.innerText !== filterby.value){
                        heading.style.display = "none";
                    }else{
                        heading.style.display = "inline-block";
                    }
                }
                
                return final;
            });
            makecard(filteredList);
        });
