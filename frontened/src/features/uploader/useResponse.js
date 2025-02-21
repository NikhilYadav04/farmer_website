import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { uploadResponseAPI } from '../../services/api';

export function useResponse() {
  const queryClient = useQueryClient();

  const { isLoading: isResponsing, mutateAsync: responseMutation } =
    useMutation({
      mutationFn: uploadResponseAPI,
      onSuccess: () => {
        toast.success('Response uploaded successfully');
        queryClient.invalidateQueries({ queryKey: ['response'] });
      },
      onError: (error) =>
        toast.error(error.message, { position: 'bottom-center' }),
    });

  return { isResponsing, responseMutation };
}
