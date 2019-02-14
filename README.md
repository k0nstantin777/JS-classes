# JS-classes
JS helpers classes

#### Class AnimateScroll / animate-scroll.js

  Класс для плавной анимации к заданному значению.  
  Параметры:  
selector (string) - css селектор прокручиваемого элемента  
speed (int) - скорость анимации.  
startCallback (function) - функция вызываемая перед началом анимации  
endCallback (function) - функции вызываемая перед в конце анимации  
  Использование:  
let scroller = new AnimateScroll(initObject)  
scroller.scrollX(250);  

#### Class ElementHelper / element-helper.js

  Класс для унификации работы с HTML элементами  
Позволяет получать свойства и модифицировть элементы, если элемент не найден выбрасывается исключение.  
source (string/HTMLElement) - css селектор или HTML объект.  
  Пример использования  
let elementHelper = new ElementHelper(selector);  
elementHelper.modify(function(element){  
  element.scrollTop = 10;  
};  


#### Class SwipeElement / swipe-element.js

   Класс для определения направления свайпа по элементу с заданным размером свайпа  
Генерерирует события:  
swipe-to-left  
swipe-to-right  
   Пример использования  
let swiper = new SwipeElement({  
    selector: '.css-selector',  
    size: 200,  
});  
swiper.element.addEventListener('swipe-to-left', callback);  


