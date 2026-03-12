
// import { Product, Category } from './types';

// export const CATEGORIES: Category[] = [
//   { id: 'all', name: 'All Products', icon: '🛒' },
//   { id: 'khichdi', name: 'Khichdi & Biryani', icon: '🍲' },
//   { id: 'oils', name: 'Pure Oils & Ghee', icon: '🍯' },
//   { id: 'flours', name: 'Healthy Flours', icon: '🌾' },
//   { id: 'pulses', name: 'Dals & Pulses', icon: '🍛' },
//   { id: 'sweeteners', name: 'Natural Sweeteners', icon: '🍬' },
// ];

// export const PRODUCTS: Product[] = [
//   {
//     id: 'k1',
//     name: 'Organic Quinoa Khichdi',
//     category: 'khichdi',
//     price: 12.50,
//     unit: '500g',
//     image: '/src/assets/images/products/Quinoa Khichdi_Front.jpg',
//     description: 'A protein-packed blend of organic quinoa and split moong dal with traditional spices.',
//     isPopular: true,
//     calories: 180,
//   },
//   {
//     id: 'k2',
//     name: 'Organic Foxtail Millet Khichdi',
//     category: 'khichdi',
//     price: 10.99,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Foxtail Millet Khichdi_Front.jpg',
//     description: 'Rich in fiber and minerals, this foxtail millet khichdi is light on the stomach and heart-healthy.',
//     calories: 165,
//   },
//   {
//     id: 'o1',
//     name: 'Pure Sunflower Oil',
//     category: 'oils',
//     price: 8.75,
//     unit: '1L',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Ghee_500gm.jpg',
//     description: 'Cold-pressed organic sunflower oil, perfect for everyday healthy cooking.',
//     calories: 120,
//   },
//   {
//     id: 'o2',
//     name: 'Wood-Pressed Groundnut Oil',
//     category: 'oils',
//     price: 14.20,
//     unit: '1L',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Ghee_500gm.jpg',
//     description: 'Authentic wood-pressed groundnut oil retaining all natural nutrients and nutty aroma.',
//     isPopular: true,
//     calories: 125,
//   },
//   {
//     id: 's1',
//     name: 'Pure Jaggery Powder',
//     category: 'sweeteners',
//     price: 5.40,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Jaggery Powder_Front.jpg',
//     description: 'Chemical-free natural jaggery powder, a healthy substitute for refined sugar.',
//     calories: 380,
//   },
//   {
//     id: 's2',
//     name: 'Organic Brown Sugar',
//     category: 'sweeteners',
//     price: 4.90,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Jaggery Powder_Front.jpg',
//     description: 'Unrefined organic brown sugar with natural molasses flavor.',
//     calories: 375,
//   },
//   {
//     id: 'k3',
//     name: 'Multi Millet Khichdi',
//     category: 'khichdi',
//     price: 11.50,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Multi Millet Khichdi_Front.jpg',
//     description: 'A nutritious mix of five different millets and lentils for a balanced meal.',
//     calories: 170,
//   },
//   {
//     id: 'f1',
//     name: 'Organic Jav (Barley) Flour',
//     category: 'flours',
//     price: 6.20,
//     unit: '1kg',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Jav Flour_500gm_Front.jpg',
//     description: 'Stone-ground barley flour, excellent for weight management and digestion.',
//     calories: 350,
//   },
//   {
//     id: 'f2',
//     name: 'Finger Millet (Ragi) Flour',
//     category: 'flours',
//     price: 5.80,
//     unit: '1kg',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Ragi Flour_500gm_Front.jpg',
//     description: 'Calcium-rich Ragi flour, perfect for making healthy rotis and porridges.',
//     calories: 355,
//   },
//   {
//     id: 'f3',
//     name: 'Bajra (Pearl Millet) Flour',
//     category: 'flours',
//     price: 4.50,
//     unit: '1kg',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\BajraFlour_1kg_Front.jpg',
//     description: 'Traditional pearl millet flour, gluten-free and warming for winters.',
//     calories: 360,
//   },
//   {
//     id: 'f4',
//     name: 'Whole Wheat Flour',
//     category: 'flours',
//     price: 3.99,
//     unit: '1kg',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Wheat Flour_1kg_Front.jpg',
//     description: 'Premium Sharbati whole wheat flour, high in fiber and nutrition.',
//     calories: 340,
//   },
//   {
//     id: 'p1',
//     name: 'Mix Dal Special',
//     category: 'pulses',
//     price: 7.20,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Mix Dal_500gm_Front.jpg',
//     description: 'A perfect protein blend of Arhar, Moong, and Masoor dal.',
//     calories: 345,
//   },
//   {
//     id: 'p2',
//     name: 'Premium Tuver Dal',
//     category: 'pulses',
//     price: 8.50,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Tuver Dal_500gm_Front.jpg',
//     description: 'Unpolished Arhar dal with high natural protein content.',
//     calories: 330,
//   },
//   {
//     id: 'p3',
//     name: 'Moong Chilka Dal',
//     category: 'pulses',
//     price: 6.80,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\MungDalChilka_1kg_Front.jpg',
//     description: 'Split green gram with skin, highly digestible and nutritious.',
//     calories: 310,
//   },
//   {
//     id: 'p4',
//     name: 'Organic Mung Dal',
//     category: 'pulses',
//     price: 6.50,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Mung Dal_1kg_Front.jpg',
//     description: 'Yellow split mung bean, easy to cook and great for kids.',
//     calories: 300,
//   },
//   {
//     id: 'o3',
//     name: 'Desi A2 Cow Ghee',
//     category: 'oils',
//     price: 35.00,
//     unit: '500ml',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Ghee_500gm_Rightside.jpg',
//     description: 'Traditional Bilona churned A2 Cow Ghee, pure and medicinal.',
//     isPopular: true,
//     calories: 900,
//   },
//   {
//     id: 'p5',
//     name: 'Desi Kala Chana',
//     category: 'pulses',
//     price: 5.20,
//     unit: '500g',
//     image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e2?auto=format&fit=crop&q=80&w=400',
//     description: 'Small brown chickpeas, high in iron and protein.',
//     calories: 360,
//   },
//   {
//     id: 'k4',
//     name: 'Kodo Millet Biryani Mix',
//     category: 'khichdi',
//     price: 13.99,
//     unit: '500g',
//     image: 'C:\Users\Lenovo\Downloads\Grocery\src\products\Kodo Millet Biryani_Front.jpg',
//     description: 'Healthy alternative to rice biryani, made with organic Kodo millet.',
//     calories: 190,
//   }
// ];






