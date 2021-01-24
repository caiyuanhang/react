额外知识点：
1、技术选型：关于项目的技术选型一般是项目的负责人来进行。

-------------------

react最新版本：17.0.1

官方文档：https://zh-hans.reactjs.org/


一、react特点：
1、声明式设计和函数式编程：
1）声明式编程注重结果（把别人的东西拿过来用）；
2）命令式编程注重过程（一行一行代码去执行）
3）函数式编程：利用函数的参数，返回值等去实现功能的编程方式。

2、高性能。react通过对DOM的模拟并配合diff算法，最大程度地减少与DOM的交互，从而提高性能。

3、组件化开发。通过React构建组件，使得代码更容易得到复用，能够高效率的应用在大项目的开发中。

4、单向响应的数据流。react中的数据是单向自顶向下传递的，父组件数据的更新会自动传递到子组件，但子组件的数据更新不会影响父组件，也不能在子组件修改父组件传入的数据。
注意：要注意数据流和数据绑定的区别，数据流是组件自上而下的传输，数据绑定是跟视图层、数据层有关系。

5、JSX扩展。JSX是JavaScript语法的扩展，react开发不一定使用JSX，但我们建议使用它。（浏览器不支持JSX，浏览器会忽略掉不识别的script标签。）
注意：
1）javascript代码和jsx代码不兼容，使用jsx的script标签都要加上type="text/babel"。（babel是针对于浏览器环境的版本，可将JSX、ES6+等语法编译成浏览器支持的代码。注意：在浏览器中使用Babel来编译JSX为实时编译，效率非常低，一般只用于演示）
2）jsx代码中，同为js关键字的html属性不能直接使用。比如：
    - class  -> className
    - for  -> htmlFor
3）属性使用驼峰命令法
    - onclick -> onClick
    - onkeyup -> onKeyUp
4）标签必须要闭合。
5）在JSX中js代码必须写在{}中，但是var、let、const不能写在{}里面。
6）style属性必须要使用{}对象的形式。


二、模块化开发规范：
1、commonJS    NodeJS
引入：require()
导出：module.exports、exports

2、AMD  require.js / CMD   sea.js
引入：require()
导出/定义模块：define()

3、ESModule  ECMAScript（一个文件就是一个模块）
引入：import
导出：export

umd - 通用模块（支持AMD/CMD/全局引入）：在html中引用react和react-dom，是通过umd下面的react.development.js和react-dom.development.js来引入的。


三、使用react：
1、引入：
    - react.development.js；
    - react-dom.development.js；
    - browser.js（babel针对于浏览器环境的版本，可将JSX、ES6+等语法编译成浏览器支持的代码，使用的时候把script改成<script type="text/babel"></script>）

2、渲染：ReactDOM.render(vNode,target)；
    - vNode：通过React.createElement()创建。
（数组可以直接渲染到页面上，但是对象不能渲染上来。）

3、创建节点：React.createElement(type,props,children)；
    - props：属性，如果多个属性可以使用对象的形式包裹。
    - children：子节点，可以使用React.createElement()，如果同一层级有多个元素，可以使用数组形式[]添加多个节点。


四、react组件：组件名必须大写开头、只能包含一个顶层标签。
分类：函数组件、类组件。（组件可以使用单标签，也可以使用双标签）
1、函数组件（无状态组件/UI组件）：必须有返回值。（显示在页面的内容）
2、类组件（状态组件/容器组件）： 必须继承自React.Component，必须包含一个render函数，render函数内部必须有返回值。
    - 类如果继承自某一对象，并存在constructor，则必须在constructor中手动调用super，super()代表继承父类的属性和方法。还有调用super()后，才能在类中使用this。
    - state（状态/数据）
        1）获取：this.state；
        2）修改：this.setState（谁的数据谁修改，数据修改是覆盖式的修改）
        3）修改state后执行某些操作：可以在setState的第二个回调函数里面设置，该回调函数会在setState设置成功，且组件重新渲染后调用。
        this.setState({},()=>{
            在这里执行state修改后的一些操作。
        })
        4）拿到上一次的state值，做一些修改后再返回state，此时setState的第1个参数可以是一个回调函数，而不是对象，但是回调函数一定要return一个对象。
        this.setState((preState)=>{
            return {}
        },()=>{})
    注意：
    1）setState是异步的，调用setState()并不会马上修改state，而是进入一个后台管理队列里，所以不能在组件内通过this.state.xx=xx直接修改状态，因为修改后还是会被队列中的setState()覆盖替换。（为什么是异步操作呢？其实是为了性能优化，当有几个setState的时候，如果第1个setState和最后1个setState一样，那么不管你中间的setState有多少次状态改变，都会认为只有1次，这样可以减少state改变后页面的更新次数，优化性能。可以通过setState之后马上打印state就可以看到，打印的state不是setState执行后的值。）
    2）多次setState()会自动合并，React内部会自动进行state的对比，得到最终结果后才渲染视图，所以并不用担心多次setState之后带来的性能问题。


