import img1 from "../assets/images/ecommerce/jpg/1.jpg";
import img2 from "../assets/images/ecommerce/jpg/2.jpg";
import img3 from "../assets/images/ecommerce/jpg/3.jpg";
import img4 from "../assets/images/ecommerce/jpg/4.jpg";
import img5 from "../assets/images/ecommerce/jpg/5.jpg";
import img6 from "../assets/images/ecommerce/jpg/6.jpg";
import img7 from "../assets/images/ecommerce/jpg/7.jpg";
import img8 from "../assets/images/ecommerce/jpg/8.jpg";
import img9 from "../assets/images/ecommerce/jpg/9.jpg";
import img10 from "../assets/images/ecommerce/jpg/10.jpg";
import img11 from "../assets/images/ecommerce/jpg/11.jpg";
import img12 from "../assets/images/ecommerce/jpg/12.jpg";
import { Maindata } from "../container/ecommerce/ecommercedata";
const initialState = {
   lang: "en",
   dir: "ltr",
   dataThemeMode: "light",
   dataMenuStyles: "light",
   dataNavLayout: "vertical",
   dataHeaderStyles: "gradient",
   dataVerticalStyle: "overlay",
   StylebodyBg: "107 64 64",
   StyleDarkBg: "93 50 50",
   toggled: "",
   dataNavStyle: "",
   horStyle: "",
   dataPageStyle: "regular",
   dataWidth: "fullwidth",
   dataMenuPosition: "fixed",
   dataHeaderPosition: "fixed",
   loader: "disable",
   iconOverlay: "",
   colorPrimaryRgb: "",
   bodyBg1: "",
   bodyBg2: "",
   darkBg: "",
   inputBorder: "",
   bgImg: "",
   iconText: "",
   body: {
      class: ""
   },
   ecommercedata: [
      {
         id: '1',
         preview: img1,
         title: 'Dapzem & Co',
         description: 'Branded hoodie ethnic style',
         oldpr: '$458',
         newpr: '$1,799',
         offerprice: '$229',
         quantity: 1,
         images: [
            { 'img': img1 },
            { 'img': img1 },
            { 'img': img1 }],
         size: 'Large'
      },
      {
         id: '2',
         preview: img2,
         title: 'Denim Winjo',
         description: 'Vintage pure leather Jacket',
         oldpr: '$1198',
         newpr: '$2,499',
         offerprice: '$599',
         quantity: 2,
         images: [
            { 'img': img2 },
            { 'img': img2 },
            { 'img': img2 }],
         ribbon: '',
         size: 'Medium'
      },
      {
         id: '3',
         preview: img3,
         title: 'Jimmy Lolfiger',
         description: 'Unisex jacket for men & women',
         oldpr: '$1,199',
         newpr: '$3,299',
         offerprice: '$1,199',
         quantity: 1,
         images: [
            { 'img': img3 },
            { 'img': img3 },
            { 'img': img3 }],
         ribbon: '',
         size: 'Small'
      },
      {
         id: '4',
         preview: img4,
         title: 'Bluberry Co.In',
         description: 'Full sleeve white hoodie',
         oldpr: '$349',
         newpr: '$1,299',
         offerprice: '$349',
         quantity: 1,
         images: [
            { "img": img4 },
            { "img": img4 },
            { "img": img4 },],
         ribbon: '',
         size: 'Large'
      },
      {
         id: '5',
         preview: img5,
         title: 'Aus Polo Assn',
         description: 'Snow jacket with low pockets',
         oldpr: '$1,899',
         newpr: '$3,799',
         offerprice: '$1,899',
         quantity: 1,
         images: [
            { 'img': img5 },
            { 'img': img5 },
            { 'img': img5 }],
         size: 'Large'
      },
      {
         id: '6',
         preview: img6,
         title: 'BMW',
         description: 'Ethnic wear jackets form BMW',
         oldpr: '$1,499',
         newpr: '$2,499',
         offerprice: '$1,499',
         quantity: 1,
         images: [
            { 'img': img6 },
            { 'img': img6 },
            { 'img': img6 }],
         size: 'Medium'
      },
      {
         id: '7',
         preview: img7,
         title: 'Denim Corporation',
         description: 'Flap pockets denim jackets for men',
         oldpr: '$299',
         newpr: '$399',
         offerprice: '$299',
         quantity: 1,
         images: [
            { 'img': img7 },
            { 'img': img7 },
            { 'img': img7 }],
         ribbon: '',
         size: 'Small'
      },
      {
         id: '8',
         preview: img8,
         title: 'Pufa',
         description: 'Ergonic designed full sleeve coat',
         oldpr: '$2,399',
         newpr: '$5,699',
         offerprice: '$2,399',
         quantity: 1,
         images: [
            { 'img': img8 },
            { 'img': img8 },
            { 'img': img8 }],
         ribbon: '',
         size: 'Large'
      },
      {
         id: '9',
         preview: img9,
         title: 'Louie Phillippe',
         description: 'Ergonic green colored full sleeve jacket',
         oldpr: '$1,899',
         newpr: '$3,299',
         offerprice: '$1,899',
         quantity: 1,
         images: [
            { 'img': img9 },
            { 'img': img9 },
            { 'img': img9 }],
         size: 'Large'
      },

      {
         id: '10',
         preview: img10,
         title: 'Denim Corp',
         description: 'beautiful brown colored snow jacket',
         oldpr: '$2,499',
         newpr: '$4,999',
         offerprice: '$499',
         quantity: 1,
         images: [
            { 'img': img10 },
            { 'img': img10 },
            { 'img': img10 }],
         size: 'Medium'
      },

      {
         id: '11',
         preview: img11,
         title: 'Garage & Co',
         description: 'Full sleeve sweat shirt',
         oldpr: '$249',
         newpr: '$1,299',
         offerprice: '$249',
         quantity: 1,
         images: [
            { 'img': img11 },
            { 'img': img11 },
            { 'img': img11 }],
         size: 'Large'
      },
      {
         id: '12',
         preview: img12,
         title: 'Blueberry & Co',
         description: 'Light colored sweater form blueberry',
         oldpr: '$499',
         newpr: '$799',
         offerprice: '$499',
         quantity: 1,
         images: [
            { 'img': img12 },
            { 'img': img12 },
            { 'img': img12 }],
         size: 'Medium'
      },
   ],

};
export default function reducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {

      case "ThemeChanger":
         state = payload;
         return state;
         break;

      case "ADD_TO_CART":
         state.ecommercedata = Maindata.filter((idx) => {
            return idx.id == payload;
         });

         return state;

      case "PRODUCT":
         state.ecommercedata = state.ecommercedata.filter((idx) => {
            return idx.id == payload;
         });
         return state;
         break;

      default:
         return state;
   }
}
