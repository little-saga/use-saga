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
  const [state, _setState] = useState(initialState)

  useEffect(() => {
    const getState = () => stateRef.current
    const setState = nextState => {
      stateRef.current = nextState
      _setState(nextState)
    }

    const enhancer = put => action => {
      // hit reducer before put the action into the channel
      setState(reducer(getState(), action))

      return put(action)
    }
    const channel = stdChannel().enhancePut(enhancer)
    chanRef.current = channel

    const rootTask = runSaga(
      {
        channel,
        getState,
        setState,
        customEnv,
        taskContext,
      },
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
