

const weatherForm = document.querySelector(".weatherForm")
const search = document.querySelector(".search")
const submitBtn = document.querySelector(".submit")
const messageLocation = document.querySelector(".locationAfterFormSubmit")
const messageError = document.querySelector(".errorAfterFormSubmit")

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    messageLocation.textContent = 'loading...'
    messageError.textContent = ''
    const location = search.value
    const url = `/weather?address=${location}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageError.textContent = data.error
                messageLocation.textContent = ''
            } else{
                messageError.textContent = data.location
                messageLocation.textContent = `it is ${data.forecast.skies} with ${data.forecast.humidity}% humidity. the temprature is ${data.forecast.temperature}`
            }
        })
    })
})