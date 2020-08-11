Function.prototype.myapply=function(context=window,args){
    if(this===Function.prototype){
        return undefined;
    }
    const fn=Symbol();
    context[fn]=this;
    let res;
    if(Array.isArray(args)){
        res=context[fn](...args);
    }else{
        res=context[fn]();
    }
    return res;
}

var x=1;
var obj={
    x:2
}
function getX(){
    console.log(this.x);
}
getX.myapply(obj,[3,4]);
//跟call的区别就是第二个参数为数组