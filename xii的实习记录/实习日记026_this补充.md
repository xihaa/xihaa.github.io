# xii的实习日记Day026

### 执行上下文相关补充、

```
function test(a){ 
	console.log(a);
  function a(){} 
} 
test(1); // f a(){}
函数声明提升 优先级高
```



GO(Global Object全局对象===window)>AO



```
function test(a){
	console.log(a);
	return function(){
		console.log(a);
	}
}
test(2);
//2 

```



## this补充

<img src="/Users/xii/Library/Application Support/typora-user-images/image-20200730171802728.png" alt="image-20200730171802728" style="zoom:50%;" />

首先要明白call/apply是用来实现继承的！就是不用重写而且去“偷来别人的技能”



