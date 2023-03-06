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
const video = document.querySelector('#video')
const ohioMapBtn = document.querySelector('#maphide')

//Event Listeners
toggleSearch.addEventListener('change', toggleSort)

hiddenFarmSort.addEventListener('change', filterFarmAlpha)

hiddenCountySort.addEventListener('change', filterCountyAlpha)

hiddenProduceSort.addEventListener('change', filterProduce)

clickAdd.addEventListener('click', showForm)

newFarmBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    addFarm()
    document.querySelector('#add').reset()
})

ohioMapBtn.addEventListener('click', hideMap)

toggleList.addEventListener('click',colorChange)

//Fetch & Display Functions
function fetchFarms () {
    fetch (farmURL)
    .then(resp => resp.json())
    .then(farms => {
        let sortedFarms = farms.sort(function(a,b) {
            if(a.farm < b.farm){
                return -1;
            }
            if (a.farm > b.farm){
                return 1
            }
            return 0
        })
        displayFarms(sortedFarms)
    })
}

function fetchCounties () {
    fetch (countyURL)
    .then(resp => resp.json())
    .then(json=> displayCounties(json))
}

function displayFarms(farms) {
    farms.forEach(farm => {
        const farmLi = document.createElement('li')
        farmLi.innerHTML = `${farm.farm}`
        farmLi.id = `${farm.id}`
        toggleList.appendChild(farmLi)
        
        farmLi.addEventListener('click', (e) => {
            const farmDiv = document.createElement('div')
            farmDiv.className = 'info-card'
            farmDiv.id = `${farm.id}`
            farmDiv.innerHTML = `
            <h2>${farm.farm}</h2>
            <h4>This farm is located in ${farm.county} county.</h4>
            <h4>This farm produces ${farm.produces}.</h4>
            <h4>Due to this farm's location, it's water source carries a risk of ${farm.risk}.</h2>
            <img src=${farm.mapImg} />`

            showPanel.innerHTML= ``
            showPanel.appendChild(farmDiv)
       })
    })
}

function displayCounties (counties) {
    counties.forEach(county => {
        const countyLi= document.createElement('li')
        countyLi.innerHTML = `${county.county}`
        countyLi.id=`${county.id}`
        toggleList.appendChild(countyLi)

        countyLi.addEventListener('click', (e) => {
            const countyDiv = document.createElement('div')
            countyDiv.className = ('info-card')
            countyDiv.id = `${county.id}`
            countyDiv.innerHTML= `
            <h2>${county.county}</h2>
            <h4>Due to this county's location, it's water source carries a risk of ${county.risk}.</h2>
            <img src=${county.mapImg} />`

            showPanel.innerHTML=``
            showPanel.appendChild(countyDiv)
        })
    })
}

//Filtering Functions for Hidden Toggles
function filterFarmAlpha () {
     fetch (farmURL)
     .then(resp => resp.json())
     .then(farms => {
        let key = hiddenFarmSort.value.toUpperCase()
        let filteredFarms = farms.filter(farm => String(farm.farm).startsWith(key))
        let sortedFarms = filteredFarms.sort(function(a,b) {
            if(a.farm < b.farm){
                return -1;
            }
            if (a.farm > b.farm){
                return 1
            }
            return 0
        })
        displayFarms(sortedFarms)
     })
     toggleList.innerHTML= ``
     showPanel.innerHTML=``
    }

function filterCountyAlpha () {
    fetch (countyURL)
    .then(resp => resp.json())
    .then(counties => {
       let key = hiddenCountySort.value.toUpperCase()
       let filteredCounties = counties.filter(county => String(county.county).startsWith(key))
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
       let filteredFarmsProduce = farms.filter(farm => String(farm.produces) === key)
       let sortedProducers = filteredFarmsProduce.sort(function(a,b) {
        if(a.farm < b.farm){
            return -1;
        }
        if (a.farm > b.farm){
            return 1
        }
        return 0
    })
    displayFarms(sortedProducers)
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
    } else if (key === '') {
        hiddenFarmLabel.className ='hidden'
        hiddenFarmSort.className='hidden'
        hiddenCountyLabel.className ='hidden'
        hiddenCountySort.className='hidden'
        hiddenProduceLabel.className='hidden'
        hiddenProduceSort.className='hidden'
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
                let county = counties.find(el => el.county===key)
                let risk = document.querySelector('#risk')
                risk.value = county.risk
                let mapImg = document.querySelector('#map')
                mapImg.value = county.mapImg
            })
        })
    }
popFields()

function addFarm() {
    let newFarmObj= ({
        "farm": farm.value,
        "county": county.value,
        "produces": produce.value,
        "risk": risk.value,
        "mapImg": map.value
    })
    fetch (`http://localhost:3000/farms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFarmObj)
    })
    .then(resp => resp.json())
    .then(data => {
        const farmDiv = document.createElement('div')
        farmDiv.className = 'info-card'
        farmDiv.id = `${data.id}`
        farmDiv.innerHTML = `
        <h2>You've successfully added this farm to the database!</h2>
        <h2>${data.farm}</h2>
        <h4>This farm is locationed in ${data.county} county.</h4>
        <h4>This farm produces ${data.produces}.</h4>
        <h4>Due to this farm's location, it's water source carries a risk of ${data.risk}.</h2>
        <img src=${data.mapImg} />`

        showPanel.innerHTML= ``
        showPanel.appendChild(farmDiv)
    })
}

function hideMap () {
    let ohioMap = document.querySelector('#ohioMap')
    if (ohioMap.className === 'hidden'){
        ohioMap.classList.remove('hidden')
    } else {
        ohioMap.className = 'hidden'
    }
}

function colorChange (e) {
    if (e.target.style.color === 'purple') {
        e.target.style.color = 'black'
    } else {
        e.target.style.color = 'purple'
    }
}


