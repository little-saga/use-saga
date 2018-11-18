[![NPM Package](https://img.shields.io/npm/v/@little-saga/use-saga.svg?style=flat-square)](https://www.npmjs.org/package/@little-saga/use-saga)

## @little-saga/use-saga

使用 [React hooks 特性](https://reactjs.org/docs/hooks-intro.html) 在一个组件的生命周期内运行 little-saga。

该类库提供了一个函数 `useSaga`，用于在一个 React 函数组件的生命周期内运行 saga。`useSaga` 像是 [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) 的增强版，`useSaga` 在创建 redux-like 状态容器的同时会启动我们所提供的 saga；当组件卸载时，saga 会自动结束运行。

**注意事项：**

- useSaga 是一个 React hook，使用 useSaga 需要符合 hook 的书写规则。
- 该类库只能与 little-saga 一起使用，且要求 React 为支持 hooks 的版本（>= 16.7）.

## 使用方式

```jsx
import useSaga from '@little-saga/use-saga'

function OurReactComponent() {
  const [state, dispatch] = useSaga(options)

  // ... 其他代码 ...
}
```

**参数 `options`** 是一个对象，具体字段如下：

| 字段            | 类型              | 默认值      | 含义                                                                                                                                    |
| --------------- | ----------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `saga`          | 生成器函数        | 必须字段    | 所要执行的 saga 函数                                                                                                                    |
| `args`          | 数组              | `[]`        | 启动 saga 函数时所使用的参数                                                                                                            |
| `reducer`       | 函数              | `x => x`    | 指定 state 如何响应 actions                                                                                                             |
| `initialState`  | 任意值            | `undefined` | 初始状态                                                                                                                                |
| `initialAction` | 任意合法的 action | `undefined` | 创建状态容器时用于初始化状态的 action<br/>[详见 `useReducer` 文档](https://reactjs.org/docs/hooks-reference.html#lazy-initialization-1) |
| `customEnv`     | 任意值            | `undefined` | 指定 运行运行环境对象中的额外字段 <br/>[详见 runSaga#options.customEnv](https://github.com/little-saga/little-saga#runsaga)             |
| `taskContext`   | 普通对象          | `undefined` | root task 的初始 context <br/>[详见 runSaga#options.taskContext](https://github.com/little-saga/little-saga#runsaga)                    |

**`useSaga` 的返回值**与 `useReducer` 的返回值相同，一般我们可以用数组解构的方式将其赋值给变量 `state` 与 `dispatch`。`state` 表示当前状态容器的最新状态，`dispatch` 用于向状态容器 / saga 运行时派发 action。

## 使用举例

简单的 counter 应用： https://stackblitz.com/edit/simple-use-saga-example?embed=1&file=index.js

更多的例子：coming soon...
