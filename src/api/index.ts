import getEndpoints from '../server/db';

const endpoints = getEndpoints();

type ENDPOINTS = keyof typeof endpoints;
type RESPONSE_DATA = {
  count: number;
  list: {
    _id: string;
    name: string;
    gender: string;
    company: string;
    email: string;
  }[];
};

const getJson = async <T>(endpoint: ENDPOINTS): Promise<T> => {
  const path =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3001/api/${endpoint}`
      : `https://raw.githubusercontent.com/robzarel/gh-pages-demo/gh-pages/static/db/${endpoint}.json`;

  const response = await fetch(path);

  return await response.json();
};

type API = {
  get: {
    data: (page: number) => Promise<RESPONSE_DATA>
  }
};
const api: API = {
  get: {
    data: async (page) => {
      const data = await getJson<RESPONSE_DATA>('data');
      const startIndex = page === 1 ? 0 : (page - 1) * 10 ;
      const endIndex = page * 10

      const resp = {
        count: data.list.length,
        list: [...data.list.slice(startIndex, endIndex)]
      };

      return resp;
    }
  }
}
export type { RESPONSE_DATA, ENDPOINTS }
export default api;
