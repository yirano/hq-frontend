import axios from "axios";
import { Button, Flex, Select } from "components";
import { useMarketplaceDispatch } from "context/MarketplaceContextProvider";
import React, { useState } from 'react';

const Filter = () => {
  // =========================== STATE ===============================
  const [vendors, setVendors] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // =========================== CONTEXT ===============================
  const dispatch = useMarketplaceDispatch();

  // =========================== FUNCTIONS ===============================
  const handleLocation = async (e: any) => {
    setSelectedLocation(e.target.value);
    setSelectedVendor(null);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/locations/${e.target.value}/vendors`);
      setVendors(res.data);
    } catch (error) {
      console.error('Error getting vendors', error);
    }
  };

  const handleVendor = (e: any) => {
    setSelectedVendor(e.target.value);
  };

  const searchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/locations/${selectedLocation}/vendors/${selectedVendor}`);
      dispatch({ type: 'SET_PRODUCTS', payload: res.data });
    } catch (error) {
      console.error('Error getting products', error);
    }
  };

  const resetProducts = async () => {
    setSelectedLocation(null);
    setSelectedVendor(null);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      dispatch({ type: 'SET_PRODUCTS', payload: res.data });
    } catch (error) {
      console.error('Error getting products', error);
    }
  };

  // ========================= RENDER ============================
  return (
    <Flex column padding="20px 0 0">
      <Select
        width="400px"
        placeholder="Select Location"
        value={selectedLocation || "0"}
        options={[
          { value: '0', label: 'Select Location', disabled: true },
          { value: '1', label: 'Pineview Reservoir' },
          { value: '2', label: 'Park City' },
        ]}
        onChange={handleLocation}
      />
      {vendors.length > 0 && (
        <Select
          width="400px"
          placeholder="Select Vendor"
          value={selectedVendor || "0"}
          options={[
            { value: '0', label: 'Select Vendor', disabled: true },
            ...vendors.map((vendor: any) => {
              return { value: vendor.id, label: vendor.name };
            })
          ]}
          onChange={handleVendor}
        />
      )}
      <Flex gap="10px">
        <Button onClick={searchProducts} disabled={!selectedLocation || !selectedVendor}>Search</Button>
        <Button onClick={resetProducts} disabled={!selectedLocation && !selectedVendor}>Reset</Button>
      </Flex>
    </Flex>
  );
};

export default Filter;
