# xii的实习日记Day027

## 有关高质量代码

### 可扩展性

比如你接到一个功能，这个功能要区分pc端/移动端，在移动端里实现功能。

❌你要做的不仅仅是封装出一个函数去实现这个功能，在函数里进行判断是pc/mobile，然后在document.ready的时候调用。

🙆正确的做法应该是在document.ready里先判断是pc/mobile，然后封装mobile_init()函数，在mobile_init()中实现功能。这样的话，别人下次来看的时候一下子就知道你做的是移动端的逻辑。做pc端逻辑的时候完全不用看你的函数。可扩展性高，也好维护。

## 有关document文档流

**`Document`** 接口表示任何在浏览器中载入的网页，并作为网页内容的入口，也就是[DOM 树](https://developer.mozilla.org/en-US/docs/Using_the_W3C_DOM_Level_1_Core)。DOM 树包含了像 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body) 、[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table) 这样的元素，以及[大量其他元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)。它向网页文档本身提供了全局操作功能，能解决如何获取页面的 URL ，如何在文档中创建一个新的元素这样的问题。

<iframe class="live-sample-frame inheritance-diagram-frame" frameborder="0" height="70" id="frame_inheritance_diagram" src="https://mdn.mozillademos.org/zh-CN/docs/Web/API/Document$samples/inheritance_diagram?revision=1625412" width="600" style="margin: 0px; padding: 0px; border: 0px; max-width: 100%; color: rgb(51, 51, 51); font-family: Arial, x-locale-body, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: -0.04448px; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;"></iframe>



`Document` 接口描述了任何类型的文档的通用属性与方法。根据不同的文档类型（例如[HTML](https://developer.mozilla.org/en-US/docs/HTML)、[XML](https://developer.mozilla.org/en-US/docs/XML)、[SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)，...），还能使用更多 API：使用 `"text/html"` 作为内容类型（content type）的 HTML 文档，还实现了 [`HTMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDocument) 接口，而 XML 和 SVG 文档则（额外）实现了 [`XMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLDocument) 接口。

### 问题

vr代码中动态引入静态js资源使用了document.write，结果3d效果不加载

### 解决

### [document.write,innerHTML,createElement三者的区别](https://www.cnblogs.com/zycs/p/12600818.html)