建议：优先使用函数组件，函数组件比较简单，类组件是一个类，类在实际使用过程中有一个实例化的过程，而且类组件还有各类生命周期函数，这样相比之下，函数组件的性能更好点。


五、案例：todolist
1、状态提升：当有多个子组件需要用到相同的数据时，把数据放到多个组件共同的父级。

2、组件通讯：
1）父 -> 子：props
    - 给子组件定义属性并传递数据；
    - 在子组件通过"props.定义属性"使用，获取props；
        - 函数组件：函数的第一个形参为props
        - 类组件：通过this.props获取，使用类组件的方式接收props，需要在constructor和super的形参中接收props属性。
        - children：一般用于组件封装。（可用于传递一个函数到子组件的children处调用，然后把子组件中的一些值通过传参的方式传回来定制化实现组件。）
            children为以下值的时候，代表不用的意思：
            - undefined：单标签或双标签内容
            - Object：只有一个子元素
            - Array：多个子元素

2）子 -> 父：也是props，利用props把父组件的方法传到子组件中执行。
    - 给子组件定义属性并传递方法；
    - 子组件执行传入的方法，并传递参数。
3）在react里面没有兄弟 -> 兄弟传输数据的方式，遇到这种情况可以把数据放到它们共同的父级。

3、深层次组件通讯：
1）逐层传递（不推荐）
2）使用Context实现深层次组件的传递。
    - 创建context：const Context = React.createContext(defaultData)；（这里可以设置默认的共享数据，只有在value没有共享数据源时才会使用这里的默认值）
    - 父组件操作：<Context.Provider value={数据源}></Context.Provider>，通过value共享数据；
    - 子组件操作：数据使用Consumer接收，Consumer可以在多个地方使用。
    方式1：Consumer里面必须是一个回调函数：<Context.Consumer>{ (value)=>{} }</Context.Consumer>（这种方式适用于函数组件和类组件）
    方式2：this.context接收数据（只能用在类组件中）：组件.contextType = Context；
    备注：Context.Provider、Context.Consumer和React.Fragment一样，不会渲染出具体的标签。
    方式3：只适用于函数组件————useContext

4、事件绑定：事件名必须使用驼峰命名法。
1）事件处理函数默认没有this指向，需要手动绑定：
    - 绑定1：在render中使用事件处理函数的地方绑定，this.addItem.bind(this)；
    - 绑定2：在constructor中绑定（推荐），this.addItem = this.addItem.bind(this)。
2）event事件对象
    - 事件处理函数的最后一个参数就是event。
    - （这里需要注意）target和currentTarget的区别：target是事件源对象（触发事件的元素）、currentTarget是绑定事件的元素。

5、针对表单元素：
    1）非受控组件：通过节点操作表单元素的值；
    2）受控组件：利用React组件的状态控制表单元素的值。

6、ref：在react中也可以使用ref用法来操作DOM元素。具体使用如：
    方式1：通过回调函数的方式使用Ref（适用于类组件）。
    <button ref={el=>this.el=el}></button>;
    
    方式2：通过React.createRef()创建对象的方式使用Ref（类、函数组件均适用）。
    const myRef = React.createRef();
    <input ref={this.myRef} />;

    方式3：通过useRef()创建对象的方式来适用Ref（适用于函数组件）
    const myRef = useRef(null);
    <input ref={this.myRef} />;

7、react组件什么时候会刷新？
    1）state改变的时候；
    2）props改变的时候；
    3）父组件刷新的时候；
    4）强制刷新：this.forceUpdate()，就是不经过shouldComponentUpdate，直接执行后面的componentWillUpdate、render和componentDidUpdate。（一般不推荐使用，除非特殊需求）


六、webpack的搭建和常用配置
0、什么是webpack？
webpack可以看作是模块打包机，它做的事情是：分析你的项目结构，找到所有的模块依赖，把一些不被浏览器支持的特性（如：Sass、TypeScript、ES6、JSX等）转换和打包为浏览器能识别的格式文件。
备注：webpack可以把html、css、js，甚至图片都能打包成一个JS文件，也可以按类别分开打包。

1、为什么使用webpack？
1）模块化开发：可以把复杂程序细化为小文件；
2）ES6转为ES5：让我们可以使用Javascript的新特性，并且能转化为浏览器识别的版本；
3）预处理：Sass、Less等CSS预处理器；
4）预编译：Vue单文件组件编译；
5）JSX语法编译等

2、webpack和gulp的区别？
1）gulp的工作方式：如要使用编译、合并、压缩等任务，则需要用户编写一个个具体的任务，然后运行这些任务来达到相要的效果。（按任务步骤一步一步实现）。
    - gulp是基于任务的构建工具。
2）webpack的工作原理：把项目当作一个整体，通过入口文件（如：index.js）分析整个项目结构，找到所有依赖模块，并利用配置好的loader、plugin处理这些模块，最后打包成一个或多个浏览器可识别的文件。
    - webpack是基于配置的构建工具。

3、从0搭建基于webpack的React环境
1）创建目录：
    - dist（用来放置编译后的文件）；
    - public（网站根目录，静态资源也可以放在这边）；
    - src（包含：assets、components、pages、utils等等）
    - webpack.config.js（webpack配置文件遵循commonJS规范模块，注意：要放在项目根目录下）
    - package.json；
