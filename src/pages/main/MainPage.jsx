import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import RecentTodoComponent from "../../components/main/RecentTodoComponent";

function MainPage(props) {
  return (
    <BasicLayout>
      <RecentTodoComponent />
    </BasicLayout>
  );
}

export default MainPage;
