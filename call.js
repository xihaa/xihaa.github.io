Function.prototype.mycall=function(context=window,...args){
    if(this===Function.prototype){
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
    }
    console.log(args);//数组
    const fn=Symbol();
    console.log(this);
    context[fn]=this;//按理来说this应该指向当前函数
    console.log(context);
    const res=context[fn](...args);
    delete context[fn];
    return res;
}
var x=1;
var obj={
    x:2
}
function getX(){
    console.log(this.x);
}
getX.mycall(obj,3,4);
//输出
//[Function: getX]
//{ x: 2, [Symbol()]: [Function: getX] }
//2
//进一步的说明了call函数的作用就是去“偷别人的技能”，来当成自己的属性