2）安装依赖：
    - react & react-dom
    - webpack & webpack-cli & webpack-dev-server（注意：在安装webpack-cli最新版本会出现一个报错情况，此时只需要把版本换诚3.3.12就可以解决报错）
    - @babel/core（是babel-loader和@babel/preset-react依赖的核心） & babel-loader & @babel/preset-react（把JSX解析成JS）
    - html-webpack-plugin（react是单页面应用，借用html-webpack-plugin生成html页面）
3）修改package.json文件里的script属性。
```js
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "webpack-dev-server",
        "build": "webpack",
        "start": "npm run dev"
    }
```
——————以上是基础的依赖。
3）webpack的常用配置：
```javascript
   // 引入html-webpack-plugin插件，方便配置，该插件作用是生成HTML页面。 
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   // 引入nodeJS中的path，path下面resolve方法可以把路径变成绝对路径。   
   const path = require("path");

   module.exports = {
    // 1、配置入口文件。
    entry: "./src/main.js",

    // 2、输出设置。
    output: {
        // 1）打包后文件存放的路径。注意：这里需要使用绝对路径，nodeJS中path下面的resolve方法可以把路径变成绝对路径。
        path: path.resolve("./dist"),
        // 2）打包后输出的文件名。[name]：以入口名作为文件名，[hash]添加hash值。
        filename: "[name]-[hash:5]-bundle.js",
        // 3）publicPath：打包后index.html代码中文件引用的前缀。（如：src、href等）    
    },

    // 3、配置loader，在webpack中，每一种文件的编译都需要特定的加载器。
    module: {
        // 配置的规则。每一个规则都要使用test去匹配对应的文件，test一般使用正则来匹配。
        // 注意：加载器是有先后顺序的，loader的执行是从后往前的。
        rules: [ 
            {
                // 比如，这里配置针对js的加载器（ES6+转成ES5，JSX转成JS）
                test: /\.js$/,
                // 配置规则时，如果要更细节的配置需要写成{}形式，如果不需要，直接把loader的名字写在[]中即可。
                // 1）简单配置
                // use: ['babel-loader']
                // 2）详细配置
                use: [{
                    // loader的名称。
                    loader: 'babel-loader',  // 普通JS的编译靠的就是babel-loader了。
                    // 配置loader的参数
                    options: {
                        // @babel/preset-react用于把JSX转成JS
                        presets: ['@babel/preset-react'],
                        // 还有配置插件，后续再讲。
                        // plugins:
                    },
                }],
            }, {
                // 配置css加载器（style-loader、css-loader）才可以在jsx或js中引入css文件。
                test: /\.css$/,
                // 加载器会先加载和解析css-loader文件，解析完后接着加载style-loader,生成html里面的style标签，最后将css文件里面的内容同步到style标签里面。
                use: ["style-loader", "css-loader"]
            }, {
                // 配置sass加载器（sass-loader、node-loader）才能在jsx或js中引入css文件。sass-loader是依赖于node-sass来解析语法的，sass-loader只是解析scss文件的语法规则生成对应的css文件，所以加载器也需要依赖css-loader和style-loader。
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },

    // 4、配置插件，配置插件需要使用import引入才可使用。
    plugins: [
        // 使用导入的html-webpack-plugin插件。
        new HtmlWebpackPlugin({
            // 1）模板路径，再没有使用模板路径的时候，new HtmlWebpackPlugin默认生成一个空百的html页面。
            template: './public/index.html',
            // 2）输出文件名（默认index.html）
            filename:"index",
            // 3）设置html文件的title属性
            // title:
            // 4）是否自动往引入的CSS和JS中添加Hash（默认false）
            // hash:
            // 5）提取公共部分文件
            // chunks:
        }),
    ],

    // 5、配置测试服务器。
    devServer: {
        // 1）服务器路径（默认为项目的根目录）
        contentBase: './public',
        // 2）指定端口（默认为8080端口）
        port: 2005,
        // 3）是否自动刷新（默认为true）
        hot: true,
        // 4）是否自动打开浏览器(默认false)
        open: false,
        // 5）服务器代理（一般用于解决ajax跨域问题）
        proxy: {
            "/api": {
                // 代理目标服务器
                target: "http://api.douban.com/v2/movie",
                // 变化来源
                changeOrigin: true,
                // 替换部分路径
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
        // 6）服务器访问权限（默认通过localhost访问，修改为0.0.0.0可以通过本机IP访问）
        host: "localhost" || "0.0.0.0", 
    },

    // 6、设置扩展名（扩展名不宜写太多，容易导入webpack编译变慢）。
    resolve: {
        extensions: [".js", ".jsx"],
    }
   }
```

4、npm script
npm脚本在我们package.json下的scripts配置中。
```javascript
    "scripts": {
        // 运行dev就是在本地通过webpack-dev-server插件创建一个服务器，并启动我们的项目。
        "dev": "webpack-dev-server",
        "build": "webpack",
        // 使用start，可以直接npm start
        "start": "npm run dev",
    }
```


