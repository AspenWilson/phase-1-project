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
            farmCounty.innerHTML = `This farm is location in ${farm.County} county.`
            const farmOutput = document.createElement ('h4')
            farmOutput.innerHTML = `This farm produces ${farm.Produces}.`
            const farmRisk = document.createElement ('h4')
            farmRisk.innerHTML = `Due to this farm's county, it carries an exposure risk of ${farm.Risk}.`

            showPanel.innerHTML= ``
            showPanel.appendChild(farmName)
            showPanel.appendChild(farmCounty)
            showPanel.appendChild(farmOutput)
            showPanel.appendChild(farmRisk)
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

            showPanel.innerHTML=``
            showPanel.appendChild(countyName)
            showPanel.appendChild(countyRisk)
        })
    })
}

//Toggle Functions 

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

//Search Bar and Produce Dropdown Functions

function produceFilter () {

}

//Toggle Event Listeners
toggleSearch.addEventListener('change', toggleSort)

