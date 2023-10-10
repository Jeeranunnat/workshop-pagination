import { useEffect, useState } from 'react';
import './App.css';
import FoodComponent from './components/FoodComponents';
import MenuData from './data/MenuData';

function App() {
  const [FoodData, setFoodData] = useState(MenuData);
  const [dataInPage, setDataInPage] = useState([]);
  const [page, setPage] = useState(0);

  const pagination = () => {
    const foodPerPage = 3; //show 7 card per page
    const pages = Math.ceil(MenuData.length / foodPerPage);
    const newFood = Array.from({ length: pages }, (data, index) => {
      const start = index * foodPerPage; //[0,],[7,]
      return MenuData.slice(start, start + foodPerPage);
    });

    return newFood;
  };

  const handlePage = (index) => {
    setPage(index);
  };

  useEffect(() => {
    const paginate = pagination(MenuData);
    setDataInPage(paginate);
    setFoodData(paginate[page]);
  }, [page]);

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className="container">
        {FoodData.map((data, index) => {
          return <FoodComponent {...data} key={index} />;
        })}
      </div>
      <div className="pagination-container">
        {dataInPage.map((data, index) => {
          return (
            <button
              key={index}
              onClick={() => handlePage(index)}
              className={`page-btn ${index === page ? 'active-btn' : 'null'}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
