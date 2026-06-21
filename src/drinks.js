// マルチネス本山 ドリンクメニュー データ
// ここを編集すれば、新しいメニューが追加されたときも簡単に更新できます。
//
// 各項目の意味：
// cat    : カテゴリ（クイズの絞り込みに使う）
// name   : 商品名
// glass  : グラスの種類
// base   : ベースのお酒
// amount : 量・プッシュ数
// mixer  : 割り材
// lemon  : レモンの扱い（無ければ "なし"）
// other  : 特記事項・イレギュラー（無ければ空文字 ""）

export const DRINKS = [
  { id: 1, cat: "レモンサワー", name: "いつものレモンサワー", glass: "ロゴ入りタンブラー", base: "こだわり酒場のレモンサワー", amount: "1プッシュ(25ml)", mixer: "ソーダUP", lemon: "カットレモン1ヶ", other: "" },
  { id: 2, cat: "レモンサワー", name: "どでかレモンサワー", glass: "どでかジョッキ", base: "こだわり酒場のレモンサワー", amount: "2プッシュ(50ml)", mixer: "ソーダUP", lemon: "カットレモン2ヶ", other: "" },
  { id: 3, cat: "レモンサワー", name: "翠ジンレモンサワー", glass: "ロゴ入りタンブラー", base: "翠ジン", amount: "30ml", mixer: "ソーダUP", lemon: "カットレモン1ヶ", other: "" },
  { id: 4, cat: "レモンサワー", name: "梅サワー", glass: "ロゴ入りタンブラー", base: "梅コンク", amount: "1プッシュ(30ml)", mixer: "ソーダUP", lemon: "なし", other: "" },
  { id: 5, cat: "レモンサワー", name: "ブラッドオレンジレモンサワー", glass: "ロゴ入りタンブラー", base: "こだわり酒場のレモンサワー", amount: "1プッシュ(25ml)", mixer: "ソーダUP", lemon: "なし", other: "ブラッドオレンジ15ml" },
  { id: 6, cat: "レモンサワー", name: "ブルーレモンサワー", glass: "ロゴ入りタンブラー", base: "こだわり酒場のレモンサワー", amount: "1プッシュ(25ml)", mixer: "ソーダUP", lemon: "なし", other: "ラムネシロップ15ml" },
  { id: 7, cat: "レモンサワー", name: "カルピスレモンサワー", glass: "ロゴ入りタンブラー", base: "こだわり酒場のレモンサワー", amount: "1プッシュ(25ml)", mixer: "ソーダUP", lemon: "なし", other: "カルピス20ml" },
  { id: 8, cat: "レモンサワー", name: "カルピス白桃レモンサワー", glass: "ロゴ入りタンブラー", base: "こだわり酒場のレモンサワー", amount: "1プッシュ(25ml)", mixer: "ソーダUP", lemon: "なし", other: "白桃カルピス20ml" },
  { id: 9, cat: "レモンサワー", name: "トマトはまぐりサワー", glass: "ロゴ入りタンブラー", base: "キンミヤ焼酎", amount: "30ml", mixer: "ソーダUP", lemon: "なし", other: "トマトハマグリベース50ml" },
  { id: 10, cat: "レモンサワー", name: "わさびサワー", glass: "ロゴ入りタンブラー", base: "翠ジン", amount: "30ml", mixer: "ソーダUP", lemon: "なし", other: "わさびシロップ15ml・マドラー付き" },
  { id: 11, cat: "やかん", name: "いつものレモンサワー（やかん）", glass: "やかん", base: "こだわり酒場のレモンサワー", amount: "3プッシュ(75ml)", mixer: "ソーダUP", lemon: "カットレモン3ヶ", other: "" },
  { id: 12, cat: "ハイボール", name: "ジムビームハイボール", glass: "JBジョッキ", base: "ジムビーム", amount: "規定量", mixer: "ソーダUP", lemon: "絞る用1ヶ", other: "" },
  { id: 13, cat: "ハイボール", name: "どでかジムビームハイボール", glass: "どでかジョッキ", base: "ジムビーム", amount: "規定量", mixer: "ソーダUP", lemon: "絞る用2ヶ", other: "" },
  { id: 14, cat: "ハイボール", name: "角ハイボール", glass: "角ジョッキ", base: "サントリー角", amount: "1プッシュ(30ml)", mixer: "ソーダUP", lemon: "絞る用1ヶ", other: "" },
  { id: 15, cat: "ハイボール", name: "どでか角ハイボール", glass: "どでかジョッキ", base: "サントリー角", amount: "2プッシュ(60ml)", mixer: "ソーダUP", lemon: "絞る用2ヶ", other: "" },
  { id: 16, cat: "お茶割り", name: "熟成緑茶割", glass: "ロゴ入りタンブラー", base: "キンミヤ焼酎", amount: "2プッシュ(60ml)", mixer: "緑茶UP", lemon: "なし", other: "" },
  { id: 17, cat: "お茶割り", name: "芋焼酎のほうじ茶割", glass: "ロゴ入りタンブラー", base: "前割り芋焼酎", amount: "90ml", mixer: "ほうじ茶90ml", lemon: "なし", other: "" },
  { id: 18, cat: "お茶割り", name: "麦焼酎のジャスミン茶割", glass: "ロゴ入りタンブラー", base: "前割り麦焼酎", amount: "90ml", mixer: "ジャスミン茶90ml", lemon: "なし", other: "" },
  { id: 19, cat: "お茶割り", name: "ウーロン茶割", glass: "ロゴ入りタンブラー", base: "キンミヤ焼酎", amount: "2プッシュ(60ml)", mixer: "ウーロン茶UP", lemon: "なし", other: "" },
  { id: 20, cat: "焼酎", name: "焼酎ロック", glass: "ロックグラス", base: "芋または麦焼酎", amount: "2プッシュ(60ml)", mixer: "なし", lemon: "なし", other: "氷5個" },
  { id: 21, cat: "焼酎", name: "焼酎水割り", glass: "ロゴ入りタンブラー", base: "芋または麦焼酎", amount: "2プッシュ(60ml)", mixer: "水UP", lemon: "なし", other: "" },
  { id: 22, cat: "焼酎", name: "焼酎お湯割り", glass: "ロックグラス", base: "芋または麦焼酎", amount: "2プッシュ(60ml)", mixer: "お湯UP", lemon: "なし", other: "" },
  { id: 23, cat: "焼酎", name: "焼酎ソーダ割", glass: "ロゴ入りタンブラー", base: "芋または麦焼酎", amount: "2プッシュ(60ml)", mixer: "ソーダUP", lemon: "なし", other: "" },
  { id: 24, cat: "焼酎", name: "だいやめロック", glass: "ロックグラス", base: "だいやめ", amount: "60ml", mixer: "なし", lemon: "なし", other: "氷5個" },
  { id: 25, cat: "焼酎", name: "だいやめソーダ割", glass: "ロゴ入りタンブラー", base: "だいやめ", amount: "60ml", mixer: "ソーダUP", lemon: "なし", other: "" },
  { id: 26, cat: "焼酎", name: "カルダモンロック", glass: "ロックグラス", base: "カルダモンTAKE7", amount: "60ml", mixer: "なし", lemon: "なし", other: "氷5個" },
  { id: 27, cat: "焼酎", name: "カルダモンロックソーダ割", glass: "ロゴ入りタンブラー", base: "カルダモンTAKE7", amount: "60ml", mixer: "ソーダUP", lemon: "なし", other: "" },
  { id: 28, cat: "梅酒・カシス", name: "南高梅酒（ロック）", glass: "ロックグラス", base: "南高梅酒", amount: "2プッシュ(60ml)", mixer: "なし", lemon: "なし", other: "氷5個" },
  { id: 29, cat: "梅酒・カシス", name: "南高梅酒水割り", glass: "ロゴ入りタンブラー", base: "南高梅酒", amount: "2プッシュ(60ml)", mixer: "水UP", lemon: "なし", other: "" },
  { id: 30, cat: "梅酒・カシス", name: "南高梅酒お湯割り", glass: "ロゴ入りタンブラー", base: "南高梅酒", amount: "2プッシュ(60ml)", mixer: "お湯UP", lemon: "なし", other: "" },
  { id: 31, cat: "梅酒・カシス", name: "南高梅酒ソーダ割り", glass: "ロゴ入りタンブラー", base: "南高梅酒", amount: "2プッシュ(60ml)", mixer: "ソーダUP", lemon: "なし", other: "" },
  { id: 32, cat: "梅酒・カシス", name: "酒場のカシオレ", glass: "ロゴ入りタンブラー", base: "カシス", amount: "30ml", mixer: "オレンジジュースUP", lemon: "なし", other: "" },
  { id: 33, cat: "ワイン", name: "コップワイン（赤・白）", glass: "カップ", base: "ワイン", amount: "既製品", mixer: "なし", lemon: "なし", other: "客席で蓋を開ける" },
  { id: 34, cat: "ソフトドリンク", name: "メロンクリームソーダ", glass: "無地グラス", base: "メロンエード", amount: "45ml", mixer: "ソーダUP", lemon: "なし", other: "バニラアイス・チェリー・ストロー・マドラー" },
  { id: 35, cat: "ソフトドリンク", name: "ブルークリームソーダ", glass: "無地グラス", base: "ブルーハワイ", amount: "45ml", mixer: "ソーダUP", lemon: "なし", other: "バニラアイス・チェリー・ストロー・マドラー" },
  { id: 36, cat: "ソフトドリンク", name: "パイナップルサワー", glass: "無地グラス", base: "パイナップルエード", amount: "45ml", mixer: "ソーダUP", lemon: "なし", other: "冷凍パイン6切れ・葉・ストロー" },
  { id: 37, cat: "ソフトドリンク", name: "イチゴソーダ", glass: "無地グラス", base: "イチゴエード", amount: "45ml", mixer: "ソーダUP", lemon: "なし", other: "冷凍イチゴ6個・ストロー" },
  { id: 38, cat: "ソフトドリンク", name: "サクランボソーダ", glass: "無地グラス", base: "さくらんぼエード", amount: "45ml", mixer: "ソーダUP", lemon: "なし", other: "チェリー3個・ストロー" },
  { id: 39, cat: "ソフトドリンク", name: "クラフトコーラ", glass: "無地グラス", base: "コーラのもと", amount: "60ml", mixer: "ソーダUP", lemon: "なし", other: "" },
  { id: 40, cat: "ソフトドリンク", name: "ジンジャーエール", glass: "無地グラス", base: "ジンジャーエールのもと", amount: "80ml", mixer: "ソーダUP", lemon: "なし", other: "" },
];
