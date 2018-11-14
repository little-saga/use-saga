import { useCallback, useEffect, useRef, useState } from 'react'
import { runSaga, stdChannel, identity } from 'little-saga'

export default function useSaga(
  { saga, args = [], reducer = identity, initState, initAction, customEnv },
  inputs,
) {
  const chanRef = useRef(stdChannel())
  const stateRef = useRef(initState)
  const [state, setState] = useState(initState)

  useEffect(() => {
    function hitReducer(action) {
      const prevState = stateRef.current
      const nextState = reducer(prevState, action)
      stateRef.current = nextState
      setState(nextState)
    }

    if (initAction) {
      hitReducer(initAction)
    }
    const enhancer = put => action => {
      hitReducer(action)
      return put(action)
    }
    const channel = chanRef.current.enhancePut(enhancer)
    const rootTask = runSaga(
      { channel, getState: () => stateRef.current, customEnv },
      saga,
      ...args,
    )
    return () => rootTask.cancel()
  }, inputs)

  const dispatch = action => chanRef.current.put(action)

  return [state, useCallback(dispatch, [])]
}
