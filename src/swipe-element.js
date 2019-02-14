'use strict';
/**
 * @description Класс для определения направления свайпа по элементу с заданным размером свайпа
 * Генерерирует события:
 * swipe-to-left
 * swipe-to-right
 */
const SWIPE_LEFT = 'left';
const SWIPE_RIGHT = 'right';
class SwipeElement {
    constructor({selector, size}) {
        this.selector = selector;
        this.size = size;
        this.init();
    }

    init(){
        this.elementHelper = new ElementHelper(this.selector);
        this.element = this.elementHelper.getElement();
        this.startSwipePosition = 0;
        this.endSwipePosition = 0;
        this.arrowSwipe = null;
        this.element.addEventListener('touchstart', this.beginSwipe.bind(this));
        this.element.addEventListener('touchend', this.finishSwipe.bind(this));
    }

    getElement(){
        return this.element;
    }

    getStartSwipePosition(event){
        this.startSwipePosition = event.touches[0].clientX;
    }

    getEndSwipePosition(event){
        this.endSwipePosition = event.changedTouches[0].clientX;
    }

    getArrowSwipe(){
        let diference = this.startSwipePosition -  this.endSwipePosition;
        if(diference > 0) {
            this.arrowSwipe = SWIPE_LEFT;
        } else {
            this.arrowSwipe = SWIPE_RIGHT;
        }
    }

    beginSwipe(event){
        this.getStartSwipePosition(event);
    }

    finishSwipe(event){
        this.getEndSwipePosition(event);
        this.getArrowSwipe();
        if(Math.abs(this.startSwipePosition -  this.endSwipePosition) >= this.size){
            this.emitEvent();
        }
    }

    emitEvent(){
        switch(this.arrowSwipe){
            case SWIPE_RIGHT: return this.emitEventSwipeRight();
            case SWIPE_LEFT: return this.emitEventSwipeLeft();
            default: return;
        }
    }

    emitEventSwipeLeft(){
        let event = new Event('swipe-to-left', {bubbles: true, cancelable: false});
        this.element.dispatchEvent(event);
    }

    emitEventSwipeRight(){
        let event = new Event('swipe-to-right', {bubbles: true, cancelable: false});
        this.element.dispatchEvent(event);
    }
}