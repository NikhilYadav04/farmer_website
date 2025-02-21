import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { uploadImageAPI } from '../../services/api';

export function useUpload() {
  const queryClient = useQueryClient();

  const { isLoading: isUploading, mutateAsync: uploadImage } = useMutation({
    mutationFn: uploadImageAPI,
    onSuccess: () => {
      toast.success('Image upload successfully');
      queryClient.invalidateQueries({ queryKey: ['image'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUploading, uploadImage };
}
