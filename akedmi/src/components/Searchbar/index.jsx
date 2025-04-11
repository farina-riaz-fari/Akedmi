import { FiSearch } from "react-icons/fi";

const Searchbar = ({ value = "", onChange = () => { } }) => {
    return (
        <form>
            <div className="relative shadow-md rounded-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none bg-white rounded-l-full">
                    <FiSearch className="text-[20px] text-[#4D44B5]" />
                </div>
                <input
                    type="search"
                    className="block w-full px-4 p-3 pl-12 text-sm text-gray-900 border border-gray-100 rounded-full bg-white placeholder-text-lg focus:outline-none focus:ring-2 focus:ring-[#4D44B5] focus:border-none"
                    placeholder="Search Here..."
                    value={value}
                    onChange={onChange}
                />
            </div>
        </form>
    );
};

export default Searchbar;
