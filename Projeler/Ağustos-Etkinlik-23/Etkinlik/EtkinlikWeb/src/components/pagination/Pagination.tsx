import { FunctionComponent } from "react";
import "./Pagination.css";
const PaginationComponent: FunctionComponent<any> = (props) => {
  const pageNumbers: number[] = props.pageNumbers;
  const currentPage: number = props.currentPage;
  const setCurrentPage: any = props.setCurrentPage;
  const data: any[] = props.data;
  const maxPageButtons = 5;
  let startPage, endPage;

  if (pageNumbers.length <= maxPageButtons) {
    startPage = 1;
    endPage = pageNumbers.length;
  } else {
    if (currentPage <= Math.ceil(maxPageButtons / 2)) {
      startPage = 1;
      endPage = maxPageButtons;
    } else if (
      currentPage + Math.floor(maxPageButtons / 2) >=
      pageNumbers.length
    ) {
      startPage = pageNumbers.length - (maxPageButtons - 1);
      endPage = pageNumbers.length;
    } else {
      startPage = currentPage - Math.floor(maxPageButtons / 2);
      endPage = currentPage + Math.floor(maxPageButtons / 2);
    }
  }
  const paginationItems = [];
  for (let number = startPage; number <= endPage; number++) {
    paginationItems.push(
      <li
        key={number}
        className={`page-item rounded-2 ${
          number === currentPage ? "active" : ""
        }`}
      >
        <a
         
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(number);
          }}
          className={`page-link customPaginationLink`}
        >
          {number}
        </a>
      </li>
    );
  }
  return (
    <nav
      style={{
        borderRight: "1px solid lightgray",
        borderLeft: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
      }}
      className="py-1 px-3 w-100 d-flex  justify-content-between align-items-center  "
      aria-label="Page navigation example"
    >
      <span style={{ fontSize: "14px" }}>
        Sayfa {currentPage}/{pageNumbers[pageNumbers.length - 1]} ({data.length}
        )
      </span>

      <ul className="pagination gap-2  ">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link customPaginationLinkArrows"
            href="#"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {paginationItems}

        <li
          className={`page-item ${
            currentPage === pageNumbers.length ? "disabled" : ""
          }`}
        >
          <a
            className={`page-link customPaginationLinkArrows`}
    
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < pageNumbers.length)
                setCurrentPage(currentPage + 1);
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>

      <select
        className="customPaginationLinkSelect"
        value={currentPage}
        onChange={(e) => {
          e.preventDefault();
          setCurrentPage(Number(e.target.value));
        }}
        name=""
        id=""
      >
        {pageNumbers.map((number,index) => (
          <option key={index} value={number}>{number} / page</option>
        ))}
      </select>
    </nav>
  );
};
export default PaginationComponent;
