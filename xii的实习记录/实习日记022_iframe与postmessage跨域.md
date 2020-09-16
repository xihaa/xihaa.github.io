# xii的实习日记Day022

## component-》common-〉side 为什么在其他组件用的时候表现为〈com-side〉

因为在component-》common中写了index.js统一进行引入。为了区分其他组件作为公共组件统一引入到组件中

## iframe和post message

## iframe

### iframe介绍

**HTML内联框架元素 (`<iframe>`)** 表示嵌套的浏览上下文。

它能够**将另一个HTML页面嵌入到当前页面中**。

```
<iframe src="demo.html"></iframe>
```

#### 常用属性

1.height:框架作为一个普通元素的高度，建议在使用css设置。

2.width:框架作为一个普通元素的宽度，建议使用css设置。

3.name:框架的名称，window.frames[name]时专用的属性。

~~4.scrolling:框架的是否滚动。yes,no,auto。(HTML5已废弃)~~

5.src：内框架的地址，可以使页面地址，也可以是图片的地址。

6.allow="fullscreen" 全屏模式/allowfullscreen

7.**`sandbox`**:该属性对呈现在 iframe 框架中的内容启用一些额外的限制条件。

#### 同域/跨域iframe

```
A:<iframe id="mainIframe" name="mainIframe" src="/main.html" frameborder="0" scrolling="auto" ></iframe>

B:<iframe id="mainIframe" name="mainIframe" src="http://www.baidu.com" frameborder="0" scrolling="auto" ></iframe>
```

当同域时，如A，则父子组件可以通过iframe的API进行相互改写

当跨域时，父页面没有权限改动子页面,只可以实现页面的跳转

## 同域iframe

### 获取iframe中的内容

