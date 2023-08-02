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

export const ADMIN_FEATURE = {
  MANAGE_PROBLEM: "manageproblem",
};

export default function AdminstrationPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeToAdminPage());
  }, []);

  const features = [
    {
      enum: ADMIN_FEATURE.MANAGE_PROBLEM,
      title: "Problems",
      onClick: () => {},
    },
  ];

  const [reload, setReload] = useState(true);

  const handleCreateProblem = () => {
    AdminApi.createProblem({
      hardLevel: "easy",
      problemName: "Default problem name",
      description: "Default description",
      statement: "Default statement",
      input: "Default input",
      output: "Default output",
    }).then(setReload(true));
  };

  return (
    <div className={"w-full h-screen flex drop-shadow"}>
      <FeatureBar
        listFeature={features}
        currentFeature={ADMIN_FEATURE.MANAGE_PROBLEM}
      />
      <div className={"w-10/12"}>
        <ProblemList reload={reload} setReload={setReload} />
        <div className={"w-full px-5"}>
          <ExecuteButton
            title={"Create challenge"}
            type={BUTTON_TYPE.CREATE}
            handleRunClick={handleCreateProblem}
            className={"w-full h-[40px] bg-sky-400 hover:bg-sky-500"}
          />
        </div>
      </div>
    </div>
  );
}
