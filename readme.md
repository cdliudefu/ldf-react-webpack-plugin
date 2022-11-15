①  Compiler 和 Compilation
在开发 Plugin 时最常用的两个对象就是 Compiler 和 Compilation ，它们是 Plugin 和 Webpack 之间的桥梁。 Compiler 和 Compilation 的含义如下：

Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。 Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。Compiler 和 Compilation 的区别在于： Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。

② Compiler 编译阶段
我们要理解一次 Compiler 各个阶段要做的事，才能在特定的阶段用指定的钩子来完成我们的自定义 plugin。

1 run
启动一次新的编译

2 watch-run
和 run 类似，区别在于它是在监听模式下启动的编译，在这个事件中可以获取到是哪些文件发生了变化导致重新启动一次新的编译。

3 compile
该事件是为了告诉插件一次新的编译将要启动，同时会给插件带上 compiler 对象。

4 compilation
当 Webpack 以开发模式运行时，每当检测到文件变化，一次新的 Compilation 将被创建。一个 Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。Compilation 对象也提供了很多事件回调供插件做扩展。

5 make
一个新的 Compilation 创建完毕，即将从 Entry 开始读取文件，根据文件类型和配置的 Loader 对文件进行编译，编译完后再找出该文件依赖的文件，递归的编译和解析。

6 after-compile
一次 Compilation 执行完成。

7 invalid
当遇到文件不存在、文件编译错误等异常时会触发该事件，该事件不会导致 Webpack 退出。
