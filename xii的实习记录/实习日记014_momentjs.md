# xii的实习日记Day014

## [moment.js](http://momentjs.cn/)

### 常用方法

vue项目中，需要把 moment.js 挂载到全局上（即vue的原型链上），访问时直接使用 this.moment() ;

vue项目中不挂载到全局，单文件（单组件）使用：

​     ==>> import moment from "moment";   然后直接使用 moment() 

1. 初始化日期 / 时间

初始化日期：moment().format('YYYY-MM-DD');

初始化日期时间：moment().format('YYYY-MM-DD HH:mm:ss');

 

2. 格式化日期 / 时间

格式化日期：moment(value).format('YYYY-MM-DD');

格式化日期时间：moment(value).format('YYYY-MM-DD HH:mm:ss');

 

3. 加/减 ==>> 操作之前必须使用 this.moment(日期变量) ；将要操作的日期转为 moment.js 可以处理的日期时间格式

加法：this.moment().add(1, 'months').format('YYYY-MM-DD');  ==>> 当前日期加一个月并输出格式为 'YYYY-MM-DD'

加法：this.moment(startDate).add(2, 'days').format('YYYY-MM-DD')   ==>> 指定日期（startDate）加2天并输出格式                                                                    为 'YYYY-MM-DD'

减法: this.moment().subtract(7, 'days');   ==>> 当前时间减去7天

加法：this.moment(startDate).subtract(2, 'days').format('YYYY-MM-DD')   ==>> 指定日期（startDate）加减去2天并输出格式                                                                    为 'YYYY-MM-DD'

 

4. 获取星期几

获取星期几： this.moment().day() 或 this.moment(startDate).day()   ==>> 当前日期/指定日期 是星期几

 

5. 获取毫秒数

获取毫秒数：this.moment().day() 或 this.moment(startDate).valueOf()  

​           ==>> 在获取指定时间的毫秒数时，必须要有日期。即startDate包括日期时间

 

6. 获取时间差（以毫秒计算）

两个日期/时间的时差：this.moment(endTime).diff(this.moment(startTime),'days' )

​                   ==>> 开始时间和结束时间的时间差，以“天”为单位；endTime和startTime都是毫秒数

​                  this.moment(endTime).diff(this.moment(startTime), 'minutes')

​                   ==>> 开始时间和结束时间的时间差，以“分钟”为单位

​          ==>> **注意：计算时间差时，可以以 “years”、“days”、“hours”、“minutes” 以及 "seconds" 为单位输出！**

### todo:有实现+1天的功能可以去看看他的API