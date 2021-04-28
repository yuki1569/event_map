import React, { useState, useEffect } from "react";
import { TextField, ListItem, ListItemText } from "@material-ui/core/";

interface Props {
  text: string;
}

const ListItems: React.FC<Props> = (props) => (
  <ListItem alignItems="center" divider>
    <ListItemText primary={props.text} />
  </ListItem>
);

export default function SearchTextField(props) {

  //props.EventList = firestoreのeventList
  const products = props.EventList

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
      
      searchKeywords.every((kw) => 
        product.tagList.join().toLowerCase().indexOf(kw) !== -1
        // product.tagList.join().toLowerCase().indexOf(kw) !== -1
        // product.title.toLowerCase().indexOf(kw) !== -1
      )
   
      // searchKeywords.every((kw) => product.title.toLowerCase().indexOf(kw) !== -1)
    );
    // setFilteredProducts(result.length ? result : ["No Item Found"]);
    setFilteredProducts(result);
  }, [keyword]);

  return (
    <>
    <p style={{
      display:'inline-block',
      zIndex: 30,
      backgroundColor: 'white',
      borderRadius:'4px'
    }}>
      <TextField
        variant="filled"
        id="field"
        color="secondary"
        label="enter keywords"
        onChange={(e) => setKeyword(e.target.value)}
        // onClick={() => setShowLists(true)}
        // onBlur={() => setShowLists(false)}
        onKeyPress={e => {
          // e.keyCodeは常に0になる
          if (e.key === 'Enter') {
            // エンターキー押下時の処理
            setShowLists(false)
            // console.log(filteredProducts);
            props.setSearchValue(filteredProducts)
          }
        }}
      />

      </p>
      </>
  );
};
