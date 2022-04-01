const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.getElementById('msg-1');
const msg2 = document.getElementById('msg-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;
    msg1.textContent  = 'loading...'
    msg2.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    msg1.textContent='';
                    msg2.textContent=`${data.error}`
        
                }else{
                    // console.log(data.forecast);
                    msg1.textContent=`${data.location}`;
                    msg2.textContent=`${data.forecast}`;
                }
            })
        })
});

// msg1.textContent = 'From JS';
