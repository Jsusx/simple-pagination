let data = $.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole", res => data = JSON.parse(res));
let data_per_pages = 10
let currentPage = window.location.search.split("=")[1] == undefined ? 1:window.location.search.split("=")[1] ;
$("#page_number").text(currentPage)

let containerData = $('.data')
let containerPageNumbers = $('.pagination-list')

$(document).ready(() => {
    setTimeout(() => {
        generatePaginationNumbers()
        Page(currentPage)
    }, 400)
})

function generatePaginationNumbers(){
    let c = document.querySelector(".pagination-list")
    for(let x = 1; x < totalPages(); x++){
        c.innerHTML += `
                        <li class="pagination-item">
                            <a href="?page=${x}" class="pagination-url">${x}</a>
                        </li>
        `
    }
}

function Page(number){
    for(let x = ((number-1) * data_per_pages); x < (number * data_per_pages);x++){
        $(`<div class="data-card">
        <div class="data-title">
            <div class="data-title-img"></div>
        </div>
        <div class="data-body">
            <h4 class="data-body-title">${data[x].first} ${data[x].last}</h4>
            <ul class="data-body-list">
                <li class="data-list-item">Email: ${data[x].email}</li>
                <li class="data-list-item">Address: ${data[x].address}</li>
                <li class="data-list-item">Balance: ${data[x].balance}</li>
            </ul>
        </div>
    </div>`).appendTo(containerData)
    }
}

function totalPages(){
    return Math.ceil(data.length / data_per_pages)
}