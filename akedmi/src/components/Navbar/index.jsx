const Navbar = ({ title }) => {
  return (
    <div className="flex justify-center md:justify-start items-center">
      <div className="text-3xl lg:text-4xl break-words font-bold text-[#303972] text-center md:text-left">
        {title}
      </div>
    </div>
  );
};

export default Navbar;
