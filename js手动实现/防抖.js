function debounce(event, time) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      console.log(this); //这里this是执行时的对象,this的真实指向并非debounce的调用者，而是返回闭包的调用者。
      timer = setTimeout(() => { 
        event.apply(this, args); //apply让event执行
      }, time);
    };
  }
  function f(args){
    console.log("event",args);
  }
  debounce(f,500)('fangdou');
  //输出
  //Window
  //--500ms后--
  //event fangdou
  //注意
  window.addEventListener('resize', debounce(handleResize, 200));// 实际上函数绑定的是return的闭包
  //所以要在闭包里 clearTimeout(timer) 实现触发后的重新记时