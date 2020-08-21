# Vue缓存页面实现—keep alive&遇到的问题

## 场景

项目是单页面vue应用，有多层路由嵌套。

### 需求

是要在列表页跳到3D详情页回退时保留列表页的搜索信息和浏览位置，但是列表页跳到其他页面，比如编辑页或者其他菜单路由跳转时不保存信息。即实现单页面路由跳转后页面的动态缓存。

### 具体项目情况

列表页分为大图列表、table列表页、收藏夹列表页等等模式，可进行点击进入3d详情页或其他操作。3D详情页跟列表页是不同的布局，会涉及到路由切换的问题。经调研，决定使用keep alive的方式实现。

<img src="/Users/xii/Library/Application Support/typora-user-images/image-20200716102734963.png" alt="image-20200716102734963" style="zoom: 50%;" /><img src="/Users/xii/Library/Application Support/typora-user-images/image-20200716102803326.png" alt="image-20200716102803326" style="zoom:50%;" />

## keep alive介绍

keep-alive是一个vue内部定义的**抽象组件**(它有一个属性 `abstract` 为 true)：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

### 基本原理

我们知道了 `<keep-alive>` 组件是一个抽象组件，它的实现通过自定义 `render` 函数并且利用了插槽，并且知道了 `<keep-alive>` 缓存 `vnode`，了解组件包裹的子元素——也就是插槽是如何做更新的。且在 `patch` 过程中对于已缓存的组件不会执行 `mounted`，所以不会有一般的组件的生命周期函数但是又提供了 `activated` 和 `deactivated` 钩子函数。另外我们还知道了 `<keep-alive>` 的 `props` 除了 `include` 和 `exclude` 还有文档中没有提到的 `max`，它能控制我们缓存的个数。

## keep alive 应用

### 动态组件中的应用

```
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <component :is="cur="></component>
</keep-alive>
```

### vue-router中的应用

```
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <router-view></router-view>
</keep-alive>
```

`include`定义缓存白名单，keep-alive会缓存命中的组件；`exclude`定义缓存黑名单，被命中的组件将不会被缓存；`max`定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。

## 钩子函数

初次进入时：

1. `created` > `mounted` > `activated`
2. 退出后触发 `deactivated`

再次进入：

1. 只会触发 `activated`

事件挂载的方法等，只执行一次的放在 `mounted` 中；组件每次进去执行的方法放在 `activated` 中

## 源码简析

`<keep-alive>` 在 `created` 钩子里定义了 `this.cache` 和 `this.keys`，本质上它就是去缓存已经创建过的 `vnode`。它的 `props` 定义了 `include`，`exclude`，它们可以字符串或者表达式，`include` 表示只有匹配的组件会被缓存，而 `exclude` 表示任何匹配的组件都不会被缓存，`props` 还定义了 `max`，它表示缓存的大小，因为我们是缓存的 `vnode` 对象，它也会持有 DOM，当我们缓存很多的时候，会比较占用内存，所以该配置允许我们指定缓存大小。

`<keep-alive>` 直接实现了 `render` 函数，执行 `<keep-alive>` 组件渲染的时候，就会执行到这个 `render` 函数。

第一步：获取keep-alive包裹着的第一个子组件对象及其组件名；

第二步：根据设定的黑白名单（如果有）进行条件匹配，决定是否**缓存**。不匹配，直接返回组件实例（VNode），否则执行第三步；

第三步：根据组件ID和tag**生成缓存**Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该`key`在`this.keys`中的位置（更新key的位置是实现LRU置换策略的关键），否则执行第四步；

第四步：在`this.cache`对象中存储该组件实例并保存`key`值，之后检查缓存的实例数量是否超过`max`的设置值，超过则根据**LRU置换策略删除最近最久未使用的实例**（即是下标为0的那个key）。

第五步：将该组件实例的`keepAlive`属性值设置为`true`。

## keep alive在项目中的应用方案

可以看出列表页和3d详情页从根组件之后就是完全不一样的布局，所以要在app.vue中设置动态keep alive

```
<keep-alive :include="include">
     <router-view></router-view>
</keep-alive>
```

```
watch: {
    //控制只是从3d展示详情页返回才会缓存
    $route(to, from) {
      if (!this.include.includes('basic')) {
        this.include.push('basic');
      }
      if (to.matched[0].path != '/3d') {
        let index=this.include.indexOf('basic');
        if (index!=-1) {
          this.include.splice(index, 1);
        }
      }
      console.log('include', this.include);
    }
  }

```

```
//记录浏览位置
activated() {
    //重新设置formInfo.type
    this.formInfo.type = this.formInfo.returnType || 'grid';
    // this.$forceUpdate();
    if (this.gridScrollTop) {
      this.$nextTick(() => {
        this.$refs.gridRef.$refs.gridContentRef.scrollTop = this.gridScrollTop;
      });
    }
  },
  //keep alive页面退出记录滑动距离
beforeRouteLeave(from, to, next) {
    if (this.$refs.gridRef) {
      this.gridScrollTop = this.$refs.gridRef.$refs.gridContentRef.scrollTop;
    }
    next();
  }
```

## 遇到的问题

### 使用include出现的问题:路由的名称name和组件名不同

原因：include和exclude是通过**组件名**来控制显示的

### 多层嵌套的router-view 三级以上include/exclude 无效果

  情况：如果你父组件设置了keep alive，想通过include/exclude动态控制三层router-view 嵌套以上的子组件是没效果的

### v-if放在`<router-view>`中会导致子组件不显示

解决办法：放在外层`<keep-alive>`中

```
<keep-alive :include="include" v-if="!isOff">
     <router-view></router-view>
</keep-alive>
```

### 项目相关问题

- keep alive放在在外层布局通过include控制时，发现grid组件以及搜索项不显示。

原因：在从详情页切换回大图列表页时，formInfo.type==='preview3d',resourceIndex中没有设置此种类型grid组件、搜索项、table组件显示。

解决方式：根据formInfo.returnType去判断重新设置显示grid还是list。

- 由于上述解决方法引发的问题—因为在大图列表页切换到详情页时formInfo.type==='preview3d'这样就导致grid在详情页时不会显示。在从详情页返回时因为keep alive的生命周期问题。通过this.$refs是拿不到组件的，显示为null，即actived时组件还未生成。所以还是要设置grid组件在详情页时显示

- Poptip简介组件持续缓存，在详情页还会显示

  解决方式：增加通过this.$route的内容动态控制Poptip组件的现实



## 参考资料
[彻底揭秘keep-alive原理](https://juejin.im/post/5cce49036fb9a031eb58a8f9#heading-5)


