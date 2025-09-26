"use client";

import { useState, useMemo, useEffect } from "react";
import FilterSearchComponent from "@/_components/strains-page/filter-search-component";
import StrainComponent from "@/_components/strains-page/strain-component";
import PaginationComponent from "@/_components/strains-page/pagination-component";

import strainData from "@/_data/strains-data.json";

const Strains = () => {
  const [filter, setFilter] = useState("Latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredStrains = useMemo(() => {
    let filtered = [...strainData];

    if (searchTerm) {
      filtered = filtered.filter(
        (strain) =>
          strain.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          strain.description.some((desc) =>
            desc.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    switch (filter) {
      case "A-Z":
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Price High to Low":
        filtered = filtered.sort((a, b) => {
          if (a.inStock && !b.inStock) return -1;
          if (!a.inStock && b.inStock) return 1;
          return b.price - a.price;
        });
        break;
      case "Price Low to High":
        filtered = filtered.sort((a, b) => {
          if (a.inStock && !b.inStock) return -1;
          if (!a.inStock && b.inStock) return 1;
          return a.price - b.price;
        });
        break;
      case "Latest":
      default:
        filtered = filtered.sort((a, b) => {
          if (a.inStock && !b.inStock) return -1;
          if (!a.inStock && b.inStock) return 1;
          return 0;
        });
        break;
    }

      return filtered;
  }, [filter, searchTerm]);

  const validStrains = useMemo(() => {
    return filteredStrains.filter(
      (item) =>
        item.images[0] !== "" &&
        item.title !== "" &&
        item.price !== null &&
        item.supplier !== ""
    );
  }, [filteredStrains]);

  const totalPages = Math.ceil(validStrains.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  const currentStrains = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return validStrains.slice(startIndex, endIndex);
  }, [validStrains, currentPage, itemsPerPage]);

  return (
    <div className="max-w-[1280px] grid gap-15 py-15 mx-auto px-5 desktop:px-10">
      <div className="grid gap-10">
        <h2>Strains</h2>
        <FilterSearchComponent
          onFilterChange={setFilter}
          onSearchChange={setSearchTerm}
        />
      </div>
      <ul className="grid gap-10 grid-cols-1 place-items-start tablet:gap-15 tablet:grid-cols-2 min-[1000px]:grid-cols-3">
        {currentStrains.map((strain, index) => (
          <StrainComponent key={index} strainData={strain} />
        ))}
      </ul>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Strains;
