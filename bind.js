Function.prototype.mybind=function(context=window,...args1){
    if(this===Function.prototype){
        return  new TypeError('Error');
    }
    console.log(this);
    console.log(args1);
    const _this=this;
    return function F(...args2){
        console.log(this);
        // 判断是否用于构造函数
        if (this instanceof F) {
            return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
    }
}
var x = 1
var obj_1 = {
  x: 2
}
var obj_2 = {
  x: 3
}

function getX() {
  console.log(this.x)
}
//一般情况
var a = getX.mybind(obj_1)

a() 
//[Function: getX]
//[]
//全局对象
//2


// 用于构造函数的情况

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//   }
  
// var _Person = Person.mybind({});
// var p=new _Person('nn',30);
//[Function: Person]
//[]
//F {}