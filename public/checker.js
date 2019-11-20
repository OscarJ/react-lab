let ids = {
    '112570842': {
        name: 'Oscar',
        lastname: 'Jimenez',
        bday: new Date(1985, 9, 8)
    }
};//['112570842','303920242'];
let worker = new SharedWorker('./worker.js');
let stepsCompleted ={
  step1: false,
  step2: false,
  step3: false,
  step4: false,
  step5: false  
};
worker.port.start();

let cssTab = document.getElementById('cssTab');
let koTab = document.getElementById('koTab');
let reactTab = document.getElementById('reactTab');
let wcTab = document.getElementById('wcTab');

worker.port.addEventListener('message', (event) => {
    if (event.data && event.data.from === 'oracle') {

    }
    else if (event.data && event.data.from) {
        let includes = false;
        for (let id in ids) {
            includes = includes || id === event.data.from;
        }
        if (includes) {
            readMessage(event.data.message);
        }
        else {
            worker.port.postMessage({ from: 'oracle', message: 'Al menos no sos alguien con quien me interese hablar' });
        }
    }
    else {
        worker.port.postMessage({ from: 'oracle', message: 'Como buen oraculo, soy ciego. Si deseas hablar conmigo, actualiza constants.js con tu id' });
    }
});

function readMessage(message) {
    let questionPart = divideQuestion(message);
    if ((questionPart.wh.quien || questionPart.wh.que) && questionPart.verb.ser) {
        worker.port.postMessage({ from: 'oracle', message: 'Soy el oraculo, voy a ser tu guia en este laboratorio' })
    }
    else if (questionPart.wh.como && questionPart.verb.estar) {
        worker.port.postMessage({ from: 'oracle', message: 'Soy un oraculo, obviamente estoy ak7' })
    }
    else if (questionPart.wh.como && questionPart.pronoun.me && questionPart.verb.llamar) {
        let person;
        for (let id in ids) {
            person = id === event.data.from ? ids[id] : person;
        }
        worker.port.postMessage({ from: 'oracle', message: 'Te llamas ' + person.name });
    }
    else if (questionPart.wh.como && questionPart.pronoun.you && questionPart.verb.llamar) {
        worker.port.postMessage({ from: 'oracle', message: 'No tengo nombre, solo existo' });
    }
    else if (questionPart.wh.que && questionPart.verb.hacer) {
        worker.port.postMessage({ from: 'oracle', message: 'Todo lo que yo te indique, pideme instrucciones' })
    }
    else if ((questionPart.wh.como || questionPart.wh.que) && (questionPart.verb.preguntar || questionPart.verb.pedir || questionPart.verb.hacer)) {
        worker.port.postMessage({ from: 'oracle', message: 'Pide el paso que desees' })
    }
    else if ((questionPart.verb.querer || questionPart.verb.dar)) {
        if (questionPart.step.paso1) {
            worker.port.postMessage({ from: 'oracle', message: 'Paso 1: ' })
        }
        else if (questionPart.step.paso2) {
            if(stepsCompleted.step1){
                worker.port.postMessage({ from: 'oracle', message: 'Paso 2: Debes crear un ViewModel de knockout y hacerle applybindings al elemento koApp' })
            }
            else{
                worker.port.postMessage({ from: 'oracle', message: 'No has completado el paso 1' })
            }
        }
        else if (questionPart.noun.instruction) {
            worker.port.postMessage({ from: 'oracle', message: 'Debes saber pedirlas' })
        }
    }
    else if (questionPart.wh.cuanto && questionPart.verb.faltar && questionPart.noun.christhmas) {
        let hoy = new Date();
        let navidad = new Date(hoy.getFullYear(), 11, 25);
        let resta = navidad.getTime() - hoy.getTime()
        let day = Math.round(resta / (1000 * 60 * 60 * 24));
        worker.port.postMessage({ from: 'oracle', message: day === 1 ? 'Falta 1 dia' : 'Faltan ' + day + ' dias' });
    }
    else {
        worker.port.postMessage({ from: 'oracle', message: 'Debes ser preciso en lo que pides' })
    }
}

function divideQuestion(message) {
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
        verb: {
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
        step: {
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
        noun: {
            christhmas: false,
            bday: false,
            instruction: false,
        },
        pronoun: {
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
    questionPart.noun.instruction = parts.includes('instruccion') || parts.includes('instrucciones');

    questionPart.pronoun.me = parts.includes('me') || parts.includes('mi');
    questionPart.pronoun.you = parts.includes('te') || parts.includes('tu');
    return questionPart;
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

(function () {
    cssTab.click();
    koTab.style.display = "none";
    reactTab.style.display = "none";
    wcTab.style.display = "none";

    let mockFetch = fetch;
    fetch = function (url, request) {
        if (typeof url === 'string' && (request === undefined || (request.method.toLowerCase() === 'get'))) {
            if (url === 'http://ozkr.work/Home/GetImage') {
                let response = new Promise((resolve, reject) => {
                    resolve('iVBORw0KGgoAAAANSUhEUgAAAloAAAJwCAYAAABRbM+6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAvYSURBVHhe7d1RahsxFEDRUfbSVWRBXk9W4814L+oYixZaSAn4JtPJOSAk+ycfieXLYyBj27a5LwAAnuxl7QAAPJnQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgIjQAgCICC0AgMjLnHMdAQB4JhMtAICI0AIAiAgtAIDImLsxxnoJ8Hk8I/qbexjOyUQLACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkIL4Mvd1g6czZg7/zUe+Ar79bNOuIfhnEy0AAAiQgsAICK0AAAiQgsAIHJ/+tLTqAAAARMtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiIx9zccRgCOZ89jX8xj3rxDgPSZaAAARoQUAEBFaAAARoQUAEBFaAAARoQUAEBFaAAARoQVweLe1A/8boQUAEBFaAAARoQUAEBFaAAARoQUAEBFaAAARoQUAEBFaAAARoQUAEBn7mo8jAEcy57Gv5zHuXyHAe0y0AAAiQgsAICK0AAAiQgsAIOJheACAiIkWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARIQWAEBEaAEARMa+5uMInNGcPuLfyRj3ax04ChMtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AIAiAgtAICI0AI4jevagaMQWgCn8WPtwFGMfc3HETijOX3Ev5Mx7tc6cBQmWgCncVs7cBQmWnByJlrfh2kWHI+JFsBJiGo4HqEFABARWgAAEc9oAQBETLQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJj7tYZ4C9jjHUC4KNMtAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkILACAitAAAIkLrD7e3122MsdZlu673e7ft7XVsl8/7gXzYdbv8+tvYl18WAP8w9jUfRwAAnslECwAgIrQAACJCCwAgIrQAACJCCwAgIrQAACJCCwAgIrQAABLb9hOuqUEL5SnRBwAAAABJRU5ErkJggg==');
                });
                return response;
            }
        }
        else if (request.method.toLowerCase() === 'post') {
            let response = new Promise((resolve, reject) => {
                if (request.headers.id && request.headers.name && request.headers.lastname) {
                    koTab.style.display = 'block';
                    stepsCompleted.step1 = true;
                    resolve('Bien, step 1 superado');
                }
                else{
                    reject('You are not authorized');
                }
            });
            return response;

        }
        return mockFetch(url, request);
    }
})();