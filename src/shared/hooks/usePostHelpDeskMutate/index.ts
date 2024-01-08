import { useMutation, useQueryClient } from 'react-query'
import api from '../../../service/api'

const submit = async (data: any) => {
  return await api.post('/helpdesk', data)
}

export function usePostHelpDeskMutate() {
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      queryClient.invalidateQueries(`helpDesk`)
    },
  })
  return mutate
}
