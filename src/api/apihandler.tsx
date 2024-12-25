import axios from 'axios';
import { apiKey } from '../constants/SliderImages';

const baseUrl = 'https://exercisedb.p.rapidapi.com';

const apiCall = async (url: any, params: any)=>{
    try{
        const options = {
            method: 'GET', 
            url,
            params,
            headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
            
        };
        const response = await axios.request(options);
        return response.data;
    }catch(err:any){
        console.log('error: ', err.message);
    }
}

export const fetchExercisesByBodypart = async (bodyPart:any)=>{
    let data = await apiCall(baseUrl+`/exercises/bodyPart/${bodyPart}`, {});
    return data;
}