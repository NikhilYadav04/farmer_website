import axios from 'axios';

const BASE_URL_UPLOAD = 'http://localhost:2000/store';
const BASE_URL_PREDICT = 'http://localhost:3000/predict';

const getToken = () => JSON.parse(localStorage.getItem('token'))?.token;

export const uploadImageAPI = async (selectedFile) => {
  if (!selectedFile) throw new Error('No file selected');

  const token = getToken();
  const formData = new FormData();
  formData.append('image', selectedFile);

  const response = await axios.post(`${BASE_URL_UPLOAD}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const findDiseaseAPI = async (selectedFile) => {
  if (!selectedFile) throw new Error('No file selected');

  const formData = new FormData();
  formData.append('file', selectedFile);
  const item = JSON.parse(localStorage.getItem('itemdata'))?.item;

  const response = await axios.post(`${BASE_URL_PREDICT}/${item}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
 
export const uploadResponseAPI = async (response_gemini) => {
  const token = getToken();

  const response = await axios.post(
    `${BASE_URL_UPLOAD}/store-response`,
    { response: response_gemini },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