七、生命周期函数（钩子函数）
生命周期：组件从创建到销毁的过程（有生命周期意味着有创建和实例化过程，所以生命周期函数只能在类组件中使用）。
备注：生命周期函数和render函数中都可以直接使用this。

1、初始化阶段：
```javascript
    // constructor在类组件中可以不写，但不写不代表没有。适用于：改变函数的this，写state的初始值。
    constructor(){}

    // 初始化阶段中还包含两个部分：getDefaultProps（获取默认的props）、getInitialState（获取初始化的state）
```

2、挂载阶段：
1）componentWillMount：挂载前。（不推荐使用，此生命周期名字将在18.x版本之后弃用，改为使用UNSAFE_componentWillMount）
2）componentDidMount：挂载后。可用于发送ajax请求、设置定时器、延时器

3、更新阶段：
1）componentWillUpdate：更新前。（不推荐使用，此生命周期名字将在18.x版本之后弃用，改为使用UNSAFE_componentWillUpdate）
2）componentDidUpdate：更新后。可用于状态改变后做的一些操作。

4、销毁阶段：componentWillUnmount。可用于取消ajax请求、取消定时器等操作。

5、特殊生命周期函数。
1）componentWillReceiveProps：父组件传递的数据props改变时触发。（不推荐使用，此生命周期名字将在18.x版本之后弃用，改为使用UNSAFE_componentWillReceiveProps）
2）shouldComponentUpdate：state改变时触发，必须返回一个Boolean（默认返回true），一般用于性能优化。
```javascript
    shouldComponentUpdate(nextProps,nextState){
        // this.state表示当前状态，nextState表示将要修改的状态。
        // this.props表示当前父组件传入的值，nextProps表示父组件数据修改后传入的值。
        // 可以通过判断nextState或nextProps是否符合某种规则，而对组件的渲染进行优化。

        // 默认返回true
        return nextState;
    }
```


八、组件性能优化方案
1、在web页面中，节点操作无法避免，但可以减少。

2、父组件刷新的时候，如果当前组件依赖的props数据没有改变，可以使用shouldComponentUpdate来优化，通过对比this.props和nextProps来判断组件依赖的props是否发生改变，进而对当前组件做优化（无变化则不更新当前组件，有变化才更新），或者使用PureComponent来优化（请看下面3）。

3、使用PureComponent来优化。PureComponent与Component的区别：PureComponent内部做了shouldComponentUpdate优化，在依赖的props或state没有发生改变的时候，组件是不会刷新的。
```js
    import { PureComponent } from "react";
    // 如果业务需求是要避免组件依赖的props和state没有改变也刷新的情况，那使用PureComponent就可以了，但如果是复杂的业务场景，就还是需要使用shouldComponentUpdate来优化。
    class Home extends PureComponent {};
```


九、React-router
1、React-router5（简称RR4，5.2.0版本）遵循React万物皆组件的设计理念，其内部只是一堆提供了导航功能的组件，具有声明式（引入即用）、可组合性的特点。

2、组成部分
1）react-router（核心）：是浏览器和原生应用的通用部分，不提供dom操作进行跳转的api。
2）react-router-dom：是基于浏览器环境的开发。

3、安装。如果是浏览器开发就只需要安装react-router-dom，因为安装react-router-dom时，react-router会被作为依赖自动安装。
```js
    npm install react-router-dom -D
```

4、react-router的使用。
1）所有的路由组件均需从react-router-dom中引进来。
```js
    import { BrowserRouter, HashRouter, Route, Redirect, Switch, Link, NavLink, withRouter} from "react-router-dom";
```
2）路由类型。
```js
    // 第1个：BrowserRouter是react-router-dom增加的组件，利用path来实现路由，使得页面和浏览器的history保持一致，使用pushState和replaceState事件构建路由。
    <BrowserRouter></BrowserRouter>

    // 第2个：HashRouter也是react-router-dom增加的组件，利用hash来实现路由，使用window.location.hash和hashchange事件构建路由。
    <HashRouter></HashRouter>

    // 备注：路由类型组件建议包裹在最外层的组件（即：<App />）外，这样在内部的任何一个组件都可以使用Route组件。
```
3）路由渲染。
```js
    <HashRouter>
        // 1、路由渲染，<Route path="" component={} render={} />：
        //   - path：表示匹配的浏览器路径；
        //   - component：表示渲染的组件；
        //   - render：表示path匹配成功后将渲染这个函数返回的内容；
        //   - exact：表示是否精确匹配。
        // 注意：Route组件必须写在路由类型组件里面，Route组件在哪，引进的组件就会被渲染到哪个地方。这里表示的意思是：当浏览器地址匹配以下某个Route时，则渲染Route对应的组件，且只能渲染一个。
        <Route path="/home" component={ Home } exact />
        <Route path="/login" component={ Login }/>
        <Route path="/reg" component={ Reg }/>
        <Route path="/mine" component={ Mine }/>
        <Route path="/notFound" render={ ()=><div>404页面</div> }>
 
        // 2、路由重定向，<Redirect from="" to="" />：
        //  - from：表示来源路径（也就是浏览器路径遇到from的路径就自动跳到to路径）;
        //  - to：表示目标路径，当to的值为Object时，有这些参数：
        //     1）pathname：跳转到的url；
        //     2）search：跳转后url参数；
        //     3）state：可用于传递数据，内容会保存在this.history.location.state中；
        //  - exact：表示是否精确匹配。
        <Redirect from="/" to="/home" exact />
        // 表示上面不匹配的所有路径都跳转到这个页面。
        <Redirect to="/notFound" />

        // 3、<Switch></Switch>，当有多个Route时，可能会被同时渲染。用Switch包裹多个Route或Redirect组件，则只渲染出第一个跟浏览器url匹配的Route或Redirect组件。
        <Switch>
            <Route path="/mine" component={ Mine }/>
            <Route path="/notFound" render={ ()=><div>404页面</div> }>
            <Redirect to="/notFound" />
        </Switch>
    </HashRouter>
```
4）路由跳转
 - 声明式导航，利用组件属性实现路由跳转。
