// Login/Register swap — matches coding_style display toggle pattern
document.querySelector('#btnSwapRegister').addEventListener('click', function(){
    document.querySelector('#frmLogin').style.display = 'none'
    document.querySelector('#frmRegister').style.display = 'block'
})

document.querySelector('#btnSwapLogin').addEventListener('click', function(){
    document.querySelector('#frmRegister').style.display = 'none'
    document.querySelector('#frmLogin').style.display = 'block'
})

document.querySelector('#btnLogin').addEventListener('click', function(){
    let strEmail = document.querySelector('#txtLoginEmail').value.trim()
    let strPassword = document.querySelector('#txtLoginPassword').value.trim()

    let blnError = false
    let strError = ''

    if(strEmail == ''){
        blnError = true
        strError += '<p>You must enter your email</p>'
    }
    if(strPassword == ''){
        blnError = true
        strError += '<p>You must enter your password</p>'
    }

    if(blnError == true){
        Swal.fire({
            title: 'You are missing required info:',
            html: strError,
            icon: 'warning',
            confirmButtonColor: '#b60f0fff',
        })
    } else if(blnError == false){
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: strEmail,
                password: strPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('#frmLogin').style.display = 'none'
            document.querySelector('#divDashboard').style.display = 'block'
        })
    }
})

document.querySelector('#btnRegister').addEventListener('click', function(){
    let strFirstName = document.querySelector('#txtFirstName').value.trim()
    let strLastName = document.querySelector('#txtLastName').value.trim()
    let strPhone = document.querySelector('#txtPhone').value.trim()
    let strEmail = document.querySelector('#txtRegisterEmail').value.trim()
    let strPassword = document.querySelector('#txtRegisterPassword').value.trim()

    let blnError = false
    let strError = ''

    if(strFirstName == ''){
        blnError = true
        strError += '<p>You must enter your first name</p>'
    }
    if(strLastName == ''){
        blnError = true
        strError += '<p>You must enter your last name</p>'
    }
    if(strPhone == ''){
        blnError = true
        strError += '<p>You must enter your phone number</p>'
    }
    if(strEmail == ''){
        blnError = true
        strError += '<p>You must enter your email</p>'
    }
    if(strPassword == ''){
        blnError = true
        strError += '<p>You must enter a password</p>'
    }

    if(blnError == true){
        Swal.fire({
            title: 'You are missing required info:',
            html: strError,
            icon: 'warning',
            confirmButtonColor: '#b60f0fff',
        })
    } else if(blnError == false){
        fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: strFirstName,
                lastname: strLastName,
                phone: strPhone,
                email: strEmail,
                password: strPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: 'Account Created Successfully!',
                icon: 'success',
                confirmButtonColor: '#189b23a9',
            })
            document.querySelector('#frmRegister').style.display = 'none'
            document.querySelector('#frmLogin').style.display = 'block'
        })
    }
})

// Nav card toggles — matches more_styling show/hide pattern
document.querySelector('#btnShowAvailability').addEventListener('click', function(){
    document.querySelector('#card1').classList.remove('d-none')
    document.querySelector('#card2').classList.add('d-none')
})

document.querySelector('#btnShowSchedule').addEventListener('click', function(){
    document.querySelector('#card1').classList.add('d-none')
    document.querySelector('#card2').classList.remove('d-none')
})

// Check Availability
document.querySelector('#btnCheckAvailability').addEventListener('click', function(){
    let strCheckDate = document.querySelector('#txtCheckDate').value.trim()

    let blnError = false
    let strError = ''

    if(strCheckDate == ''){
        blnError = true
        strError += '<p>You must select a date</p>'
    }

    if(blnError == true){
        Swal.fire({
            title: 'You are missing required info:',
            html: strError,
            icon: 'warning',
            confirmButtonColor: '#b60f0fff',
        })
    } else if(blnError == false){
        fetch('http://localhost:8000/availability?date=' + strCheckDate, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('#pAvailability').innerHTML = data.message
        })
    }
})

// Save Appointment — matches more_styling btnSave pattern
document.querySelector('#btnSaveAppointment').addEventListener('click', function(){
    let strName = document.querySelector('#txtApptName').value.trim()
    let strDate = document.querySelector('#txtApptDate').value.trim()
    let strTime = document.querySelector('#txtApptTime').value.trim()

    let blnError = false
    let strError = ''

    if(strName == ''){
        blnError = true
        strError += '<p>You must enter your name</p>'
    }
    if(strDate == ''){
        blnError = true
        strError += '<p>You must select a date</p>'
    }
    if(strTime == ''){
        blnError = true
        strError += '<p>You must select a time</p>'
    }

    if(blnError == true){
        Swal.fire({
            title: 'You are missing required info:',
            html: strError,
            icon: 'warning',
            confirmButtonColor: '#b60f0fff',
        })
    } else if(blnError == false){
        fetch('http://localhost:8000/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: strName,
                date: strDate,
                time: strTime
            })
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: 'Appointment Booked Successfully!',
                icon: 'success',
                confirmButtonColor: '#189b23a9',
            })
            document.querySelector('#card2').querySelectorAll('input').forEach(input => input.value = '')
        })
    }
})