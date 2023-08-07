import { useState } from "react";

export function UserSlot({ props }) {
    return (
        <div
            className={
                "w-full h-[40px] bg-slate-200 rounded flex flex-row items-center px-3 gap-2 mb-2 odd:bg-slate-50 even:bg-slate-100 hover:border hover:border-slate-200"
            }
        >
            This is user slot
        </div>
    );
}

export default function ProblemList({ reload, setReload, props }) {
    const [listUser, setListUser] = useState([]);

    return (
        <div className={"w-full px-5 mt-5"}>
            <div
                className={
                    "w-full h-[40px] bg-slate-200 rounded border border-slate-300 mb-2 flex flex-row px-3 gap-2 justify-around items-center font-semibold"
                }
            >
                <div>{"Tên người dùng"}</div>
            </div>
            {
                !listUser.length ? 
                    (
                        <div className={"font-medium text-slate-700 text-center mb-10 mt-5"}>
                            Chưa có người dùng nào trong hệ thống
                        </div>
                    ) :
                    listUser.map((user, index) => (
                        <UserSlot key={"user_slot" + index}/>
                    ))
            }
        </div>
    );
}
