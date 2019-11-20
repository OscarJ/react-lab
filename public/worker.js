let ports = [];
let oracle;

this.addEventListener('connect', (event) => {

    let port1 = event.ports[0];
    port1.start();
    if(!oracle){
        oracle = port1;
    }
    else{
        ports.push(port1);
    }
    if(ports.length == 1){
        port1.postMessage('Welcome to my world, if you want talk to me, you need to identify your self and tell what do you want, by example: { from: "112570842", message:"Get Me the next step"}');
    }
    
    

    port1.addEventListener('message', function (e) {
        if(e.data && e.data.from === 'oracle'){
            for (let i = 0; i < ports.length; i++) {
                ports[i].postMessage(e.data);
            }
        }
        else if(e.data && e.data.from === 'body' === e.data.message === 'close'){
            ports = [];
            oracle = undefined;
        }
        else{
            oracle.postMessage(e.data);
        }
    });
});