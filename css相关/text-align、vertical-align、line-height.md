# text-align、vertical-align、line-height

## text-align

`text-align` CSS属性定义行内内容inline-block（例如文字、图片）如何相对它的块父元素对齐。`text-align` 并不控制块元素自己的对齐，只控制它的行内内容的对齐。

⚠️这个属性是针对标签内元素的布局，也就是说要把这个属性设置在父标签中对子标签生成效果

### 常用属性

`start`

如果内容方向是左至右，则等于`left`，反之则为`right`。

`end`

如果内容方向是左至右，则等于`right`，反之则为`left`。

`left`

行内内容向左侧边对齐。

`right`

行内内容向右侧边对齐。

`center`

行内内容居中。

## vertical-align

**`vertical-align`** 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。

⚠️这个属性是行内元素相对父元素的值。要设置在进行居中等效果的子元素上。



## line-height

 高度的表现并不在于行高，而是在于内容区域和行间距。

行间距 = line-height – font-size

内容区域高度+行间距=行高

内容区域高度只与字体和字号有关系

## 参考资料

 [深入理解line-height与vertical-align](https://www.cnblogs.com/xiaohuochai/p/5271217.html)

 [[CSS学习\] line-height属性讲解](https://www.cnblogs.com/joyjoe/p/6081939.html)

