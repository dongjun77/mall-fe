import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import RecentTodoComponent from "../../components/main/RecentTodoComponent";
import DeadlineTodoComponent from "../../components/main/DeadLineTodoComponent";
import RecentProductComponent from "../../components/main/RecentProductComponent";

function MainPage(props) {
  return (
    <BasicLayout>
      <RecentTodoComponent />
      <DeadlineTodoComponent />
      <RecentProductComponent />
    </BasicLayout>
  );
}

export default MainPage;
