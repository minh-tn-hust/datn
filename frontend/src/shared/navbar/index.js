import Link from "next/link";
import ASSET from "@/shared/assets";
import NavBarLink from "@/shared/navbar/components/NavBarLink";
import {
  changeToAdminPage,
  changeToAuthenPage,
  changeToHomePage,
  changeToListProblem,
  changeToProblemPage,
  ROUTES,
} from "@/reducers/appRoutes/appRoutesReducer";
import { useDispatch, useSelector } from "react-redux";
import { currentRoutes } from "@/reducers/appRoutes/appRoutesSelector";
import {
  currentRole,
  getAuthenRole,
  getUsername,
} from "@/reducers/authentication/authenticationSelector";
import { ROLE } from "@/constants/role";

export default function NavBar(props) {
  const page = useSelector(currentRoutes);
  const role = useSelector(currentRole);
  const username = useSelector(getUsername);
  const authenState = useSelector(getAuthenRole);
  console.log("🚀 ~ file: index.js:21 ~ NavBar ~ authenState:", authenState);
  const dispatch = useDispatch();

  const displayWithAuthenState = function () {
    if (authenState === ROLE.NON_AUTHORIZE) {
      return (
        <NavBarLink
          href={loginPage.href}
          title={loginPage.title}
          isSelected={page === loginPage.enum}
          handleChangePage={() => handleChangePage(loginPage.enum)}
        />
      );
    } else {
      const display = (
        <div>
          Welcome, <b>{username}</b>
        </div>
      );
      return (
        <NavBarLink
          href={"#"}
          title={display}
          isSelected={false}
          handleChangePage={() => {}}
        />
      );
    }
  };

  const handleChangePage = function (toPage) {
    switch (toPage) {
      case ROUTES.HOME_PAGE:
        dispatch(changeToHomePage());
        break;

      case ROUTES.LIST_PROBLEM:
        dispatch(changeToListProblem());
        break;

      case ROUTES.DOING:
        dispatch(changeToProblemPage());
        break;

      case ROUTES.AUTHEN:
        dispatch(changeToAuthenPage());
        break;

      case "admin":
        dispatch(changeToAdminPage());
        break;

      default:
        console.error("Unknown route: " + toPage);
    }
  };

  const routes = [
    { href: "/", title: "Trang chủ", enum: ROUTES.HOME_PAGE },
    { href: "/problems", title: "Danh sách đề bài", enum: ROUTES.LIST_PROBLEM },
    { href: "/authentication", title: "Đăng nhập", enum: ROUTES.AUTHEN },
    { href: "/admin", title: "Quản lý", enum: ROUTES.ADMIN },
  ];

  const loginPage = routes[2];
  const adminPage = routes[3];

  return (
    <div
      className={
        "w-full h-12 flex flex-row justify-center drop-shadow-md bg-white "
      }
    >
      <div className={"w-10/12 flex flex-row justify-between"}>
        <div className={"flex flex-row"}>
          <Link
            href={"/"}
            onClick={() => handleChangePage(ROUTES.HOME_PAGE)}
            className={"w-10 h-10 self-center mr-5"}
          >
            <img src={ASSET.LOGO.src} alt={"Logo"} />
          </Link>
          {routes.map((route, index) => {
            if (index > 1) {
              return;
            }
            return (
              <NavBarLink
                key={"NavBarLink" + index}
                href={route.href}
                title={route.title}
                isSelected={page === route.enum}
                handleChangePage={() => handleChangePage(route.enum)}
              />
            );
          })}
          {role.indexOf(ROLE.ADMIN) !== -1 ? (
            <NavBarLink
              key={"NavBarLink_ADMIN"}
              href={adminPage.href}
              title={adminPage.title}
              isSelected={page === adminPage.enum}
              handleChangePage={() => handleChangePage(adminPage.enum)}
            />
          ) : (
            <></>
          )}
        </div>
        {displayWithAuthenState()}
      </div>
    </div>
  );
}
