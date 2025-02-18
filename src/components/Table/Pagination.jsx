import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

const renderTooltip = (props) => (
  <Tooltip {...props} className="tooltip-inner">
    ⚠️ No more pages
  </Tooltip>
);

export default function Pagination({ page, totalPages, handlePageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <OverlayTrigger
        placement="top"
        overlay={page === 1 ? renderTooltip : <></>}
      >
        <span>
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 border ${
              page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100"
            }`}
          >
            Prev
          </Button>
        </span>
      </OverlayTrigger>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 border ${
            page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <OverlayTrigger
        placement="top"
        overlay={page === totalPages ? renderTooltip : <></>}
      >
        <span>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            variant="light"
            className={`px-3 py-1 ${
              page === totalPages ? "text-muted opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </Button>
        </span>
      </OverlayTrigger>
    </div>
  );
}
