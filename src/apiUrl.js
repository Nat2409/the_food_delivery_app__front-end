const apiUrl =
  process.env.REACT_APP_ENV === 'DEV'
    ? 'http://localhost:3001'
    : 'https://food-delivery-app-api-t10v.onrender.com';

export default apiUrl;