```js
    // 1、<Link to="" replace={true} />，为应用提供声明式无障碍导航，默认解析成a标签。
    //  - to：表示点击跳转到指定路径，值可以为单纯的字符串形式，也可以为对象，为对象时跟Redirect的to一样，对象中包含3个属性：pathname、search、state。
    //  - replace：为true时，点击链接后将用新地址替换掉上一次访问的地址，也就是没有历史访问记录。
    <Link to="/home" replace={true}></Link>

    // 2、<NavLink to=""或{} activeClassName="" activeStyle={{}}/>，是<Link />的特殊版，专门为页面导航准备的，因为导航需要有“激活状态”。
    //  - activeClassName：表示导航选中激活时应用的样式名，默认样式名为active;
    //  - activeStyle：类似于内联样式，可以直接在标签写style。
    //  - to：这个属性跟<Link />属性一样。
    <NavLink to="/home" activeClassName="select" activeStyle={{color:"red"}}></NavLink>
```
 - 编程式导航，利用JS实现路由跳转（在声明式导航无法使用时，可以用编程式导航）。
```js
    // 通过以下两种方式实现路由跳转（函数组件）：
    props.history.push()    // 路由跳转后有历史记录
    props.history.replace()    // 路由跳转后无历史记录


    // props里面的history怎么来的呢？
    // 方式1：组件只要是通过Route渲染出来，props中默认都有history、location、match这三个对象。比如下面这个通过Route渲染出来的Home组件的props是具有history、location、match这三个对象的。
    <Route path="/home" component={ Home } exact />

    // 方式2（推荐）：利用withRouter高阶组件包装后，也可让props中拥有history、location、match这三个对象。
    // 高阶组件（也叫高阶函数、HOC、纯函数）：不是组件，是包装组件的函数（从withRouter首字母不是大写就可以看出），包装后必须返回一个新的函数组件。高阶组件就是一种设计模式，类似装饰器模式。
    const NewApp = withRouter(App)   // 传入App组件，让App拥有history、location、match这三个对象后，再返回一个新的函数组件。


    // 何为纯函数？1）不修改传入的参数；2）固定输入有固定输出。（高阶组件要遵循这两个原则）
    function sum(a,b){ return a+b; }
    sum(1,2)   // 3，满足第1、2点，是纯函数。

    function randomNumber(min,max){ return parseInt(Math.random()*(max-min+1)+min) }
    randomNumber(10,20);   // 10
    randomNumber(10,20);   // 14，满足第1点，不满足第2点，不是纯函数。
```
5）定义（封装）高阶组件
```js
    // 方式1：属性代理，作用：提取公共部分，向下传输props。（初级版）
    function Login(){
        const user = { username: "laoxie", password: 123, role: "admin" };
        
        // 登录之后拿到用户信息存在本地存储中。
        localstorage.setItem("currentUser",user);
        return <div>登录</div>
    };

    function withUser(InnerComponent){
        // 让所有包裹的组件在props中都存在currentUser的信息。
        return function OuterComponent(props){
            let data = localstorage.getItem("currentUser");
            let currentUser;
            try{
                currentUser = JSON.parse(data);
            }catch(err){
                currentUser = data;
            }

            // 这里的props为什么有history、location、match三个对象？是因为返回的OuterComponent替代了传入的InnerComponent，而当Route组件匹配到对应的path路径的时候，渲染出来的是OuterComponent，所以OuterComnent就具有了这三个对象，也就可以往InnerComponent里面传了。（可结合下方Home组件来理解）
            return <InnerComponent { ...props } user={ currentUser }></InnerComponent>
        }
    }

    function Home(props){
        return <div>{ props.currentUser.username }</div>;
    };
    Home = withUser(Home);
```
```js
    // 封装高阶组件，加强版：形参接收一个字符串值或一个数组（数组有多个需查询的字符串，把查询到的值传入InnerComponent）。
    function withStorage(key){
        return (InnerComponent) => {
            return function OuterComponent(props){
                let data;
                let obj = {};
                if (Object.prototype.toString.call(key) === "[object Array]") {
                    key.forEach(item => {
                        data = localStorage.getItem(item);
                        try {
                            data = JSON.parse(data);
                        } catch(err){
                            data = data;
                        }
                        obj[item]: data
                    })
                } else {
                    data = localStorage.getItem(key);
                    try {
                        data = JSON.parse(data);
                    } catch(err){
                        data = data;
                        
                    }
                    obj = {
                        [key]: data
                    }
                }

                return <InnerComponent { ...props } { ...obj }></InnerComponent>
            }
        }
    }
    function Mine(props){
        return <div>Mine</div>;
    }
    Mine = withStorage(["currentUser","token"])(Mine);
```






