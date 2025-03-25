import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import RecentTodoComponent from "../../components/main/RecentTodoComponent";
import DeadlineTodoComponent from "../../components/main/DeadLineTodoComponent";

function MainPage(props) {
  return (
    <BasicLayout>
      <RecentTodoComponent />
      <DeadlineTodoComponent />
    </BasicLayout>
  );
}

export default MainPage;
