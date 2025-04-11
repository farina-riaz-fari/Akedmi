import ProfileGroup from "../ProfileGroup";


const ProfileSidebar = () => {
    return (
        <div className="bg-white flex flex-col justify-center p-8">
            <ProfileGroup />
            <div className="flex justify-between items-center w-full pt-10">
                <div className="w-full gap-10 flex flex-row items-center">
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col justify-center items-start">
                            <div className="text-xl font-[700] text-[#303972]">Recent Students</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">You have 456 Students</div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#4D44B5] rounded-full">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.132 8.652H0.4V5.292H5.132V0.587999H8.492V5.292H13.28V8.652H8.492V13.412H5.132V8.652Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-full pt-10">
                <div className="w-full gap-10 flex flex-row items-center">
                    <div className="flex flex-row w-full">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Samantha William</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Class VII A</div>
                        </div>
                    </div>
                    <div className="p-4 border-2 border-[#A098AE] rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4.00011H4C3.20435 4.00011 2.44129 4.31619 1.87868 4.87879C1.31607 5.4414 1 6.20446 1 7.00011V17.0001C1 17.7958 1.31607 18.5588 1.87868 19.1214C2.44129 19.684 3.20435 20.0001 4 20.0001H20C20.7956 20.0001 21.5587 19.684 22.1213 19.1214C22.6839 18.5588 23 17.7958 23 17.0001V7.00011C23 6.20446 22.6839 5.4414 22.1213 4.87879C21.5587 4.31619 20.7956 4.00011 20 4.00011ZM21 16.7501L16.1 12.3501L21 8.92011V16.7501ZM3 8.92011L7.9 12.3501L3 16.7501V8.92011ZM9.58 13.5301L11.43 14.8201C11.5974 14.9362 11.7963 14.9985 12 14.9985C12.2037 14.9985 12.4026 14.9362 12.57 14.8201L14.42 13.5301L19.42 18.0001H4.6L9.58 13.5301ZM4 6.00011H20C20.1857 6.0016 20.3673 6.05478 20.5245 6.15369C20.6817 6.2526 20.8083 6.39333 20.89 6.56011L12 12.7801L3.11 6.56011C3.19171 6.39333 3.31826 6.2526 3.47545 6.15369C3.63265 6.05478 3.81428 6.0016 4 6.00011Z" fill="#A098AE" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-full pt-6">
                <div className="w-full gap-10 flex flex-row items-center">
                    <div className="flex flex-row w-full">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Tony Soap</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Class VII A</div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#4D44B5] rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4.00011H4C3.20435 4.00011 2.44129 4.31619 1.87868 4.87879C1.31607 5.4414 1 6.20446 1 7.00011V17.0001C1 17.7958 1.31607 18.5588 1.87868 19.1214C2.44129 19.684 3.20435 20.0001 4 20.0001H20C20.7956 20.0001 21.5587 19.684 22.1213 19.1214C22.6839 18.5588 23 17.7958 23 17.0001V7.00011C23 6.20446 22.6839 5.4414 22.1213 4.87879C21.5587 4.31619 20.7956 4.00011 20 4.00011ZM21 16.7501L16.1 12.3501L21 8.92011V16.7501ZM3 8.92011L7.9 12.3501L3 16.7501V8.92011ZM9.58 13.5301L11.43 14.8201C11.5974 14.9362 11.7963 14.9985 12 14.9985C12.2037 14.9985 12.4026 14.9362 12.57 14.8201L14.42 13.5301L19.42 18.0001H4.6L9.58 13.5301ZM4 6.00011H20C20.1857 6.0016 20.3673 6.05478 20.5245 6.15369C20.6817 6.2526 20.8083 6.39333 20.89 6.56011L12 12.7801L3.11 6.56011C3.19171 6.39333 3.31826 6.2526 3.47545 6.15369C3.63265 6.05478 3.81428 6.0016 4 6.00011Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-full pt-6">
                <div className="w-full gap-10 flex flex-row items-center">
                    <div className="flex flex-row w-full">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Karen Hope</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Class VII A</div>
                        </div>
                    </div>
                    <div className="p-4 border-2 border-[#A098AE] rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4.00011H4C3.20435 4.00011 2.44129 4.31619 1.87868 4.87879C1.31607 5.4414 1 6.20446 1 7.00011V17.0001C1 17.7958 1.31607 18.5588 1.87868 19.1214C2.44129 19.684 3.20435 20.0001 4 20.0001H20C20.7956 20.0001 21.5587 19.684 22.1213 19.1214C22.6839 18.5588 23 17.7958 23 17.0001V7.00011C23 6.20446 22.6839 5.4414 22.1213 4.87879C21.5587 4.31619 20.7956 4.00011 20 4.00011ZM21 16.7501L16.1 12.3501L21 8.92011V16.7501ZM3 8.92011L7.9 12.3501L3 16.7501V8.92011ZM9.58 13.5301L11.43 14.8201C11.5974 14.9362 11.7963 14.9985 12 14.9985C12.2037 14.9985 12.4026 14.9362 12.57 14.8201L14.42 13.5301L19.42 18.0001H4.6L9.58 13.5301ZM4 6.00011H20C20.1857 6.0016 20.3673 6.05478 20.5245 6.15369C20.6817 6.2526 20.8083 6.39333 20.89 6.56011L12 12.7801L3.11 6.56011C3.19171 6.39333 3.31826 6.2526 3.47545 6.15369C3.63265 6.05478 3.81428 6.0016 4 6.00011Z" fill="#A098AE" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-full pt-6">
                <div className="w-full gap-10 flex flex-row items-center">
                    <div className="flex flex-row w-full">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Jordan Nico</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Class VII B</div>
                        </div>
                    </div>
                    <div className="p-4 border-2 border-[#A098AE] rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4.00011H4C3.20435 4.00011 2.44129 4.31619 1.87868 4.87879C1.31607 5.4414 1 6.20446 1 7.00011V17.0001C1 17.7958 1.31607 18.5588 1.87868 19.1214C2.44129 19.684 3.20435 20.0001 4 20.0001H20C20.7956 20.0001 21.5587 19.684 22.1213 19.1214C22.6839 18.5588 23 17.7958 23 17.0001V7.00011C23 6.20446 22.6839 5.4414 22.1213 4.87879C21.5587 4.31619 20.7956 4.00011 20 4.00011ZM21 16.7501L16.1 12.3501L21 8.92011V16.7501ZM3 8.92011L7.9 12.3501L3 16.7501V8.92011ZM9.58 13.5301L11.43 14.8201C11.5974 14.9362 11.7963 14.9985 12 14.9985C12.2037 14.9985 12.4026 14.9362 12.57 14.8201L14.42 13.5301L19.42 18.0001H4.6L9.58 13.5301ZM4 6.00011H20C20.1857 6.0016 20.3673 6.05478 20.5245 6.15369C20.6817 6.2526 20.8083 6.39333 20.89 6.56011L12 12.7801L3.11 6.56011C3.19171 6.39333 3.31826 6.2526 3.47545 6.15369C3.63265 6.05478 3.81428 6.0016 4 6.00011Z" fill="#A098AE" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-full pt-6">
                <div className="w-full gap-10 flex flex-row items-center">
                    <div className="flex flex-row w-full">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Nadila Adja</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Class VII B</div>
                        </div>
                    </div>
                    <div className="p-4 border-2 border-[#A098AE] rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4.00011H4C3.20435 4.00011 2.44129 4.31619 1.87868 4.87879C1.31607 5.4414 1 6.20446 1 7.00011V17.0001C1 17.7958 1.31607 18.5588 1.87868 19.1214C2.44129 19.684 3.20435 20.0001 4 20.0001H20C20.7956 20.0001 21.5587 19.684 22.1213 19.1214C22.6839 18.5588 23 17.7958 23 17.0001V7.00011C23 6.20446 22.6839 5.4414 22.1213 4.87879C21.5587 4.31619 20.7956 4.00011 20 4.00011ZM21 16.7501L16.1 12.3501L21 8.92011V16.7501ZM3 8.92011L7.9 12.3501L3 16.7501V8.92011ZM9.58 13.5301L11.43 14.8201C11.5974 14.9362 11.7963 14.9985 12 14.9985C12.2037 14.9985 12.4026 14.9362 12.57 14.8201L14.42 13.5301L19.42 18.0001H4.6L9.58 13.5301ZM4 6.00011H20C20.1857 6.0016 20.3673 6.05478 20.5245 6.15369C20.6817 6.2526 20.8083 6.39333 20.89 6.56011L12 12.7801L3.11 6.56011C3.19171 6.39333 3.31826 6.2526 3.47545 6.15369C3.63265 6.05478 3.81428 6.0016 4 6.00011Z" fill="#A098AE" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full pt-10 pb-12">
                <button className="flex flex-row text-center text-lg font-bold justify-center items-center w-full gap-4 bg-[#4D44B51A] text-[#4D44B5] p-4 rounded-full">View More</button>
            </div>
            <div className="flex flex-col w-full pb-6">
                <div className="text-xl font-[800] text-[#303972] text-start pb-6">Messages</div>
                <div className="w-full flex flex-row justify-between border-b-2">
                    <div className="flex flex-row items-center pb-3">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Samantha William</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Lorem ipsum dolor sit amet...</div>
                        </div>
                    </div>
                    <div className="text-sm text-[#A098AE]">
                        12:45 PM
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between border-b-2 pt-6">
                    <div className="flex flex-row items-center pb-3">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Samantha William</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Lorem ipsum dolor sit amet...</div>
                        </div>
                    </div>
                    <div className="text-sm text-[#A098AE]">
                        12:45 PM
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between border-b-2 pt-6">
                    <div className="flex flex-row items-center pb-3">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Samantha William</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Lorem ipsum dolor sit amet...</div>
                        </div>
                    </div>
                    <div className="text-sm text-[#A098AE]">
                        12:45 PM
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between border-b-2 pt-6">
                    <div className="flex flex-row items-center pb-3">
                        <div className="w-14 h-14 rounded-full bg-[#C1BBEB]" />
                        <div className="flex flex-col justify-center items-start ps-4">
                            <div className="text-md font-bold text-[#303972]">Samantha William</div>
                            <div className="text-[14px] font-[400] text-[#A098AE]">Lorem ipsum dolor sit amet...</div>
                        </div>
                    </div>
                    <div className="text-sm text-[#A098AE]">
                        12:45 PM
                    </div>
                </div>
                <div className="flex flex-col w-full pt-8 pb-10">
                    <button className="flex flex-row text-center text-lg font-bold justify-center items-center w-full gap-4 bg-[#4D44B51A] text-[#4D44B5] p-4 rounded-full">View More</button>
                </div>
            </div>
            <div className="flex flex-col w-full pb-6">
                <div className="text-xl font-[800] text-[#363B64] text-start pb-6">Current Foods Menu</div>
                <div className="w-full pt-4">
                    <div className="p-20 bg-[#C1BBEB] rounded-2xl" />
                    <div className="flex justify-start flex-col items-start pt-6">
                        <div className="text-md font-bold text-[#363B64]">Beef Steak with Fried Potato</div>
                        <div className="text-[14px] font-[400] text-[#A098AE]">Lorem ipsum dolor sit amet...</div>
                    </div>
                </div>
                <div className="w-full pt-8">
                    <div className="p-20 bg-[#C1BBEB] rounded-2xl" />
                    <div className="flex justify-start flex-col items-start pt-6">
                        <div className="text-md font-bold text-[#363B64]">Pancake with Honey</div>
                        <div className="text-[14px] font-[400] text-[#A098AE]">Lorem ipsum dolor sit amet...</div>
                    </div>
                </div>
                <div className="w-full pt-8">
                    <div className="p-20 bg-[#C1BBEB] rounded-2xl" />
                    <div className="flex justify-start flex-col items-start pt-6">
                        <div className="text-md font-bold text-[#363B64]">Japanese Beef Ramen</div>
                        <div className="text-[14px] font-[400] text-[#A098AE]">Lorem ipsum dolor sit amet...</div>
                    </div>
                </div>
                <div className="flex flex-col w-full pt-10 pb-10">
                    <button className="flex flex-row text-center text-lg font-bold justify-center items-center w-full gap-4 bg-[#4D44B51A] text-[#4D44B5] p-4 rounded-full">View More</button>
                </div>
            </div>
        </div>
    )
}
export default ProfileSidebar;