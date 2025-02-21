import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { findDiseaseAPI } from '../../services/api';

export function useDisease() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: diseaseMutation } = useMutation({
    mutationFn: findDiseaseAPI,
    onSuccess: (data) => {
      localStorage.setItem(
        'plant',
        JSON.stringify({ disease: data.disease, cure: data.response })
      );
      queryClient.invalidateQueries({ queryKey: ['disease'] });
    },
    onError: (error) =>
      toast.error(error.message, { position: 'bottom-center' }),
  });

  return { isLoading, diseaseMutation };
}
