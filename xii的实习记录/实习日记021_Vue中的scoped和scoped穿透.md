# xii实习日记Day021

## [Vue中的scoped和scoped穿透](https://segmentfault.com/a/1190000015932467)

### 什么是scoped

```
在Vue文件中的style标签上有一个特殊的属性，scoped。当一个style标签拥有scoped属性时候，它的css样式只能用于当前的Vue组件，可以使组件的样式不相互污染。如果一个项目的所有style标签都加上了scoped属性，相当于实现了样式的模块化。
```

### scoped的实现原理

Vue中的scoped属性的效果主要是通过PostCss实现的。以下是转译前的代码:

```
<style scoped lang="less">
    .example{
        color:red;
    }
</style>
<template>
    <div class="example">scoped测试案例</div>
</template>
```

转译后:

```
.example[data-v-5558831a] {
  color: red;
}
<template>
    <div class="example" data-v-5558831a>scoped测试案例</div>
</template>
```

既:PostCSS给一个组件中的所有dom添加了一个独一无二的动态属性，给css选择器额外添加一个对应的属性选择器，来选择组件中的dom,这种做法使得样式只作用于含有该属性的dom元素(组件内部的dom)。

> 总结：scoped的渲染规则：

1. 给HTML的dom节点添加一个不重复的data属性(例如: data-v-5558831a)来唯一标识这个dom 元素
2. 在每句css选择器的末尾(编译后生成的css语句)加一个当前组件的data属性选择器(例如：[data-v-5558831a])来私有化样式

### .scoped穿透

scoped看起来很好用，当时在Vue项目中，当我们引入第三方组件库时(如使用vue-awesome-swiper实现移动端轮播)，需要在局部组件中修改第三方组件库的样式，而又不想去除scoped属性造成组件之间的样式覆盖。这时我们可以通过特殊的方式穿透scoped。

> stylus的样式穿透 使用>>>

```
    外层 >>> 第三方组件 
        样式
        
   .wrapper >>> .swiper-pagination-bullet-active
    background: #fff
```

> sass和less的样式穿透 使用/deep/

```
    外层 /deep/ 第三方组件 {
        样式
    }
    .wrapper /deep/ .swiper-pagination-bullet-active{
      background: #fff;
    }
```