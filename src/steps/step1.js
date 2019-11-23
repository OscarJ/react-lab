    fetch('http://ozkr.work/Home/GetImage').then(x => {
        let img = document.createElement("img");
        img.src = 'data:image/png;base64,' + x;
        let csscontent = document.getElementById("CSS");
        csscontent.appendChild(img);
    })

    fetch(
        'http://ozkr.work/Home/GetImage',
        {
            method: 'POST',
            headers: {
                'id': '112570842',
                'name': 'Oscar',
                'lastname': 'Jimenez'
            }
        }
    ).then(x => {
        
    })