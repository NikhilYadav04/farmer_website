import { useSelector } from 'react-redux';

export default function History() {
  const image = useSelector((state) => state.uploader.image);

  if (!image) return null;

  return (
    <div>
      <h2>History</h2>
      <img src={URL.createObjectURL(image)} alt="Uploaded" width="200" />
    </div>
  );
}
