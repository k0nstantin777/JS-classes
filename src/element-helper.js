'use strict';
/**
 * @description Класс для унификации работы с HTML элементами
 * Позволяет получать свойства и модифицировть элементы, если элемент не найден выбрасывается исключение.
 * @var source (string/HTMLElement) - css селектор или HTML объект.
 * Пример использования
 * let elementHelper = new ElementHelper(selector);
 * elementHelper.modify(function(element){
 *      element.scrollTop = 10;
 * })
 */
class ElementHelper {
    constructor(source) {
        this.source = source;
        this.init();
    }

    init(){
        this.element = this.findOrFail(this.source);
    }

    getElement(){
        return this.element;
    }

    setElement(source){
        this.element = this.findOrFail(source);
    }

    modify(callback){
        if(typeof callback === 'function'){
            return callback(this.element);
        }
        return false;
    }

    getProp(prop){
        return this.element[prop];
    }

    findOrFail(source){
        let element;
        if(source instanceof HTMLElement){
            element = source;
        } else {
            element = document.querySelector(source);
        }
        if(!element){
            throw 'Не могу найти элемент по селектору: ' + source;
        }
        return element;
    }
}