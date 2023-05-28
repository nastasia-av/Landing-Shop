const categories = 
["Верх", 
"Платья и костюмы", 
"Низ"]
const num_cat = categories.length;

const arr_cat = [[]];
arr_cat[0] = Array(10)
arr_cat[0].fill("Футболка", 0, 10);

arr_cat[1] = Array(11)
arr_cat[1].fill("Платье", 0, 11);

arr_cat[2] = Array(12)
arr_cat[2].fill("Юбка", 0, 12);

const navbar = document.getElementById("navbar");
let navPos = navbar.getBoundingClientRect().top;
const nav_logo = document.getElementById("nav_logo");
const logo = document.getElementById("logo");
const up_button = document.getElementById("up_button");
const sticky = navbar.offsetTop;

window.addEventListener("scroll", e => {
    let scrollPos = window.scrollY;
    if (scrollPos > navPos) {
      navbar.classList.add('sticky');
      nav_logo.classList.add("nav_logo_sticky")
      logo.classList.add("logo_hidden")
      up_button.classList.add("up_button_sticky")
    } else {
      navbar.classList.remove('sticky');
      nav_logo.classList.remove("nav_logo_sticky")
      logo.classList.remove("logo_hidden")
      up_button.classList.remove("up_button_sticky")
    }
});

const cat_list = categories.map((item) => `<li><a href = "#c${categories.indexOf(item)}">${item}</a></li>`).join('');
document.querySelector("#cat_list").innerHTML = cat_list;
document.querySelector("#footer_cat_list").innerHTML = cat_list;

const cat_names = categories.map((item) => `<h2 class="category_name"><a id = "c${categories.indexOf(item)}">${item}</a></h2><div class="cards" id="cards${categories.indexOf(item)}"></div>`).join('');
document.querySelector("#main").innerHTML = cat_names;


const all_dates = []
const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
function getDayInfo(target){
    let year = target.getFullYear()
    let month = target.getMonth()
    let date = target.getDate()
    let day = target.getDay()
    let week = Math.floor(date/7 + 1);
    all_dates.push(days[day] + ', ' + week + ' неделя ' + months[month]+ ' ' + year + ' года')
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let arr_cat_length = 0;
for(i=0; i< num_cat; i++){
    arr_cat_length += arr_cat[i].length;
}

for(i = 0; i < arr_cat_length; i++) {
    getDayInfo(randomDate(new Date(2012, 0, 1), new Date()));
}

const dates = [[]];
let last_slice = 0;
for(i = 0; i < num_cat; i++){
    dates[i] = all_dates.slice(last_slice, arr_cat[i].length+last_slice)
    last_slice = arr_cat[i].length+last_slice;
}

const cards = [[]];
for(i = 0; i < num_cat; i++){
    cards[i] = arr_cat[i].map((item, index) => `<div class="card" id="${i}-${index}"><div class="product_img"><img src="/img/cards_${i+1}/pic.png"></div><div class="product_list"><p class="product_name">${item}</p><p class="product_date">Добавлено: ${dates[i][index]}</p><button class="product_buy" id="show_modal">Купить</button></div></div>`).join('');
    document.querySelector(`#cards${i}`).innerHTML = cards[i];
}

document.addEventListener('DOMContentLoaded', () => {
    let modal1 = document.getElementById('modal-1');
    let closeButton = modal1.getElementsByClassName('modal_close-button')[0];
    let html = document.documentElement;

    Array.from(document.querySelectorAll(".product_buy"), function(el) {
        el.onclick = function(e) {
            e.preventDefault();
            modal1.classList.add('modal_active');
            html.classList.add('hidden');
            let title = el.parentElement.getElementsByClassName("product_name");
            document.querySelector("#modal_title").innerHTML = title.item(0).textContent;
        }
    })
    closeButton.onclick = function(e) {
        e.preventDefault();
        modal1.classList.remove('modal_active');
        html.classList.remove('hidden');
    }
});

let btn = document.getElementById("theme-button");
let link = document.getElementById("theme-link");

btn.addEventListener("change", function () { ChangeTheme(); });

function ChangeTheme()
{
    let lightTheme = "./css/light.css";
    let darkTheme = "./css/dark.css";

    let currTheme = link.getAttribute("href");
    let theme = "";
    const image = document.getElementById("up_image");

    if(btn.getElementsByTagName("input")[0].checked) {
   	    currTheme = darkTheme;
   	    theme = "dark";
        image.setAttribute("src","./img/up_dark.png")
    }
    else {    
   	    currTheme = lightTheme;
   	    theme = "light";
        image.setAttribute("src","./img/up_light.png")
    }
    link.setAttribute("href", currTheme);
}

const anchors = document.querySelectorAll('a[href*="#"]'), animationTime = 300, framesCount = 20;

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href')
      
      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
}

(function () {
    let cards_sets_set = document.querySelectorAll('.cards');
    for (i=0; i< num_cat; i++){
        let cards_set = cards_sets_set[i].querySelectorAll('.card');
        for (j=0; j< arr_cat[i].length; j++){
            let card = cards_set[j];
            card.classList.remove('fade');

            let observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                  if (typeof getCurrentAnimationPreference === 'function' && !getCurrentAnimationPreference()) {
                    return;
                  }
            
                  if (entry.isIntersecting) {
                    card.classList.add('fade');
                    return;
                  }
            
                  card.classList.remove('fade');
                });
              });
            
              observer.observe(card);
        }
    }
})();

const form = document.getElementById("modal_description");

form.addEventListener("submit", () => {
    alert("Покупка успешно совершена!")
})

function show_dropdown() {
    document.getElementById("cat_list").classList.toggle("show");
}