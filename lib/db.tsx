import { useState,useEffect } from "react";
// import EventList from "../pages/csr/🚮eventList";
import { auth, fireStoreDB, firebaseUser,Firebase} from '../src/firebase';


// export async function EventList()
// {
//   const [loading, setLoading] = useState(true);
//   // const [eventList, setEventList] = useState([]);
//     const EventList = [];
//       // Firestoreのコレクションを指定してデータ取得。今回は全量を検索
//       const res = await fireStoreDB.collection('eventList').get();
//       if (res.empty) return [];
//       // const EventList = [];

//       res.forEach(doc => {
//           EventList.push(doc.data());
//       })
//   return EventList
// }

// export const eventDB = [
//   {
//     title: "海の中道フラワーピクニック2021",
//     thumbnail:
//       "//ms-cache.walkerplus.com/walkertouch/wtd/event/04/l/301804_2.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e301804/",
//     tagList: [
//       "花・自然",
//       "イベントその他",
//       "子供と",
//       "恋人と・夫婦で",
//       "友達と",
//     ],
//     contents:
//       "ネモフィラ120万本の広大な青の花畑や、カラフルなチューリップ8万本など、見どころ満載の福岡に春を告げるイベント「海の中道フラワーピクニック」。特に、4月上旬のサクラのピンクとネモフィラの青のコラボレーションは、うみなかならではの景色。期間中には、週末を中心に、動物ふれあいイベントやクラフト体験などのイベントも開催される。「電動キックボード体験」や「バラのポプリ作り」、福岡のお茶とお菓子を楽しめる「お花見お茶会」など、初開催のイベントも盛りだくさん。",
//     period: "2021年3月20日(土・祝)～5月23日(日)",
//     startDate: "2021-03-20",
//     endDate: "2021-05-23",
//     streetAddress: "福岡県福岡市東区大字西戸崎18-25",
//     longitudeLatitude: ["33.661195", "130.354066"],
//   },
//   {
//     title:
//       "リアル脱出ゲーム×進撃の巨人The Final Season 5つの巨人からの脱出(福岡)",
//     thumbnail:
//       "//ms-cache.walkerplus.com/walkertouch/wtd/event/18/l/398918.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e398918/",
//     tagList: [
//       "体験イベント・アクティビティ",
//       "アニメ・ゲーム",
//       "恋人と・夫婦で",
//       "友達と",
//       "子供と",
//     ],
//     contents:
//       "リアル脱出ゲームと進撃の巨人のコラボレーションイベント第5弾を開催。参加者は本編に登場する「調査兵団」の一員になりきり、リヴァイやミカサと協力しながら5つの巨人に立ち向かう。アイテムを使い、戦いの舞台となるマーレの街を再現したジオラマ地図を実際に組み立て、その地図を駆使して状況を打開するための作戦を立案することが、脱出の成否を分ける重要なカギ。また、イベント限定の描き下ろしイラストを使用したオリジナルグッズも発売予定。会場だけでなく家でも進撃の巨人の世界観が楽しめる。",
//     period: "2021年4月29日(木)～5月5日(水)",
//     startDate: "2021-04-29",
//     endDate: "2021-05-05",
//     streetAddress: "福岡県福岡市中央区天神2-11-3",
//     longitudeLatitude: ["33.589917", "130.398976"],
//   },
//   {
//     title: "ミイラ 「永遠の命」を求めて",
//     thumbnail:
//       "//ms-cache.walkerplus.com/walkertouch/wtd/event/28/l/403928.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e403928/",
//     tagList: ["美術展・博物展", "友達と", "子供と", "恋人と・夫婦で"],
//     contents:
//       "自然にミイラとなったものから人工的につくられたミイラまで、エジプトをはじめ、南米、ヨーロッパ、オセアニア、日本と世界各地から総数42体が一堂に会する今までにない展覧会。誰が、なぜ、どのような過程を経てミイラとなったのか、長らく単に好奇の対象だったミイラを学術的に分析。最新科学によって明らかになったミイラの実像、学術的な価値、そして人類がもつ多様な死生観や文化の違いを紹介しながら、ミイラの謎に迫る。",
//     period:
//       "2021年4月10日(土)～6月27日(日)※休館日：月曜日、ただし、5月3日(月・祝)は開館、5月6日(木)は休館",
//     startDate: "2021-04-10",
//     endDate: "2021-06-27",
//     streetAddress: "福岡県福岡市早良区百道浜3-1-1",
//     longitudeLatitude: ["33.589724", "130.353037"],
//   },
//   {
//     title: "花立山ファーム いちご狩り",
//     thumbnail: "//ms-cache.walkerplus.com/walkertouch/wtd/images/l/260343.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e328855/",
//     tagList: ["味覚狩り", "子供と", "いちご狩り", "友達と"],
//     contents:
//       "温度と二酸化炭素をコンピューター管理する「ICT管理」で育ったあまおう、紅ほっぺ、恋みのり、かおりのの食べ比べができる。ハウス内の通路幅が80センチメートルあるのでベビーカーや車イスでも利用可能で、低い位置でいちごが摘めるなど、子供からお年寄りまで安心して楽しめるバリアフリー設備を完備している。",
//     period: "2021年1月4日(月)～5月中旬※不定休",
//     startDate: "2021-01-04",
//     endDate: "2021-05-15",
//     streetAddress: "福岡県朝倉郡筑前町大久保1795-3",
//     longitudeLatitude: ["33.430802", "130.614058"],
//   },
//   {
//     title: "あかしゃのいちご畑 いちご狩り",
//     thumbnail:
//       "//ms-cache.walkerplus.com/walkertouch/wtd/event/94/l/338194.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e338194/",
//     tagList: ["味覚狩り", "子供と", "いちご狩り", "友達と"],
//     contents:
//       "福岡市西区今津にあるいちご園で、自社開発のいちごが堪能できる。こだわりを持った独自の制法で育まれたいちごは、高濃度で高品質、そして大粒だと好評。糖度の高いいちごが堪能できるので、本来の甘さを味わってもらうため、園内では練乳の提供は行っておらず、持ち込みも不可となっている。",
//     period: "2021年2月上旬～5月上旬土・日曜開園 ※祝日はいちごの状況により開園",
//     startDate: "2021-02-01",
//     endDate: "2021-05-01",
//     streetAddress: "福岡市西区今津810",
//     longitudeLatitude: ["33.604669", "130.263797"],
//   },
//   {
//     title: "デビュー50周年記念 諸星大二郎展 異界への扉",
//     thumbnail:
//       "//ms-cache.walkerplus.com/walkertouch/wtd/event/40/l/402140.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e402140/",
//     tagList: ["見本市・展示会", "恋人と・夫婦で", "友達と"],
//     contents:
//       "日本中に多数の熱狂的なファンをもち、クリエイターから異分野の研究者まで、あらゆる方面から絶大な支持を誇る漫画家・諸星大二郎。圧倒的な想像力と構築力によって唯一無二の世界観を確立している彼のデビュー50周年を記念した展覧会が開催される。『西遊妖猿伝』『妖怪ハンター』などの代表作の原画約350点を中心に、作品世界に関わりの深い美術作品や歴史・民俗資料などもあわせて展示。読む者を「異界」へと導く魅力の原点へと迫る内容となっている。",
//     period:
//       "2021年3月20日(土)～5月23日(日)※休館日：毎週火曜日(3月30日、4月6日、5月4日を除く)",
//     startDate: "2021-03-20",
//     endDate: "2021-05-23",
//     streetAddress: "福岡県北九州市小倉北区浅野2-14-5 あるあるCity5・6F",
//     longitudeLatitude: ["33.887551", "130.884677"],
//   },
//   {
//     title: "TENJIN MATSURI 梅佳代「天神さま」 川島小鳥「ピンクの光線」",
//     thumbnail:
//       "//ms-cache.walkerplus.com/walkertouch/wtd/event/90/l/401490.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e401490/",
//     tagList: ["美術展・博物展"],
//     contents:
//       "8月31日に閉館を迎えるイムズと三菱地所アルティアムの、最後の創業記念日(4月12日)を飾る特別な展覧会。再開発の渦中である福岡・天神で、2人の人気写真家、梅佳代と川島小鳥が、街とその街にかかわる人々を撮影。これまで梅と川島の写真集や展覧会を手がけてきた祖父江慎が、アートディレクター として2人の作品を魅力的に展開する。",
//     period: "2021年3月20日(土・祝)～5月16日(日)※休館日：4月20日(火)",
//     startDate: "2021-03-20",
//     endDate: "2021-05-16",
//     streetAddress: "福岡県福岡市中央区天神1-7-11 イムズ 8F",
//     longitudeLatitude: ["33.590133", "130.400197"],
//   },
//   {
//     title: "石田スイ展 ［東京喰種 ・JACKJEANNE］",
//     thumbnail:
//       "//ms-cache.walkerplus.com/walkertouch/wtd/event/89/l/403989.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e403989/",
//     tagList: ["美術展・博物展", "子供と", "友達と"],
//     contents:
//       "全世界累計発行部数4700万部を超える人気コミック「東京喰種トーキョーグール」シリーズで知られる漫画家・石田スイの、初の大規模展覧会。テーマは、“石田スイの世界を追体験、～ゼロから作品が生まれるまで～”。漫画「東京喰種トーキョーグール」とNintendo Switch用ゲーム「ジャックジャンヌ」の2作品を中心に、それぞれの作品が出来上がるまでの制作過程を、多数のイラストや資料から明らかにする。※Nintendo Switchは任天堂の商標です。",
//     period:
//       "2021年4月10日(土)～5月16日(日)※休館日：毎週水曜日(水曜が祝日の場合はその翌平日)",
//     startDate: "2021-04-10",
//     endDate: "2021-05-16",
//     streetAddress: "福岡県福岡市博多区下川端町3-1 リバレインセンタービル7･8F",
//     longitudeLatitude: ["33.595182", "130.40584"],
//   },
//   {
//     title: "筑紫野いちご農園 ストロベリーフィールズ いちご狩り",
//     thumbnail: "//ms-cache.walkerplus.com/walkertouch/wtd/images/l/55623.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e328724/",
//     tagList: ["味覚狩り", "子供と", "いちご狩り", "友達と"],
//     contents:
//       "かおりのや、さがほのかなど、定番から珍しい品種まで6種類のいちごを栽培。時期によって様々ないちごが味わえる。高さの違う高設栽培で、子供から大人まで、車椅子やベビーカーでも安心して利用できる。また、園内ではジャム作り体験も実施。さらに、農園のいちごを使ったケーキやお菓子などを提供するスイーツショップ「Sucre fraise」が農園横にある。いちごの美味しさが引き立つ様々なスイーツが味わえる。",
//     period: "2020年12月5日(土)～2021年5月31日(月)※月曜(祝日の場合は翌日)休み",
//     startDate: "2020-12-05",
//     endDate: "2021-05-31",
//     streetAddress: "福岡県筑紫野市大字筑紫1278",
//     longitudeLatitude: ["33.462833", "130.532261"],
//   },
//   {
//     title: "秋山園芸 いちご狩り",
//     thumbnail:
//       "//ms-cache.walkerplus.com/walkertouch/wtd/event/00/l/328900.jpg",
//     link: "https://www.walkerplus.com/event/ar1040e328900/",
//     tagList: ["味覚狩り", "子供と", "いちご狩り", "友達と"],
//     contents:
//       "広々とした敷地であまおうが60分食べ放題。ハウス内の通路は広く無理な姿勢にならずに摘み取れる高設栽培なので、小さな子供を連れたファミリーにも人気だ。",
//     period: "2020年12月中旬～2021年5月上旬",
//     startDate: "2020-12-15",
//     endDate: "2021-05-01",
//     streetAddress: "福岡県古賀市久保260",
//     longitudeLatitude: ["33.738767", "130.483454"],
//   },
// ];