XX、React脚手架：create-react-app（简称cra）
```javascript
    // 1、安装react脚手架
    npm install -g create-react-app

    // 2、查询react脚手架
    create-react-app --version

    // 3、创建react项目
    create-react-app "项目名称"

    // 备注：在看react脚手架的package.json文件时会发现安装的依赖很少，其实是因为react脚手架把所有的依赖都打包到react-scripts文件夹里面了，可以到react-scripts的package.json里面去看各个依赖包。而在react脚手架中，webpack.config.js文件是放在react-scripts文件夹 =》 config文件夹 里面的。

    // 4、在开发模式下运行react项目
    yarn start

    // 5、在交互式观察模式下，运行测试程序
    yarn test

    // 6、打包项目
    yarn build

    // 7、把项目所有依赖暴漏出来
    yarn eject
```

自定义配置webpack。
1、npm run eject（把相关依赖暴露出来，不可逆操作：不推荐）
2、在react-scripts文件夹中修改（容易在更新时被覆盖，不推荐）
3、使用react-app-rewired第三方工具，分为1.X版本和2.X版本。

```javascript
    // react-app-rewired：一个第三方工具，可将其用来扩展webpack配置。在react-app-rewired 2.X的版本，已经把所有的配置方法移植到了customize-cra模块。
    // 1、所以，使用这个第三方工具的时候，react-app-rewired和customize-cra要一起下载。
    yarn add -D react-app-rewired customize-cra

    // 2、将除eject之外的react-scripts开头的选项全部改成react-app-rewired 
    "scripts": {
        "start": "react-app-scripts start",
        "build": "react-app-scripts build",
        "test": "react-app-scripts test",
    },

    // 3：在根目录创建config-overrides.js文件，是用CJS引入customize-cra，并导出。
    const { override, addBabelPlugin, addBabelPlugins, addDecoratorsLegacy, disbleEsLint, useBabelRc, fixBabelImports } = require("customize-cra");

    module.exports = override(
        addDecoratorsLegacy(),
        disbleEsLint(),
        
        // 配置antd样式按需引入的插件。注意：如果需要配置多个插件，则调用多次fixBabelImports()，并传入相应的配置。
        fixBabelImports("babel-plugin-import", { libraryName: "antd", style: "css" }, "antd") 
    )
```
扩展：Antd样式的按需引入。
```javascript
    // 旧版本按需引入
    import Button from "antd/lib/button/buttons";
    import "antd/lib/button/style/index.css";


    // 新版本按需引入（只实现了组件的按需引入，样式还是没有实现按需引入）
    import { Button } from "antd";   // 注意：这种方式只是引入了JS组件，样式还需另外引入。
    import "antd/dist/antd.css";    // 样式引入不属于按需引入


    // 实现真正的按需引入，需要使用babel-plugin-import插件，安装完之后，只需从antd引入模块组件即可，无需单独引入样式，因为babel-plugin-import会帮助你加载JS和CSS。
    // 1、安装babel-plugin-import；
    yarn add -D babel-plugin-import    

    // 2、配置插件（"babel-plugin-import"可以简写成"import"）
    "plugins": [
        ["babel-plugin-import", { libraryName: "antd", style: "css" }, "antd"],
        // 第三个参数是标识，可写可不写，但如果使用同一类的插件，那么建议写上标识以做区分；
        // ["babel-plugin-import", { libraryName: "antd-mobile", style: "css" }, "antd-mobile"]
    ]

    // 3、引入模块使用
    import { Button } from "antd"; 

    // 备注：如果要在脚手架中使用sass，需要安装node-sass插件，但是注意node-sass5.0.0版本不兼容，只能使用node-sass5.0.0以下的版本。
```


XX、关于Hook
1、Hook是React-16.8版本之后新增的特性，它可以让函数组件使用state以及其他的React特性。

2、使用Hook的注意事项：
1）只能在函数组件或在其他Hook中使用；
2）不要在循环、条件和函数嵌套中调用Hook，确保总是在函数组件的最顶层调用它们；
3）函数组件每次更新都会从上往下执行完内部所有代码，跟类组件的区别是：类组件更新是执行render函数。

