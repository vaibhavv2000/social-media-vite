import {useEffect, useState} from 'react';
import {API} from '../lib/API';

interface props {
 defaultFetch?: boolean;
 defaultURL?: false;
 endpoint: string;
 clearError?: number;
 onSuccess?: (data?: any) => void;
 onError?: (error: string) => void;
};

const useQueryAPI = (props: props) => {
 const {defaultFetch = false, defaultURL = false, onSuccess, onError, endpoint} = props;
 const {clearError} = props;
 
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [data, setData] = useState<any>(null);

 const reset = () => {
  setError("");
  setData(null);  
 };

 const fetcher = async () => {
  setLoading(true);

  try {
   const res = await API.get(endpoint);
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
  if(defaultFetch) fetcher();  
 }, [defaultFetch]);

 useEffect(() => {
  if(clearError && error) setTimeout(() => setError(""), clearError);
 }, [clearError, error]);

 return {loading, error, data, fetcher, reset};
};

export default useQueryAPI;