1. API

   有了 DOM [`HTMLIFrameElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement) 对象，脚本可以通过 [`contentWindow`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement/contentWindow) 访问内联框架的 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象。 [`contentDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement/contentDocument) 属性则引用了 `<iframe>` 内部的 `document` 元素，(等同于使用contentWindow.document），但IE8-不支持。

   ```
    var iframe = document.getElementById("iframe1");
    var iwindow = iframe.contentWindow;
    var idoc = iwindow.document;
    //Or
    var idoc2=iframe.contentDocument
   ```

2. 利用name属性

   给iframe标签添加name属性，再通过window对象获取

   ```
   //获取的也是window对象
   window.frames['ifr1']===window
   ```

### 获取父级内容

```
window.parent 获取上一级的window对象，如果还是iframe则是该iframe的window对象
window.top 获取最顶级容器的window对象，即，就是你打开页面的文档
window.self 返回自身window的引用。可以理解 window===window.self
```

## 跨域iframe

### 设置domain

同源策略会判断两个文档的原始域是否相同来判断是否跨域。这意味着只要把这个值设置成一样就可以解决跨域问题了。

在此我将domain设置为一级域名的值，a页面url为a.demo.com，a页面中iframe引用的b页面url为b.demo.com，具体设置为

```
//document.domain作用是获取/设置当前文档的原始域部分
document.domain = 'demo.com'
//a.html
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>A</title>
</head>
<body>
<textarea id="message">这是高层的密码！</textarea><br/>
<button id="test">看看员工在说什么</button><br/><br/><br/>员工们：<br/>
<iframe src="http://b.xxx.com/js/crossdomain/demo/b.htm" width="500" height="300" id="iframe"></iframe>
<script>

   document.domain = "demo.com";

   document.getElementByI d("test").onclick = function(){
        alert(document.getElementByI d("iframe").contentWindow.document.getElementByI d("message").value);
    }
</script>
</body>
</html>
```
```
//b.html
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>JSONP方式</title>
<script type="text/javascript" src="/js/jquery-1.5.1.min.js"></script>
</head>
<body>
<textarea id="message">这是员工的密码！</textarea><br/>
<button id="test">看看领导在说什么</button><br/>
<script>
    document.domain = "demo.com";
    document.getElementByI d("test").onclick = function(){
        alert(parent.document.getElementByI d("message").value);
    }
</script>
</body>
</html>
```

> 区分主域和子域：
>
> 主域名：指一个人通过域名注册商注册的那个名字（domain name），它在注册商的系统中有个唯一的域名ID。
>
> 如t.sina.com.cn的主域名就是sina.com.cn，www.sf.gg的的主域名就是sf.gg
>
> 子域名就是指主域名的下一级，比如a.com是个主域名，那么bbs.a.com、mail.a.com这类的域名就是子域名，子域名又叫多级域名。

### postMessage

window.postMessage方法可以安全地实现跨源通信，写明目标窗口的协议、主机地址或端口就可以发信息给它。

```
// b页面
parent.postMessage(
    value,
    "http://a.demo.com"
);
复制代码
// a页面
window.addEventListener("message", function( event ) {
    if (event.origin !== 'http://b.demo.com') return;
    toggleFullScreen()
 });
```

### vue项目和iframe项目通信 

```
//mounted时添加监听，判断来源
// 监听
window.addEventListener('message', receiveMessage);
// 移除
window.removeEventListener('message', receiveMessage);

const receiveMessage = e => {
  // 可使用 origin 判断
  if (e.data.from == 'vr') {
    if (e.data.type == 'edit') {
      // TODO
    }
  }
};
```

### iframe特性

iframe的特性都是依赖参数配置实现的，现整理如下有用的属性：

| 属性                | 解释                                                         | 备注 |
| ------------------- | ------------------------------------------------------------ | ---- |
| allow               | 可以为iframe指定[特性策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) |      |
| allowfullscreen     | 是否允许iframe调用requestFullscreen()方法激活全屏模式，这个属性等同于allow属性的这个配置：`allow="fullscreen"` |      |
| allowpaymentrequest | 是否允许一个跨域的iframe调用[支付请求API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API) |      |
| csp                 | 内嵌的资源强制实行同源策略                                   |      |
| height              | iframe的高度，默认150px                                      |      |
| importance          | 标识在iframe属性src指示的资源的下载优先级，有`auto`/`high`/`low`三个等级 |      |
| name                | 内嵌的浏览内容的目标名称                                     |      |
| referrerpolicy      | 指示当获取frame的资源的时候携带的referrer，默认是`no-referrer-when-downgrade`，也就是仅当发生协议降级（如 HTTPS 页面引入 HTTP 资源，从 HTTPS 页面跳到 HTTP 等）时不发送 Referrer 信息。这个规则是现在大部分浏览器默认所采用的； |      |
| sandbox             | 在frame上的内容上运用额外的一下限制，具体哪些字段我们下面详细解释 |      |

## iframe安全性

[IFrame安全问题解决办法（跨框架脚本(XFS)漏洞](https://blog.csdn.net/u011121146/article/details/52872143?utm_medium=distribute.pc_relevant_bbs_down.none-task-blog-baidujs-1.nonecase&depth_1-utm_source=distribute.pc_relevant_bbs_down.none-task-blog-baidujs-1.nonecase)

跨框架脚本(XFS)漏洞使攻击者能够在恶意页面的 HTMLiframe 标记内加载易受攻击的应用程序。此漏洞设计点击劫持攻击，以实施钓鱼式攻击、框架探查攻击、社会工程攻击或跨站点请求伪造攻击。其他网站会在他的iframe中调用我的网站内容，来截取他人的点击事件或者窃取他人敏感信息。

#### 修复方法

浏览器供应商已使用 X-Frame-Options标头引入并采用基于策略的缓解技术。如果站点包含在 iframe内，则开发人员可以使用此标头指示浏览器执行相应操作。开发人员必须将X-Frame-Options标头设置为以下允许的值之一:

​    · DENY拒绝设置页面框架的所有尝试

​    · SAMEORIGIN仅当另一页面与设置框架的页面属于同一源时，该另一页面才能充当此页面的框架

​    · ALLOW-FROM源开发人员可以在源属性中指定受信源列表。只有源中的页面才允许在 iframe内部加载此页面

​    开发人员还必须使用客户端 frame busting JavaScript作为对 XFS的保护。这样也将保护不支持X-Frame-Options标头的旧版本浏览器用户免受点击劫持攻击。

## iframe使用场景

1. 插入外部的与项目无强关联性的别人的页面

2. 插入广告

3. ajax上传文件。

4. 在上传图片时，不用flash实现无刷新。

   





