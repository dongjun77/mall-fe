import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
export const API_S3_HOST =
  "https://mall-static-files.s3.ap-northeast-2.amazonaws.com/";

const prefix = `${API_SERVER_HOST}/api/todo`;

export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/${tno}`);

  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await jwtAxios.get(`${prefix}/subquerylist`, {
    params: { page, size },
  });

  return res.data;
};

export const postAdd = async (todoObj) => {
  // JSON.stringfy(obj) => JSON문자열
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${prefix}/`, todoObj, header);

  return res.data;
};

export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}`);

  return res.data;
};

export const putOne = async (tno, todo) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.put(`${prefix}/${tno}`, todo, header);

  return res.data;
};

export const updateComplete = async (tno) => {
  const res = await jwtAxios.put(`${prefix}/${tno}/complete`);

  return res.data;
};

export const getRecentTodo = async () => {
  const res = await jwtAxios.get(`${prefix}/recent`);

  return res.data;
};

export const getDeadlineTodo = async () => {
  const res = await jwtAxios.get(`${prefix}/deadline`);

  return res.data;
};
