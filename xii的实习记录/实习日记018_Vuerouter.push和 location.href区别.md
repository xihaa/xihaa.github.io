# xii的实习日记Day018

## Vue router.push和 location.href区别

1、使用location.href='/url'来跳转，但是刷新了页面。

2、使用history.pushState('/url')，无刷新页面，静态跳转。

3、Vue router.push('/url')来跳转，使用了diff算法，实现了按需加载，减少了dom的消耗。

4。Vue router是路由跳转或者同一个页面跳转；location.href是不同页面跳转

5.Vue router是异步加载；location.href是同步加载（❓这个等待深刻研究）



