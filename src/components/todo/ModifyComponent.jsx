import React, { useEffect, useRef, useState } from "react";
import { getOne, deleteOne, putOne, API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { useRecoilState } from "recoil";
import { signinState } from "../../atoms/signinState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FetchingModal from "../common/FetchingModal";

const initState = {
  tno: 0,
  title: "",
  content: "",
  memberEmail: "",
  complete: false,
  dueDate: "",
  uploadFileNames: [],
};

const host = API_SERVER_HOST;
const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState);
  const [loginInfo, setLoginInfo] = useRecoilState(signinState);

  const { moveToRead, moveToList } = useCustomMove();

  const uploadRef = useRef();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["todo", tno],
    queryFn: () => getOne(tno),
    staleTime: Infinity,
  });

  const modifyMutation = useMutation({
    mutationFn: (todo) => putOne(tno, todo),
  });

  const deleteMutation = useMutation({
    mutationFn: (tno) => deleteOne(tno),
  });

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = todo.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );

    todo.uploadFileNames = resultFileNames;

    setTodo({ ...todo });
  };

  const handleChangeTodoComplete = (e) => {
    const value = e.target.value;
    todo.complete = value === "Y";
    setTodo({ ...todo });
  };

  const handleClickDelete = () => {
    deleteMutation.mutate(tno);
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("tno", todo.tno);
    formData.append("title", todo.title);
    formData.append("content", todo.content);
    formData.append("memberEmail", loginInfo.email);
    formData.append("complete", todo.complete);
    formData.append("dueDate", todo.dueDate);

    for (let i = 0; i < todo.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", todo.uploadFileNames[i]);
    }

    modifyMutation.mutate(formData);
  };

  const closeModal = () => {
    queryClient.invalidateQueries(["todo", tno]);
    queryClient.invalidateQueries(["todo/list"]);

    if (deleteMutation.isSuccess) {
      moveToList();
    }
    if (modifyMutation.isSuccess) {
      moveToRead(tno);
    }
  };

  useEffect(() => {
    if (query.isSuccess) {
      console.log("데이터 로드 성공:", query.data);
      setTodo(query.data);
    }
  }, [tno, query.data, query.isSuccess]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {query.isFetching || deleteMutation.isPending ? <FetchingModal /> : <></>}
      {deleteMutation.isSuccess || modifyMutation.isSuccess ? (
        <ResultModal
          title={"처리결과"}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TNO</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {" "}
            {todo.tno}{" "}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="title"
            type={"text"}
            value={todo.title}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="content"
            type={"text"}
            value={todo.content}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">
            {todo.memberEmail}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
          <select
            name="status"
            className="border-solid border-2 rounded m-1 p-2"
            onChange={handleChangeTodo}
            value={todo.complete ? "Y" : "N"}
          >
            <option value="Y">Completed</option>
            <option value="N">Not Yet</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dueDate"
            type={"date"}
            value={todo.dueDate}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {todo.uploadFileNames.map((imgFile, i) => (
              <div
                className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                key={i}
              >
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>
                <img alt="img" src={`${host}/api/todo/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => handleClickDelete()}
        >
          Delete
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => handleClickModify()}
        >
          Modify
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
