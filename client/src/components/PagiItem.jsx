import clsx from "clsx";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const PagiItem = ({ children }) => {
  const [params] = useSearchParams();
  const { category } = useParams();
  const navigate = useNavigate();
  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(children)) queries.page = Number(children);
    else queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <button
      className={clsx(
        "w-10 h-10 rounded-md flex justify-center",
        !Number(children) && "items-end p-2",
        Number(children) && "items-center cursor-pointer hover:bg-gray-200",
        Number(children) === Number(params.get("page")) &&
          "bg-primary text-white hover:bg-primary",
        !+params.get("page") &&
          Number(children) === 1 &&
          "bg-primary text-white hover:bg-primary"
      )}
      onClick={handlePagination}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default PagiItem;
