//Constant Declarations
const farmNameSearch= document.querySelector('#farm-name')
const produceDropdown= document.querySelector('#farm-produces')
const farmList= document.querySelector('#list')

function fetchFarms () {
    fetch (`http://localhost:3000/farms`)
    .then(resp => resp.json())
    .then(json => displayFarmData(json))
}

function displayFarmData (farms) {
    farms.forEach(farm => {
        const farmLi = document.createElement('li')
        farmLi.innerHTML = `${farm.FarmName}`
        farmList.appendChild(farmLi)
    })
}

fetchFarms()