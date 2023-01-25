 let books;
 async function renderBooks(filter){
   const bookwrapper = document.querySelector(".books");
   bookwrapper.classList += ' books__loading';

   if(!books){
    books = await getBooks();
   }
   
   bookwrapper.classList.remove('books__loading');

   if(filter === "LOW_TO_HIGH"){
    books.sort((a,b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
   }else if(filter === "HIGH_TO_LOW"){
    books.sort((a,b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
   }else if(filter === "RATING"){
    books.sort((a,b) => b.rating - a.rating);
   }

   function ratingsHtml(rating){
    let ratingHtml = '';
    for(let i = 0; i < Math.floor(rating); i++){
     ratingHtml += ' <i class="fas fa-star"></i>\n';
    }
    if(!Number.isInteger(rating)){
     ratingHtml += '<i class="fas fa-star-half-alt"></i>\n';
    }
    return ratingHtml;
   }

   const bookHtml = books.map((book) => {
    return `<div class="book">
                <figure class="book__image--wrapper">
                    <img class="book__img" src="${book.url}" alt="" >
                </figure>
                <div class="book__title">
                ${book.title}
                </div>
                <div class="book__ratings">
                    ${ratingsHtml(book.rating)}
                </div>
                <div class="book__price">
                    ${priceHtml(book.originalPrice, book.salePrice)}
                </div>
            </div>`
    }).join("");
    
   bookwrapper.innerHTML = bookHtml;
   
}
// setTimeout prevent early load of js before html in this case
setTimeout(() =>{
    renderBooks();
})
   
function priceHtml(originalPrice,salePrice){
    console.log(originalPrice,salePrice)
    if(!salePrice){
        return `$${originalPrice.toFixed(2)}`;
    }else{
        return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span>$${salePrice.toFixed(2)}`;
    }
}

function fiterBook(event){
    renderBooks(event.target.value);
}


//FAKE DATA
function getBooks(){
    return new Promise((resolve =>{
        setTimeout(() =>{
            resolve(
                [
                    { 
                        id:1,
                        title:"Steve jobs",
                        url:"assets/1.jpg",
                        originalPrice:49.50,
                        salePrice:45,
                        rating:4.6
                    },
                    
                    { 
                        id:2,
                        title:"Google guys",
                        url:"assets/googleguys.jpg",
                        originalPrice:457,
                        salePrice:null,
                        rating:2.9
                    },
                    
                    { 
                        id:3,
                        title:"Bill gates",
                        url:"assets/3.jpg",
                        originalPrice:99.50,
                        salePrice:67,
                        rating:4.1
                    },
                    { 
                        id:4,
                        title:"ThinklikeZuck",
                        url:"assets/thinklikezuck.jpg",
                        originalPrice:1000,
                        salePrice:890.34,
                        rating:3.9
                    },
                    { 
                        id:5,
                        title:"Nikola Tesla",
                        url:"assets/5.jpg",
                        originalPrice:99.50,
                        salePrice:45.90,
                        rating:5
                    },
                    { 
                        id:6,
                        title:"Dr A.P.J Kalam",
                        url:"assets/6.jpg",
                        originalPrice:100.50,
                        salePrice:76.90,
                        rating:4.2
                    },
                    { 
                        id:7,
                        title:"Mahatma Gandhi",
                        url:"assets/7.jpg",
                        originalPrice:100.50,
                        salePrice:null,
                        rating:3.6
                    },
                    { 
                        id:8,
                        title:"Narendra Modi",
                        url:"assets/8.jpg",
                        originalPrice:100.50,
                        salePrice:null,
                        rating:3.6
                    },
                    { 
                        id:9,
                        title:"You Can Win",
                        url:"assets/book.jpg",
                        originalPrice:100.50,
                        salePrice:40.20,
                        rating:5
                    },
                    { 
                        id:10,
                        title:"Elon Musk",
                        url:"assets/elonmusk.jpg",
                        originalPrice:300.50,
                        salePrice:157,
                        rating:4.1
                    },
                    { 
                        id:11,
                        title:"Styanadela",
                        url:"assets/2.jpg",
                        originalPrice:69.50,
                        salePrice:15,
                        rating:4.4
                    },
                    { 
                        id:12,
                        title:"Stephen hawking",
                        url:"assets/4.jpg",
                        originalPrice:67.50,
                        salePrice:32.90,
                        rating:4
                    }
                    
                ]
            )
        },1000)
    }))   
}