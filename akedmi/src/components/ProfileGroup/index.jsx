import { GoGear } from "react-icons/go";
import { FaRegBell } from "react-icons/fa";

const ProfileGroup = ({ gap = 'none' }) => {
    return (
        <div className={`flex justify-between items-center w-full ${gap} flex-1`}>
            <div className="flex flex-row gap-6 pl-6 w-auto">
                <div className="p-3 rounded-full shadow">
                    <FaRegBell className="text-[30px] text-[#A098AE]" />
                </div>
                <div className="p-3 rounded-full shadow">
                    <GoGear className="text-[30px] text-[#A098AE]" />
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 w-auto">
                <div className="flex flex-col justify-center items-end">
                    <div className="text-md font-bold text-[#303972]">Neil Sims</div>
                    <div className="text-[14px] font-[400] text-[#A098AE]">Admin</div>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
            </div>
        </div>
    )
}

export default ProfileGroup;
