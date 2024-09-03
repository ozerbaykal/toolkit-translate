import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
//asenkron thunk aksiyonu
export const getLanguages = createAsyncThunk(
   
    "languages/getlanguages",
    async ()=> {
        //api isteği atılır
        const res = await api.get("/getLanguages")
        //payload return edilir
        return res.data.data.languages;
   
    }

)

export const translateText = createAsyncThunk(
    "translate/translateText",
    async (p)=>{

const params= new URLSearchParams();
   //API ' ye gönderilecek olan parametreleri belirle
    params.set("source_languge",p.sourceLang.value);
    params.set("target_language",p.targetLang.value);
    params.set("text",p.text);
 // API ' ye istek at
    const res = await api.post("/translate",params);
   //payloadı belirle 
    return res.data.data;



    }
)