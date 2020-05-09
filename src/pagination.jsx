import React, { PureComponent } from "react";
import _ from "lodash";

const Pagination = props => {
  let { totalPages, currentPage, handlePageChange } = props;
  // const noOfPages = count / pageSize;
  const Pages = _.range(1, totalPages + 1);
  // function leftArrow() {
  //   if (currentPage > Pages.length) {
  //     currentPage--;
  //   }
  //   console.log("clicked");
  // }
  // console.log(noOfPages);

  // function getNext(){
  //   if(this.currentPage < this.pages.length-1){
  //     this.currentPage++;
  //   }
  // }

  // function getPrev(){
  //   if(this.currentPage > 0){
  //     this.currentPage--;
  //   }

  // }
  return (
    <div className="paging">
      {/* <!-- left arrow --> */}
      <div className="paging__arrow">
        <i className="fas fa-angle-left"></i>
      </div>
      {/* <!-- page number --> */}
      {/* <div className="paging__number active">1</div>
      <div className="paging__number">2</div>
      <div className="paging__number">3</div> */}
      {Pages.map(page => (
        <div
          style={{ cursor: "pointer" }}
          key={page}
          onClick={() => handlePageChange(page)}
          className={
            page == currentPage ? "paging__number active" : "paging__number"
          }
        >
          {page}
        </div>
      ))}
      {/* <!-- right arrow --> */}
      <div className="paging__arrow">
        <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
};

export default Pagination;
