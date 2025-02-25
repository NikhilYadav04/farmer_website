//hr function ko ek new file mein convert krna hai

import { RotatingLines } from 'react-loader-spinner';

import { useState } from 'react';
import { useRef } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  setImage,
  setFileName,
  setSelectedFile,
  resetUpload,
} from '../hooks/uploaderSlice';
import Button from '../ui/Button';
import Dropdown from '../components/Dropdown';
import { useUpload } from '../features/uploader/useUpload';
import { useDisease } from '../features/uploader/useDisease';
import { useResponse } from '../features/uploader/useResponse';
import { toast } from 'react-toastify';

const Uploader = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const image = useSelector((state) => state.uploader.image);
  const fileName = useSelector((state) => state.uploader.fileName);
  const selectedFile = useSelector((state) => state.uploader.selectedFile);

  const [showResponse, setShowResponse] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        'Invalid file type. Please upload an image (JPG, JPEG, PNG, WEBP).',
        { position: 'bottom-center' }
      );
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error(
        'File is too large. Please upload an image smaller than 5MB.',
        { position: 'bottom-center' }
      );
      return;
    }

    dispatch(setImage(file));
    dispatch(setFileName(file.name));
    dispatch(setSelectedFile(file));
  };

  const { isUploading, uploadImage } = useUpload();
  const { isLoading, diseaseMutation } = useDisease();
  const { isResponsing, responseMutation } = useResponse();

  const handleDeleteFile = () => {
    dispatch(resetUpload());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedOption = JSON.parse(localStorage.getItem('itemdata'))?.item;

    if (!selectedFile || !selectedOption) {
      toast.error('No file selected', { position: 'bottom-center' });
      return;
    }

    try {
      await uploadImage(selectedFile);
      const diseaseData = await diseaseMutation(selectedOption);
      await responseMutation(diseaseData.disease);

      setShowResponse(true);
    } catch (error) {
      console.error('Error processing request:', error);
    }
  };

  // **Format Response**
  let response = JSON.parse(localStorage.getItem('plant') || '{}').cure || '';
  let formattedResponse = response
    .replace(/\.\s+/g, '.\n')
    .replace(/\*\*/g, '<b>')
    .replace(/\*/g, '<br>');
  let formattedResponseWithIndentation = formattedResponse
    .split('   ')
    .map((word) => `<span style="margin-left: 20px;">${word}</span>`)
    .join('');

  return (
    <>
      <div className="my-10 flex flex-col items-center justify-center gap-3 rounded-3xl border border-transparent bg-neutral-800/30 py-10">
        {/* <h1 className="w-1/2 text-center text-5xl font-bold">
          Upload crop images and get{' '}
          <span className="bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent">
            disease prediction
          </span>
        </h1> */}
        <main className="flex flex-col gap-4 rounded-3xl border border-transparent px-10">
          <form
            onClick={handleImageClick}
            className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed"
          >
            <input
              type="file"
              ref={inputRef}
              hidden
              onChange={handleImageChange}
            />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                width={200}
                height={200}
                alt={fileName}
              />
            ) : (
              <>
                <MdCloudUpload
                  size={60}
                  onClick={() => dispatch(resetUpload())}
                />
                <p>Browse files to upload</p>
              </>
            )}
          </form>

          <section className="flex items-center justify-between rounded-3xl border px-2 py-2">
            <AiFillFileImage size={25} className="ml-3" />
            <span className="flex items-center gap-2">
              {fileName}
              <MdDelete
                size={30}
                className="cursor-pointer p-1"
                onClick={handleDeleteFile}
              />
            </span>
          </section>
          <div className="mx-auto flex w-full flex-col items-center justify-center gap-5">
            <Dropdown />
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={isUploading || isLoading || isResponsing}
            >
              {isUploading || isLoading || isResponsing ? (
                <div className="flex items-center gap-2">
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="25"
                    visible={true}
                  />
                  <p>Uploading...</p>
                </div>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </main>

        {showResponse && (
          <div className="response-container">
            <div
              dangerouslySetInnerHTML={{
                __html: formattedResponseWithIndentation,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Uploader;
