type AnyAction = {
  type: string
  [key: string]: any
}

type Dispatch<A> = (action: A) => any

export interface UseSagaOptions<S, A> {
  saga: Function
  args?: any[]
  reducer?(state: S, action: A): S
  initState?: S
  initAction?: A
  customEnv: any
}

export default function useSaga<S, A extends AnyAction = AnyAction>(
  options: UseSagaOptions<S, A>,
  inputs: any[],
): [S, Dispatch<A>]
