let ids = {
    '112570842': {
        name: 'Oscar',
        lastname: 'Jimenez',
        bday: new Date(1985,9,8)
    }
};//['112570842','303920242'];
let worker = new SharedWorker('./worker.js');
worker.port.start();

worker.port.addEventListener('message', (event) => {
    if(event.data && event.data.from === 'oracle'){

    }
    else if (event.data && event.data.from) {
        let includes = false;
        for(let id in ids){
            includes = includes || id === event.data.from;
        }
        if(includes){
            readMessage(event.data.message);
        }
        else{
            worker.port.postMessage({from:'oracle', message: 'Al menos no sos alguien con quien me interese hablar'});
        }
    }
    else{
        worker.port.postMessage({from:'oracle', message:'Como buen oraculo, soy ciego. Si deseas hablar conmigo, actualiza constants.js con tu id'});
    }
});

function readMessage(message){
    let questionPart = divideQuestion(message);
    if((questionPart.wh.quien || questionPart.wh.que) && questionPart.verb.ser){
        worker.port.postMessage({from:'oracle', message: 'Soy el oraculo, voy a ser tu guia en este laboratorio'})
    }
    else if(questionPart.wh.como && questionPart.verb.estar){
        worker.port.postMessage({from:'oracle', message: 'Soy un oraculo, obviamente estoy ak7'})
    }
    else if(questionPart.wh.como && questionPart.pronoun.me && questionPart.verb.llamar){
        let person;
        for(let id in ids){
            person = id === event.data.from ? ids[id] : person;
        }
        worker.port.postMessage({from:'oracle', message: 'Te llamas ' + person.name});
    }
    else if(questionPart.wh.como && questionPart.pronoun.you && questionPart.verb.llamar){
        worker.port.postMessage({from:'oracle', message: 'No tengo nombre, solo existo'});
    }
    else if(questionPart.wh.que && questionPart.verb.hacer){
        worker.port.postMessage({from:'oracle', message: 'Todo lo que yo te indique, pideme instrucciones'})
    }
    else if((questionPart.wh.como || questionPart.wh.que) && (questionPart.verb.preguntar || questionPart.verb.pedir  || questionPart.verb.hacer)){
        worker.port.postMessage({from:'oracle', message: 'Pide el paso que desees'})
    }
    else if((questionPart.verb.querer || questionPart.verb.dar)){
        if(questionPart.step.paso1){
            worker.port.postMessage({from:'oracle', message: 'Paso 1: '})
        }
        else if(questionPart.step.paso2){
            worker.port.postMessage({from:'oracle', message: 'Paso 2: '})
        }
    }
    else if(questionPart.wh.cuanto && questionPart.verb.faltar && questionPart.noun.christhmas){
        let hoy = new Date();
        let navidad = new Date(hoy.getFullYear(), 11, 25);
        let resta = navidad.getTime() - hoy.getTime()
        let day = Math.round(resta/ (1000*60*60*24));
        worker.port.postMessage({from:'oracle', message: day === 1 ? 'Falta 1 dia' : 'Faltan ' + day + ' dias'});
    }
    else{
        worker.port.postMessage({from:'oracle', message: 'Debes ser preciso en lo que pides'})
    }
}

function divideQuestion(message){
    message = message.replace('?', ' ?');
    message = message.toLowerCase();
    let parts = message.split(' ');
    let questionPart = {
        wh: {
            quien: false,
            como: false,
            cuando: false,
            cuanto: false,
            donde: false,
            cual: false,
            que: false
        },
        verb:{
            ser: false,
            hacer: false,
            dar: false,
            empezar: false,
            preguntar: false,
            querer: false,
            pedir: false,
            estar: false,
            faltar: false,
            terminar: false,
        },
        step:{
            pasos: false,
            paso1: false,
            paso2: false,
            paso3: false,
            paso4: false,
            paso5: false,
            paso6: false,
            paso7: false,
            paso8: false,
            paso9: false,
            paso10: false,
        },
        noun:{
            christhmas: false,
            bday: false,
        },
        pronoun:{
            me: false,
            you: false,
        }
    }
    questionPart.wh.quien = parts.includes('quien');
    questionPart.wh.como = parts.includes('como');
    questionPart.wh.cuando = parts.includes('cuando');
    questionPart.wh.cuanto = parts.includes('cuanto');
    questionPart.wh.donde = parts.includes('donde') || parts.includes('adonde');
    questionPart.wh.cual = parts.includes('cual') || parts.includes('cuales');
    questionPart.wh.que = parts.includes('que');

    questionPart.verb.ser = parts.includes('sos') || parts.includes('eres') || parts.includes('es');
    questionPart.verb.hacer = parts.includes('hacer') || parts.includes('hago');
    questionPart.verb.preguntar = parts.includes('preguntar') || parts.includes('pregunto');
    questionPart.verb.pedir = parts.includes('pedir') || parts.includes('pido');
    questionPart.verb.dar = parts.includes('dame') || parts.includes('dar') || parts.includes('deme');
    questionPart.verb.querer = parts.includes('quisiera') || parts.includes('quiero');
    questionPart.verb.estar = parts.includes('esta') || parts.includes('estas') || parts.includes('estar');
    questionPart.verb.faltar = parts.includes('falta') || parts.includes('faltar');
    questionPart.verb.terminar = parts.includes('termine') || parts.includes('terminar');
    questionPart.verb.llamar = parts.includes('llamas') || parts.includes('llamar') || parts.includes('llamo');

    questionPart.step.pasos = parts.includes('pasos');
    questionPart.step.paso1 = parts.includes('paso') && (parts.includes('primer') || parts.includes('1') || parts.includes('uno'));
    questionPart.step.paso2 = parts.includes('paso') && (parts.includes('segundo') || parts.includes('2') || parts.includes('dos'));
    questionPart.step.paso3 = parts.includes('paso') && (parts.includes('tercer') || parts.includes('3') || parts.includes('tres'));
    
    questionPart.noun.christhmas = parts.includes('navidad');
    questionPart.noun.bday = parts.includes('cumpleaños');

    questionPart.pronoun.me = parts.includes('me') || parts.includes('mi');
    questionPart.pronoun.you = parts.includes('te') || parts.includes('tu');
    return questionPart;
}
