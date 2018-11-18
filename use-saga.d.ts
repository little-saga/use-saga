type AnyAction = {
  type: string
  [key: string]: any
}

type Dispatch<A> = (action: A) => any

export interface UseSagaOptions<S, A> {
  saga: Function
  args?: any[]
  reducer?(state: S, action: A): S
  initialState?: S
  initialAction?: A
  customEnv?: any
  taskContext?: any
}

export default function useSaga<S, A extends AnyAction = AnyAction>(
  options: UseSagaOptions<S, A>,
): [S, Dispatch<A>]
