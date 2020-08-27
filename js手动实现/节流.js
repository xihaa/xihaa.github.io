/*
    实现要点：
    1.闭包外的声明的初始化 
    2.闭包内判断满足条件(未触发/上一次触发结束)进入执行阶段 
    3.重制变量，作为下一次的起点 
    4.event.apply(this,args)执行事件
*/

//时间戳实现
//第一次事件肯定触发，最后一次不会触发
function throttle1(event,time){
    let pre=0;
    return function(...args){
        if(Date.now()-pre>time){
            pre=Date.now();
            event.apply(this,args);//注意这里参数不要写成...args了,本身apply第二个参数就是数组
        }
    }
}
//定时器实现
//第一次事件不会触发，最后一次一定触发
function throttle2(event,time){
    let timer=null;
    return function(...args){
        if(!timer){
            timer=null;
            timer=setTimeout(()=>{
                event.apply(this,args)
            },time)
        }
    }
}
//结合版——也是防抖和节流的结合版
//第一次和最后一次都会触发
function debounceNthrottle (event,time){
    let timer=null;
    let pre=0;
    return function(...args){
        if (Date.now() - pre > time) {
            clearTimeout(timer);
            timer = null;
            pre = Date.now();
            event.apply(this, args);
          } else if (!timer) {
            timer = setTimeout(() => {
              event.apply(this, args);
            }, time);
          }
    }
}

function f(args){
    console.log("event",args);
}

setInterval(()=>{
    throttle2(f,3000)("throttle"); 
},300)
//输出
//先等待3s 之后 每300ms输出event throttle
//反思：
//肯定是timer=null，并没有清楚定时器所以定时器还是在输出 ，而且为什么是先等待3s之后每300ms输出event throttle呢？
//这就要理解定时器的工作机制