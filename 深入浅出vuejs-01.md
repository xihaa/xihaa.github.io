# 文章概述

## 渐进式框架

<img src="/Users/xii/Library/Application Support/typora-user-images/image-20200812180520023.png" alt="image-20200812180520023" style="zoom:50%;" />

## overview

在vue中并不是所有的对象/数组都是响应式的。还有一些在代码里单纯的对象/数组。

将数据变成响应式的—》经过Observer

## vue响应式原理/变化监测

Object.defineProperty监测数据变化—>通知组件—>组件内部通过dom渲染

收集依赖=》

### 收集依赖

**读取数据触发getter=〉在getter中收集依赖watcher=〉收集在Dep中=》在setter中触发依赖**

![image-20200814104556234](/Users/xii/Library/Application Support/typora-user-images/image-20200814104556234.png)

Data通过Observer转换成了 getter/setter的形式来追踪变化。 当外界通过Watcher读取数据时，会触发getter从而将Watcher添加到依赖中。Object.defineProperty的getter中收集依赖到Dep。 当数据发生了变化时，会触发setter,从而向Dep中的依赖（Watcher ）发送通知。

Watcher接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有 可能触发用户的某个回调函数等。

```
//eg:
<template>
	<hl>({ name }}</hl>
</template>
```

#### 依赖是什么？—watcher

所谓依赖说白了就是用到name的地方，因为用到name的地方依赖name的具体值。收集依赖就是收集用到了此数据的地方。

因为使用数据的地方很多，而且类型还不一样。即有可能是模板又有可能是用户写的watch。所以从这些情况中抽象出一个类，收集依赖的时候只要收集这些类的实例就行。这个抽象出来的类就是`watcher`。当数据变化的时候先去通知中间件watcher，它再去通知对应的地方。

#### watcher原理

Watcher的原理是先把自己设置到全局唯一的指定位置（例如window.target）,然后读取 数据。因为读取了数据，所以会触发这个数据的gettero接着，在getter中就会从全局唯一的那 个位置读取当前正在读取数据的Watcher,并把这个Watcher收集到Dep中去。通过这样的方式, Watcher可以主动去订阅任意一个数据的变化。

#### 递归侦测数据内所有属性—封装Observer类

Observer类会附加到每一个被侦测的object上。 这个类的作用是将一个数据内的所有属性(包括子属性)都转换成getter/setter的形式，然后去 追踪它们的变化。

#### 侦测Object类型数据变化导致的问题

因为Object数据的变化是通过`Object.defineProperty`的getter/setter来追踪的。可以追踪属性数据变化，但是无法追踪新增属性`this.obj.name='sss'`0r删除属性`delete this.obj.name`。

为了解决这个问题vue提供了API ;vm.$set()/vm.delete()

## 虚拟dom



