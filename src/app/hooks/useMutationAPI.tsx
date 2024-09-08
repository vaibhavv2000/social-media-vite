import {useEffect, useState} from 'react';
import {API} from '../lib/API';

interface props {
 defaultURL?: false;
 method?: "post" | "put" | "patch" | "delete";
 endpoint: string;
 clearError?: number;
 onSuccess?: (data?: any) => void;
 onError?: (error: string) => void;
};

const useMutationAPI = (props: props) => {
 const {defaultURL = false, onSuccess, onError, endpoint} = props;
 const {clearError, method = "post"} = props;
 
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [data, setData] = useState<any>(null);

 const reset = () => {
  setError("");
  setData(null);  
 };

 const mutator = async (body?: {}) => {
  setLoading(true);

  try {
   const res = await API[method](endpoint, body);
   const data = await res.data;
   setData(data);
   if(onSuccess) onSuccess(data);
  } catch (error: any) {
   let message = error?.response?.data?.message || error?.message;
   setError(message);
   if(onError) onError(message);
  } finally {
   setLoading(false); 
  };
 };

 useEffect(() => {
  if(clearError && error) setTimeout(() => setError(""), clearError);
 }, [clearError, error]);

 return {loading, error, data, mutator, reset};
};

export default useMutationAPI;