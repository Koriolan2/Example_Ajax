'use strict';

const sendForm = () => {
    let form = document.querySelector('form'),
        user = form.querySelector('[type=text]'),
        email= form.querySelector('[type=mail]'),
        mesDiv = document.querySelector('.message');

    let messages = {
        'success' : 'Ваші дані успішно відправлені',
        'warning' : 'Дані віправлвються',
        'error' : 'Помилка віправлення даних'
    }

    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () =>{
                mesDiv.classList.add('warning');
                mesDiv.innerHTML = messages.warning;

                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    mesDiv.classList.remove('warning');
                    mesDiv.classList.add('succses')
                    mesDiv.innerHTML = messages.success;

                } else {
                    mesDiv.classList.remove('warning');
                    mesDiv.classList.add('error')
                    mesDiv.innerHTML = messages.error;

                }
        });
        request.open('POST', './send.php');
        request.setRequestHeader('Content-type', 'application/json');
        
        const data = {};
        data.user = user.value;
        data.email = email.value;

        const body = JSON.stringify(data);

        request.send(body);
        

    })
}

sendForm();

   
    