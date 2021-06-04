let myLeads = []

const inputBtn = document.querySelector('#input-btn')
const inputEl = document.querySelector('#input-el')
const ulEl = document.querySelector('#ul-el')
const deleteButton = document.querySelector('#delete-btn')
const saveTab = document.querySelector('#save-tab')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){    
    let listItems = ''

    for(let i = 0 ; i < leads.length; i++){
    
        listItems += 
        `<li>
            <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>`
    }

    ulEl.innerHTML = listItems
}

inputBtn.addEventListener('click', () => {
    
    myLeads.push(inputEl.value)
    inputEl.value = ''
    
    localStorage.setItem('myLeads',JSON.stringify(myLeads))
    
    
    render(myLeads)
})



saveTab.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs)
        
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads',JSON.stringify(myLeads))
        render(myLeads)
     
    })
    
})
     
        
deleteButton.addEventListener('dblclick', () => {
    myLeads = []
    ulEl.innerHTML = ''
    localStorage.clear()
})









