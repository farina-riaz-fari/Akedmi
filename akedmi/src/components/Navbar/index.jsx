

const Navbar = ({ title }) => {
    return (
        <div className="flex justify-between items-center w-full">
            <span className="text-4xl font-bold text-[#303972]">{title}</span>
        </div>
    );
};

export default Navbar;