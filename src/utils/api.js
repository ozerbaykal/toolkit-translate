import axios from "axios";

export default axios.create({
    baseURL:"https://text-translator2.p.rapidapi.com",
    headers: {
        'x-rapidapi-key': 'e48aae4760msh168a32d55c6ea2fp1054afjsn68df4fe6d656',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      },

})