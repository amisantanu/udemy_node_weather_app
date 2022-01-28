// console.log('Client side js');

const weatherForm = document.querySelector('form')
const weatherFormSubmitBtn = document.querySelector('form button')
const weatherFormSubmitBtnText = weatherFormSubmitBtn.innerHTML
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.innerHTML = ''
    messageTwo.innerHTML = ''
    const location = search.value

    weatherFormSubmitBtn.innerHTML = 'Please wait...'

    fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
        res.json().then(data => {
            weatherFormSubmitBtn.innerHTML = weatherFormSubmitBtnText
            if (data.err) {
                messageOne.innerHTML = data.err
                return
            }

            // console.log(data);
            messageOne.innerHTML = data.location
            messageTwo.innerHTML = data.forecast
        })
    }).catch(err => {
        // console.log(err);
        messageOne.innerHTML = err
        weatherFormSubmitBtn.innerHTML = weatherFormSubmitBtnText
    })
})