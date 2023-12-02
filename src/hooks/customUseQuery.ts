import { useMutation } from 'react-query'

// interface useCustomQueryProps {
//   onSuccess?: () => void
//   onError?: () => void
//   queryKey: string
//   queryFunc?: () => Promise<any> | undefined
// }

interface useCustomMutationProps {
  addDeity: () => void
  onSuccess: () => void
}

// export const useCustomQuery = ({ queryKey, queryFunc, onSuccess, onError }: useCustomQueryProps) => {
//   return useQuery(queryKey, queryFunc, {
//     // cacheTime: 5000,
//     // staleTime: 30000,
//     // refetchOnMount: true,
//     // refetchOnWindowFocus: true,
//     // refetchInterval: false,
//     // refetchIntervalInBackground: false,
//     // enabled: false, //the api doesn't call on mount
//     // refetch: it is used to trigger the api in useQuery
//     onSuccess: onSuccess,
//     onError: onError

//     // refetch: true

//     // select: data => {
//     //   return data.map(item => item.name)
//     // }
//   })
// }

export const useCustomMutation = (addDeity: useCustomMutationProps) => {
  return useMutation(addDeity)
}