import { Product, Category } from '../types';

// Declare module for image imports (add this at the top)
declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.jpeg' {
  const value: string;
  export default value;
}
declare module '*.png' {
  const value: string;
  export default value;
}

// Import all images from the products folder
import quinoaKhichdi from './products/Quinoa Khichdi_Front.jpg';
import foxtailKhichdi from './products/Foxtail Millet Khichdi_Front.jpg';
import multiMilletKhichdi from './products/Multi Millet Khichdi_Front.jpg';
import kodoMilletBiryani from './products/Kodo Millet Biryani_Front.jpg';
import ghee500ml from './products/Ghee_500gm.jpg';
import gheeRightside from './products/Ghee_500gm_Rightside.jpg';
import jaggeryPowder from './products/Jaggery Powder_Front.jpg';
import javFlour from './products/Jav Flour_500gm_Front.jpg';
import ragiFlour from './products/Ragi Flour_500gm_Front.jpg';
import bajraFlour from './products/BajraFlour_1kg_Front.jpg';
import wheatFlour from './products/Wheat Flour_1kg_Front.jpg';
import mixDal from './products/Mix Dal_500gm_Front.jpg';
import tuverDal from './products/Tuver Dal_500gm_Front.jpg';
import mungDalChilka from './products/MungDalChilka_1kg_Front.jpg';
import mungDal from './products/Mung Dal_1kg_Front.jpg';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Products', icon: '🛒' },
  { id: 'khichdi', name: 'Khichdi & Biryani', icon: '🍲' },
  { id: 'oils', name: 'Pure Oils & Ghee', icon: '🍯' },
  { id: 'flours', name: 'Healthy Flours', icon: '🌾' },
  { id: 'pulses', name: 'Dals & Pulses', icon: '🍛' },
  { id: 'sweeteners', name: 'Natural Sweeteners', icon: '🍬' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'k1',
    name: 'Organic Quinoa Khichdi',
    category: 'khichdi',
    price: 525,
    unit: '500g',
    image: quinoaKhichdi,
    description: 'A protein-packed blend of organic quinoa and split moong dal with traditional spices.',
    isPopular: true,
    calories: 180,
  },
  {
    id: 'k2',
    name: 'Organic Foxtail Millet Khichdi',
    category: 'khichdi',
    price: 462,
    unit: '500g',
    image: foxtailKhichdi,
    description: 'Rich in fiber and minerals, this foxtail millet khichdi is light on the stomach and heart-healthy.',
    calories: 165,
  },
  {
    id: 'o1',
    name: 'Pure Sunflower Oil',
    category: 'oils',
    price: 368,
    unit: '1L',
    image: ghee500ml,
    description: 'Cold-pressed organic sunflower oil, perfect for everyday healthy cooking.',
    calories: 120,
  },
  {
    id: 'o2',
    name: 'Wood-Pressed Groundnut Oil',
    category: 'oils',
    price: 596,
    unit: '1L',
    image: ghee500ml,
    description: 'Authentic wood-pressed groundnut oil retaining all natural nutrients and nutty aroma.',
    isPopular: true,
    calories: 125,
  },
  {
    id: 's1',
    name: 'Pure Jaggery Powder',
    category: 'sweeteners',
    price: 227,
    unit: '500g',
    image: jaggeryPowder,
    description: 'Chemical-free natural jaggery powder, a healthy substitute for refined sugar.',
    calories: 380,
  },
  {
    id: 's2',
    name: 'Organic Brown Sugar',
    category: 'sweeteners',
    price: 206,
    unit: '500g',
    image: jaggeryPowder,
    description: 'Unrefined organic brown sugar with natural molasses flavor.',
    calories: 375,
  },
  {
    id: 'k3',
    name: 'Multi Millet Khichdi',
    category: 'khichdi',
    price: 483,
    unit: '500g',
    image: multiMilletKhichdi,
    description: 'A nutritious mix of five different millets and lentils for a balanced meal.',
    calories: 170,
  },
  {
    id: 'f1',
    name: 'Organic Jav (Barley) Flour',
    category: 'flours',
    price: 260,
    unit: '1kg',
    image: javFlour,
    description: 'Stone-ground barley flour, excellent for weight management and digestion.',
    calories: 350,
  },
  {
    id: 'f2',
    name: 'Finger Millet (Ragi) Flour',
    category: 'flours',
    price: 244,
    unit: '1kg',
    image: ragiFlour,
    description: 'Calcium-rich Ragi flour, perfect for making healthy rotis and porridges.',
    calories: 355,
  },
  {
    id: 'f3',
    name: 'Bajra (Pearl Millet) Flour',
    category: 'flours',
    price: 189,
    unit: '1kg',
    image: bajraFlour,
    description: 'Traditional pearl millet flour, gluten-free and warming for winters.',
    calories: 360,
  },
  {
    id: 'f4',
    name: 'Whole Wheat Flour',
    category: 'flours',
    price: 168,
    unit: '1kg',
    image: wheatFlour,
    description: 'Premium Sharbati whole wheat flour, high in fiber and nutrition.',
    calories: 340,
  },
  {
    id: 'p1',
    name: 'Mix Dal Special',
    category: 'pulses',
    price: 302,
    unit: '500g',
    image: mixDal,
    description: 'A perfect protein blend of Arhar, Moong, and Masoor dal.',
    calories: 345,
  },
  {
    id: 'p2',
    name: 'Premium Tuver Dal',
    category: 'pulses',
    price: 357,
    unit: '500g',
    image: tuverDal,
    description: 'Unpolished Arhar dal with high natural protein content.',
    calories: 330,
  },
  {
    id: 'p3',
    name: 'Moong Chilka Dal',
    category: 'pulses',
    price: 286,
    unit: '500g',
    image: mungDalChilka,
    description: 'Split green gram with skin, highly digestible and nutritious.',
    calories: 310,
  },
  {
    id: 'p4',
    name: 'Organic Mung Dal',
    category: 'pulses',
    price: 273,
    unit: '500g',
    image: mungDal,
    description: 'Yellow split mung bean, easy to cook and great for kids.',
    calories: 300,
  },
  {
    id: 'o3',
    name: 'Desi A2 Cow Ghee',
    category: 'oils',
    price: 1470,
    unit: '500ml',
    image: gheeRightside,
    description: 'Traditional Bilona churned A2 Cow Ghee, pure and medicinal.',
    isPopular: true,
    calories: 900,
  },
  {
    id: 'p5',
    name: 'Desi Kala Chana',
    category: 'pulses',
    price: 218,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e2?auto=format&fit=crop&q=80&w=400',
    description: 'Small brown chickpeas, high in iron and protein.',
    calories: 360,
  },
  {
    id: 'k4',
    name: 'Kodo Millet Biryani Mix',
    category: 'khichdi',
    price: 588,
    unit: '500g',
    image: kodoMilletBiryani,
    description: 'Healthy alternative to rice biryani, made with organic Kodo millet.',
    calories: 190,
  }
];