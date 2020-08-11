# macOS-yarn安装Taro遇到的命令不生效问题

## 问题描述

执行命令`yarn global add @tarojs/cli`成功之后输入taro命令不生效

```
success Installed "@tarojs/cli@3.0.6" with binaries:
      - taro
✨  Done in 129.63s.
xii:~ xii$ taro
-bash: taro: command not found
```

## 可能原因

未将yarn添加到环境变量

## 解决方案

1.第一次配置环境变量，可以使用“touch .bash_profile” 创建一个.bash_profile的隐藏配置文件

```
$ touch .bash_profile
```

2.打开配置

```
$ open -e .bash_profile
```

3.查看yarn的安装地址（不用也行）

```
$ yarn global bin
> /Users/xxxx/.yarn/bin
```

4.添加环境变量 之后保存文件

```
export PATH="$PATH:`yarn global bin`"
```

5.执行文件

```
source .bash_profile
```



再运行taro

<img src="/Users/xii/Library/Application Support/typora-user-images/image-20200731115420371.png" alt="image-20200731115420371" style="zoom:50%;" />

