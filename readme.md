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
  const [state, dispatch] = useSaga(options, inputs)

  // ... 其他代码 ...
}
```

**参数 `options`** 是一个对象，具体字段如下：

| 字段       | 类型              | 默认值      | 含义                                                                                                                        |
| ---------- | ----------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| saga       | 生成器函数        | 必须字段    | 所要执行的 saga 函数                                                                                                        |
| args       | 数组              | `[]`        | 启动 saga 函数时所使用的参数                                                                                                |
| reducer    | 函数              | `x => x`    | 指定 state 如何响应 actions                                                                                                 |
| initState  | 任意值            | `undefined` | 初始状态                                                                                                                    |
| initAction | 任意合法的 action | `undefined` | 创建状态容器时用于初始化状态的 action<br/>如不提供该字段，则创建容器时不派发 action                                         |
| customEnv  | 任意值            | `undefined` | 指定 运行运行环境对象中的额外字段 <br/>[详见 runSaga#options.customEnv](https://github.com/little-saga/little-saga#runsaga) |

**参数 `inputs`** 与 [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) 的 inputs 参数含义一致。当 useSaga 检测到 inputs 数组发生变化时，将会取消上一个 saga 实例的运行，并使用新的生成器与参数启动一个新的 saga 实例。注意，如果不提供 `inputs` 参数，则每次渲染都会执行「取消上一个任务——启动新的任务」，这往往不是我们所期望的行为，所以 **绝大部分情况下我们需要提供该参数**。

**`useSaga` 的返回值**与 `useReducer` 的返回值相同，是一个二元元祖，一般我们使用数组解构将其赋值给变量 `state` 与 `dispatch`。`state` 表示当前状态容器的最新状态，`dispatch` 用于向状态容器 / saga 运行时派发 action。

## 使用举例

TODO
