import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeToAdminPage } from "@/reducers/appRoutes/appRoutesReducer";
import FeatureBar from "@/pages/admin/components/FeatureBar";
import ExecuteButton, {
  BUTTON_TYPE,
} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import ProblemList from "@/pages/admin/components/ProblemList";
import AdminApi from "@/network/adminApi";
import { getAuthenRole } from "@/reducers/authentication/authenticationSelector";
import ListUser from "./components/ListUser";
import { SetMealSharp } from "@mui/icons-material";

export const ADMIN_FEATURE = {
  MANAGE_PROBLEM: "manageproblem",
  MANAGE_USER : "manage_user"
};

export default function AdminstrationPage(props) {
  const dispatch = useDispatch();

  const features = [
    {
      enum: ADMIN_FEATURE.MANAGE_PROBLEM,
      title: "Problems",
      onClick: () => {},
    },
    {
      enum : ADMIN_FEATURE.MANAGE_USER,
      title: "Users",
      onClick : () => {}
    }
  ];

  const [selectedFeature, setSelectedFeature] = useState(ADMIN_FEATURE.MANAGE_PROBLEM);

  const onChangeToListUser = function() {
    setSelectedFeature(ADMIN_FEATURE.MANAGE_USER);
  }

  const onChangeToListProblem = function() {
    setSelectedFeature(ADMIN_FEATURE.MANAGE_PROBLEM);
  }

  useEffect(() => {
    dispatch(changeToAdminPage());
  }, []);

  const displayFeature = function() {
    switch(selectedFeature){
      case ADMIN_FEATURE.MANAGE_PROBLEM:
      case ADMIN_FEATURE.MANAGE_USER:
        return <ListUser/>
    }
  }


  const [reload, setReload] = useState(true);

  const handleCreateProblem = () => {
    AdminApi.createProblem({
      hardLevel: "easy",
      problemName: "Tên đề bài mặc định",
      description: "Miêu tả mặc định",
      statement: "Yêu cầu mặc định",
      input: "Đầu vào mặc định",
      output: "Đầu ra mặc định",
    }).then(setReload(true));
  };

  return (
    <div className={"w-full h-screen flex drop-shadow"}>
      <FeatureBar
        listFeature={features}
        currentFeature={ADMIN_FEATURE.MANAGE_PROBLEM}
      />
      <div className={"w-10/12"}>
        {
          displayFeature()
        }
        {/* <ProblemList reload={reload} setReload={setReload} />
        <div className={"w-full px-5"}>
          <ExecuteButton
            title={"Create challenge"}
            type={BUTTON_TYPE.CREATE}
            handleRunClick={handleCreateProblem}
            className={"w-full h-[40px] bg-sky-400 hover:bg-sky-500"}
          />
        </div> */}
      </div>
    </div>
  );
}
