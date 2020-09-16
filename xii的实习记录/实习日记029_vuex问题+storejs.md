# xii的实习日记day029

## vuex 的 store存在哪？刷新页面失效？退出登录失效？请浏览器缓存失效？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。简单的来说，就是数据共用，对数据集中起来进行统一的管理。

### 核心概念

- State Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态，将所需要的数据写放这里，类似于data。
- Getter 有时候我们需要从 store 中的 state 中派生出一些状态，使用Getter，类似于computed。
- Mutation 更改 Vuex 的 store 中的状态的唯一方法，类似methods。
- Action Action 提交的是 mutation，而不是直接变更状态，可以包含任意异步操作，这里主要是操作异步操作的，使用起来几乎和mutations方法一模一样,类似methods。
- Module 当应用变得非常复杂时，store 对象就有可能变得相当臃肿。Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

### vuex 🆚浏览器缓存

`vuex` 的设计是将数据存在一个`对象树`的变量中，我们的应用（vue应用）从这个变量中取数据，然后供应用使用，当将当前页面关闭， `vuex` 中的变量会随着消失，重新打开页面的时候，需要重新生成。

浏览器缓存（cookie，localstorage等）是将数据存到浏览器的某个地方，关闭页面，不会自动清空这些数据，当再次打开这个页面时，还是能取到之前存在浏览器上的数据（cookie，localstorage等）。

**要使用 `vuex` 还是使用浏览器缓存，要看具体的业务场景。比如：像用户校验的 `token` 就可以存在 `cookie` 中，因为用户再次登录的时候能用到。而像`用户的权限数据`，这些是有一定安全性考虑，且不同用户的权限不同，放在 `vuex` 中更合理，用户退出时，自动销毁。**

## store.js插件——项目中使用

store.js 是一个兼容所有浏览器的 LocalStorage 包装器，不需要借助 Cookie 或者 Flash。store.js 会根据浏览器自动选择使用 localStorage、globalStorage 或者 userData 来实现本地存储功能。

### 常用API

```
store.set('username', 'marcus')
store.get('username')
store.remove('username')
 
store.clear()
 
store.set('user', { name: 'marcus', likes: 'javascript' })
 
var user = store.get('user')
alert(user.name + ' likes ' + user.likes)
 
// Get all stored values
store.getAll().user.name == 'marcus'
 
// Loop over all stored values
store.forEach(function(key, val) {
    console.log(key, '==', val)
})
```

