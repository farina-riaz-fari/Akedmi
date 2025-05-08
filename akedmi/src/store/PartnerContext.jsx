import { createContext, useState, useEffect } from "react";
import { openDB } from "idb";
import { deletePartnerFromDB, savePartnerToDB } from "../utils/Partnerdb";

export const PartnerContext = createContext({
  partners: [],
  addPartner: () => {},
  updatePartner: () => {},
  deletePartner: () => {},
});

const PartnerProvider = ({ children }) => {
  const [partners, setPartners] = useState([]);

  const loadPartners = async () => {
    const db = await openDB("PartnerDB", 1, {
      upgrade(db) {
        db.createObjectStore("partners", { keyPath: "userId" });
      },
    });
    const partnersList = await db.getAll("partners");
    setPartners(partnersList);
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const addPartner = async (partner) => {
    const db = await openDB("PartnerDB", 1);
    const tx = db.transaction("partners", "readwrite");
    await tx.objectStore("partners").add(partner);
    await tx.done;
    setPartners((prev) => [...prev, partner]);
  };

  const updatePartner = async (updatedPartner) => {
    await savePartnerToDB(updatedPartner);
    setPartners((prev) =>
      prev.map((pt) =>
        pt.userId === updatedPartner.userId ? updatedPartner : pt
      )
    );
  };

  const deletePartner = async (userId) => {
    await deletePartnerFromDB(userId);
    setPartners((prev) => prev.filter((pt) => pt.userId !== userId));
  };

  return (
    <PartnerContext.Provider
      value={{ partners, addPartner, updatePartner, deletePartner }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export { PartnerProvider };
