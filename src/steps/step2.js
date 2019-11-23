import { isTSExpressionWithTypeArguments } from "@babel/types";

window.create = (quantity) => {
    let array = [];
    for(let i = 0; i < quantity; i++){
        array.push(Math.floor(Math.random()*100));
    } 
    return array
}

Array.prototype.create = function(quantity) { 
    for(let i = 0; i < quantity; i++){
        this.push(Math.floor(Math.random()*100));
    } 
    return this;
}; 

window.sum = function(){
    let total = 0;
    for(let i = 0; i < arguments.length ; i++){
        if(Array.isArray(arguments[i])){
            for(let j = 0; j < arguments[i].length; j++){
                if(typeof arguments[i][j] === 'number')
                    total += arguments[i][j];
                else 
                    return Number.NaN;
            } 
        }
        else if(typeof arguments[i] !== 'number'){
            return Number.NaN;
        }
        else{
            total += arguments[i];
        }
    }
    return total;
}

Array.prototype.sum = function() { 
    let total = 0;
    for(let j = 0; j < this.length; j++){
        if(typeof this[j] === 'number')
            total += this[j];
        else 
            return Number.NaN;
    } 
    for(let i = 0; i < arguments.length ; i++){
        if(Array.isArray(arguments[i])){
            for(let j = 0; j < arguments[i].length; j++){
                if(typeof arguments[i][j] === 'number')
                    total += arguments[i][j];
                else 
                    return Number.NaN;
            } 
        }
        else if(typeof arguments[i] !== 'number'){
            return Number.NaN;
        }
        else{
            total += arguments[i];
        }
    }
    return total;
}; 

window.subtraction = function(){
    let total = 0;
    if(arguments.length !== 2){
        throw "Cantidad de argumentos invalida"
    }
    if(typeof arguments[0] !== 'number' || typeof arguments[1] !== 'number'){
        throw "Argumentos deben ser numericos"
    }

    return arguments[0] - arguments[1];
}

Number.prototype.subtraction = function() { 
    if(arguments.length !== 1){
        throw "Cantidad de argumentos invalida"
    }
    if(typeof arguments[0] !== 'number'){
        throw "Argumentos deben ser numericos"
    }

    return this - arguments[0];
}; 