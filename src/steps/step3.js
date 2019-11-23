let reactValFn = document.getElementById('reactValFn');
window.reactValFn = function(){
    if(arguments.length > 0 ){
        reactValFn.value = arguments[0];
    }
    else {
        return reactValFn.value;
    }
}

let reactListFn = document.getElementById('reactListFn');
window.reactListFn = function(){
    if(arguments.length > 0 ){
        reactListFn.innerHTML = '';
        for(let i = 0 ; i < arguments[0].length ; i++){
            let li = document.createElement("li");
            li.innerHTML = arguments[0][i];
            reactListFn.appendChild(li);
        }
    }
    else {
        let array = [];
        for(let i = 0; i < reactListFn.childNodes.length; i++){
            array.push(reactListFn.childNodes[i].innerHTML);
        }
        return array;
    }
}

let reactListProp = [];
let reactListPropEl = document.getElementById('reactListProp');
Object.defineProperty(window, 'reactListProp',{
    get: function () {
        return reactListProp ;
    },
    set: function (newVal) {
        reactListProp = newVal;
        reactListPropEl.innerHTML = '';
        for(let i = 0 ; i < arguments[0].length ; i++){
            let li = document.createElement("li");
            li.innerHTML = arguments[0][i];
            reactListPropEl.appendChild(li);
        }
    }
});
let reactValProp = '';
let reactValPropEl = document.getElementById('reactValProp');
Object.defineProperty(window, 'reactValProp',{
    get: function () {
        return reactValProp ;
    },
    set: function (newVal) {
        reactValProp = newVal;
        reactValPropEl.value = newVal;
    }
});
reactValPropEl.addEventListener('change', function(e){
    window.reactValProp = e.srcElement.value;
});