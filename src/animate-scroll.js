'use strict';
/**
 * @description Класс плавной анимации к заданному значению
 * @var selector (string) - css селектор прокручиваемого элемента
 * @var speed (int) - скорость анимации.
 * @var startCallback (function) - функция вызываемая перед началом анимации
 * @var endCallback (function) - функции вызываемая перед в конце анимации
 * Использование:
 * let scroller = new AnimateScroll(initObject)
 * scroller.scrollX(250);
 */
class AnimateScroll {
    constructor({selector, speed, startCallback, endCallback}) {
        this.selector = selector;
        this.speed = speed;
        this.startCallback = typeof startCallback === 'function' ? startCallback : function(){};
        this.endCallback = typeof endCallback === 'function' ? endCallback : function(){};
        this.init();
    }

    init(){
        this.elementHelper = new ElementHelper(this.selector);
        this.element = this.elementHelper.getElement();
        this.currentScrollValue = -1;
    }

    getElement(){
        return this.element;
    }

    getCurrentScrollValue(){
        return this.currentScrollValue;
    }

    scrollX(targetPosition){
        this.startCallback();
        this.scrollTo(targetPosition, 'X');
    }

    scrollY(targetPosition){
        this.startCallback();
        this.scrollTo(targetPosition, 'Y');
    }

    scrollTo(targetPosition, axis){
        let scrollProp =  this.getPropByAxis(axis);
        let scrollPropValue = this.elementHelper.getProp(scrollProp);
        let self = this;
        setTimeout(function(){
            if(scrollPropValue === targetPosition || self.currentScrollValue === scrollPropValue){
                //console.log(scrollPropValue);
                self.currentScrollValue = scrollPropValue;
                self.endCallback();
                return;
            }
            if(scrollPropValue < targetPosition){
                let move = targetPosition - scrollPropValue > self.speed ? self.speed : targetPosition - scrollPropValue;
                self.elementHelper.modify(function(element){
                    element[scrollProp] = scrollPropValue + move;
                    self.currentScrollValue = scrollPropValue;
                });
            }
            if(scrollPropValue > targetPosition){
                let move = scrollPropValue - targetPosition > self.speed ? self.speed : scrollPropValue - targetPosition;
                self.elementHelper.modify(function(element){
                    element[scrollProp] = scrollPropValue - move;
                    self.currentScrollValue = scrollPropValue;
                });
            }
            self.scrollTo(targetPosition, axis);
        }, 1);
    }

    getPropByAxis(axis){
        if(axis === 'X'){
            return 'scrollLeft';
        }
        if(axis === 'Y'){
            return 'scrollTop';
        }
        throw 'Undefined axis to scroll';
    }
}