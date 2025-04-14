import { useNavigate, useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import ProfileGroup from "../../components/ProfileGroup";
import Sidebar from "../../components/Sidebar";
import { useContext, useState } from "react";
import { CompanyContext } from "../../store/CompanyContext";
import React from "react";

const NewCompany = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addCompany, updateCompany } = useContext(CompanyContext);
    const companyData = location.state?.company;

    const [id, setId] = useState(companyData?.id || "");
    const [registrationNo, setRegistrationNo] = useState(companyData?.registrationNo || "");
    const [companyName, setCompanyName] = useState(companyData?.companyName || "");
    const [industry, setIndustry] = useState(companyData?.industry || "");
    const [city, setCity] = useState(companyData?.city || "");
    const [email, setEmail] = useState(companyData?.email || "");
    const [phoneNumber, setPhoneNumber] = useState(companyData?.phoneNumber || "");
    const [address, setAddress] = useState(companyData?.address || "");
    const [country, setCountry] = useState(companyData?.country || "");
    const [website, setWebsite] = useState(companyData?.website || "");
    const [zipCode, setZipCode] = useState(companyData?.zipCode || "");
    const [taxId, setTaxId] = useState(companyData?.taxId || "");
    const [currency, setCurrency] = useState(companyData?.currency || "");
    const [status, setStatus] = useState(companyData?.status || "");
    const [parentCompanyId, setParentCompanyId] = useState(companyData?.parentCompanyId || "");
    const [registrationDate, setRegistrationDate] = useState(companyData?.registrationDate || "");
    const [ownerId, setOwnerId] = useState(companyData?.ownerId || "");
    const [boardMembers, setBoardMembers] = useState(companyData?.boardMembers || "");
    const [businessType, setBusinessType] = useState(companyData?.businessType || "");
    const [isVerified, setIsVerified] = useState(companyData?.isVerified || "");
    const [createdAt, setCreatedAt] = useState(companyData?.createdAt || "");
    const [updatedAt, setUpdatedAt] = useState(companyData?.updatedAt || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id || !registrationNo || !companyName || !city || !email || !phoneNumber || !address || !industry || !website || !country || !zipCode || !taxId || !currency || !status || !parentCompanyId || !registrationDate || !ownerId || !boardMembers || !businessType || !isVerified || !createdAt || !updatedAt) {
            alert("Please fill in all required fields!");
            return;
        }

        const companyData = {
            id,
            registrationNo,
            companyName,
            email,
            phoneNumber,
            address,
            industry,
            city,
            website,
            country,
            zipCode,
            taxId,
            currency,
            status,
            parentCompanyId,
            registrationDate,
            ownerId,
            boardMembers,
            businessType,
            isVerified,
            createdAt,
            updatedAt,
        };

        if (companyData.email) {
            await updateCompany(companyData);
        } else {
            await addCompany(companyData);
        }

        navigate("/company");
    };

    const handleSaveAsDraft = async (e) => {
        e.preventDefault();
        if (!id || !registrationNo || !companyName || !city || !email || !phoneNumber || !address || !industry || !website || !country || !zipCode || !taxId || !currency || !status || !parentCompanyId || !registrationDate || !ownerId || !boardMembers || !businessType || !isVerified || !createdAt || !updatedAt) {
            alert("Please fill in all required fields!");
            return;
        }

        const companyData = {
            id,
            registrationNo,
            companyName,
            email,
            phoneNumber,
            address,
            industry,
            city,
            website,
            country,
            zipCode,
            taxId,
            currency,
            status,
            parentCompanyId,
            registrationDate,
            ownerId,
            boardMembers,
            businessType,
            isVerified,
            createdAt,
            updatedAt,
        };

        console.log("Data saved as draft:", companyData);
    };

    return (
        <div className="flex w-full h-screen bg-[#F3F4FF]">
            <div className="flex-1 bg-[#F3F4FF] pt-8 px-4 md:px-6 lg:px-10">
                <div className="flex flex-row justify-between items-center w-full gap-4">
                    <div className="w-auto">
                        <Navbar title={companyData ? "Edit Company Data" : "Add New Company"} />
                    </div>
                    <div className="w-auto flex justify-end">
                        <ProfileGroup gap="gap-10" />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Company details */}
                    <div className="flex flex-col justify-center items-center py-4 pt-16">
                        <div className="w-full rounded-t-xl p-4 pl-14 bg-[#4D44B5] gap-10 flex justify-start text-white font-bold text-xl">
                            Company Basic Information
                        </div>
                        <div className="w-full rounded-b-xl py-4 px-6 bg-white gap-10">
                            <div className="flex flex-col lg:flex-row p-4 gap-4">
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">ID *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Your Id" value={id} onChange={(e) => setId(e.target.value)} required />
                                    </div>
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Company Name *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Your Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                                    </div>
                                </div>
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Registration Number *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Your Registration Number" value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)} required />
                                    </div>
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Industry *</div>
                                        <div className="relative w-full">
                                            <select
                                                id="industries"
                                                className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded focus:outline-none focus:bg-white focus:border-purple-500 block py-3 px-4 pr-10 appearance-none"
                                                value={industry} onChange={(e) => setIndustry(e.target.value)} required
                                            >
                                                <option >Select Industry</option>
                                                <option defaultValue="tech">Tech</option>
                                                <option defaultValue="finance">Finance</option>
                                                <option defaultValue="healthcare">Healthcare</option>
                                            </select>

                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Contact Information */}
                    <div className="flex flex-col justify-center items-center py-4 pb-16">
                        <div className="w-full rounded-t-xl p-4 pl-14 bg-[#4D44B5] gap-10 flex justify-start text-white font-bold text-xl">
                            Contact Information
                        </div>
                        <div className="w-full rounded-b-xl py-4 px-6 bg-white gap-10">
                            <div className="flex flex-col lg:flex-row p-4 gap-4">
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Email *</div>
                                        <input
                                            className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 disabled:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed"
                                            id="inline-full-name"
                                            type="text"
                                            placeholder="Enter Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={companyData}
                                        />
                                    </div>
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Phone Number *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Your Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                    </div>
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Country *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Country Name" value={country} onChange={(e) => setCountry(e.target.value)} required />
                                    </div>
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Address *</div>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 border border-[#C1BBEB] rounded focus:outline-none focus:bg-white focus:border-purple-500"
                                            placeholder="Enter Your Address here..."
                                            value={address} onChange={(e) => setAddress(e.target.value)} required
                                        />
                                    </div>
                                </div>
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Website</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Website Link" value={website} onChange={(e) => setWebsite(e.target.value)} required />
                                    </div>
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">City *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} required />
                                    </div>
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Zip Code *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Financial Information */}
                    <div className="flex flex-col justify-center items-center py-4 pb-16">
                        <div className="w-full rounded-t-xl p-4 pl-14 bg-[#4D44B5] gap-10 flex justify-start text-white font-bold text-xl">
                            Financial Information
                        </div>
                        <div className="w-full rounded-b-xl py-4 px-6 bg-white gap-10">
                            <div className="flex flex-col lg:flex-row p-4 gap-4">
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Tax ID *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Your Tax Id" value={taxId} onChange={(e) => setTaxId(e.target.value)} required />
                                    </div>
                                </div>
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Currency *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Currency (USD or Local Currency)" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Operational Details */}
                    <div className="flex flex-col justify-center items-center py-4 pb-16">
                        <div className="w-full rounded-t-xl p-4 pl-14 bg-[#4D44B5] gap-10 flex justify-start text-white font-bold text-xl">
                            Operational Details
                        </div>
                        <div className="w-full rounded-b-xl py-4 px-6 bg-white gap-10">
                            <div className="flex flex-col lg:flex-row p-4 gap-4">
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Status *</div>
                                        <div className="relative w-full">
                                            <select
                                                id="industries"
                                                className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded focus:outline-none focus:bg-white focus:border-purple-500 block py-3 px-4 pr-10 appearance-none"
                                                value={status} onChange={(e) => setStatus(e.target.value)} required
                                            >
                                                <option >Select Status</option>
                                                <option defaultValue="active">Active</option>
                                                <option defaultValue="inactive">Inactive</option>
                                                <option defaultValue="suspended">Suspended</option>
                                            </select>

                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Registration Date *</div>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none focus:outline-none focus:bg-white focus:border-purple-500">
                                                <svg
                                                    className="w-5 h-5 text-gray-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>

                                            <input
                                                id="default-datepicker"
                                                type="date"
                                                className="border border-[#C1BBEB] text-gray-700 text-md rounded focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 py-3 px-4 focus:outline-none focus:bg-white focus:border-purple-500"
                                                placeholder="Select created date"
                                                value={registrationDate} onChange={(e) => setRegistrationDate(e.target.value)} required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Parent Company Id *</div>
                                        <div className="relative w-full">
                                            <select
                                                id="industries"
                                                className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded focus:outline-none focus:bg-white focus:border-purple-500 block py-3 px-4 pr-10 appearance-none"
                                                value={parentCompanyId} onChange={(e) => setParentCompanyId(e.target.value)} required
                                            >
                                                <option >Select Parent Company ID</option>
                                                <option defaultValue="id">ID</option>
                                                <option defaultValue="selfReference">Self-Reference</option>
                                            </select>

                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Ownership & Compliance */}
                    <div className="flex flex-col justify-center items-center py-4 pb-16">
                        <div className="w-full rounded-t-xl p-4 pl-14 bg-[#4D44B5] gap-10 flex justify-start text-white font-bold text-xl">
                            Ownership & Compliance
                        </div>
                        <div className="w-full rounded-b-xl py-4 px-6 bg-white gap-10">
                            <div className="flex flex-col lg:flex-row p-4 gap-4">
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Owner ID *</div>
                                        <div className="relative w-full">
                                            <select
                                                id="industries"
                                                className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded focus:outline-none focus:bg-white focus:border-purple-500 block py-3 px-4 pr-10 appearance-none"
                                                value={ownerId} onChange={(e) => setOwnerId(e.target.value)} required
                                            >
                                                <option >Select User</option>
                                                <option defaultValue="user1">User 1</option>
                                                <option defaultValue="user2">User 2</option>
                                                <option defaultValue="user3">User 3</option>
                                            </select>

                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Business Type *</div>
                                        <div className="relative w-full">
                                            <select
                                                id="industries"
                                                className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded focus:outline-none focus:bg-white focus:border-purple-500 block py-3 px-4 pr-10 appearance-none"
                                                value={businessType} onChange={(e) => setBusinessType(e.target.value)} required
                                            >
                                                <option >Select Business Type</option>
                                                <option defaultValue="private">Private</option>
                                                <option defaultValue="public">Public</option>
                                                <option defaultValue="nonProfit">Non-Profit</option>
                                            </select>

                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Board Members *</div>
                                        <input className="appearance-none border border-[#C1BBEB] rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Enter Board Members" value={boardMembers} onChange={(e) => setBoardMembers(e.target.value)} required />
                                    </div>
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Is Verified *</div>
                                        <div className="relative w-full">
                                            <select
                                                id="industries"
                                                className="bg-white w-full border border-[#C1BBEB] text-gray-700 text-sm rounded focus:outline-none focus:bg-white focus:border-purple-500 block py-3 px-4 pr-10 appearance-none"
                                                value={isVerified} onChange={(e) => setIsVerified(e.target.value)} required
                                            >
                                                <option >Select Verification Confirmation</option>
                                                <option defaultValue="private">True</option>
                                                <option defaultValue="public">False</option>
                                            </select>

                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Timestamps */}
                    <div className="flex flex-col justify-center items-center py-4 pb-16">
                        <div className="w-full rounded-t-xl p-4 pl-14 bg-[#4D44B5] gap-10 flex justify-start text-white font-bold text-xl">
                            Timestamps
                        </div>
                        <div className="w-full rounded-b-xl py-4 px-6 bg-white gap-10">
                            <div className="flex flex-col lg:flex-row p-4 gap-4">
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Created At *</div>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none focus:outline-none focus:bg-white focus:border-purple-500">
                                                <svg
                                                    className="w-5 h-5 text-gray-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>

                                            <input
                                                id="default-datepicker"
                                                type="date"
                                                className="border border-[#C1BBEB] text-gray-700 text-md rounded focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 py-3 px-4 focus:outline-none focus:bg-white focus:border-purple-500"
                                                placeholder="Select created date"
                                                value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" basis-[50%] shrink-0 grow-0 px-6">
                                    <div className="flex justify-start items-start flex-col pb-6">
                                        <div className="text-[#303972] font-[800] text-lg pb-4">Updated At *</div>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none focus:outline-none focus:bg-white focus:border-purple-500">
                                                <svg
                                                    className="w-5 h-5 text-gray-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </div>

                                            <input
                                                id="default-datepicker"
                                                type="date"
                                                className="border border-[#C1BBEB] text-gray-700 text-md rounded focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 py-3 px-4 focus:outline-none focus:bg-white focus:border-purple-500"
                                                placeholder="Select updated date"
                                                value={updatedAt} onChange={(e) => setUpdatedAt(e.target.value)} required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-row gap-6 justify-end items-end py-4 pb-16">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 border-2 border-[#4D44B5] rounded-full">
                                <button className="flex items-center justify-center gap-2 w-full px-6 py-2 text-[#4D44B5] text-md font-bold whitespace-nowrap" onClick={handleSaveAsDraft}>
                                    Save as Draft
                                </button>
                            </div>
                            <div className="flex bg-[#4D44B5] rounded-full">
                                <button className="flex items-center justify-center gap-2 w-full px-6 py-[10px] text-white text-md font-bold whitespace-nowrap" type="submit">
                                    {companyData ? "Update" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default NewCompany;