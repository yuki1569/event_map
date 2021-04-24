import React, { useState, useEffect } from "react";
import { TextField, ListItem, ListItemText } from "@material-ui/core/";
import { eventDB } from '../lib/db'

interface Props {
  text: string;
}

const eventTitleList = []

eventDB.map(db => {
  eventTitleList.push(db.title)
})

// const products =eventTitleList
const products =eventTitleList


const ListItems: React.FC<Props> = (props) => (
  <ListItem alignItems="center" divider>
    <ListItemText primary={props.text} />
  </ListItem>
);

const SearchTextField: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [showLists, setShowLists] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (keyword === "") {
      setFilteredProducts(products);
      return;
    }

    const searchKeywords = keyword
      .trim()
      .toLowerCase()
      .match(/[^\s]+/g);

    //入力されたキーワードが空白のみの場合
    if (searchKeywords === null) {
      setFilteredProducts(products);
      return;
    }

    const result = products.filter((product) =>
      searchKeywords.every((kw) => product.toLowerCase().indexOf(kw) !== -1)
    );

    setFilteredProducts(result.length ? result : ["No Item Found"]);
  }, [keyword]);

  return (
    <div style={{zIndex:30,position:'fixed', backgroundColor:'white'}}>
      <TextField
        id="field"
        color="secondary"
        variant="outlined"
        label="enter keywords"
        onChange={(e) => setKeyword(e.target.value)}
        onClick={() => setShowLists(!showLists)}
        onBlur={() => setShowLists(!showLists)}
 
      />
      {!showLists
        ? filteredProducts.map((v, i) => <ListItems key={i} text={v} />)
        : <ListItems />
      }
    </div>
  );
};

export default SearchTextField;