3、关于各个Hook：
```javascript
    import React,{ useState, useEffect, useMemo, useCallback, useContext, useReducer, useRef, useLayoutEffect, useDebugValue } from "react";


    // 1、useState(参数1)，返回一个数组[参数2，参数3]，其中参数2是状态state，参数3是修改状态的方法，参数1是默认的state。（这个Hook主要用来替换类组件中的state和setState）
    function UseState(){
        const [state,changeState] = useState(1)：

        return (<div>
            <button onClick={()=>{ changeState(state + 1) }}>state</button>
        </div>)
    }


    // 2、useEffect(参数1,参数2)，用来在函数组件中实现类组件生命周期函数的功能，参数1是function(){}，参数2是[]。（useEffect中的代码默认在每轮渲染结束后执行，可以理解为异步代码）
    function UseEffect(){
        const [num,changeNum] = useState(10);

        // 1）普通用法（没有添加依赖），等效于componentDidMount+componentDidUpdate，也就是组件初始化和状态更新后执行里面的代码。
        useEffect(function(){
            console.log("useEffect的用法1");
        })

        // 2）空依赖用法，等效于componentDidMount，在组件初始化时执行里面的代码。
        useEffect(function(){
            console.log("useEffect的用法2");
        },[])

        // 3）指定依赖用法，等效于shouldComponentUpdate，内部做了优化，一开始初始化也会执行里面的代码，后面则是指定依赖状态发生改变时，才执行。
        useEffect(function(){
            console.log("useEffect的用法3");
        },[num])

        // 4）返回值为一个函数，返回的这个函数等效于componentWillUnmount，当组件销毁时，不管依赖是什么，都会执行里面的代码。同时有具体依赖或没有依赖时，依赖发生改变时，也会执行这个函数里面的代码。
        useEffect(function(){
            return ()=>{
                console.log("useEffect的用法4");
            }
        })

        return (<div>
            <button onClick={() => { changeQty(qty + 10) }}>{`num：${qty}`}</button>
        </div>)
    }


    // 3、useMemo(参数1，参数2)，参数1是一个回调函数，参数2是依赖项，useMemo一般用于编写函数组件中无需重复执行的代码，以达到性能优化的目的，返回值为参数1的值，useMemo只要依赖项不发生改变，永远都是拿到之前回调函数返回值的缓存结果，如果依赖发生改变，则执行内部代码，拿到新的回调函数返回值。
    // 注：用法和useEffect一样，不同点是useMemo有返回值（useMemo里面的代码是同步代码）。
    function UseMemo(){
        const [qty, changeqty] = useState(11);
        const [num, changeNum] = useState(55);

        // 1）普通用法（不推荐），每次组件渲染都会执行一次useMemo里面的代码，然后拿到返回值再使用。因为useMemo里面主要放置一些耗费性能的代码，而无依赖的用法会导致组件只要渲染一次，就会执行一次里面的代码，这样对性能的消耗是相当大的。
        const res1 = useMemo(() => {
        console.log("用法1：没有依赖");
            return 100;
        });
        console.log(res1);

        // 2）空依赖用法，只在初始化的时候执行一次useMemo里面的代码，后面都是使用回调函数中返回值的缓存结果。
        const res2 = useMemo(() => {
            console.log("用法2：空依赖");
            return 300;
        }, []);
        console.log(res2);

        // 3）指定依赖用法，在初始化的时候执行一次useMemo里面的代码，后面如果指定依赖发生改变，则再执行一次内部代码，拿到新的回调函数返回值，否则则使用上一次回调函数返回值的缓存结果。
        const res3 = useMemo(() => {
            console.log("用法3：具体依赖");
            return 600;
        }, [num]);
        console.log(res3);

        return (<div>
            <button onClick={()=>{ changeqty(qty + 1) }}>{`修改qty：${ qty }`}</button>
            <button onClick={()=>{ changeNum(num + 5) }}>{`修改num：${ num }`}</button>
        </div>)
    }


    // 4、useCallback(参数1，参数2)，跟useMemo类似，但useCallback返回传入的函数，一般用于定义事件处理函数或往子组件传递函数。
    function UseCallback() {
        const [qty, changeQty] = useState(22);
        const [num, changeNum] = useState(66);

        // 1）普通用法（不推荐），此用法跟没使用useCallback一样，无论组件初始化还是更新都返回一个新函数。
        const fn1 = useCallback(() => { });

        // 2）空依赖用法，初始化返回函数后缓存，组件更新时永远返回缓存函数。
        const fn2 = useCallback(() => { }, [])

        // 3）指定依赖用法，依赖更新时返回新的函数，否则返回缓存函数。具体应用场景：分页器点击不同页码的时候，在这里发送新的ajax请求。否则，就使用缓存的事件处理函数。
        const fn3 = useCallback(() => { }, [qty])

        return (<div>
            <button onClick={() => { changeQty(qty + 22) }}>{`qty：${qty}`}</button>
            <button onClick={() => { changeNum(num + 22) }}>{`num：${num}`}</button>
        </div>)
    }


    // 5、useContext(参数1)，参数1接收传入的context，返回结果是共享的数据，useContext的用法类似class组件中的组件.contextType=context。
    import Context from "../context";
    function UseContext(){
        // DATAreceive拿到的就是Context共享的数据。
        const DATAreceive = useContext(Context);

        return (<div>
            { DATAreceive.name }
        </div>)
    }


    // 6、useReducer(参数1，参数2)，可以让项目在不引入redux的前提下适用redux特性，参数1是reducer纯函数，参数2是初始数据，返回值是一个数组[参数3，参数4(参数5)]，参数3是经过参数1（reducer）处理后返回的state，参数4是修改state的方法，调用参数4时需要传入一个参数5。
    // 注意：useReducer要保持唯一数据源原则，一个项目尽量只使用一个useReducer。
    // 如何做到这样呢？————在当前文件使用一次reducer后，把数据共享出去。
    import { Context2 } from "../context";

    function UseReducer() {
        const { state, dispatch } = useContext(Context2);

        // 依赖项为state，当state发生变化的时候，重新执行useMemo中的回调函数，拿到新结果，否则组件更新的时候都使用缓存数据。
        const total = useMemo(() => {
            return state.reduce((pre, item) => {
                return pre + item.price * item.qty;
            }, 0)
        }, [state])

        // 只在初始化的时候创建函数，后面每删除、清空、增加一个数据导致的组件更新，均使用缓存函数。
        const detele = useCallback((name) => {
            dispatch({ type: "remove", name });
        }, []);

        const clear = useCallback(() => {
            dispatch({ type: "clear"});
        }, []);

        const add = useCallback(() => {
            let goods = {name:"goods4",price:999,qty:111}
            dispatch({ type: "add", goods });
        }, []);

        return (<div>
            <ul>
                {
                    state.map((item) => {
                        return (<li key={item.name}>
                            <h3>商品名：{item.name}</h3>
                            <h3>价格：{item.price}</h3>
                            <h3>数量：{item.qty}</h3>
                            <button onClick={detele.bind(null, item.name)}>删除</button>
                        </li>)
                    })
                }
            </ul>
            <h2>总价：{total}元</h2>
            <div><button onClick={ clear }>清空</button><button onClick={ add }>增加</button></div>
        </div>)
    }
    // 备注：结合useContext和useReducer实现简单版的redux案例，请看UseReducer.jsx、context/index.js、store/index.js、index.js、App.js等文件。
    // 踩坑：为啥封装的Provider组件包裹<App />组件后，不显示子组件，原因是Provider返回的<Context2.Provider></Context2.Provider>没有添加{ props.children }


    // 7、不常用的Hook
    // 1）useRef()，返回一个可变的ref对象，可ref对象的current属性来访问、操纵DOM节点，返回的ref对象在组件的整个生命周期内保持不变（意思就是：每当函数组件更新时，useRef拿到的一直都是初始化时得到的ref对象）。
    const myRef = useRef(null);
    <button ref={ myRef }></button>
    // 使用：
    myRef.current.style.color = "red";
    
    // 2）useLayoutEffect()，可以理解为useEffect的同步版本，用法跟useEffect一样有普通用法、空依赖用法、指定依赖用法。
    function UseLayoutEffect(){
        useLayoutEffect(()=>{
            // 这里的代码为同步代码，在渲染前执行，可能会引起阻塞。建议先用useEffect，在不得已的情况下再使用useLayoutEffect。
        })
        useEffect(()=>{
            // 这里的代码为异步代码，在渲染后执行。
        })
        return <div></div>
    }

    // 3）useDebugValue(value)，可用于在React开发者工具中显示自定义hook的标签。


    // 8、第三方Hook
    // 1）react-router，具体Hook怎么用，还需要看文档。
    import { useHistory } from "react-router-dom";
    function Home(props){
        // props.history
        const history = useHistory();

        // props.match.params
        const params = useParams();
    }
    Home = withRouter(Home);

    // 2）react-redux，具体Hook怎么用，还需要看文档。
    // state = { user:{},cart:{},common:{} }
    import { useStore, useDispatch, useSelector } from "react-redux";
    function Cart(){
        const store = useStore();
        const dispatch = useDispatch();
        const user = useSelector("user");
        return <div></div>
    }
    // connect(mapStateToProps,mapDispatchToProps)(Cart)


    // 9、自定义Hook
    // 自定义Hook是一个函数，其名称以"use"开头，这样可以一眼看出其符合Hook的规则；函数内部可以调用其他Hook；自定义Hook解决了以前在React组件中无法灵活共享逻辑的问题。
    function useStorage(key){
        // 根据key获得的localStorage的值可能为null、string、object
        let storage = localStorage.getItem(key);
        try{
            // 如果为JSON数据格式，则转化为JS数据。
            storage = JSON.parse(storage);
        }catch(err){
            // 否则如果不是JSON数据格式，直接输出。
            storage = storage;
        }

        // 根据一开始传进来的key拿到对应的值，然后将值设位state的初始值，后面导出的就是导state值。
        const [ state, setState ] = useState(data);

        // 修改
        function setStorage(newStorage){
            setState(newStorage);

            if(typeof newStorage === "object"){
                newStorage = JSON.stringify(newStorage);
            }

            localStorage.setItem(key,newStorage);
        }

        return [state, setStorage];
    }
```