import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import SignIn from "./login";
import { auth, firebaseUser, fireStoreDB, Firebase } from "../src/firebase";
import { useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90vh",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalLogin(props) {
  let lists = props.userTagList;

  let initFirebaseAuth = () => {
    return new Promise((resolve) => {
      var unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
        // user オブジェクトを resolve
        resolve(user);

        // 登録解除
        unsubscribe();
      });
    });
  };

  const [checkedAlone, setCheckedAlone] = React.useState();
  const [checkedFriends, setCheckedFriends] = React.useState();
  const [checkedDate, setCheckedDate] = React.useState();
  const [checkedKid1, setCheckedKid1] = React.useState();
  const [checkedKid2, setCheckedKid2] = React.useState();
  const [checkedKid3, setCheckedKid3] = React.useState();

  // 使う側
  async function checkSwitch(word, set) {
    // 同期的に書ける
    var user = await initFirebaseAuth();

    // ログインしていれば中通る
    if (user) {
      console.log(user); // ユーザー情報が表示される
    }

    // 以降であれば currentUser にアクセスしても OK
    if (Firebase.auth().currentUser) {
      // TODO: ログインしている場合の処理
      checkSwitchTag(word, set);
    }
  }

  function checkSwitchTag(word, set) {
    if (
      lists.filter(
        (list) => list.uidname == Firebase.auth().currentUser.uid + word
      ).length != 0
    ) {
      set(true);
    } else {
      set(false);
    }
  }

  useEffect(() => {
    checkSwitch("一人で", setCheckedAlone);
    checkSwitch("友達と", setCheckedFriends);
    checkSwitch("恋人と・夫婦で", setCheckedDate);
    checkSwitch("幼児以下の子供と", setCheckedKid1);
    checkSwitch("小学生までの子供と", setCheckedKid2);
    checkSwitch("中学生以上の子供と", setCheckedKid3);
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalLoginOpen}
        onBackdropClick={() => props.setModalLoginOpen(!props.modalLoginOpen)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalLoginOpen}>
          <Box sx={style}>
            {/* <Typography id="transition-modal-title" variant="h6" component="h2"> */}

            <SignIn
              userTagList={props.userTagList}
              checkedAlone={checkedAlone}
              setCheckedAlone={setCheckedAlone}
              checkedFriends={checkedFriends}
              setCheckedFriends={setCheckedFriends}
              checkedDate={checkedDate}
              setCheckedDate={setCheckedDate}
              checkedKid1={checkedKid1}
              setCheckedKid1={setCheckedKid1}
              checkedKid2={checkedKid2}
              setCheckedKid2={setCheckedKid2}
              checkedKid3={checkedKid3}
              setCheckedKid3={setCheckedKid3}
              setSwitchRecom={props.setSwitchRecom}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
