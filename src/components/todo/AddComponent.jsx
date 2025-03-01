import React, { useRef, useState } from "react";
import ResultModal from "../common/ResultModal";
import { getOne, postAdd } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FetchingModal from "../common/FetchingModal";
import { useRecoilState } from "recoil";
import { signinState } from "../../atoms/signinState";

const initState = {
  title: "",
  content: "",
  dueDate: "",
  memberEmail: "",
  files: [],
};

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState });

  const [loginInfo, setLoginInfo] = useRecoilState(signinState);

  const uploadRef = useRef();

  const { moveToList, moveToRead } = useCustomMove();

  const addMutation = useMutation({
    mutationFn: (todo) => postAdd(todo),
  });

  const handleChangeTodo = (e) => {
    console.log(e.target.name, e.target.value);

    todo[e.target.name] = e.target.value;

    setTodo({ ...todo });
  };

  const handleClickAdd = () => {
    const formData = new FormData();

    const files = uploadRef.current.files;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("title", todo.title);
    formData.append("content", todo.title);
    formData.append("dueDate", todo.dueDate);
    formData.append("memberEmail", loginInfo.email);

    console.log(formData);

    addMutation.mutate(formData);
  };

  const queryClient = useQueryClient();

  const closeModal = () => {
    queryClient.invalidateQueries("todo/list");
    moveToList({ page: 1 });
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {addMutation.isPending ? <FetchingModal /> : <></>}
      {addMutation.isSuccess ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Product Add Result"}
          content={`${addMutation.data.result}번 상품 등록 완료`}
        ></ResultModal>
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
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
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="content"
            type={"text"}
            value={todo.content}
            onChange={handleChangeTodo}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
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
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            onClick={handleClickAdd}
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
          >
            {" "}
            ADD{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
