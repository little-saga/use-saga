'use strict'

const { useCallback, useEffect, useRef, useState } = require('react')
const { runSaga, stdChannel, identity } = require('little-saga')

module.exports = function useSaga({
  saga,
  args = [],
  reducer = identity,
  initialState,
  initialAction,
  customEnv,
  taskContext,
}) {
  const chanRef = useRef(null)
  if (initialAction) {
    initialState = reducer(initialState, initialAction)
  }
  const stateRef = useRef(initialState)
  const [state, setState] = useState(initialState)

  useEffect(() => {
    function hitReducer(action) {
      const prevState = stateRef.current
      const nextState = reducer(prevState, action)
      stateRef.current = nextState
      setState(nextState)
    }

    const enhancer = put => action => {
      hitReducer(action)
      return put(action)
    }
    const channel = stdChannel().enhancePut(enhancer)
    chanRef.current = channel

    const rootTask = runSaga(
      { channel, getState: () => stateRef.current, customEnv, taskContext },
      saga,
      ...args,
    )

    return () => {
      rootTask.cancel()
      chanRef.current.close()
      chanRef.current = null
    }
  }, [])

  const dispatch = action => chanRef.current.put(action)

  return [state, useCallback(dispatch, [])]
}
