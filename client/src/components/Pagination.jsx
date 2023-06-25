import usePagination from "../hooks/usePagination";
import { PagiItem } from "./index";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, 2);

  const range = () => {
    const currentPage = +params.get("page") || 1;
    const pageSize = process.env.REACT_APP_PAGE_SIZE || 10;

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end} of ${totalCount} items`;
  };

  return (
    <div className="flex justify-between items-center w-full">
      {totalCount > 0 && <span className="">{range()}</span>}
      <div className="flex items-center gap-2">
        {pagination?.map((item) => (
          <PagiItem key={item}>{item}</PagiItem>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
