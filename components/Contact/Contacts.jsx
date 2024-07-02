"use client";
import { useGetAllContactsQuery } from "@/hooks/contactsHook";
import React, { useEffect, useState } from "react";

const Contacts = () => {
  const limit = 10;
  const contactQuery = `locationId=${selectedLocationId}&page=${currentPage}&limit=${limit}`;
  const contactsList = useGetAllContactsQuery(contactQuery, {
    refetchOnMountOrArgChange: true,
    skip: !selectedLocationId,
  });
  console.log(contactsList?.isLoading, contactsList?.data, contactsList.status);
  return <>Contact List</>;
};

export default Contacts;
