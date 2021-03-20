const socket = io('/');


socket.on('update-list', () =>{
    populateList();
})


const populateList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/prove11/fetchAll')
    .then(res => res.json())
    .then(data =>{
        while(nameList.firstChild) nameList.firstChild.remove()

        for(const avenger of data.avengers){
            const li = document.createElement('li')
            li.appendChild(document.createTextNode(avenger.name))
            const powerli = document.createElement('li');
            powerli.appendChild(document.createTextNode(avenger.power));
            powerli.classList.add('power');
            li.appendChild(powerli);

            nameList.appendChild(li)
        }
    })
    .catch(err=>{
        console.error(err);
    })
}

const submitName = () => {
    const newName = document.getElementById('newName').value // Grab the value of our new name
    const power = document.getElementById('power').value;

    fetch('/prove11/insertName',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newName, power})
    })
        .then(res=>{
            populateList();
            document.getElementById('power').value = '';
            document.getElementById('newName').value = '';
            socket.emit('new-name', true)
        })
        .catch(err =>{
            document.getElementById('newName').value = '';
            console.error(err);
        })
    

}

// Initialize the list
populateList()