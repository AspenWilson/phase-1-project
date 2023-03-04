//Constant Declarations
const farmURL= `http://localhost:3000/farms`
const countyURL= `http://localhost:3000/counties`
const farmNameSearch= document.querySelector('#farm-name')
const produceDropdown= document.querySelector('#farm-produces')
const toggleList= document.querySelector('#list')
const toggleSearch= document.querySelector('#list-by')
const showPanel = document.querySelector('#show-panel')
const hiddenFarmSort = document.querySelector('#farm-sort-by')
const hiddenCountySort = document.querySelector('#county-sort-by')
const hiddenProduceSort = document.querySelector('#produce-sort-by')
const hiddenFarmLabel = document.querySelector('#farm-sort-label')
const hiddenCountyLabel = document.querySelector('#county-sort-label')
const hiddenProduceLabel = document.querySelector('#produce-sort-label')
const clickAdd = document.querySelector('#click-add')
const hiddenAddForm = document.querySelector('#add')
const formPopBtn = document.querySelector('#click-risk')
const newProduce = document.querySelector('#produce')
const newFarmBtn = document.querySelector('#add-farm')

//Event Listeners
toggleSearch.addEventListener('change', toggleSort)

hiddenFarmSort.addEventListener('change', filterFarmAlpha)

hiddenCountySort.addEventListener('change', filterCountyAlpha)

hiddenProduceSort.addEventListener('change', filterProduce)

clickAdd.addEventListener('click', showForm)

document.addEventListener('DOMContentLoaded', () => {
    newFarmBtn.addEventListener('submit', (e) => {
        e.preventDefault()
        addFarm(e)
    })
})

// document.addEventListener('DOMContentLoaded', () => {
//     newFarmBtn.addEventListener('submit',addFarm)
//     console.log('i did something')
//     })

//Fetch & Display Functions
function fetchFarms () {
    fetch (farmURL)
    .then(resp => resp.json())
    .then(json => displayFarms(json))
}

function fetchCounties () {
    fetch (countyURL)
    .then(resp => resp.json())
    .then(json=> displayCounties(json))
}
function displayFarms(farms) {
    farms.forEach(farm => {
        const farmLi = document.createElement('li')
        farmLi.innerHTML = `${farm.FarmName}`
        toggleList.appendChild(farmLi)
        
        farmLi.addEventListener('click', (e) => {
            const farmName = document.createElement('h2')
            farmName.innerHTML = `${farm.FarmName}`
            const farmCounty = document.createElement('h4')
            farmCounty.innerHTML = `This farm is located in ${farm.County} county.`
            const farmOutput = document.createElement ('h4')
            farmOutput.innerHTML = `This farm produces ${farm.Produces}.`
            const farmRisk = document.createElement ('h4')
            farmRisk.innerHTML = `Due to this farm's county, it carries an exposure risk of ${farm.Risk}.`
            const farmImg = document.createElement('img')
            farmImg.src =`${farm.MapImg}`

            showPanel.innerHTML= ``
            showPanel.appendChild(farmName)
            showPanel.appendChild(farmCounty)
            showPanel.appendChild(farmOutput)
            showPanel.appendChild(farmRisk)
            showPanel.appendChild(farmImg)
       })
    })
}

function displayCounties (counties) {
    counties.forEach(county => {
        const countyLi= document.createElement('li')
        countyLi.innerHTML = `${county.County}`
        toggleList.appendChild(countyLi)

        countyLi.addEventListener('click', (e) => {
            const countyName = document.createElement('h2')
            countyName.innerHTML = `${county.County}`
            const countyRisk = document.createElement ('h4')
            countyRisk.innerHTML = `This counties proximity to potentially contaminated water gives it a risk factor of ${county.Risk}`
            const countyImg = document.createElement('img')
            countyImg.src= `${county.MapImg}`

            showPanel.innerHTML=``
            showPanel.appendChild(countyName)
            showPanel.appendChild(countyRisk)
            showPanel.appendChild(countyImg)
        })
    })
}

//Filtering Functions for Hidden Toggles
function filterFarmAlpha () {
     fetch (farmURL)
     .then(resp => resp.json())
     .then(farms => {
        let key = hiddenFarmSort.value.toUpperCase()
        let filteredFarms = farms.filter(farm => String(farm.FarmName).startsWith(key))
        displayFarms(filteredFarms)
     })
     toggleList.innerHTML= ``
     showPanel.innerHTML=``
    }

function filterCountyAlpha () {
    fetch (countyURL)
    .then(resp => resp.json())
    .then(counties => {
       let key = hiddenCountySort.value.toUpperCase()
       let filteredCounties = counties.filter(county => String(county.County).startsWith(key))
       displayCounties(filteredCounties)
    })
    toggleList.innerHTML= ``
    showPanel.innerHTML=``
}

function filterProduce () {
    fetch (farmURL)
    .then(resp => resp.json())
    .then(farms => {
       let key = hiddenProduceSort.value
       let filteredFarmsProduce = farms.filter(farm => String(farm.Produces) === key)
       displayFarms(filteredFarmsProduce)
    })
    toggleList.innerHTML= ``
    showPanel.innerHTML=``
}

//Toggle Function 
function toggleSort (event) {
    let key = event.target.value
    if (key==='Farm Name'){
        fetchFarms()
        hiddenFarmLabel.classList.remove('hidden')
        hiddenFarmSort.classList.remove('hidden')
        hiddenCountyLabel.className ='hidden'
        hiddenCountySort.className='hidden'
        hiddenProduceLabel.className='hidden'
        hiddenProduceSort.className='hidden'

    } else if (key==='County'){
        fetchCounties()
        hiddenCountyLabel.classList.remove('hidden')
        hiddenCountySort.classList.remove('hidden')
        hiddenFarmLabel.className ='hidden'
        hiddenFarmSort.className='hidden'
        hiddenProduceLabel.className='hidden'
        hiddenProduceSort.className='hidden'

    } else if(key==='Farm Produces'){
        hiddenProduceLabel.classList.remove('hidden')
        hiddenProduceSort.classList.remove('hidden')
        hiddenFarmLabel.className ='hidden'
        hiddenFarmSort.className='hidden'
        hiddenCountyLabel.className ='hidden'
        hiddenCountySort.className='hidden'
    }
    toggleList.innerHTML= ``
    showPanel.innerHTML=``
}

//Add Farm Functions
function showForm () {
    if (hiddenAddForm.className === 'hidden') {
    hiddenAddForm.classList.remove('hidden')
} else {
    hiddenAddForm.className ='hidden'
}
}

function popFields () {
    fetch(countyURL)
        .then(resp => resp.json())
        .then(counties=> {
            formPopBtn.addEventListener('click',(e) => {
                e.preventDefault()
                let key = hiddenAddForm.county.value
                let county = counties.find(el => el.County===key)
                let risk = document.querySelector('#risk')
                risk.value = county.Risk
                let map = document.querySelector('#map')
                map.value = county.MapImg
            })
        })
    }
popFields()

function newID () {
    fetch (farmURL)
        .then(resp=> resp.json())
        .then(farms=> {
        const newID = (farms.length +1)
        console.log(newID)
})
}
newID()

function addFarm(e) {
    fetch (`http://localhost:3000/farms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            FarmName: e.target.farm.value,
            County:   e.target.county.value,
            Produces: e.target.produce.value,
            Risk: e.target.risk.value,
            MapImg: e.target.map.value
        }),
    })
    .then ((resp) => resp.json())
    .then (data => console.log(data))
}





