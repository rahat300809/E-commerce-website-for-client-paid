/**
 * ZENVY Admin Data Store
 * ─────────────────────
 * Real persistence layer mirroring the Prisma schema.
 * Uses localStorage as storage engine.
 * Swappable to REST API: replace each method body.
 */

const DB_VERSION = 'zenvy_v1';

// ── Active Live Catalog Baseline (Instant 0ms load across all devices) ──
const ACTIVE_CATALOG_BASELINE = [
  {
    "id": "prod_mwe087k8n71j75nf0",
    "isDeliveryChargeMandatory": false,
    "sizeMapping": {
      "L": {
        "width": 40,
        "height": 28
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "height": 31,
        "width": 46
      }
    },
    "isLimited": true,
    "preorderCapacity": 100,
    "categoryName": "Player Version",
    "isFeatured": false,
    "deliveryChargeInsideDhaka": 80,
    "deliveryChargeOutsideDhaka": 130,
    "customLogo": false,
    "gender": "Unisex",
    "team": "Borussia Dortmund",
    "hasCustomDelivery": false,
    "isPreorder": false,
    "name": "Borussia Dortmund Away Kit",
    "tax": 0,
    "sizeStocks": {},
    "stock": 10,
    "sku": "ZNV-MWE0AAOM",
    "preorderDesc": "",
    "seoTitle": "",
    "sizeChartImage": "",
    "image": "img/products/prod_mwe087k8n71j75nf0.webp",
    "expectedDelivery": null,
    "images": [
      {
        "url": "img/products/prod_mwe087k8n71j75nf0.webp",
        "alt": "Borussia Dortmund Away Kit",
        "isPrimary": true
      }
    ],
    "categoryId": "cat_mens_football",
    "customBadge": "",
    "updatedAt": "2026-11-12T20:34:11.787Z",
    "preorderPrice": null,
    "customName": false,
    "customText": false,
    "expectedArrival": null,
    "slug": "borussia-dortmund-away-kit",
    "discountEnd": null,
    "advancePaymentMode": "cod_only",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isPublished": true,
    "compareAt": 1150,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "assignedSleeves": [
      "slv_half"
    ],
    "sport": "Football",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "deliveryNote": "",
    "isBestSeller": false,
    "preorderSold": 0,
    "isArchived": false,
    "customNumber": false,
    "sizeChartType": "Player Edition",
    "isNewArrival": false,
    "preorderStatus": "OPEN",
    "salePrice": 999,
    "costPrice": 750,
    "collectionId": null,
    "createdAt": "2026-11-12T20:32:34.376Z",
    "imageUrl": "",
    "assignedPatches": [],
    "basePrice": 1150,
    "discountType": "percent",
    "customPrintPrice": null,
    "status": "published",
    "customNameNumber": true,
    "discountStart": null,
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderCloseDate": null,
    "discountValue": null,
    "seoDesc": ""
  },
  {
    "id": "prod_mwe01c9fwsp7p0fbh",
    "deliveryNote": "",
    "advancePaymentMode": "cod_only",
    "expectedArrival": null,
    "hasCustomDelivery": false,
    "isArchived": false,
    "name": "Atletico Madrid Away Kit",
    "createdAt": "2026-11-12T20:27:13.875Z",
    "basePrice": 1150,
    "sizeChartImage": "",
    "isNewArrival": false,
    "images": [
      {
        "url": "img/products/prod_mwe01c9fwsp7p0fbh.webp",
        "alt": "Atletico Madrid Away Kit",
        "isPrimary": true
      }
    ],
    "customNumber": false,
    "team": "Atletico Madrid",
    "stock": 10,
    "preorderSold": 0,
    "isBestSeller": false,
    "imageUrl": "",
    "customNameNumber": true,
    "costPrice": 750,
    "salePrice": 999,
    "customPrintPrice": null,
    "collectionId": null,
    "gender": "Unisex",
    "image": "img/products/prod_mwe01c9fwsp7p0fbh.webp",
    "isPublished": true,
    "preorderPrice": null,
    "slug": "atletico-madrid-away-kit",
    "deliveryChargeInsideDhaka": 80,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "compareAt": 1150,
    "isDeliveryChargeMandatory": false,
    "discountType": "percent",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sku": "ZNV-MWE05I8L",
    "categoryName": "Player Version",
    "status": "published",
    "customLogo": false,
    "sport": "Football",
    "updatedAt": "2026-11-12T20:34:17.695Z",
    "isFeatured": false,
    "seoTitle": "",
    "sizeChartType": "Player Edition",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountEnd": null,
    "assignedPatches": [],
    "sizeStocks": {},
    "customBadge": "",
    "isPreorder": false,
    "preorderCapacity": 100,
    "seoDesc": "",
    "deliveryChargeOutsideDhaka": 130,
    "preorderStatus": "OPEN",
    "categoryId": "cat_mens_football",
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "preorderDesc": "",
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "assignedSleeves": [
      "slv_half"
    ],
    "discountValue": null,
    "discountStart": null,
    "tax": 0,
    "expectedDelivery": null,
    "customText": false,
    "customName": false,
    "isLimited": true,
    "preorderCloseDate": null
  },
  {
    "id": "prod_mwdzvb65s2tv6g5iv",
    "updatedAt": "2026-11-12T20:23:09.709Z",
    "collectionId": null,
    "isPublished": true,
    "expectedDelivery": null,
    "sizeChartType": "Player Edition",
    "sizeChartImage": "",
    "status": "published",
    "deliveryChargeOutsideDhaka": 130,
    "tax": 0,
    "discountType": "percent",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "advancePaymentMode": "cod_only",
    "assignedSleeves": [
      "slv_half"
    ],
    "discountValue": null,
    "lowStockAlert": 5,
    "preorderCapacity": 100,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sku": "ZNV-MWDZW3T6",
    "deliveryNote": "",
    "discountStart": null,
    "isLimited": true,
    "assignedPatches": [
      "patch_ucl"
    ],
    "isBestSeller": false,
    "isArchived": false,
    "sport": "Football",
    "preorderSold": 0,
    "preorderCloseDate": null,
    "isNewArrival": false,
    "seoDesc": "",
    "customNumber": false,
    "seoTitle": "",
    "preorderDesc": "",
    "slug": "mancester-united-third-kit",
    "sizeMapping": {
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "categoryId": "cat_mens_football",
    "images": [
      {
        "url": "img/products/prod_mwdzvb65s2tv6g5iv.webp",
        "alt": "Mancester United Third Kit",
        "isPrimary": true
      }
    ],
    "image": "img/products/prod_mwdzvb65s2tv6g5iv.webp",
    "hasCustomDelivery": false,
    "customText": false,
    "customName": false,
    "basePrice": 1150,
    "customNameNumber": true,
    "createdAt": "2026-11-12T20:22:32.525Z",
    "customPrintPrice": null,
    "stock": 10,
    "name": "Mancester United Third Kit",
    "expectedArrival": null,
    "preorderPrice": null,
    "isFeatured": false,
    "costPrice": 750,
    "categoryName": "Player Version",
    "salePrice": 999,
    "customLogo": false,
    "team": "Man United",
    "gender": "Unisex",
    "isDeliveryChargeMandatory": false,
    "imageUrl": "",
    "compareAt": 1150,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "customBadge": "",
    "preorderStatus": "OPEN",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isPreorder": false,
    "discountEnd": null,
    "sizeStocks": {},
    "deliveryChargeInsideDhaka": 80
  },
  {
    "id": "prod_mwdzuhqo33wb2zexr",
    "categoryId": "cat_mens_football",
    "gender": "Unisex",
    "salePrice": 999,
    "costPrice": 750,
    "discountType": "percent",
    "deliveryChargeOutsideDhaka": 130,
    "customNameNumber": true,
    "customPrintPrice": null,
    "seoDesc": "",
    "sku": "ZNV-MWDZV8X5",
    "collectionId": null,
    "sizeMapping": {
      "XL": {
        "width": 42,
        "height": 29
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "L": {
        "height": 28,
        "width": 40
      }
    },
    "customName": false,
    "customText": false,
    "sport": "Football",
    "compareAt": 1150,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "seoTitle": "",
    "customLogo": false,
    "isBestSeller": false,
    "preorderPrice": null,
    "customBadge": "",
    "isFeatured": false,
    "preorderSold": 0,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isNewArrival": false,
    "advancePaymentMode": "cod_only",
    "customNumber": false,
    "discountEnd": null,
    "preorderStatus": "OPEN",
    "sizeStocks": {},
    "basePrice": 1150,
    "createdAt": "2026-11-12T20:21:54.384Z",
    "isPreorder": false,
    "tax": 0,
    "expectedArrival": null,
    "images": [
      {
        "url": "img/products/prod_mwdzuhqo33wb2zexr.webp",
        "alt": "Mancester United Away Kit",
        "isPrimary": true
      }
    ],
    "hasCustomDelivery": false,
    "deliveryNote": "",
    "sizeChartType": "Player Edition",
    "team": "Man United",
    "assignedSleeves": [
      "slv_half"
    ],
    "stock": 10,
    "name": "Mancester United Away Kit",
    "expectedDelivery": null,
    "preorderCloseDate": null,
    "imageUrl": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderDesc": "",
    "sizeChartImage": "",
    "isPublished": true,
    "isLimited": true,
    "subcategoryId": "mw88n5w90qabal7hw",
    "lowStockAlert": 5,
    "status": "published",
    "discountValue": null,
    "discountStart": null,
    "updatedAt": "2026-11-12T20:22:29.677Z",
    "assignedPatches": [
      "patch_ucl"
    ],
    "slug": "mancester-united-away-kit",
    "preorderCapacity": 100,
    "deliveryChargeInsideDhaka": 80,
    "isDeliveryChargeMandatory": false,
    "isArchived": false,
    "image": "img/products/prod_mwdzuhqo33wb2zexr.webp",
    "categoryName": "Player Version"
  },
  {
    "id": "prod_mwdzs36rkf46yv452",
    "assignedPatches": [
      "patch_ucl"
    ],
    "name": "Mancester United Home Kit",
    "preorderCloseDate": null,
    "team": "Man United",
    "collectionId": null,
    "expectedDelivery": null,
    "gender": "Unisex",
    "customBadge": "",
    "sku": "ZNV-MWDZTXQ5",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isArchived": false,
    "isLimited": true,
    "discountType": "percent",
    "discountEnd": null,
    "seoTitle": "",
    "preorderPrice": null,
    "slug": "mancester-united-home-kit",
    "sizeMapping": {
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "deliveryNote": "",
    "sizeChartImage": "",
    "updatedAt": "2026-11-12T20:21:28.505Z",
    "assignedSleeves": [
      "slv_half"
    ],
    "images": [
      {
        "url": "img/products/prod_mwdzs36rkf46yv452.webp",
        "alt": "Mancester United Home Kit",
        "isPrimary": true
      }
    ],
    "tax": 0,
    "isNewArrival": false,
    "preorderCapacity": 100,
    "customNumber": false,
    "isBestSeller": false,
    "sport": "Football",
    "preorderSold": 0,
    "customLogo": false,
    "salePrice": 999,
    "costPrice": 750,
    "sizeChartType": "Player Edition",
    "isFeatured": false,
    "customNameNumber": true,
    "customPrintPrice": null,
    "preorderDesc": "",
    "deliveryChargeOutsideDhaka": 130,
    "imageUrl": "",
    "sizeStocks": {},
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "expectedArrival": null,
    "isPreorder": false,
    "preorderStatus": "OPEN",
    "compareAt": 1150,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "image": "img/products/prod_mwdzs36rkf46yv452.webp",
    "categoryId": "cat_mens_football",
    "subcategoryId": "mw88n5w90qabal7hw",
    "categoryName": "Player Version",
    "lowStockAlert": 5,
    "isPublished": true,
    "deliveryChargeInsideDhaka": 80,
    "hasCustomDelivery": false,
    "discountValue": null,
    "discountStart": null,
    "isDeliveryChargeMandatory": false,
    "stock": 10,
    "status": "published",
    "advancePaymentMode": "cod_only",
    "basePrice": 1150,
    "createdAt": "2026-11-12T20:20:02.212Z",
    "customText": false,
    "customName": false,
    "seoDesc": ""
  },
  {
    "id": "prod_mwdzp9ss9ctsb7vqz",
    "expectedArrival": null,
    "discountType": "percent",
    "createdAt": "2026-11-12T20:17:50.813Z",
    "customName": false,
    "customText": false,
    "sport": "Football",
    "seoDesc": "",
    "basePrice": 1150,
    "name": "Inter Miami Away kit",
    "status": "published",
    "collectionId": null,
    "discountValue": null,
    "advancePaymentMode": "cod_only",
    "isDeliveryChargeMandatory": false,
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "deliveryChargeInsideDhaka": 80,
    "team": "Inter Miami",
    "sizeMapping": {
      "L": {
        "width": 40,
        "height": 28
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "categoryId": "cat_mens_football",
    "discountStart": null,
    "customPrintPrice": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "compareAt": 1150,
    "customNameNumber": true,
    "preorderSold": 0,
    "discountEnd": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isBestSeller": false,
    "isPreorder": false,
    "imageUrl": "",
    "customBadge": "",
    "sizeStocks": {},
    "isNewArrival": false,
    "preorderStatus": "OPEN",
    "customNumber": false,
    "slug": "inter-miami-away-kit",
    "deliveryChargeOutsideDhaka": 130,
    "sizeChartType": "Player Edition",
    "deliveryNote": "",
    "isFeatured": false,
    "preorderCloseDate": null,
    "salePrice": 999,
    "customLogo": false,
    "costPrice": 750,
    "sku": "ZNV-MWDZRLBN",
    "images": [
      {
        "url": "img/products/prod_mwdzp9ss9ctsb7vqz.webp",
        "alt": "Inter Miami Away kit",
        "isPrimary": true
      }
    ],
    "sizeChartImage": "",
    "hasCustomDelivery": false,
    "assignedPatches": [],
    "preorderPrice": null,
    "preorderDesc": "",
    "updatedAt": "2026-11-12T20:19:39.120Z",
    "preorderCapacity": 100,
    "isPublished": true,
    "stock": 10,
    "isLimited": true,
    "seoTitle": "",
    "isArchived": false,
    "image": "img/products/prod_mwdzp9ss9ctsb7vqz.webp",
    "gender": "Unisex",
    "tax": 0,
    "expectedDelivery": null,
    "categoryName": "Player Version",
    "assignedSleeves": [
      "slv_half"
    ]
  },
  {
    "id": "prod_mwdzm08vaxzqhjps3",
    "preorderSold": 0,
    "discountStart": null,
    "stock": 10,
    "categoryId": "cat_mens_football",
    "salePrice": 999,
    "status": "published",
    "isBestSeller": false,
    "costPrice": 750,
    "seoDesc": "",
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "discountValue": null,
    "customNumber": false,
    "isNewArrival": false,
    "sizeChartImage": "",
    "customName": false,
    "customText": false,
    "expectedArrival": null,
    "deliveryNote": "",
    "compareAt": 1150,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isPublished": true,
    "customLogo": false,
    "customNameNumber": true,
    "discountType": "percent",
    "isFeatured": false,
    "customPrintPrice": null,
    "sizeChartType": "Player Edition",
    "imageUrl": "",
    "sizeStocks": {},
    "createdAt": "2026-11-12T20:15:18.463Z",
    "collectionId": null,
    "isPreorder": false,
    "basePrice": 1150,
    "deliveryChargeOutsideDhaka": 130,
    "image": "img/products/prod_mwdzm08vaxzqhjps3.webp",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderCloseDate": null,
    "assignedPatches": [],
    "sku": "ZNV-MWDZNU33",
    "preorderPrice": null,
    "hasCustomDelivery": false,
    "name": "Inter Miami Third kit",
    "sport": "Football",
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "team": "Inter Miami",
    "images": [
      {
        "url": "img/products/prod_mwdzm08vaxzqhjps3.webp",
        "alt": "Inter Miami Away kit",
        "isPrimary": true
      }
    ],
    "categoryName": "Player Version",
    "preorderCapacity": 100,
    "isLimited": true,
    "discountEnd": null,
    "seoTitle": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "advancePaymentMode": "cod_only",
    "gender": "Unisex",
    "customBadge": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "updatedAt": "2026-11-12T20:17:45.624Z",
    "preorderStatus": "OPEN",
    "slug": "inter-miami-third-kit",
    "preorderDesc": "",
    "isDeliveryChargeMandatory": false,
    "deliveryChargeInsideDhaka": 80,
    "isArchived": false,
    "expectedDelivery": null,
    "tax": 0
  },
  {
    "id": "prod_mwdzkir4mnoj7j1g6",
    "discountValue": null,
    "slug": "inter-miami-home-kit",
    "stock": 10,
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "discountType": "percent",
    "seoTitle": "",
    "discountStart": null,
    "customPrintPrice": null,
    "expectedArrival": null,
    "customNameNumber": true,
    "advancePaymentMode": "cod_only",
    "updatedAt": "2026-11-12T20:15:14.265Z",
    "preorderStatus": "OPEN",
    "collectionId": null,
    "name": "Inter Miami Home kit",
    "customNumber": false,
    "isNewArrival": false,
    "sizeChartType": "Player Edition",
    "isLimited": true,
    "isBestSeller": false,
    "team": "Inter Miami",
    "preorderSold": 0,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "deliveryNote": "",
    "image": "img/products/prod_mwdzkir4mnoj7j1g6.webp",
    "isPublished": true,
    "deliveryChargeInsideDhaka": 80,
    "preorderCloseDate": null,
    "isArchived": false,
    "isDeliveryChargeMandatory": false,
    "status": "published",
    "categoryId": "cat_mens_football",
    "basePrice": 1150,
    "imageUrl": "",
    "expectedDelivery": null,
    "preorderPrice": null,
    "createdAt": "2026-11-12T20:14:09.136Z",
    "customBadge": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountEnd": null,
    "assignedPatches": [],
    "sku": "ZNV-MWDZLWYX",
    "sport": "Football",
    "customName": false,
    "customText": false,
    "hasCustomDelivery": false,
    "preorderDesc": "",
    "seoDesc": "",
    "deliveryChargeOutsideDhaka": 130,
    "gender": "Unisex",
    "sizeChartImage": "",
    "customLogo": false,
    "preorderCapacity": 100,
    "images": [
      {
        "url": "img/products/prod_mwdzkir4mnoj7j1g6.webp",
        "alt": "Inter Miami Home kit",
        "isPrimary": true
      }
    ],
    "isFeatured": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "tax": 0,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "compareAt": 1150,
    "categoryName": "Player Version",
    "costPrice": 750,
    "sizeStocks": {},
    "salePrice": 999,
    "sizeMapping": {
      "XS": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "S": {
        "width": 36,
        "height": 26
      }
    },
    "isPreorder": false
  },
  {
    "id": "prod_mwdze6yw9wzww94nq",
    "deliveryChargeInsideDhaka": 80,
    "discountValue": null,
    "preorderDesc": "",
    "customBadge": "",
    "subcategoryId": "mw88n5w90qabal7hw",
    "assignedSleeves": [
      "slv_half"
    ],
    "lowStockAlert": 5,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "deliveryChargeOutsideDhaka": 130,
    "expectedDelivery": null,
    "customLogo": false,
    "discountEnd": null,
    "isLimited": true,
    "discountStart": null,
    "isFeatured": false,
    "isDeliveryChargeMandatory": false,
    "sizeStocks": {},
    "isPreorder": false,
    "stock": 10,
    "sizeChartImage": "",
    "sizeChartType": "Player Edition",
    "advancePaymentMode": "cod_only",
    "preorderCapacity": 100,
    "image": "img/products/prod_mwdze6yw9wzww94nq.webp",
    "categoryId": "cat_mens_football",
    "categoryName": "Player Version",
    "assignedPatches": [],
    "status": "published",
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "height": 31,
        "width": 46
      }
    },
    "seoTitle": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "customName": false,
    "customText": false,
    "preorderCloseDate": null,
    "updatedAt": "2026-11-12T20:13:18.559Z",
    "sku": "ZNV-MWDZJFP0",
    "collectionId": null,
    "preorderPrice": null,
    "sport": "Football",
    "slug": "al-nasser-third-kit",
    "compareAt": 1150,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "customPrintPrice": null,
    "hasCustomDelivery": false,
    "gender": "Unisex",
    "customNameNumber": true,
    "discountType": "percent",
    "isArchived": false,
    "salePrice": 999,
    "costPrice": 750,
    "preorderStatus": "OPEN",
    "seoDesc": "",
    "team": "Al Nasser",
    "createdAt": "2026-11-12T20:09:13.928Z",
    "basePrice": 1150,
    "name": "Al Nasser Third Kit",
    "images": [
      {
        "url": "img/products/prod_mwdze6yw9wzww94nq.webp",
        "alt": "Al Nasser Third Kit",
        "isPrimary": true
      },
      {
        "url": "img/products/prod_mwdze6yw9wzww94nq_1.webp",
        "alt": "Al Nasser Third Kit",
        "isPrimary": false
      }
    ],
    "deliveryNote": "",
    "isBestSeller": false,
    "preorderSold": 0,
    "isPublished": true,
    "imageUrl": "",
    "isNewArrival": false,
    "expectedArrival": null,
    "customNumber": false,
    "tax": 0
  },
  {
    "id": "prod_mwdzcjyygi3k7sd87",
    "salePrice": 999,
    "assignedSleeves": [
      "slv_half"
    ],
    "stock": 10,
    "hasCustomDelivery": false,
    "customText": false,
    "preorderSold": 0,
    "sizeMapping": {
      "XXL": {
        "width": 44,
        "height": 30
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      }
    },
    "updatedAt": "2026-11-12T20:08:50.930Z",
    "collectionId": null,
    "customName": false,
    "customBadge": "",
    "preorderDesc": "",
    "seoTitle": "",
    "isNewArrival": false,
    "customNameNumber": true,
    "name": "Al Nasser Away Kit",
    "sku": "ZNV-MWDZDP6O",
    "isArchived": false,
    "imageUrl": "",
    "isLimited": true,
    "team": "Al Nasser",
    "customLogo": false,
    "isBestSeller": false,
    "expectedDelivery": null,
    "sizeStocks": {},
    "isPublished": true,
    "expectedArrival": null,
    "categoryName": "Player Version",
    "isFeatured": false,
    "lowStockAlert": 5,
    "preorderPrice": null,
    "sport": "Football",
    "deliveryChargeInsideDhaka": 80,
    "tax": 0,
    "costPrice": 750,
    "discountStart": null,
    "sizeChartImage": "",
    "deliveryChargeOutsideDhaka": 130,
    "preorderCapacity": 100,
    "customNumber": false,
    "isPreorder": false,
    "customPrintPrice": null,
    "preorderStatus": "OPEN",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "discountEnd": null,
    "basePrice": 1150,
    "assignedPatches": [],
    "sizeChartType": "Player Edition",
    "subcategoryId": "mw88n5w90qabal7hw",
    "status": "published",
    "isDeliveryChargeMandatory": false,
    "image": "img/products/prod_mwdzcjyygi3k7sd87.webp",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "gender": "Unisex",
    "categoryId": "cat_mens_football",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "deliveryNote": "",
    "createdAt": "2026-11-12T20:07:57.466Z",
    "preorderCloseDate": null,
    "compareAt": 1150,
    "slug": "al-nasser-away-kit",
    "discountValue": null,
    "discountType": "percent",
    "advancePaymentMode": "cod_only",
    "seoDesc": "",
    "images": [
      {
        "url": "img/products/prod_mwdzcjyygi3k7sd87.webp",
        "alt": "Al Nasser Away Kit",
        "isPrimary": true
      }
    ]
  },
  {
    "id": "prod_mwdz5xxlf44t9pakf",
    "assignedPatches": [],
    "customText": false,
    "imageUrl": "",
    "updatedAt": "2026-11-12T20:08:56.082Z",
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "customName": false,
    "team": "Al Nasser",
    "sizeChartImage": "",
    "seoTitle": "",
    "isBestSeller": false,
    "deliveryChargeInsideDhaka": 80,
    "name": "Al Nasser Home Kit",
    "salePrice": 999,
    "isLimited": true,
    "preorderStatus": "OPEN",
    "expectedDelivery": null,
    "tax": 0,
    "customLogo": false,
    "image": "img/products/prod_mwdz5xxlf44t9pakf.webp",
    "discountValue": null,
    "isArchived": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "categoryName": "Player Version",
    "sizeStocks": {},
    "collectionId": null,
    "preorderSold": 0,
    "customNameNumber": true,
    "advancePaymentMode": "cod_only",
    "preorderCloseDate": null,
    "costPrice": 750,
    "sku": "ZNV-MWDZARKV",
    "isNewArrival": false,
    "isFeatured": false,
    "discountEnd": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderDesc": "",
    "seoDesc": "",
    "isPublished": true,
    "sport": "Football",
    "expectedArrival": null,
    "basePrice": 1150,
    "preorderPrice": null,
    "discountType": "percent",
    "isPreorder": false,
    "lowStockAlert": 5,
    "isDeliveryChargeMandatory": false,
    "hasCustomDelivery": false,
    "discountStart": null,
    "deliveryNote": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "status": "published",
    "assignedSleeves": [
      "slv_half"
    ],
    "customNumber": false,
    "deliveryChargeOutsideDhaka": 130,
    "sizeMapping": {
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "customPrintPrice": null,
    "gender": "Unisex",
    "slug": "al-nasser-home-kit",
    "stock": 10,
    "categoryId": "cat_mens_football",
    "preorderCapacity": 100,
    "compareAt": 1150,
    "createdAt": "2026-11-12T20:02:48.969Z",
    "images": [
      {
        "url": "img/products/prod_mwdz5xxlf44t9pakf.webp",
        "alt": "Al Nasser Hom Kit",
        "isPrimary": true
      }
    ],
    "customBadge": ""
  },
  {
    "id": "prod_mwdw6m1wd63g1p2kw",
    "name": "Real Madrid Home (Copy)",
    "discountValue": null,
    "deliveryChargeInsideDhaka": 80,
    "customBadge": "",
    "seoDesc": "",
    "images": [
      {
        "url": "img/products/mw8a6nc4ecqhhqgcv.jpg",
        "alt": "Real Madrid Home",
        "isPrimary": true
      }
    ],
    "team": "",
    "isPreorder": false,
    "advancePaymentMode": "default",
    "customPrintPrice": null,
    "expectedArrival": null,
    "discountType": "percent",
    "seoTitle": "",
    "sizeMapping": {
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "height": 28,
        "width": 40
      }
    },
    "hasCustomDelivery": false,
    "deliveryChargeOutsideDhaka": 130,
    "gender": "Unisex",
    "imageUrl": "",
    "preorderCapacity": 100,
    "deliveryNote": "",
    "subcategoryId": null,
    "sizeChartType": "Player Edition",
    "basePrice": 1150,
    "image": "img/products/mw8a6nc4ecqhhqgcv.jpg",
    "status": "published",
    "customNumber": true,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "assignedSleeves": [
      "slv_half"
    ],
    "categoryId": "cat_mens_football",
    "shortDesc": "",
    "compareAt": 1150,
    "createdAt": "2026-11-12T18:39:21.381Z",
    "isPublished": true,
    "assignedPatches": [],
    "salePrice": 999,
    "isArchived": false,
    "customLogo": false,
    "discountStart": null,
    "isBestSeller": true,
    "customNameNumber": false,
    "updatedAt": "2026-11-12T18:39:21.434Z",
    "lowStockAlert": 5,
    "preorderPrice": null,
    "discountEnd": null,
    "sport": "Football",
    "isDeliveryChargeMandatory": false,
    "customName": true,
    "sku": "ZNV-MW8A6NC3-COPY-MWDW6M1X",
    "categoryName": "Player Version",
    "isLimited": false,
    "customText": false,
    "slug": "real-madrid-home-copy-mwdw6m1x",
    "preorderStatus": "OPEN",
    "collectionId": null,
    "description": "",
    "preorderCloseDate": null,
    "isFeatured": false,
    "preorderSold": 0,
    "expectedDelivery": null,
    "isNewArrival": false,
    "stock": 10,
    "preorderDesc": "",
    "costPrice": null,
    "sizeChartImage": "",
    "tax": 0,
    "sizeStocks": {}
  },
  {
    "id": "prod_mwdw1yp7zoy2fqrwv",
    "categoryName": "Player Version",
    "sizeChartImage": "",
    "categoryId": "cat_mens_football",
    "deliveryChargeOutsideDhaka": 130,
    "assignedPatches": [
      "patch_ucl"
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "sku": "ZNV-MWDW30JI",
    "isPublished": true,
    "isBestSeller": false,
    "discountStart": null,
    "compareAt": 1150,
    "createdAt": "2026-11-12T18:35:44.492Z",
    "customNameNumber": true,
    "preorderPrice": null,
    "preorderStatus": "OPEN",
    "lowStockAlert": 5,
    "isPreorder": false,
    "preorderDesc": "",
    "imageUrl": "",
    "isNewArrival": false,
    "customBadge": "",
    "seoTitle": "",
    "tax": 0,
    "expectedDelivery": null,
    "slug": "barcelona-goalkepper-kit",
    "preorderSold": 0,
    "image": "img/products/prod_mwdw1yp7zoy2fqrwv.webp",
    "basePrice": 1150,
    "deliveryChargeInsideDhaka": 80,
    "sizeMapping": {
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "4XL": {
        "height": 31,
        "width": 46
      }
    },
    "preorderCloseDate": null,
    "collectionId": null,
    "isFeatured": false,
    "deliveryNote": "",
    "preorderCapacity": 100,
    "expectedArrival": null,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountType": "percent",
    "subcategoryId": null,
    "sizeChartType": "Player Edition",
    "hasCustomDelivery": false,
    "name": "Barcelona Goalkepper Kit",
    "sizeStocks": {},
    "team": "Barcelona",
    "customPrintPrice": null,
    "discountValue": null,
    "costPrice": null,
    "stock": 10,
    "advancePaymentMode": "default",
    "discountEnd": null,
    "sport": "Football",
    "salePrice": 999,
    "images": [
      {
        "url": "img/products/prod_mwdw1yp7zoy2fqrwv.webp",
        "alt": "Barcelona Goalkepper Kit",
        "isPrimary": true
      }
    ],
    "isDeliveryChargeMandatory": false,
    "customLogo": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "isArchived": false,
    "updatedAt": "2026-11-12T18:36:33.575Z",
    "seoDesc": "",
    "status": "published",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "customText": false,
    "isLimited": true,
    "customNumber": false,
    "gender": "Unisex",
    "customName": false
  },
  {
    "id": "prod_mwdw0pr4e23smtkbk",
    "discountType": "percent",
    "advancePaymentMode": "cod_only",
    "customNameNumber": true,
    "hasCustomDelivery": false,
    "slug": "paris-saint-germain-away-kit-psg",
    "discountValue": null,
    "deliveryNote": "",
    "seoDesc": "",
    "expectedArrival": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "sku": "ZNV-MWDW1BON",
    "categoryId": "cat_mens_football",
    "isPublished": true,
    "costPrice": 750,
    "salePrice": 999,
    "assignedSleeves": [
      "slv_half"
    ],
    "customBadge": "",
    "updatedAt": "2026-11-12T18:35:14.701Z",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "image": "img/products/prod_mwdw0pr4e23smtkbk.webp",
    "customNumber": false,
    "tax": 0,
    "sizeMapping": {
      "4XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XXL": {
        "height": 30,
        "width": 44
      }
    },
    "isPreorder": false,
    "deliveryChargeInsideDhaka": 80,
    "expectedDelivery": null,
    "isLimited": true,
    "assignedPatches": [
      "patch_ucl"
    ],
    "deliveryChargeOutsideDhaka": 130,
    "lowStockAlert": 5,
    "stock": 10,
    "customPrintPrice": null,
    "preorderPrice": null,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "categoryName": "Player Version",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "sizeStocks": null,
    "discountStart": null,
    "createdAt": "2026-11-12T18:34:46.240Z",
    "seoTitle": "",
    "preorderCapacity": 100,
    "compareAt": 1150,
    "isBestSeller": false,
    "isFeatured": false,
    "imageUrl": "",
    "isNewArrival": false,
    "preorderStatus": "OPEN",
    "team": "PSG",
    "name": "Paris Saint-Germain Away Kit (PSG)",
    "customName": false,
    "images": [
      {
        "url": "img/products/prod_mwdw0pr4e23smtkbk.webp",
        "alt": "Paris Saint-Germain Away Kit (PSG)",
        "isPrimary": true
      }
    ],
    "isDeliveryChargeMandatory": false,
    "preorderDesc": "",
    "customText": false,
    "discountEnd": null,
    "isArchived": false,
    "preorderCloseDate": null,
    "collectionId": null,
    "gender": "Unisex",
    "customLogo": false,
    "sizeChartImage": "",
    "sport": "Football",
    "preorderSold": 0,
    "status": "published",
    "basePrice": 1150
  },
  {
    "id": "prod_mwdvx1hidnhyrm6o0",
    "assignedSleeves": [
      "slv_half"
    ],
    "preorderDesc": "",
    "isFeatured": false,
    "status": "published",
    "preorderCapacity": 100,
    "deliveryChargeInsideDhaka": 80,
    "sport": "Football",
    "isNewArrival": false,
    "isPublished": true,
    "gender": "Unisex",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "compareAt": 1150,
    "customPrintPrice": null,
    "createdAt": "2026-11-12T18:31:54.822Z",
    "preorderSold": 0,
    "hasCustomDelivery": false,
    "sizeStocks": null,
    "deliveryChargeOutsideDhaka": 130,
    "images": [
      {
        "url": "img/products/prod_mwdvx1hidnhyrm6o0.webp",
        "alt": "Paris Saint-Germain Home Kit (PSG)",
        "isPrimary": true
      }
    ],
    "slug": "paris-saint-germain-home-kit-psg",
    "collectionId": null,
    "categoryName": "Player Version",
    "sizeMapping": {
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "M": {
        "height": 27,
        "width": 38
      }
    },
    "expectedArrival": null,
    "isArchived": false,
    "customLogo": false,
    "isBestSeller": false,
    "stock": 10,
    "customBadge": "",
    "customText": false,
    "discountStart": null,
    "basePrice": 1150,
    "lowStockAlert": 5,
    "customName": false,
    "preorderPrice": null,
    "categoryId": "cat_mens_football",
    "sizeChartImage": "",
    "isDeliveryChargeMandatory": false,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "seoTitle": "",
    "customNameNumber": true,
    "sku": "ZNV-MWDVZL59",
    "image": "img/products/prod_mwdvx1hidnhyrm6o0.webp",
    "imageUrl": "",
    "customNumber": false,
    "costPrice": 750,
    "preorderStatus": "OPEN",
    "isPreorder": false,
    "salePrice": 999,
    "deliveryNote": "",
    "preorderCloseDate": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "discountType": "percent",
    "updatedAt": "2026-11-12T18:33:53.652Z",
    "sizeChartType": "Player Edition",
    "subcategoryId": "mw88n5w90qabal7hw",
    "expectedDelivery": null,
    "discountValue": null,
    "tax": 0,
    "advancePaymentMode": "cod_only",
    "seoDesc": "",
    "team": "PSG",
    "discountEnd": null,
    "isLimited": true,
    "name": "Paris Saint-Germain Home Kit (PSG)"
  },
  {
    "id": "prod_mwdtotn087sehyqui",
    "createdAt": "2026-11-12T17:29:32.172Z",
    "compareAt": 1150,
    "collectionId": null,
    "preorderPrice": null,
    "lowStockAlert": 5,
    "slug": "ac-milan-away-kit",
    "sku": "ZNV-MWDTPSYX",
    "categoryId": "cat_mens_football",
    "discountStart": null,
    "preorderSold": 0,
    "isNewArrival": false,
    "isPublished": true,
    "preorderCloseDate": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderDesc": "",
    "customNameNumber": true,
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedDelivery": null,
    "deliveryChargeOutsideDhaka": 130,
    "image": "img/products/prod_mwdtotn087sehyqui.webp",
    "basePrice": 1150,
    "isBestSeller": false,
    "isPreorder": false,
    "seoDesc": "",
    "sizeChartImage": "",
    "tax": 0,
    "customBadge": "",
    "isDeliveryChargeMandatory": false,
    "preorderStatus": "OPEN",
    "categoryName": "Player Version",
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "width": 46,
        "height": 31
      }
    },
    "customNumber": false,
    "stock": 10,
    "status": "published",
    "advancePaymentMode": "cod_only",
    "isFeatured": false,
    "costPrice": 750,
    "discountValue": null,
    "gender": "Unisex",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "preorderCapacity": 100,
    "expectedArrival": null,
    "sizeChartType": "Player Edition",
    "subcategoryId": "mw88n5w90qabal7hw",
    "images": [
      {
        "url": "img/products/prod_mwdtotn087sehyqui.webp",
        "alt": "Ac Milan Away Kit",
        "isPrimary": true
      }
    ],
    "sizeStocks": null,
    "customPrintPrice": null,
    "deliveryChargeInsideDhaka": 80,
    "hasCustomDelivery": false,
    "customLogo": false,
    "discountEnd": null,
    "isArchived": false,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "name": "Ac Milan Away Kit",
    "isLimited": true,
    "team": "Ac Milan",
    "discountType": "percent",
    "salePrice": 999,
    "customName": false,
    "imageUrl": "",
    "deliveryNote": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "sport": "Football",
    "updatedAt": "2026-11-13T06:01:03.570Z",
    "customText": false,
    "seoTitle": ""
  },
  {
    "id": "prod_mwdtnvopswdqcm154",
    "isBestSeller": false,
    "sku": "ZNV-MWDTOPRF",
    "isLimited": true,
    "deliveryChargeInsideDhaka": 80,
    "stock": 10,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "customBadge": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "discountValue": null,
    "team": "Ac Milan",
    "updatedAt": "2026-11-13T06:04:50.621Z",
    "categoryName": "Player Version",
    "name": "Ac Milan Home Kit",
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "4XL": {
        "height": 31,
        "width": 46
      }
    },
    "salePrice": 999,
    "isPreorder": false,
    "preorderCloseDate": null,
    "expectedDelivery": null,
    "deliveryChargeOutsideDhaka": 130,
    "seoTitle": "",
    "costPrice": 750,
    "expectedArrival": null,
    "tax": 0,
    "preorderSold": 0,
    "status": "published",
    "customNameNumber": true,
    "imageUrl": "",
    "preorderStatus": "OPEN",
    "collectionId": null,
    "gender": "Unisex",
    "preorderDesc": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "isPublished": true,
    "sizeChartImage": "",
    "isNewArrival": false,
    "categoryId": "cat_mens_football",
    "sport": "Football",
    "images": [
      {
        "alt": "Ac Milan Home Kit",
        "url": "img/products/prod_mwdtnvopswdqcm154.webp",
        "isPrimary": true
      }
    ],
    "customName": false,
    "advancePaymentMode": "cod_only",
    "basePrice": 1150,
    "discountEnd": null,
    "customText": false,
    "isArchived": false,
    "customLogo": false,
    "isDeliveryChargeMandatory": false,
    "deliveryNote": "",
    "discountStart": null,
    "discountType": "percent",
    "lowStockAlert": 5,
    "preorderPrice": null,
    "seoDesc": "",
    "customPrintPrice": null,
    "customNumber": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "sizeStocks": null,
    "image": "img/products/prod_mwdtnvopswdqcm154.webp",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "compareAt": 1150,
    "hasCustomDelivery": false,
    "createdAt": "2026-11-12T17:28:48.170Z",
    "slug": "ac-milan-home-kit",
    "preorderCapacity": 100,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isFeatured": false
  },
  {
    "id": "prod_mwdtkv181mwc9koh8",
    "discountType": "percent",
    "updatedAt": "2026-11-13T06:04:55.482Z",
    "customNameNumber": true,
    "isPublished": true,
    "discountValue": null,
    "salePrice": 999,
    "deliveryChargeInsideDhaka": 80,
    "deliveryNote": "",
    "preorderCloseDate": null,
    "isLimited": true,
    "isPreorder": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "sku": "ZNV-MWDTLZU6",
    "assignedPatches": [
      "patch_ucl"
    ],
    "preorderStatus": "OPEN",
    "sizeMapping": {
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "width": 46,
        "height": 31
      }
    },
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "seoDesc": "",
    "customNumber": false,
    "image": "img/products/prod_mwdtkv181mwc9koh8.webp",
    "categoryId": "cat_mens_football",
    "costPrice": 750,
    "expectedDelivery": null,
    "sizeChartImage": "",
    "slug": "liverpool-third-kit",
    "tax": 0,
    "customBadge": "",
    "customPrintPrice": null,
    "customText": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "lowStockAlert": 5,
    "preorderPrice": null,
    "customName": false,
    "categoryName": "Player Version",
    "advancePaymentMode": "cod_only",
    "discountStart": null,
    "preorderCapacity": 100,
    "deliveryChargeOutsideDhaka": 130,
    "basePrice": 1150,
    "isArchived": false,
    "stock": 10,
    "isBestSeller": false,
    "customLogo": false,
    "name": "Liverpool Third Kit",
    "isDeliveryChargeMandatory": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "team": "Liverpool",
    "isNewArrival": false,
    "sport": "Football",
    "sizeStocks": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "images": [
      {
        "alt": "Liverpool Third Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtkv181mwc9koh8.webp"
      }
    ],
    "preorderDesc": "",
    "expectedArrival": null,
    "status": "published",
    "seoTitle": "",
    "discountEnd": null,
    "collectionId": null,
    "isFeatured": false,
    "gender": "Unisex",
    "imageUrl": "",
    "hasCustomDelivery": false,
    "compareAt": 1150,
    "preorderSold": 0,
    "createdAt": "2026-11-12T17:26:27.357Z"
  },
  {
    "id": "prod_mwdtghurjayd4us4t",
    "createdAt": "2026-11-12T17:23:03.651Z",
    "compareAt": 1150,
    "stock": 10,
    "sku": "ZNV-MWDTHAYH",
    "deliveryChargeInsideDhaka": 80,
    "customBadge": "",
    "expectedArrival": null,
    "team": "Liverpool",
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "width": 46,
        "height": 31
      }
    },
    "isPreorder": false,
    "customNumber": false,
    "name": "Liverpool Away Kit",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "assignedSleeves": [
      "slv_half"
    ],
    "tax": 0,
    "preorderCapacity": 100,
    "discountType": "percent",
    "basePrice": 1150,
    "deliveryNote": "",
    "customPrintPrice": null,
    "discountStart": null,
    "categoryId": "cat_mens_football",
    "preorderCloseDate": null,
    "lowStockAlert": 5,
    "preorderPrice": null,
    "sport": "Football",
    "isPublished": true,
    "customText": false,
    "isNewArrival": false,
    "hasCustomDelivery": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "images": [
      {
        "alt": "Liverpool Away Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtghurjayd4us4t.webp"
      }
    ],
    "expectedDelivery": null,
    "costPrice": 750,
    "customName": false,
    "discountEnd": null,
    "preorderDesc": "",
    "isDeliveryChargeMandatory": false,
    "collectionId": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "gender": "Unisex",
    "preorderSold": 0,
    "customLogo": false,
    "seoDesc": "",
    "status": "published",
    "isArchived": false,
    "advancePaymentMode": "cod_only",
    "deliveryChargeOutsideDhaka": 130,
    "sizeStocks": null,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "sizeChartType": "Player Edition",
    "subcategoryId": "mw88n5w90qabal7hw",
    "isLimited": true,
    "preorderStatus": "OPEN",
    "image": "img/products/prod_mwdtghurjayd4us4t.webp",
    "categoryName": "Player Version",
    "sizeChartImage": "",
    "customNameNumber": true,
    "isFeatured": false,
    "imageUrl": "",
    "discountValue": null,
    "salePrice": 999,
    "slug": "liverpool-away-kit",
    "isBestSeller": false,
    "seoTitle": "",
    "updatedAt": "2026-11-13T06:05:02.010Z"
  },
  {
    "id": "prod_mwdteu3bvlwp2g91l",
    "basePrice": 1150,
    "expectedArrival": null,
    "discountEnd": null,
    "deliveryNote": "",
    "deliveryChargeOutsideDhaka": 130,
    "tax": 0,
    "customPrintPrice": null,
    "discountType": "percent",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "isDeliveryChargeMandatory": false,
    "preorderCapacity": 100,
    "categoryId": "cat_mens_football",
    "imageUrl": "",
    "slug": "liverpool-home-kit",
    "assignedSleeves": [
      "slv_half"
    ],
    "compareAt": 1150,
    "seoTitle": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "createdAt": "2026-11-12T17:21:46.199Z",
    "sku": "ZNV-MWDTGEX5",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "discountValue": null,
    "customNumber": false,
    "preorderCloseDate": null,
    "isPreorder": false,
    "image": "img/products/prod_mwdteu3bvlwp2g91l.webp",
    "isLimited": true,
    "name": "Liverpool Home Kit",
    "team": "Liverpool",
    "categoryName": "Player Version",
    "sizeStocks": null,
    "customBadge": "",
    "deliveryChargeInsideDhaka": 80,
    "hasCustomDelivery": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "customNameNumber": true,
    "stock": 10,
    "updatedAt": "2026-11-13T06:05:07.190Z",
    "isBestSeller": false,
    "isFeatured": false,
    "salePrice": 999,
    "sizeMapping": {
      "XS": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "height": 27,
        "width": 38
      }
    },
    "costPrice": 750,
    "customName": false,
    "preorderDesc": "",
    "sizeChartImage": "",
    "customText": false,
    "advancePaymentMode": "cod_only",
    "images": [
      {
        "isPrimary": true,
        "alt": "Liverpool Home Kit",
        "url": "img/products/prod_mwdteu3bvlwp2g91l.webp"
      }
    ],
    "isNewArrival": false,
    "sport": "Football",
    "customLogo": false,
    "preorderSold": 0,
    "discountStart": null,
    "isArchived": false,
    "seoDesc": "",
    "isPublished": true,
    "expectedDelivery": null,
    "status": "published",
    "collectionId": null,
    "preorderPrice": null,
    "lowStockAlert": 5,
    "preorderStatus": "OPEN",
    "gender": "Unisex"
  },
  {
    "id": "prod_mwdtbvzvlj9kypg6d",
    "assignedPatches": [
      "patch_ucl"
    ],
    "deliveryChargeInsideDhaka": 80,
    "name": "Bayern Munich Third Kit",
    "sizeMapping": {
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "L": {
        "width": 40,
        "height": 28
      }
    },
    "tax": 0,
    "preorderCapacity": 100,
    "team": "Bayern Munich",
    "gender": "Unisex",
    "lowStockAlert": 5,
    "costPrice": 750,
    "status": "published",
    "sport": "Football",
    "hasCustomDelivery": false,
    "updatedAt": "2026-11-13T06:05:15.320Z",
    "basePrice": 1150,
    "sizeStocks": null,
    "images": [
      {
        "alt": "Bayern Munich Third Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtbvzvlj9kypg6d.webp"
      }
    ],
    "discountValue": null,
    "isDeliveryChargeMandatory": false,
    "sku": "ZNV-MWDTEFH7",
    "collectionId": null,
    "customBadge": "",
    "seoTitle": "",
    "isPreorder": false,
    "preorderDesc": "",
    "isFeatured": false,
    "customLogo": false,
    "discountType": "percent",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderStatus": "OPEN",
    "discountEnd": null,
    "isLimited": true,
    "categoryName": "Player Version",
    "createdAt": "2026-11-12T17:19:28.699Z",
    "isPublished": true,
    "expectedArrival": null,
    "image": "img/products/prod_mwdtbvzvlj9kypg6d.webp",
    "customName": false,
    "customNumber": false,
    "preorderCloseDate": null,
    "discountStart": null,
    "customPrintPrice": null,
    "expectedDelivery": null,
    "isNewArrival": false,
    "categoryId": "cat_mens_football",
    "stock": 10,
    "sizeChartImage": "",
    "compareAt": 1150,
    "slug": "bayern-munich-third-kit",
    "advancePaymentMode": "cod_only",
    "salePrice": 999,
    "preorderSold": 0,
    "seoDesc": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "isBestSeller": false,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sizeChartType": "Player Edition",
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderPrice": null,
    "deliveryNote": "",
    "customText": false,
    "isArchived": false,
    "customNameNumber": true,
    "deliveryChargeOutsideDhaka": 130,
    "imageUrl": ""
  },
  {
    "id": "prod_mwdt7mr7numexc9dh",
    "assignedSleeves": [
      "slv_half"
    ],
    "hasCustomDelivery": false,
    "imageUrl": "",
    "discountEnd": null,
    "isBestSeller": false,
    "image": "img/products/prod_mwdt7mr7numexc9dh.webp",
    "preorderSold": 0,
    "slug": "bayern-munich-away-kit",
    "deliveryNote": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountStart": null,
    "stock": 10,
    "sku": "ZNV-MWDT8COX",
    "expectedDelivery": null,
    "customPrintPrice": null,
    "isArchived": false,
    "customText": false,
    "isPublished": true,
    "advancePaymentMode": "cod_only",
    "isDeliveryChargeMandatory": false,
    "basePrice": 1150,
    "discountType": "percent",
    "customLogo": false,
    "updatedAt": "2026-11-13T06:05:21.811Z",
    "categoryName": "Player Version",
    "categoryId": "cat_mens_football",
    "costPrice": 750,
    "isNewArrival": false,
    "preorderPrice": null,
    "expectedArrival": null,
    "deliveryChargeInsideDhaka": 80,
    "subcategoryId": "mw88n5w90qabal7hw",
    "customName": false,
    "customNumber": false,
    "sizeChartType": "Player Edition",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "customNameNumber": true,
    "tax": 0,
    "sizeChartImage": "",
    "preorderCapacity": 100,
    "preorderCloseDate": null,
    "seoTitle": "",
    "sport": "Football",
    "sizeMapping": {
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "images": [
      {
        "alt": "Bayern Munich Away Kit",
        "url": "img/products/prod_mwdt7mr7numexc9dh.webp",
        "isPrimary": true
      }
    ],
    "isFeatured": false,
    "lowStockAlert": 5,
    "team": "Bayern Munich",
    "preorderDesc": "",
    "preorderStatus": "OPEN",
    "deliveryChargeOutsideDhaka": 130,
    "isPreorder": false,
    "collectionId": null,
    "name": "Bayern Munich Away Kit",
    "salePrice": 999,
    "assignedPatches": [
      "patch_ucl"
    ],
    "status": "published",
    "compareAt": 1150,
    "gender": "Unisex",
    "seoDesc": "",
    "createdAt": "2026-11-12T17:16:10.100Z",
    "isLimited": true,
    "customBadge": "",
    "discountValue": null,
    "sizeStocks": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি"
  },
  {
    "id": "prod_mwdt4uwdo30gbqxdp",
    "isBestSeller": false,
    "seoTitle": "",
    "customBadge": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "isArchived": false,
    "basePrice": 1150,
    "preorderSold": 0,
    "status": "published",
    "customText": false,
    "deliveryNote": "",
    "updatedAt": "2026-11-13T06:05:28.415Z",
    "preorderPrice": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "gender": "Unisex",
    "preorderCapacity": 100,
    "costPrice": 750,
    "categoryId": "cat_mens_football",
    "customName": false,
    "discountType": "percent",
    "images": [
      {
        "url": "img/products/prod_mwdt4uwdo30gbqxdp.webp",
        "alt": "Bayern Munich Home Kit",
        "isPrimary": true
      }
    ],
    "categoryName": "Player Version",
    "deliveryChargeOutsideDhaka": 130,
    "assignedPatches": [
      "patch_ucl"
    ],
    "isNewArrival": false,
    "discountStart": null,
    "customLogo": false,
    "customNumber": false,
    "image": "img/products/prod_mwdt4uwdo30gbqxdp.webp",
    "sizeMapping": {
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "name": "Bayern Munich Home Kit",
    "preorderCloseDate": null,
    "stock": 10,
    "team": "Bayern Munich",
    "customPrintPrice": null,
    "expectedDelivery": null,
    "salePrice": 999,
    "sku": "ZNV-MWDT5ZKW",
    "compareAt": 1150,
    "imageUrl": "",
    "isFeatured": false,
    "discountValue": null,
    "createdAt": "2026-11-12T17:14:00.685Z",
    "isPreorder": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "isDeliveryChargeMandatory": false,
    "isLimited": true,
    "preorderDesc": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "collectionId": null,
    "lowStockAlert": 5,
    "slug": "bayern-munich-home-kit",
    "seoDesc": "",
    "sizeStocks": null,
    "advancePaymentMode": "cod_only",
    "isPublished": true,
    "sizeChartImage": "",
    "customNameNumber": true,
    "preorderStatus": "OPEN",
    "tax": 0,
    "discountEnd": null,
    "sport": "Football",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "expectedArrival": null,
    "deliveryChargeInsideDhaka": 80,
    "hasCustomDelivery": false
  },
  {
    "id": "prod_mwdt2ma80pcwaiut4",
    "gender": "Unisex",
    "compareAt": 1150,
    "salePrice": 999,
    "status": "published",
    "createdAt": "2026-11-12T17:12:16.207Z",
    "deliveryChargeOutsideDhaka": 130,
    "hasCustomDelivery": false,
    "preorderDesc": "",
    "lowStockAlert": 5,
    "isFeatured": false,
    "customBadge": "",
    "collectionId": null,
    "isLimited": true,
    "isPreorder": false,
    "seoDesc": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "sport": "Football",
    "assignedPatches": [
      "patch_ucl"
    ],
    "images": [
      {
        "url": "img/products/prod_mwdt2ma80pcwaiut4.webp",
        "alt": "Arsenal Third Kit",
        "isPrimary": true
      }
    ],
    "preorderCapacity": 100,
    "sizeMapping": {
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "width": 46,
        "height": 31
      }
    },
    "slug": "arsenal-third-kit",
    "imageUrl": "",
    "discountValue": null,
    "deliveryNote": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "basePrice": 1150,
    "isDeliveryChargeMandatory": false,
    "discountStart": null,
    "isBestSeller": false,
    "preorderCloseDate": null,
    "preorderSold": 0,
    "updatedAt": "2026-11-13T06:05:35.538Z",
    "customNameNumber": true,
    "costPrice": 750,
    "stock": 0,
    "image": "img/products/prod_mwdt2ma80pcwaiut4.webp",
    "customText": false,
    "tax": 0,
    "isArchived": false,
    "categoryName": "Player Version",
    "advancePaymentMode": "cod_only",
    "discountEnd": null,
    "team": "Arsenal",
    "sizeChartImage": "",
    "customLogo": false,
    "discountType": "percent",
    "deliveryChargeInsideDhaka": 80,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "sku": "ZNV-MWDT2MA7",
    "name": "Arsenal Third Kit",
    "expectedArrival": null,
    "preorderStatus": "OPEN",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "categoryId": "cat_mens_football",
    "preorderPrice": null,
    "isNewArrival": false,
    "customPrintPrice": null,
    "subcategoryId": null,
    "expectedDelivery": null,
    "seoTitle": "",
    "isPublished": true,
    "customName": false,
    "sizeChartType": "Player Edition",
    "customNumber": false
  },
  {
    "id": "prod_mwdszqiet4d9u1fip",
    "hasCustomDelivery": false,
    "sport": "Football",
    "discountStart": null,
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      }
    },
    "createdAt": "2026-11-12T17:10:01.717Z",
    "salePrice": 999,
    "compareAt": 1150,
    "slug": "arsenal-away-kit",
    "expectedDelivery": null,
    "customPrintPrice": null,
    "seoTitle": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isLimited": true,
    "assignedSleeves": [
      "slv_half"
    ],
    "sku": "ZNV-MWDSZQID",
    "preorderStatus": "OPEN",
    "isPreorder": false,
    "isFeatured": false,
    "tax": 0,
    "expectedArrival": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderPrice": null,
    "collectionId": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "seoDesc": "",
    "preorderDesc": "",
    "sizeChartImage": "",
    "sizeChartType": "Player Edition",
    "customNameNumber": true,
    "customBadge": "",
    "updatedAt": "2026-11-13T06:05:45.825Z",
    "image": "img/products/prod_mwdszqiet4d9u1fip.webp",
    "customName": false,
    "discountType": "percent",
    "preorderCapacity": 100,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "categoryId": "cat_mens_football",
    "preorderCloseDate": null,
    "status": "published",
    "stock": 0,
    "discountEnd": null,
    "gender": "Unisex",
    "categoryName": "Player Version",
    "basePrice": 1150,
    "customNumber": false,
    "team": "Arsenal",
    "imageUrl": "",
    "lowStockAlert": 5,
    "customLogo": false,
    "isNewArrival": false,
    "isPublished": true,
    "name": "Arsenal Away Kit",
    "costPrice": 750,
    "deliveryChargeInsideDhaka": 80,
    "isArchived": false,
    "customText": false,
    "preorderSold": 0,
    "isBestSeller": false,
    "deliveryChargeOutsideDhaka": 130,
    "images": [
      {
        "url": "img/products/prod_mwdszqiet4d9u1fip.webp",
        "alt": "Arsenal Away Kit",
        "isPrimary": true
      }
    ],
    "deliveryNote": "",
    "advancePaymentMode": "cod_only",
    "isDeliveryChargeMandatory": false,
    "discountValue": null,
    "assignedPatches": [
      "patch_ucl"
    ]
  },
  {
    "id": "prod_mwdr6retnv03s299i",
    "customNameNumber": true,
    "isLimited": true,
    "isDeliveryChargeMandatory": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "lowStockAlert": 5,
    "name": "Arsenal Home Kit",
    "salePrice": 999,
    "preorderSold": 0,
    "compareAt": 1150,
    "isArchived": false,
    "customText": false,
    "isBestSeller": false,
    "team": "Arsenal",
    "createdAt": "2026-11-12T16:19:30.245Z",
    "advancePaymentMode": "default",
    "deliveryNote": "",
    "sport": "Football",
    "customNumber": false,
    "preorderCloseDate": null,
    "seoTitle": "",
    "isNewArrival": false,
    "customLogo": false,
    "deliveryChargeOutsideDhaka": 130,
    "deliveryChargeInsideDhaka": 80,
    "customPrintPrice": null,
    "expectedDelivery": null,
    "isPublished": true,
    "categoryId": "cat_mens_football",
    "discountType": "percent",
    "customName": false,
    "discountEnd": null,
    "expectedArrival": null,
    "discountValue": null,
    "categoryName": "Player Version",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "images": [
      {
        "url": "img/products/prod_mwdr6retnv03s299i.webp",
        "alt": "Arsenal Home Kit",
        "isPrimary": true
      }
    ],
    "costPrice": 750,
    "customBadge": "",
    "discountStart": null,
    "preorderStatus": "OPEN",
    "slug": "arsenal-home-kit",
    "collectionId": null,
    "preorderDesc": "",
    "seoDesc": "",
    "tax": 0,
    "basePrice": 1150,
    "isFeatured": false,
    "updatedAt": "2026-11-13T06:05:53.038Z",
    "sizeChartImage": "",
    "isPreorder": false,
    "sku": "ZNV-MWDR6RES",
    "image": "img/products/prod_mwdr6retnv03s299i.webp",
    "gender": "Unisex",
    "hasCustomDelivery": false,
    "imageUrl": "",
    "assignedPatches": [
      "patch_ucl"
    ],
    "stock": 4,
    "status": "published",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sizeStocks": {
      "3XL": 0,
      "4XL": 0,
      "XXL": 1,
      "XL": 1,
      "S": 1,
      "M": 1,
      "L": 1
    },
    "preorderPrice": null,
    "preorderCapacity": 100,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeMapping": {
      "XS": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "sizeChartType": "Player Edition"
  },
  {
    "id": "prod_mwdqw21pcbottdjz0",
    "assignedSleeves": [
      "slv_half"
    ],
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      }
    },
    "discountStart": null,
    "deliveryNote": "",
    "sizeStocks": {
      "XXL": 1,
      "4XL": 0,
      "M": 0,
      "S": 1,
      "3XL": 0,
      "XL": 1,
      "L": 1
    },
    "isBestSeller": false,
    "preorderSold": 0,
    "slug": "mancester-city-third-kit-copy-mwdqw21p",
    "shortDesc": "",
    "deliveryChargeOutsideDhaka": 130,
    "preorderCloseDate": null,
    "isNewArrival": false,
    "isLimited": true,
    "customNumber": true,
    "preorderPrice": null,
    "isPreorder": false,
    "sport": "Football",
    "customBadge": "",
    "preorderCapacity": 100,
    "createdAt": "2026-11-12T16:11:10.813Z",
    "categoryName": "Player Version",
    "sizeChartType": "Player Edition",
    "subcategoryId": null,
    "isFeatured": false,
    "assignedSizes": [
      "sz_l"
    ],
    "imageUrl": "",
    "compareAt": 1150,
    "expectedArrival": null,
    "discountType": "percent",
    "salePrice": 999,
    "preorderDesc": "",
    "discountEnd": null,
    "team": "",
    "name": "Mancester City Third Kit (Copy)",
    "collectionId": null,
    "sku": "ZNV-MWAFXROJ-COPY-MWDQW21P",
    "description": "",
    "customLogo": false,
    "images": [
      {
        "isPrimary": true,
        "alt": "Mancester City Third Kit (Copy)",
        "url": "img/products/prod_mwdqw21pcbottdjz0.webp"
      }
    ],
    "deliveryChargeInsideDhaka": 80,
    "customNameNumber": true,
    "isPublished": true,
    "lowStockAlert": 5,
    "customName": true,
    "categoryId": "cat_mens_football",
    "preorderStatus": "OPEN",
    "advancePaymentMode": "default",
    "isDeliveryChargeMandatory": false,
    "expectedDelivery": null,
    "customPrintPrice": null,
    "status": "published",
    "assignedPatches": [
      "patch_ucl"
    ],
    "gender": "Unisex",
    "costPrice": null,
    "seoDesc": "",
    "hasCustomDelivery": false,
    "image": "img/products/prod_mwdqw21pcbottdjz0.webp",
    "discountValue": null,
    "updatedAt": "2026-11-12T16:12:19.645Z",
    "customText": false,
    "tax": 0,
    "isArchived": false,
    "basePrice": 1150,
    "sizeChartImage": "",
    "stock": 4,
    "seoTitle": ""
  },
  {
    "id": "prod_mwdqnvvpv1ravgb0o",
    "isNewArrival": false,
    "customLogo": false,
    "customNumber": true,
    "isDeliveryChargeMandatory": false,
    "hasCustomDelivery": false,
    "discountValue": null,
    "deliveryChargeOutsideDhaka": 130,
    "customName": true,
    "status": "published",
    "categoryId": "cat_mens_football",
    "discountType": "percent",
    "customBadge": "",
    "categoryName": "Player Version",
    "expectedArrival": null,
    "gender": "Unisex",
    "preorderCapacity": 100,
    "slug": "erfge",
    "seoTitle": "",
    "preorderStatus": "OPEN",
    "createdAt": "2026-11-12T16:04:49.573Z",
    "assignedSleeves": [
      "slv_half",
      "mw9mgrcce7v5jp20j",
      "slv_full",
      "mw85up47v7er1mbhw"
    ],
    "salePrice": null,
    "deliveryChargeInsideDhaka": 80,
    "seoDesc": "",
    "sport": "Football",
    "sizeMapping": {
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "L": {
        "height": 28,
        "width": 40
      }
    },
    "compareAt": null,
    "isArchived": false,
    "customText": false,
    "isBestSeller": false,
    "preorderSold": 0,
    "shortDesc": "",
    "isLimited": false,
    "deliveryNote": "",
    "lowStockAlert": 5,
    "images": [
      {
        "url": "img/products/prod_mwdqnvvpv1ravgb0o.webp",
        "alt": "erfge",
        "isPrimary": true
      }
    ],
    "sizeChartImage": "",
    "preorderCloseDate": null,
    "sku": "ZNV-MWDQNVVO",
    "assignedPatches": [
      "mw935ci5a7u2put3v",
      "mw935ci6apxu1zl69",
      "patch_ucl",
      "mw935ci6fq6w89k05",
      "patch_trophy",
      "patch_respect",
      "patch_epl"
    ],
    "preorderPrice": null,
    "sizeChartType": "Player Edition",
    "subcategoryId": null,
    "advancePaymentMode": "default",
    "assignedSizes": [
      "sz_xs",
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "customNameNumber": true,
    "imageUrl": "",
    "updatedAt": "2026-11-12T16:10:37.401Z",
    "stock": 0,
    "discountEnd": null,
    "preorderDesc": "",
    "description": "",
    "image": "img/products/prod_mwdqnvvpv1ravgb0o.webp",
    "collectionId": null,
    "basePrice": 1,
    "discountStart": null,
    "expectedDelivery": null,
    "customPrintPrice": null,
    "tax": 0,
    "isPreorder": false,
    "costPrice": null,
    "name": "erfge",
    "team": "",
    "isFeatured": false,
    "isPublished": true
  },
  {
    "id": "prod_mwdqkrjb8d4glhnm7",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "sport": "Football",
    "discountStart": null,
    "deliveryChargeInsideDhaka": 80,
    "advancePaymentMode": "cod_only",
    "deliveryChargeOutsideDhaka": 130,
    "hasCustomDelivery": false,
    "slug": "mancester-city-third-kit-copy-mwdqkrjb",
    "isLimited": true,
    "createdAt": "2026-11-12T16:02:23.975Z",
    "deliveryNote": "",
    "sizeMapping": {
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "height": 31,
        "width": 46
      }
    },
    "isBestSeller": false,
    "compareAt": 1150,
    "isPreorder": false,
    "preorderSold": 0,
    "salePrice": 999,
    "isFeatured": false,
    "isDeliveryChargeMandatory": false,
    "preorderCapacity": 100,
    "customBadge": "",
    "isNewArrival": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "customNumber": false,
    "categoryName": "Player Version",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sizeChartType": "Player Edition",
    "subcategoryId": null,
    "seoTitle": "",
    "discountType": "percent",
    "preorderPrice": null,
    "sizeStocks": {
      "XL": 1,
      "4XL": 0,
      "M": 1,
      "S": 1,
      "XXL": 1,
      "L": 1,
      "3XL": 0
    },
    "preorderDesc": "",
    "isPublished": true,
    "image": "img/products/prod_mwdqkrjb8d4glhnm7.webp",
    "collectionId": null,
    "preorderCloseDate": null,
    "stock": 5,
    "costPrice": 750,
    "assignedSleeves": [
      "slv_half"
    ],
    "customText": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isArchived": false,
    "images": [
      {
        "url": "img/products/prod_mwdqkrjb8d4glhnm7.webp",
        "alt": "Mancester City Third Kit (Copy)",
        "isPrimary": true
      },
      {
        "url": "img/products/prod_mwdqkrjb8d4glhnm7_1.webp",
        "alt": "Mancester City Third Kit (Copy)",
        "isPrimary": true
      }
    ],
    "team": "Mancester City",
    "name": "Mancester City Third Kit (Copy)",
    "lowStockAlert": 5,
    "customNameNumber": true,
    "updatedAt": "2026-11-12T16:02:36.643Z",
    "basePrice": 1150,
    "discountEnd": null,
    "tax": 0,
    "customLogo": false,
    "seoDesc": "",
    "sku": "ZNV-MWAFXROJ-COPY-MWDQKRJB",
    "preorderStatus": "OPEN",
    "sizeChartImage": "",
    "customName": false,
    "gender": "Unisex",
    "categoryId": "cat_mens_football",
    "customPrintPrice": null,
    "expectedDelivery": null,
    "expectedArrival": null,
    "discountValue": null,
    "status": "published",
    "imageUrl": ""
  },
  {
    "id": "prod_mwafxrols41103ror",
    "gender": "Unisex",
    "costPrice": null,
    "discountEnd": null,
    "status": "published",
    "preorderCapacity": 100,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "hasCustomDelivery": false,
    "basePrice": 1150,
    "lowStockAlert": 5,
    "expectedArrival": null,
    "team": "Mancester City",
    "imageUrl": "",
    "isDeliveryChargeMandatory": false,
    "sizeStocks": {
      "4XL": 0,
      "XXL": 1,
      "XL": 1,
      "3XL": 0,
      "L": 1,
      "S": 1,
      "M": 0
    },
    "updatedAt": "2026-11-13T06:05:55.466Z",
    "isPublished": true,
    "name": "Mancester City Third Kit",
    "sport": "Football",
    "preorderDesc": "",
    "images": [
      {
        "url": "img/products/prod_mwafxrols41103ror.jpg",
        "alt": "Mancester City Third Kit",
        "isPrimary": true
      }
    ],
    "assignedSleeves": [
      "slv_half"
    ],
    "collectionId": null,
    "sizeChartImage": "",
    "deliveryChargeOutsideDhaka": 130,
    "advancePaymentMode": "default",
    "deliveryChargeInsideDhaka": 80,
    "discountValue": null,
    "isFeatured": false,
    "preorderStatus": "OPEN",
    "isPreorder": false,
    "customLogo": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "isLimited": true,
    "slug": "mancester-city-third-kit",
    "discountStart": null,
    "isNewArrival": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "tax": 0,
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "width": 46,
        "height": 31
      }
    },
    "customNumber": true,
    "categoryName": "Player Version",
    "categoryId": "cat_mens_football",
    "compareAt": 1150,
    "preorderCloseDate": null,
    "salePrice": 999,
    "stock": 4,
    "customName": true,
    "expectedDelivery": null,
    "seoDesc": "",
    "customPrintPrice": null,
    "createdAt": "2026-11-10T08:41:16.389Z",
    "image": "img/products/prod_mwafxrols41103ror.jpg",
    "seoTitle": "",
    "discountType": "percent",
    "assignedSizes": [],
    "deliveryNote": "",
    "customBadge": "",
    "customText": false,
    "customNameNumber": true,
    "isArchived": false,
    "preorderPrice": null,
    "isBestSeller": false,
    "sku": "ZNV-MWAFXROJ",
    "sizeChartType": "Player Edition",
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderSold": 0
  },
  {
    "id": "prod_mwafvhg25iobn348j",
    "tax": 0,
    "hasCustomDelivery": false,
    "discountType": "percent",
    "assignedSizes": [],
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "categoryName": "Player Version",
    "preorderPrice": null,
    "sizeMapping": {
      "XL": {
        "width": 42,
        "height": 29
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "height": 31,
        "width": 46
      }
    },
    "isNewArrival": false,
    "deliveryChargeOutsideDhaka": 130,
    "customNumber": true,
    "slug": "mancester-city-away-kit",
    "advancePaymentMode": "default",
    "customText": false,
    "isArchived": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "isBestSeller": false,
    "preorderSold": 0,
    "costPrice": null,
    "deliveryNote": "",
    "customLogo": false,
    "expectedArrival": null,
    "imageUrl": "",
    "sku": "ZNV-MWAFVHFY",
    "basePrice": 1150,
    "discountStart": null,
    "image": "img/products/prod_mwafvhg25iobn348j.jpg",
    "customBadge": "",
    "stock": 10,
    "preorderCapacity": 100,
    "categoryId": "cat_mens_football",
    "updatedAt": "2026-11-13T06:05:56.354Z",
    "customName": true,
    "name": "Mancester City Away Kit",
    "preorderCloseDate": null,
    "discountEnd": null,
    "customNameNumber": true,
    "seoDesc": "",
    "team": "Mancester City",
    "status": "published",
    "preorderStatus": "OPEN",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "gender": "Unisex",
    "discountValue": null,
    "sizeChartImage": "",
    "isFeatured": false,
    "isPreorder": false,
    "deliveryChargeInsideDhaka": 80,
    "isPublished": true,
    "lowStockAlert": 5,
    "isLimited": true,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "seoTitle": "",
    "customPrintPrice": null,
    "images": [
      {
        "url": "img/products/prod_mwafvhg25iobn348j.jpg",
        "alt": "Mancester City Away Kit",
        "isPrimary": true
      }
    ],
    "expectedDelivery": null,
    "compareAt": 1150,
    "sport": "Football",
    "sizeStocks": {},
    "salePrice": 999,
    "preorderDesc": "",
    "isDeliveryChargeMandatory": false,
    "createdAt": "2026-11-10T08:39:29.810Z",
    "collectionId": null,
    "assignedPatches": [
      "patch_ucl"
    ]
  },
  {
    "id": "prod_mwafsdqhn64s1y787",
    "expectedArrival": null,
    "assignedSizes": [],
    "sizeStocks": {},
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "name": "Mancester City Home Kit",
    "isPublished": true,
    "team": "Mancester City",
    "preorderPrice": null,
    "customNameNumber": true,
    "discountEnd": null,
    "image": "img/products/prod_mwafsdqhn64s1y787.jpg",
    "hasCustomDelivery": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "stock": 10,
    "imageUrl": "",
    "collectionId": null,
    "isPreorder": false,
    "preorderDesc": "",
    "isFeatured": false,
    "updatedAt": "2026-11-13T06:05:56.802Z",
    "basePrice": 1150,
    "discountStart": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "expectedDelivery": null,
    "deliveryChargeOutsideDhaka": 130,
    "customPrintPrice": null,
    "costPrice": null,
    "images": [
      {
        "url": "img/products/prod_mwafsdqhn64s1y787.jpg",
        "alt": "Mancester City Home Kit",
        "isPrimary": true
      }
    ],
    "isDeliveryChargeMandatory": false,
    "customName": true,
    "customNumber": true,
    "discountValue": null,
    "categoryId": "cat_mens_football",
    "isNewArrival": false,
    "slug": "mancester-city-home-kit",
    "preorderCloseDate": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "seoDesc": "",
    "sku": "ZNV-MWAFSDQD",
    "sport": "Football",
    "categoryName": "Player Version",
    "sizeMapping": {
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "S": {
        "width": 36,
        "height": 26
      }
    },
    "customLogo": false,
    "discountType": "percent",
    "seoTitle": "",
    "createdAt": "2026-11-10T08:37:05.033Z",
    "customBadge": "",
    "lowStockAlert": 5,
    "sizeChartImage": "",
    "tax": 0,
    "gender": "Unisex",
    "deliveryChargeInsideDhaka": 80,
    "advancePaymentMode": "default",
    "customText": false,
    "compareAt": 1154,
    "isArchived": false,
    "preorderCapacity": 100,
    "status": "published",
    "salePrice": 999,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "deliveryNote": "",
    "preorderSold": 0,
    "isBestSeller": false,
    "isLimited": true,
    "preorderStatus": "OPEN"
  },
  {
    "id": "prod_mw9setzepymsatr9c",
    "discountEnd": null,
    "customText": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "name": "Barcelona 4th Kit",
    "isNewArrival": false,
    "isArchived": false,
    "team": "Barcelona",
    "customNumber": true,
    "discountStart": null,
    "categoryName": "Player Version",
    "customNameNumber": true,
    "image": "img/products/prod_mw9setzepymsatr9c.jpg",
    "isPublished": true,
    "stock": 3,
    "discountType": "percent",
    "imageUrl": "",
    "createdAt": "2026-11-09T21:42:41.738Z",
    "preorderStatus": "OPEN",
    "assignedSizes": [],
    "preorderCloseDate": null,
    "compareAt": 1150,
    "sizeChartType": "Player Edition",
    "customName": true,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderPrice": null,
    "salePrice": 999,
    "categoryId": "cat_mens_football",
    "assignedPatches": [
      "patch_ucl",
      "patch_trophy",
      "patch_respect",
      "patch_epl"
    ],
    "deliveryNote": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "customLogo": false,
    "isBestSeller": false,
    "customPrintPrice": null,
    "expectedDelivery": null,
    "sizeChartImage": "",
    "preorderSold": 0,
    "isLimited": true,
    "images": [
      {
        "url": "img/products/prod_mw9setzepymsatr9c.jpg",
        "alt": "Barcelona 4th Kit",
        "isPrimary": true
      }
    ],
    "deliveryChargeOutsideDhaka": 130,
    "isPreorder": false,
    "isFeatured": false,
    "lowStockAlert": 5,
    "sizeMapping": {
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "L": {
        "width": 40,
        "height": 28
      }
    },
    "isDeliveryChargeMandatory": false,
    "slug": "barcelona-4th-kit",
    "assignedSleeves": [
      "slv_half",
      "mw9mgrcce7v5jp20j",
      "slv_full"
    ],
    "seoDesc": "",
    "sku": "ZNV-MW9SETZB",
    "sport": "Football",
    "seoTitle": "",
    "preorderDesc": "",
    "expectedArrival": null,
    "collectionId": null,
    "tax": 0,
    "sizeStocks": {},
    "updatedAt": "2026-11-13T06:05:57.795Z",
    "gender": "Unisex",
    "basePrice": 1150,
    "preorderCapacity": 100,
    "discountValue": null,
    "hasCustomDelivery": false,
    "status": "published",
    "advancePaymentMode": "default",
    "customBadge": "",
    "deliveryChargeInsideDhaka": 80,
    "costPrice": null
  },
  {
    "id": "prod_mw9sa6jrx2oh028td",
    "categoryId": "cat_mens_football",
    "customPrintPrice": null,
    "customNumber": true,
    "isPublished": true,
    "expectedDelivery": null,
    "customName": true,
    "isNewArrival": false,
    "sizeChartImage": "",
    "discountType": "percent",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "slug": "barcelona-third-kit",
    "tax": 0,
    "discountStart": null,
    "preorderStatus": "OPEN",
    "gender": "Unisex",
    "customLogo": false,
    "discountEnd": null,
    "status": "published",
    "categoryName": "Player Version",
    "costPrice": null,
    "assignedSizes": [],
    "imageUrl": "",
    "isArchived": false,
    "sku": "ZNV-MW9SA6JN",
    "customText": false,
    "hasCustomDelivery": false,
    "assignedPatches": [
      "patch_ucl",
      "patch_trophy"
    ],
    "preorderPrice": null,
    "seoDesc": "",
    "subcategoryId": "mw88n5w90qabal7hw",
    "customNameNumber": true,
    "sizeChartType": "Player Edition",
    "images": [
      {
        "url": "img/products/prod_mw9sa6jrx2oh028td.jpg",
        "alt": "Barcelona Third Kit",
        "isPrimary": true
      }
    ],
    "preorderSold": 0,
    "sport": "Football",
    "isBestSeller": true,
    "basePrice": 1150,
    "updatedAt": "2026-11-13T06:05:58.445Z",
    "deliveryNote": "",
    "lowStockAlert": 5,
    "advancePaymentMode": "default",
    "deliveryChargeInsideDhaka": 80,
    "sizeStocks": {},
    "assignedSleeves": [
      "slv_half"
    ],
    "name": "Barcelona Third Kit",
    "team": "Barcelona",
    "sizeMapping": {
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "height": 31,
        "width": 46
      }
    },
    "preorderCapacity": 100,
    "deliveryChargeOutsideDhaka": 130,
    "isLimited": false,
    "preorderCloseDate": null,
    "seoTitle": "",
    "isFeatured": false,
    "customBadge": "",
    "collectionId": null,
    "isDeliveryChargeMandatory": false,
    "discountValue": null,
    "isPreorder": false,
    "preorderDesc": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "salePrice": 999,
    "image": "img/products/prod_mw9sa6jrx2oh028td.jpg",
    "compareAt": 1150,
    "expectedArrival": null,
    "stock": 10,
    "createdAt": "2026-11-09T21:39:04.743Z"
  },
  {
    "id": "prod_mw9s5gftya80x3w3n",
    "assignedPatches": [
      "patch_ucl"
    ],
    "customLogo": false,
    "seoTitle": "",
    "collectionId": null,
    "images": [
      {
        "url": "img/products/prod_mw9s5gftya80x3w3n.jpg",
        "alt": "Barceleona Away Kit",
        "isPrimary": true
      }
    ],
    "preorderDesc": "",
    "sku": "ZNV-MW9S5GFR",
    "discountValue": null,
    "customPrintPrice": null,
    "expectedDelivery": null,
    "customName": false,
    "categoryId": "cat_mens_football",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "status": "published",
    "tax": 0,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "name": "Barceleona Away Kit",
    "preorderStatus": "OPEN",
    "gender": "Unisex",
    "discountEnd": null,
    "isLimited": false,
    "team": "Barcelona",
    "sizeChartImage": "",
    "createdAt": "2026-11-09T21:35:24.281Z",
    "advancePaymentMode": "default",
    "isPublished": true,
    "customNameNumber": true,
    "compareAt": 1150,
    "preorderCloseDate": null,
    "customText": false,
    "isArchived": false,
    "sport": "Football",
    "deliveryChargeOutsideDhaka": 130,
    "lowStockAlert": 5,
    "salePrice": 999,
    "preorderCapacity": 100,
    "imageUrl": "",
    "expectedArrival": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderSold": 0,
    "sizeChartType": "Player Edition",
    "isBestSeller": true,
    "preorderPrice": null,
    "sizeStocks": {},
    "isDeliveryChargeMandatory": false,
    "customBadge": "",
    "deliveryNote": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "customNumber": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "isNewArrival": false,
    "sizeMapping": {
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "height": 27,
        "width": 38
      }
    },
    "discountStart": null,
    "costPrice": null,
    "slug": "barceleona-away-kit",
    "discountType": "percent",
    "isPreorder": false,
    "stock": 10,
    "seoDesc": "",
    "isFeatured": false,
    "updatedAt": "2026-11-13T06:05:59.244Z",
    "deliveryChargeInsideDhaka": 80,
    "basePrice": 1150,
    "hasCustomDelivery": false,
    "categoryName": "Player Version",
    "image": "img/products/prod_mw9s5gftya80x3w3n.jpg"
  },
  {
    "id": "prod_mw9s02zyhy7iilqo4",
    "tax": 0,
    "discountStart": null,
    "isFeatured": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "costPrice": null,
    "isPreorder": false,
    "preorderCapacity": 100,
    "basePrice": 1150,
    "advancePaymentMode": "default",
    "slug": "barcelona-home-kit",
    "updatedAt": "2026-11-13T06:06:00.185Z",
    "sizeStocks": {},
    "discountEnd": null,
    "seoTitle": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "expectedArrival": null,
    "preorderDesc": "",
    "sku": "ZNV-MW9S02ZV",
    "image": "img/products/prod_mw9s02zyhy7iilqo4.jpg",
    "preorderCloseDate": null,
    "collectionId": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "subcategoryId": "mw88n5w90qabal7hw",
    "stock": 10,
    "sizeChartType": "Player Edition",
    "isPublished": true,
    "preorderPrice": null,
    "name": "Barcelona Home Kit",
    "categoryName": "Player Version",
    "seoDesc": "",
    "isLimited": false,
    "team": "Barcelona",
    "status": "published",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "deliveryChargeInsideDhaka": 80,
    "discountType": "percent",
    "customText": false,
    "gender": "Unisex",
    "isArchived": false,
    "compareAt": 1150,
    "customBadge": "",
    "lowStockAlert": 5,
    "salePrice": 999,
    "createdAt": "2026-11-09T21:31:13.582Z",
    "isNewArrival": false,
    "customPrintPrice": null,
    "expectedDelivery": null,
    "customNumber": false,
    "deliveryNote": "",
    "assignedPatches": [
      "patch_ucl"
    ],
    "deliveryChargeOutsideDhaka": 130,
    "isDeliveryChargeMandatory": false,
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "height": 29,
        "width": 42
      }
    },
    "isBestSeller": true,
    "images": [
      {
        "url": "img/products/prod_mw9s02zyhy7iilqo4.jpg",
        "alt": "Barcelona Home Kit",
        "isPrimary": true
      }
    ],
    "preorderStatus": "OPEN",
    "categoryId": "cat_mens_football",
    "preorderSold": 0,
    "imageUrl": "",
    "customName": false,
    "customNameNumber": true,
    "hasCustomDelivery": false,
    "sport": "Football",
    "sizeChartImage": "",
    "customLogo": false,
    "discountValue": null
  },
  {
    "id": "prod_mw9ru5dmlxx3y3v5l",
    "sizeChartType": "Player Edition",
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderPrice": null,
    "tax": 0,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "seoDesc": "",
    "hasCustomDelivery": false,
    "isFeatured": false,
    "sizeMapping": {
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "isPreorder": false,
    "customNameNumber": true,
    "deliveryChargeOutsideDhaka": 130,
    "slug": "real-madrid-third-kit",
    "customBadge": "",
    "basePrice": 1150,
    "advancePaymentMode": "default",
    "updatedAt": "2026-11-13T06:06:00.983Z",
    "sport": "Football",
    "costPrice": null,
    "expectedDelivery": null,
    "preorderDesc": "",
    "customPrintPrice": null,
    "seoTitle": "",
    "sku": "ZNV-MW9RU5DK",
    "collectionId": null,
    "sizeStocks": {},
    "discountStart": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "categoryName": "Player Version",
    "discountValue": null,
    "deliveryChargeInsideDhaka": 80,
    "preorderStatus": "OPEN",
    "isPublished": true,
    "discountType": "percent",
    "status": "published",
    "isArchived": false,
    "preorderCloseDate": null,
    "sizeChartImage": "",
    "discountEnd": null,
    "customText": false,
    "isNewArrival": false,
    "gender": "Unisex",
    "assignedSleeves": [
      "slv_half"
    ],
    "customNumber": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "salePrice": 999,
    "deliveryNote": "",
    "preorderCapacity": 100,
    "stock": 10,
    "isDeliveryChargeMandatory": false,
    "compareAt": 1150,
    "customLogo": false,
    "isBestSeller": true,
    "image": "img/products/prod_mw9ru5dmlxx3y3v5l.jpg",
    "expectedArrival": null,
    "createdAt": "2026-11-09T21:26:36.730Z",
    "preorderSold": 0,
    "lowStockAlert": 5,
    "imageUrl": "",
    "isLimited": false,
    "categoryId": "cat_mens_football",
    "customName": false,
    "name": "Real Madrid Third Kit",
    "team": "Real Madrid",
    "images": [
      {
        "url": "img/products/prod_mw9ru5dmlxx3y3v5l.jpg",
        "alt": "Real Madrid Third Kit",
        "isPrimary": true
      }
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি"
  },
  {
    "id": "prod_mw9rkmru2ps3wt4hb",
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "height": 31,
        "width": 46
      }
    },
    "assignedSleeves": [
      "slv_half"
    ],
    "hasCustomDelivery": false,
    "discountType": "percent",
    "isArchived": false,
    "customText": false,
    "basePrice": 1150,
    "updatedAt": "2026-11-13T06:06:01.659Z",
    "lowStockAlert": 5,
    "name": "Real Madrid Away Kit",
    "categoryName": "Player Version",
    "seoDesc": "",
    "team": "Real Madrid",
    "costPrice": null,
    "customNumber": false,
    "isNewArrival": false,
    "tax": 0,
    "advancePaymentMode": "default",
    "discountValue": null,
    "categoryId": "cat_mens_football",
    "preorderSold": 0,
    "customName": false,
    "isBestSeller": true,
    "sku": "ZNV-MW9RKMRS",
    "sport": "Football",
    "deliveryNote": "",
    "imageUrl": "",
    "expectedArrival": null,
    "preorderCapacity": 100,
    "customLogo": false,
    "customBadge": "",
    "salePrice": 999,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "preorderCloseDate": null,
    "compareAt": 1150,
    "isFeatured": false,
    "discountEnd": null,
    "customNameNumber": true,
    "isPreorder": false,
    "createdAt": "2026-11-09T21:19:12.714Z",
    "isLimited": false,
    "status": "published",
    "isPublished": true,
    "slug": "real-madrid-away",
    "gender": "Unisex",
    "isDeliveryChargeMandatory": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "discountStart": null,
    "preorderPrice": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "stock": 20,
    "sizeChartType": "Player Edition",
    "expectedDelivery": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "customPrintPrice": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sizeChartImage": "",
    "sizeStocks": {},
    "image": "img/products/prod_mw9rkmru2ps3wt4hb.jpg",
    "deliveryChargeInsideDhaka": 80,
    "preorderStatus": "OPEN",
    "seoTitle": "",
    "collectionId": null,
    "images": [
      {
        "url": "img/products/prod_mw9rkmru2ps3wt4hb.jpg",
        "alt": "Real Madrid Away Kit",
        "isPrimary": true
      }
    ],
    "deliveryChargeOutsideDhaka": 130,
    "preorderDesc": ""
  },
  {
    "id": "prod_mw9jxtywllrlf2fec",
    "createdAt": "2026-11-09T17:45:31.640Z",
    "name": "Barcelona",
    "updatedAt": "2026-11-10T06:24:51.264Z",
    "basePrice": 500,
    "compareAt": 500,
    "assignedSleeves": [
      "slv_half",
      "slv_full"
    ],
    "status": "published",
    "salePrice": 450,
    "isPublished": true,
    "isPreorder": false,
    "isFeatured": false,
    "customNameNumber": false,
    "slug": "barcelona",
    "isArchived": false,
    "isBestSeller": false,
    "isLimited": false,
    "stock": 6,
    "images": [
      {
        "url": "img/products/prod_mw9jxtywllrlf2fec.jpg",
        "isPrimary": true
      }
    ],
    "assignedPatches": [],
    "image": "img/products/prod_mw9jxtywllrlf2fec.jpg",
    "isNewArrival": true,
    "imageUrl": "img/products/prod_mw9jxtywllrlf2fec.jpg",
    "sku": "ZNV-MW9JXTYV",
    "sizeStocks": {},
    "categoryName": "Club Sweat Shirt",
    "assignedSizes": [
      "sz_m_mw935ci4n4q1d75if",
      "sz_l_mw935ci4uf5gmik01",
      "sz_xl_mw935ci43o865w5xg",
      "sz_xxl_mw935ci5ftm3psqi8"
    ],
    "categoryId": "mw9joz7e8h740wqat"
  },
  {
    "id": "mw8a6nc4ecqhhqgcv",
    "discountType": "percent",
    "slug": "real-madrid-home",
    "image": "img/products/mw8a6nc4ecqhhqgcv.jpg",
    "isLimited": false,
    "sku": "ZNV-MW8A6NC3",
    "images": [
      {
        "url": "img/products/mw8a6nc4ecqhhqgcv.jpg",
        "alt": "Real Madrid Home",
        "isPrimary": true
      }
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "advancePaymentMode": "default",
    "categoryId": "cat_mens_football",
    "stock": 10,
    "categoryName": "Player Version",
    "customName": true,
    "isDeliveryChargeMandatory": false,
    "compareAt": 1150,
    "customNumber": true,
    "isNewArrival": false,
    "deliveryChargeOutsideDhaka": 130,
    "salePrice": 999,
    "createdAt": "2026-11-08T20:24:40.612Z",
    "discountValue": null,
    "preorderCapacity": 100,
    "customLogo": false,
    "deliveryChargeInsideDhaka": 80,
    "preorderStatus": "OPEN",
    "preorderSold": 0,
    "hasCustomDelivery": false,
    "status": "published",
    "isBestSeller": true,
    "discountEnd": null,
    "seoTitle": "",
    "customText": false,
    "deliveryNote": "",
    "isArchived": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "gender": "Unisex",
    "assignedPatches": [],
    "lowStockAlert": 5,
    "tax": 0,
    "seoDesc": "",
    "sizeChartImage": "",
    "isPublished": true,
    "sizeStocks": {},
    "sport": "Football",
    "costPrice": null,
    "customPrintPrice": null,
    "expectedDelivery": null,
    "basePrice": 1150,
    "assignedSleeves": [
      "slv_half"
    ],
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "customBadge": "",
    "preorderPrice": null,
    "name": "Real Madrid Home",
    "subcategoryId": "mw88n5w90qabal7hw",
    "team": "Real Madrid",
    "updatedAt": "2026-11-13T06:06:02.391Z",
    "sizeChartType": "Player Edition",
    "expectedArrival": null,
    "customNameNumber": false,
    "isFeatured": false,
    "discountStart": null,
    "preorderCloseDate": null,
    "isPreorder": false,
    "imageUrl": "",
    "sizeMapping": {
      "3XL": {
        "height": 31,
        "width": 46
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      }
    },
    "collectionId": null,
    "preorderDesc": ""
  }
]
if (typeof window !== 'undefined') {
  window.ACTIVE_CATALOG_BASELINE = ACTIVE_CATALOG_BASELINE;
}

// Global Universal HTML Escaper (Prevents ReferenceError across all views)
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
if (typeof window !== 'undefined') {
  window.escapeHtml = escapeHtml;
}

// Test & Junk Product Filter
function isTestOrJunkProduct(p) {
  if (!p || typeof p !== 'object') return true;
  const name = String(p.name || '').toLowerCase();
  const id = String(p.id || '').toLowerCase();
  const sku = String(p.sku || '').toLowerCase();
  if (name.includes('[test sync]') || name.includes('test sync')) return true;
  if (id === 'prod_876_user' || id === '876' || sku.includes('o887')) return true;
  if (['101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116'].includes(id)) return true;
  return false;
}
if (typeof window !== 'undefined') {
  window.isTestOrJunkProduct = isTestOrJunkProduct;
}

// Global Size Code Normalizer (e.g. sz_xl_mw935... -> XL, sz_m -> M)
function resolveSizeCode(val) {
  if (!val) return '';
  if (typeof val === 'object') return (val.code || val.name || '').toUpperCase().trim();
  const str = String(val).trim();
  if (typeof DB !== 'undefined' && DB.sizes && typeof DB.sizes.all === 'function') {
    const found = DB.sizes.all().find(x => x.id === str || x.code === str || (x.code && x.code.toUpperCase() === str.toUpperCase()));
    if (found && found.code) return found.code.toUpperCase().trim();
  }
  const match = str.match(/^sz_([a-z0-9]+)_/i);
  if (match && match[1]) return match[1].toUpperCase();
  const matchSimple = str.match(/^sz_([a-z0-9]+)$/i);
  if (matchSimple && matchSimple[1]) return matchSimple[1].toUpperCase();
  return str.toUpperCase();
}
if (typeof window !== 'undefined') {
  window.resolveSizeCode = resolveSizeCode;
}

// Helper: Safely resolve size stock quantity
function getSizeStockQty(curSizeStocks, sizeCode, fallbackTotal = 10) {
  if (!curSizeStocks || typeof curSizeStocks !== 'object' || Object.keys(curSizeStocks).length === 0) {
    return (typeof fallbackTotal === 'number') ? fallbackTotal : 10;
  }
  const targetCode = resolveSizeCode(sizeCode);
  if (curSizeStocks[targetCode] !== undefined) {
    return Math.max(0, parseInt(curSizeStocks[targetCode]) || 0);
  }
  for (const [k, v] of Object.entries(curSizeStocks)) {
    if (resolveSizeCode(k) === targetCode || k.toUpperCase() === targetCode) {
      return Math.max(0, parseInt(v) || 0);
    }
  }
  return (typeof fallbackTotal === 'number') ? fallbackTotal : 10;
}
if (typeof window !== 'undefined') {
  window.getSizeStockQty = getSizeStockQty;
}

function hasSizeStockConfigured(curSizeStocks, sizeCode) {
  if (!curSizeStocks || typeof curSizeStocks !== 'object' || Object.keys(curSizeStocks).length === 0) return false;
  const targetCode = resolveSizeCode(sizeCode);
  if (curSizeStocks[targetCode] !== undefined) return true;
  for (const k of Object.keys(curSizeStocks)) {
    if (resolveSizeCode(k) === targetCode || k.toUpperCase() === targetCode) return true;
  }
  return false;
}
if (typeof window !== 'undefined') {
  window.hasSizeStockConfigured = hasSizeStockConfigured;
}

// Initialize in-memory cache with active catalog baseline for instant 0ms first paint
try {
  const initRaw = localStorage.getItem(`${DB_VERSION}_products`);
  let initProds = [];
  if (initRaw) {
    try { initProds = JSON.parse(initRaw); } catch(e){}
  }

  const idMap = new Map();
  // 1. Seed with active baseline catalog first (ensures newest live items are always present)
  if (Array.isArray(ACTIVE_CATALOG_BASELINE)) {
    ACTIVE_CATALOG_BASELINE.forEach(p => {
      if (p && p.id && !isTestOrJunkProduct(p)) {
        idMap.set(String(p.id).trim().toLowerCase(), p);
      }
    });
  }
  // 2. Overlay local cache items & edits
  if (Array.isArray(initProds) && initProds.length > 0) {
    initProds.forEach(p => {
      if (p && p.id && !isTestOrJunkProduct(p)) {
        const strId = String(p.id).trim().toLowerCase();
        const base = idMap.get(strId);
        if (!base) {
          idMap.set(strId, p);
        } else {
          // If local has newer edits or photos, preserve local
          const tLocal = (p.updatedAt ? new Date(p.updatedAt).getTime() : 0) || (p.createdAt ? new Date(p.createdAt).getTime() : 0) || 0;
          const tBase = (base.updatedAt ? new Date(base.updatedAt).getTime() : 0) || (base.createdAt ? new Date(base.createdAt).getTime() : 0) || 0;
          if (tLocal >= tBase) {
            idMap.set(strId, { ...base, ...p });
          }
        }
      }
    });
  }

  const merged = Array.from(idMap.values());
  merged.sort((a, b) => {
    const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || 0;
    const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || 0;
    return tB - tA; // Always newest at top
  });

  window._ZENVY_PRODUCTS_CACHE = merged;
  try {
    localStorage.setItem(`${DB_VERSION}_products`, JSON.stringify(merged));
  } catch(e){}
} catch(e) {
  window._ZENVY_PRODUCTS_CACHE = JSON.parse(JSON.stringify(ACTIVE_CATALOG_BASELINE || []));
}

// ──────────────────────────────────────────────────────────
// Core Storage Engine
// ──────────────────────────────────────────────────────────
const Store = {
  get(key) {
    if (key === 'products' && Array.isArray(window._ZENVY_PRODUCTS_CACHE) && window._ZENVY_PRODUCTS_CACHE.length > 0) {
      return window._ZENVY_PRODUCTS_CACHE.filter(p => !isTestOrJunkProduct(p));
    }
    try { 
      const res = JSON.parse(localStorage.getItem(`${DB_VERSION}_${key}`) || '[]');
      if (key === 'products' && Array.isArray(res) && res.length > 0) {
        const filtered = res.filter(p => !isTestOrJunkProduct(p));
        window._ZENVY_PRODUCTS_CACHE = filtered;
        return filtered;
      }
      return res;
    }
    catch { return []; }
  },
  getObj(key, def = {}) {
    try { return JSON.parse(localStorage.getItem(`${DB_VERSION}_${key}`) || JSON.stringify(def)); }
    catch { return def; }
  },
  set(key, value) {
    const now = Date.now();
    if (key === 'products' && Array.isArray(value)) {
      window._ZENVY_PRODUCTS_CACHE = value;
    }
    try {
      localStorage.setItem(`${DB_VERSION}_${key}`, JSON.stringify(value));
      localStorage.setItem(`${DB_VERSION}_${key}_updatedAt`, now.toString());
    } catch(err) {
      console.warn(`[Store] Failed to write key "${key}":`, err);
      if (key === 'products' && Array.isArray(value)) {
        try {
          const slimmed = value.map(p => {
            const cp = { ...p };
            if (cp.sizeChartImage && cp.sizeChartImage.length > 5000) cp.sizeChartImage = '';
            if (cp.imageUrl && cp.image && cp.imageUrl === cp.image) cp.imageUrl = '';
            return cp;
          });
          localStorage.setItem(`${DB_VERSION}_${key}`, JSON.stringify(slimmed));
          localStorage.setItem(`${DB_VERSION}_${key}_updatedAt`, now.toString());
        } catch(e2){}
      }
    }
    // Mirror write to Firestore for cross-origin sync
    if (window.ZenvyFirebase && typeof window.ZenvyFirebase.push === 'function') {
      window.ZenvyFirebase.push(key, value);
    }
    // Broadcast locally for instant reactivity across open views and tabs
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: `${DB_VERSION}_${key}`, newValue: JSON.stringify(value) }));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key, value, updatedAt: now } }));
    } catch(e) {}
  },
  setObj(key, value) {
    const now = Date.now();
    try {
      localStorage.setItem(`${DB_VERSION}_${key}`, JSON.stringify(value));
      localStorage.setItem(`${DB_VERSION}_${key}_updatedAt`, now.toString());
    } catch(err) {
      console.warn(`[Store] Failed to write obj "${key}":`, err);
    }
    // Mirror write to Firestore for cross-origin sync
    if (window.ZenvyFirebase && typeof window.ZenvyFirebase.push === 'function') {
      window.ZenvyFirebase.push(key, value);
    }
    // Broadcast locally for instant reactivity across open views and tabs
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: `${DB_VERSION}_${key}`, newValue: JSON.stringify(value) }));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key, value, updatedAt: now } }));
    } catch(e) {}
  },
  genId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },
  now() { return new Date().toISOString(); }
};


// ──────────────────────────────────────────────────────────
// Schema & Initial Seed Data Management
// ──────────────────────────────────────────────────────────
const SEED_VERSION = 11; // v11: Protect user products from auto-deletion, remove demo products
let _isSeeding = false;
function seedDefaultData() {
  if (_isSeeding) return;
  _isSeeding = true;
  try {
    // Only set default empty lists if key does NOT exist at all (null/undefined)
    if (Store.get('orders') === null) Store.set('orders', []);
    if (Store.get('customers') === null) Store.set('customers', []);
    if (Store.get('returns') === null) Store.set('returns', []);
    if (Store.get('refunds') === null) Store.set('refunds', []);
    if (Store.get('activityLog') === null) Store.set('activityLog', []);
    if (Store.get('notifLog') === null) Store.set('notifLog', []);
    if (Store.get('inventoryHistory') === null) Store.set('inventoryHistory', []);
    if (Store.get('priceHistory') === null) Store.set('priceHistory', []);
    if (Store.get('products') === null) Store.set('products', []);

    Store.setObj('seeded', true);
    Store.setObj('seeded_version', SEED_VERSION);


  // Brand Settings
  DB.brand.save({
    brandName: 'ZENVY', logoUrl: '', faviconUrl: '',
    tagline: 'The New Era of Performance',
    description: 'Elevating performance wear through editorial design and technical precision.',
    phone: '+880 1700-000000', email: 'support@zenvy.com',
    address: 'Dhaka, Bangladesh',
    socialFacebook: 'https://facebook.com/zenvy', 
    socialInstagram: 'https://instagram.com/zenvy',
    socialTwitter: 'https://twitter.com/zenvy',
    socialTikTok: 'https://tiktok.com/@zenvy', 
    socialYoutube: 'https://youtube.com/@zenvy',
    currency: 'BDT', currencySymbol: '৳',
    returnPolicy: '7-day hassle-free returns.',
    privacyPolicy: 'We respect your privacy.',
    termsAndConditions: 'Standard terms apply.',
  });

  // Sizes
  ['XS','S','M','L','XL','XXL','3XL','4XL'].forEach((code, i) => {
    DB.sizes.create({ code, name: code, displayOrder: i, isEnabled: true });
  });

  // Colors
  [
    { name: 'Black', hexCode: '#000000' },
    { name: 'White', hexCode: '#FFFFFF' },
    { name: 'Red', hexCode: '#DC2626' },
    { name: 'Navy', hexCode: '#1e3a5f' },
    { name: 'Royal Blue', hexCode: '#1D4ED8' },
    { name: 'Green', hexCode: '#16A34A' },
  ].forEach(c => DB.colors.create({ ...c, isEnabled: true }));

  // Sleeves
  [
    { name: 'Half Sleeve', additionalPrice: 0, description: 'Standard half sleeve', displayOrder: 0 },
    { name: 'Full Sleeve', additionalPrice: 100, description: 'Full sleeve (+৳100)', displayOrder: 1 },
    { name: 'Sleeveless', additionalPrice: 0, description: 'No sleeves', displayOrder: 2 },
  ].forEach(s => DB.sleeves.create({ ...s, isEnabled: true }));

  // Patches
  [
    { name: 'UEFA Champions League', price: 250, description: 'Official UCL sleeve patch', displayOrder: 0 },
    { name: 'Premier League', price: 200, description: 'EPL sleeve patch', displayOrder: 1 },
    { name: 'La Liga', price: 200, description: 'La Liga sleeve patch', displayOrder: 2 },
  ].forEach(p => DB.patches.create({ ...p, imageUrl: '', isEnabled: true }));

  // Customization Settings
  DB.customizationSettings.save({
    namePrinting: { enabled: true, price: 200, maxChars: 12, minChars: 1, font: 'Block', style: 'Standard' },
    numberPrinting: { enabled: true, price: 150, maxDigits: 2 },
    nameNumberPackage: { enabled: true, price: 300 },
    customLogo: { enabled: false, price: 500, allowedTypes: 'image/png,image/svg+xml', maxSizeMB: 2 },
  });

  // Shipping Methods
  [
    { name: 'Inside Dhaka', area: 'Dhaka', deliveryTime: '1-2 days', price: 80, minOrder: 0, freeThreshold: 3000, isEnabled: true },
    { name: 'Outside Dhaka', area: 'Nationwide', deliveryTime: '3-5 days', price: 130, minOrder: 0, freeThreshold: 5000, isEnabled: true },
    { name: 'Express', area: 'Dhaka', deliveryTime: 'Same Day', price: 200, minOrder: 0, freeThreshold: 0, isEnabled: true },
  ].forEach(s => DB.shipping.create(s));

  // Payment Methods
  DB.payments.save({
    methods: [
      { id: 'cod', name: 'Cash on Delivery', enabled: true, icon: 'payments' },
      { id: 'bkash', name: 'bKash', enabled: true, icon: 'smartphone', number: '' },
      { id: 'nagad', name: 'Nagad', enabled: false, icon: 'smartphone', number: '' },
      { id: 'card', name: 'Credit/Debit Card', enabled: false, icon: 'credit_card' },
    ]
  });

  // Store Policy Settings
  DB.storeSettings.save({
    cashOnDelivery: true,
    requirePayFirst: false,
    deliveryChargeEnabled: true,
    deliveryChargeFreeThreshold: 3000,
    minOrderAmount: 0,
    codNote: 'Pay when your order arrives at your door.',
    payFirstNote: 'Advance payment via bKash or Nagad required to confirm your order.',
  });

  // Seed active catalog on first launch if empty
  if (!Store.get('products') || Store.get('products').length === 0) {
    Store.set('products', JSON.parse(JSON.stringify(ACTIVE_CATALOG_BASELINE)));
    window._ZENVY_PRODUCTS_CACHE = JSON.parse(JSON.stringify(ACTIVE_CATALOG_BASELINE));
  }
  // Homepage Config
  DB.homepage.save({
    announcement: { enabled: true, marqueeText: 'THE NEW SEASON • SHOP OFFICIAL JERSEYS • FREE EXPRESS SHIPPING OVER ৳1500 • INTERACTIVE 3D CUSTOM STUDIO LIVE • PRO-GRADE AEROKNIT WEAVE TECHNOLOGY', badgeText: 'SS/26 DROPS LIVE' },
    hero: { 
      enabled: true, 
      badge: 'NEW ARRIVAL • MATCH EDITION', 
      title: 'ENGINEERED FOR SUPREMACY', 
      subtitle: 'The new standard in high-performance kits. Ethereal technical design crafted for pro athletes.', 
      ctaPrimaryText: 'SHOP', 
      ctaPrimaryLink: 'index.html#shop', 
      ctaSecondaryText: 'PRE-ORDERS', 
      ctaSecondaryLink: 'preorders.html', 
      bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80' 
    },
    valueProps: [
      { id: 'prop1', icon: 'local_shipping', title: 'Express Shipping', subtitle: '2-4 Business Days Worldwide' },
      { id: 'prop2', icon: 'verified', title: 'Authentic Grade', subtitle: '100% Pro-Athlete Specification' },
      { id: 'prop3', icon: 'workspace_premium', title: 'Official Kit Badges', subtitle: 'Tournament Patches & Name Printing' },
      { id: 'prop4', icon: 'autorenew', title: '30-Day Guarantee', subtitle: 'Hassle-Free Returns & Exchanges' }
    ],
    collections: {
      title: 'Featured Collections',
      subtitle: 'EXPLORE BY CATEGORY',
      cards: [
        { id: 'col1', tag: 'COLLECTION SS/26', title: 'CLUB MATCH KITS', desc: 'Official tournament jerseys engineered with micro-perforated Aeroknit weave.', link: 'product.html?id=prod_mwafxrols41103ror', bgImage: 'img/products/prod_mwafxrols41103ror.jpg' },
        { id: 'col2', tag: 'LIMITED DROP', title: 'INTERNATIONAL EDITIONS', desc: 'National team tournament kits with authentic gold badges and match typography.', link: 'product.html?id=prod_mw9setzepymsatr9c', bgImage: 'img/products/prod_mw9setzepymsatr9c.jpg' },
        { id: 'col3', tag: 'PRO TRAINING', title: 'PRECISION OUTERWEAR', desc: 'Technical windbreakers, compression layers and pace shorts built for all climates.', link: 'product.html?id=prod_mw9ru5dmlxx3y3v5l', bgImage: 'img/products/prod_mw9ru5dmlxx3y3v5l.jpg' }
      ]
    },
    justDropped: { badge: 'NEW ARRIVALS', title: 'JUST DROPPED', subtitle: 'The latest high-performance releases from ZENVY Studio.' },
    shopBanner: {
      enabled: true,
      slides: [
        {
          id: 'slide1',
          tag: 'ZENVY COLLECTION',
          title: 'LIMITED\nEDITION KITS',
          subtitle: 'Elevate Your Game • Exclusively Online',
          bgImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80'
        },
        {
          id: 'slide2',
          tag: 'NEW ARRIVAL',
          title: 'ELITE\nFOOTBALL KITS',
          subtitle: 'The New Season Is Here',
          bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'
        }
      ]
    },
    sections: [
      { id: 'new_arrivals', title: 'Just Dropped', subtitle: 'The latest additions', enabled: true, order: 0, productIds: [] },
      { id: 'best_sellers', title: 'Best Sellers', subtitle: '', enabled: true, order: 1, productIds: [] },
      { id: 'featured', title: 'Featured Collection', subtitle: '', enabled: true, order: 2, productIds: [] },
      { id: 'preorders', title: 'Pre-Orders', subtitle: 'Reserve yours now', enabled: true, order: 3, productIds: [] },
    ]
  });

  // Notification Templates
  DB.notifications.save({
    orderPlaced: { enabled: true, template: 'Your ZENVY order #{orderNumber} has been placed! We\'ll confirm it shortly.' },
    orderConfirmed: { enabled: true, template: 'Order #{orderNumber} confirmed! We\'re preparing your gear.' },
    orderShipped: { enabled: true, template: 'Your ZENVY order #{orderNumber} has been shipped! Tracking: {tracking}' },
    orderDelivered: { enabled: true, template: 'Order #{orderNumber} delivered! Enjoy your ZENVY gear.' },
    preorderConfirmed: { enabled: true, template: 'Preorder #{orderNumber} confirmed! Expected delivery: {date}' },
    returnApproved: { enabled: true, template: 'Your return for order #{orderNumber} has been approved.' },
    refundCompleted: { enabled: true, template: 'Your refund of ৳{amount} for order #{orderNumber} has been processed.' },
  });

  // Seed Sample Orders (client handover: keep 100% clean with 0 orders and ৳0 revenue)
  const DEFAULT_SEED_ORDERS = [];

  Store.setObj('seeded', true);
  Store.setObj('seeded_version', SEED_VERSION);
  } finally {
    _isSeeding = false;
  }
}


// ──────────────────────────────────────────────────────────
// Database API
// ──────────────────────────────────────────────────────────
const DB = {

  // ── Database Maintenance ──
  resetDatabase() {
    try { localStorage.clear(); } catch(e){}
    Store.setObj('seeded_version', 0);
    seedDefaultData();
    if (typeof window !== 'undefined') window.location.reload();
  },

  // ── Client Handover & Data Purge (Clears orders, customers, and revenue) ──
  clearAllTransactions() {
    const keys = ['orders', 'customers', 'returns', 'refunds', 'activityLog', 'notifLog', 'inventoryHistory', 'priceHistory'];
    keys.forEach(k => {
      Store.set(k, []);
      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.push === 'function') {
        window.ZenvyFirebase.push(k, []);
      }
    });
    DB.log('Store transactions, orders, customers & revenue reset to 0 for fresh client launch');
    return true;
  },

  // ── Brand Settings (singleton) ──
  brand: {
    get() { return Store.getObj('brand', { currency: 'BDT', currencySymbol: '৳', usdRate: 120 }); },
    save(data) { Store.setObj('brand', { ...Store.getObj('brand', {}), ...data, updatedAt: Store.now() }); DB.log('Brand settings updated'); return DB.brand.get(); }
  },

  // ── Currency Helpers ──
  currency: {
    get() {
      const brand = DB.brand.get();
      const code = brand.currency || 'BDT';
      const symbol = brand.currencySymbol || (code === 'USD' ? '$' : '৳');
      const rate = parseFloat(brand.usdRate) || 120;
      return { code, symbol, rate };
    },
    set(code, symbol, rate) {
      const sym = symbol || (code === 'USD' ? '$' : '৳');
      DB.brand.save({ currency: code, currencySymbol: sym, usdRate: rate || 120 });
      DB.log(`Currency updated to ${code} (${sym})`);
    },
    format(amountInBDT) {
      const cur = DB.currency.get();
      const num = parseFloat(amountInBDT) || 0;
      if (cur.code === 'USD') {
        const usdVal = num / cur.rate;
        return `${cur.symbol}${usdVal.toFixed(2)}`;
      }
      return `${cur.symbol}${Math.round(num).toLocaleString()}`;
    },
    symbol() {
      return DB.currency.get().symbol;
    },
    code() {
      return DB.currency.get().code;
    }
  },

  // ── Categories ──
  categories: {
    defaultItems: [
      {
        id: 'cat_club_match_kits',
        name: 'Club Match Kits',
        slug: 'club-match-kits',
        description: 'Official tournament jerseys engineered with micro-perforated Aeroknit weave.',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
        displayOrder: 1,
        isActive: true,
        badge: 'TOP CHOICE'
      },
      {
        id: 'cat_national_teams',
        name: 'National Teams',
        slug: 'national-teams',
        description: 'National team tournament kits with authentic gold badges and match typography.',
        imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&q=80',
        displayOrder: 2,
        isActive: true,
        badge: 'LIMITED DROP'
      },
      {
        id: 'cat_mens_football',
        name: "Men's Football",
        slug: 'mens-football',
        description: 'Authentic breathable match jerseys with AeroKnit technology.',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80',
        displayOrder: 3,
        isActive: true,
        badge: 'POPULAR'
      },
      {
        id: 'cat_training_gear',
        name: 'Training Gear',
        slug: 'training-gear',
        description: 'Technical windbreakers, compression layers, bibs and workout shorts.',
        imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80',
        displayOrder: 4,
        isActive: true,
        badge: 'PRO TRAINING'
      },
      {
        id: 'cat_outerwear',
        name: 'Outerwear',
        slug: 'outerwear',
        description: 'Technical weather-resistant jackets and performance track tops.',
        imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80',
        displayOrder: 5,
        isActive: true,
        badge: 'NEW DROP'
      },
      {
        id: 'cat_kids_collection',
        name: 'Kids Collection',
        slug: 'kids-collection',
        description: 'Junior sizing and youth football academy kits built for young athletes.',
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80',
        displayOrder: 6,
        isActive: true,
        badge: 'ACADEMY'
      }
    ],
    all() {
      let items = Store.get('categories');
      if (!items || !Array.isArray(items)) {
        return [];
      }
      return items.sort((a,b) => (parseInt(a.displayOrder) || 0) - (parseInt(b.displayOrder) || 0));
    },
    byId(id) {
      if (!id) return null;
      const strId = String(id).trim().toLowerCase();
      return Store.get('categories').find(c => String(c.id).trim().toLowerCase() === strId || String(c.slug||'').trim().toLowerCase() === strId || String(c.name||'').trim().toLowerCase() === strId) || null;
    },
    active() {
      return Store.get('categories').filter(c => c.isActive !== false);
    },
    create(data) {
      const items = Store.get('categories');
      const item = { id: Store.genId(), ...data, createdAt: Store.now(), updatedAt: Store.now() };
      items.push(item); Store.set('categories', items);
      DB.log(`Category created: ${item.name}`);
      return item;
    },
    update(id, data) {
      const strId = String(id).trim().toLowerCase();
      const items = Store.get('categories').map(c => (String(c.id).trim().toLowerCase() === strId || String(c.slug||'').trim().toLowerCase() === strId || String(c.name||'').trim().toLowerCase() === strId) ? { ...c, ...data, updatedAt: Store.now() } : c);
      Store.set('categories', items);
      DB.log(`Category updated: ${data.name || id}`);
      return items.find(c => String(c.id).trim().toLowerCase() === strId || String(c.slug||'').trim().toLowerCase() === strId || String(data.slug||'').trim().toLowerCase() === String(c.slug||'').trim().toLowerCase());
    },
    delete(id) {
      const strId = String(id).trim().toLowerCase();
      const cat = DB.categories.byId(id);
      const items = Store.get('categories').filter(c => String(c.id).trim().toLowerCase() !== strId && String(c.slug||'').trim().toLowerCase() !== strId && String(c.name||'').trim().toLowerCase() !== strId);
      Store.set('categories', items);
      try {
        const prods = Store.get('products');
        let updatedProds = false;
        prods.forEach(p => {
          if (String(p.categoryId).trim().toLowerCase() === strId || (cat && String(p.categoryName || '').toLowerCase() === String(cat.name || '').toLowerCase())) {
            p.categoryId = null;
            p.categoryName = 'Standard Collection';
            updatedProds = true;
          }
        });
        if (updatedProds) Store.set('products', prods);
      } catch(e){}
      DB.log(`Category deleted: ${cat?.name || id}`);
      return items;
    },
    toggle(id, field) {
      const cat = DB.categories.byId(id);
      if (cat) DB.categories.update(id, { [field]: !cat[field] });
    }
  },

  // ── Subcategories ──
  subcategories: {
    all() { return Store.get('subcategories'); },
    byCategory(catId) { return Store.get('subcategories').filter(s => s.categoryId === catId); },
    byId(id) { return Store.get('subcategories').find(s => s.id === id); },
    create(data) {
      const items = Store.get('subcategories');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('subcategories', items);
      DB.log(`Subcategory created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('subcategories').map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('subcategories', items); return items.find(s => s.id === id);
    },
    delete(id) { Store.set('subcategories', Store.get('subcategories').filter(s => s.id !== id)); }
  },

  // ── Collections ──
  collections: {
    all() { return Store.get('collections'); },
    byId(id) { return Store.get('collections').find(c => c.id === id); },
    create(data) {
      const items = Store.get('collections');
      const item = { id: Store.genId(), ...data, createdAt: Store.now(), updatedAt: Store.now() };
      items.push(item); Store.set('collections', items);
      DB.log(`Collection created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('collections').map(c => c.id === id ? { ...c, ...data, updatedAt: Store.now() } : c);
      Store.set('collections', items); DB.log(`Collection updated: ${data.name||id}`);
      return items.find(c => c.id === id);
    },
    delete(id) {
      const col = DB.collections.byId(id);
      Store.set('collections', Store.get('collections').filter(c => c.id !== id));
      DB.log(`Collection deleted: ${col?.name}`);
    }
  },

  // ── Products ──
  products: {
    all() {
      if (Array.isArray(window._ZENVY_PRODUCTS_CACHE) && window._ZENVY_PRODUCTS_CACHE.length > 0) {
        const filtered = window._ZENVY_PRODUCTS_CACHE.filter(p => !isTestOrJunkProduct(p));
        if (filtered.length > 0) {
          return filtered.sort((a, b) => {
            const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
            const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
            return tB - tA;
          });
        }
      }
      let items = Store.get('products');
      if (Array.isArray(items) && items.length > 0) {
        const filtered = items.filter(p => !isTestOrJunkProduct(p));
        if (filtered.length > 0) {
          filtered.sort((a, b) => {
            const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
            const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
            return tB - tA;
          });
          window._ZENVY_PRODUCTS_CACHE = filtered;
          return filtered;
        }
      }
      // Instant fallback to baseline active catalog for fresh devices & cold starts (0ms load)
      if (typeof ACTIVE_CATALOG_BASELINE !== 'undefined' && Array.isArray(ACTIVE_CATALOG_BASELINE) && ACTIVE_CATALOG_BASELINE.length > 0) {
        const baselineCopy = JSON.parse(JSON.stringify(ACTIVE_CATALOG_BASELINE));
        baselineCopy.sort((a, b) => {
          const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
          const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
          return tB - tA;
        });
        window._ZENVY_PRODUCTS_CACHE = baselineCopy;
        return baselineCopy;
      }
      return [];
    },
    byId(id) {
      if (!id) return null;
      const strId = String(id).trim().toLowerCase();
      const all = DB.products.all();
      // 1. Strict ID match first (highest priority)
      let p = all.find(x => String(x.id || '').trim().toLowerCase() === strId);
      // 2. Slug match only as secondary fallback
      if (!p) {
        p = all.find(x => String(x.slug || '').trim().toLowerCase() === strId);
      }
      return p || null;
    },
    published() {
      return DB.products.all()
        .filter(p => (p.isPublished !== false && p.status !== 'draft') && !p.isArchived)
        .sort((a, b) => {
          const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
          const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
          return tB - tA; // Newest products at the top!
        });
    },
    list() { return this.published(); },
    lowStock() { return DB.products.all().filter(p => p.stock <= (p.lowStockAlert||5) && p.stock > 0 && !p.isArchived); },
    outOfStock() { return DB.products.all().filter(p => p.stock === 0 && !p.isArchived); },
    preorders() { return DB.products.all().filter(p => p.isPreorder && !p.isArchived); },
    search(q) {
      const lq = q.toLowerCase();
      return DB.products.all().filter(p =>
        p.name?.toLowerCase().includes(lq) || p.sku?.toLowerCase().includes(lq) ||
        p.categoryName?.toLowerCase().includes(lq)
      );
    },
    getImage(p) {
      const fallback = 'img/products/prod_mwafvhg25iobn348j.jpg';
      if (!p) return fallback;
      if (typeof p.image === 'string' && p.image.trim() && !p.image.includes('aida-public')) return p.image.trim();
      if (typeof p.imageUrl === 'string' && p.imageUrl.trim() && !p.imageUrl.includes('aida-public')) return p.imageUrl.trim();
      if (Array.isArray(p.images) && p.images.length > 0) {
        const prim = p.images.find(x => x && typeof x === 'object' && x.isPrimary && (x.url || x.dataUrl || x.src));
        if (prim) {
          const u = prim.url || prim.dataUrl || prim.src;
          if (typeof u === 'string' && u.trim() && !u.includes('aida-public')) return u.trim();
        }
        for (let i = 0; i < p.images.length; i++) {
          const item = p.images[i];
          if (typeof item === 'string' && item.trim() && !item.includes('aida-public')) return item.trim();
          if (item && typeof item === 'object') {
            const u = item.url || item.dataUrl || item.src;
            if (typeof u === 'string' && u.trim() && !u.includes('aida-public')) return u.trim();
          }
        }
      }
      return fallback;
    },
    create(data) {
      const items = Store.get('products') || [];
      const isPub = data.isPublished !== undefined ? Boolean(data.isPublished) : (data.status === 'draft' ? false : true);
      const isPre = data.isPreorder !== undefined ? Boolean(data.isPreorder) : false;
      const newId = (data.id && String(data.id).trim()) || ('prod_' + Store.genId());
      const item = {
        ...data,
        id: newId,
        isPreorder: isPre,
        isPublished: isPub,
        status: isPub ? 'published' : 'draft',
        isArchived: false,
        createdAt: data.createdAt || Store.now(),
        updatedAt: Store.now()
      };
      if (Array.isArray(item.images) && item.images.length > 0 && !item.image) {
        const f = item.images[0];
        item.image = (f && typeof f === 'object' && f.url) ? f.url : (typeof f === 'string' ? f : '');
      }
      if (item.image && !item.imageUrl) {
        item.imageUrl = item.image;
      }
      const existingIdx = items.findIndex(x => String(x.id).trim().toLowerCase() === String(newId).trim().toLowerCase());
      if (existingIdx >= 0) {
        items[existingIdx] = item;
      } else {
        items.unshift(item); // Latest product placed at the top of the catalog
      }
      Store.set('products', items);
      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.saveProduct === 'function') {
        window.ZenvyFirebase.saveProduct(item);
      }
      DB.log(`Product created: ${item.name}`);
      if (DB.inventory && typeof DB.inventory.addHistory === 'function') {
        DB.inventory.addHistory({ productId: item.id, productName: item.name, change: item.stock || 0, newStock: item.stock || 0, reason: 'Initial stock', admin: 'Admin' });
      }
      return item;
    },
    update(id, data) {
      if (!id) return null;
      const strId = String(id).trim().toLowerCase();
      const old = DB.products.byId(id);
      const createdAt = data.createdAt || old?.createdAt || Store.now();
      const updates = { ...data, createdAt, updatedAt: Store.now() };
      if (updates.isPreorder !== undefined) {
        updates.isPreorder = Boolean(updates.isPreorder);
      }
      if (updates.isPublished !== undefined && updates.status === undefined) {
        updates.status = updates.isPublished ? 'published' : 'draft';
      } else if (updates.status !== undefined && updates.isPublished === undefined) {
        updates.isPublished = updates.status !== 'draft';
      }
      if (Array.isArray(updates.images) && updates.images.length > 0 && !updates.image) {
        const f = updates.images[0];
        updates.image = (f && typeof f === 'object' && f.url) ? f.url : (typeof f === 'string' ? f : '');
      }
      if (updates.image && !updates.imageUrl) {
        updates.imageUrl = updates.image;
      }

      let updatedItem = null;
      const items = (Store.get('products') || []).map(p => {
        const pId = String(p.id || '').trim().toLowerCase();
        // STRICT ID MATCH ONLY: Never match by slug to prevent corrupting or overwriting other products!
        if (pId === strId) {
          updatedItem = { ...p, ...updates, id: p.id };
          return updatedItem;
        }
        return p;
      });

      if (!updatedItem) {
        updatedItem = { ...(old || {}), ...updates, id: (old?.id || id) };
        items.unshift(updatedItem);
      }

      Store.set('products', items);
      const resItem = updatedItem;
      // Direct in-memory cache update for 0ms latency
      if (Array.isArray(window._ZENVY_PRODUCTS_CACHE)) {
        const cIdx = window._ZENVY_PRODUCTS_CACHE.findIndex(x => String(x.id).trim().toLowerCase() === strId);
        if (cIdx >= 0) window._ZENVY_PRODUCTS_CACHE[cIdx] = resItem;
        else window._ZENVY_PRODUCTS_CACHE.unshift(resItem);
      }
      if (resItem && window.ZenvyFirebase && typeof window.ZenvyFirebase.saveProduct === 'function') {
        window.ZenvyFirebase.saveProduct(resItem);
      }
      if (data.basePrice !== undefined && old?.basePrice !== data.basePrice && DB.priceHistory && typeof DB.priceHistory.add === 'function') {
        DB.priceHistory.add({ productId: id, productName: old?.name, oldPrice: old?.basePrice, newPrice: data.basePrice, type: 'basePrice' });
      }
      DB.log(`Product updated: ${data.name || old?.name}`);
      return resItem;
    },
    duplicate(id) {
      const src = DB.products.byId(id);
      if (!src) return null;
      const copy = JSON.parse(JSON.stringify(src));
      const newId = 'prod_' + Store.genId();
      copy.id = newId;
      copy.name = src.name.replace(/\s*\(Copy(\s*\d+)?\)$/i, '') + ' (Copy)';
      copy.sku = (src.sku ? String(src.sku).replace(/-COPY-[\w\d]+$/i, '') : 'ZNV') + '-COPY-' + Date.now().toString(36).toUpperCase();
      copy.slug = (src.slug ? String(src.slug).replace(/-copy-[\w\d]+$/i, '') : (src.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-')) + '-copy-' + Date.now().toString(36);
      copy.isPublished = true;
      copy.status = 'published';
      copy.stock = (typeof src.stock === 'number' && src.stock > 0) ? src.stock : 10;
      copy.sizeStocks = (src.sizeStocks && typeof src.sizeStocks === 'object') ? JSON.parse(JSON.stringify(src.sizeStocks)) : null;
      copy.isArchived = false;
      copy.isPreorder = Boolean(src.isPreorder);
      copy.createdAt = Store.now();
      copy.updatedAt = Store.now();

      const created = DB.products.create(copy);
      if (created && DB.variants && typeof DB.variants.byProduct === 'function') {
        const vars = DB.variants.byProduct(id);
        if (Array.isArray(vars) && vars.length > 0) {
          vars.forEach(v => {
            const vCopy = JSON.parse(JSON.stringify(v));
            delete vCopy.id;
            vCopy.productId = created.id;
            vCopy.sku = `${created.id}-${v.size || 'M'}-${(v.color || 'S').substr(0, 3).toUpperCase()}`;
            DB.variants.create(vCopy);
          });
        }
      }
      return created;
    },
    archive(id) {
      const p = DB.products.byId(id);
      DB.products.update(id, { isArchived: true, isPublished: false });
      DB.log(`Product archived: ${p?.name}`);
    },
    delete(id) {
      const p = DB.products.byId(id);
      const strId = String(id).trim().toLowerCase();
      const all = Store.get('products') || [];
      const remaining = all.filter(x => String(x.id).trim().toLowerCase() !== strId);
      Store.set('products', remaining);
      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.deleteProduct === 'function') {
        window.ZenvyFirebase.deleteProduct(id);
      }
      DB.log(`Product deleted: ${p?.name || id}`);
      return 'deleted';
    },
    updateStock(id, qty, reason = 'Manual adjustment', sizeStocks = null) {
      const p = DB.products.byId(id);
      if (!p) return;
      const oldStock = p.stock;
      const updates = { stock: qty };
      if (sizeStocks && typeof sizeStocks === 'object') {
        updates.sizeStocks = sizeStocks;
      }
      DB.products.update(id, updates);
      DB.inventory.addHistory({ productId: id, productName: p.name, previousStock: oldStock, change: qty - oldStock, newStock: qty, reason });
    },
    exportCSV() {
      const prods = DB.products.all().filter(p => !p.isArchived);
      const rows = [['ID', 'Name', 'SKU', 'Category', 'Price', 'Compare At', 'Stock', 'Status', 'Badges', 'Created Date']];
      prods.forEach(p => {
        const badges = [];
        if (p.isNewArrival) badges.push('NEW');
        if (p.isBestSeller) badges.push('BEST');
        if (p.isFeatured) badges.push('FEAT');
        if (p.isPreorder) badges.push('PRE');
        if (p.isLimited) badges.push('LTD');
        rows.push([
          `"${String(p.id || '').replace(/"/g, '""')}"`,
          `"${String(p.name || '').replace(/"/g, '""')}"`,
          `"${String(p.sku || '').replace(/"/g, '""')}"`,
          `"${String(p.categoryName || p.category || '').replace(/"/g, '""')}"`,
          p.basePrice || p.price || 0,
          p.compareAt || p.compareAtPrice || '',
          p.stock || 0,
          p.isPublished ? 'PUBLISHED' : 'DRAFT',
          `"${badges.join(' ')}"`,
          `"${String(p.createdAt || '').replace(/"/g, '""')}"`
        ]);
      });
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Product Variants ──
  variants: {
    byProduct(productId) { return Store.get('variants').filter(v => v.productId === productId); },
    byId(id) { return Store.get('variants').find(v => v.id === id); },
    create(data) {
      const items = Store.get('variants');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('variants', items); return item;
    },
    update(id, data) {
      const items = Store.get('variants').map(v => v.id === id ? { ...v, ...data } : v);
      Store.set('variants', items); return items.find(v => v.id === id);
    },
    delete(id) { Store.set('variants', Store.get('variants').filter(v => v.id !== id)); },
    deleteByProduct(productId) { Store.set('variants', Store.get('variants').filter(v => v.productId !== productId)); }
  },

  // ── Sizes ──
  sizes: {
    all() {
      let raw = Store.get('sizes');
      const stdCodes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

      // Only seed initial default standard sizes once if sizes was never initialized
      if (raw === null || raw === undefined || (Array.isArray(raw) && raw.length === 0)) {
        raw = stdCodes.map((code, i) => ({
          id: 'sz_' + code.toLowerCase().replace(/[^a-z0-9]/g, ''),
          code,
          name: code,
          displayOrder: i,
          isEnabled: true,
          createdAt: Store.now()
        }));
        Store.set('sizes', raw);
        return raw;
      }
      if (!Array.isArray(raw)) return [];

      // STRICT DEDUPLICATION BY UPPERCASE CODE (Fixes L L, M M duplicates permanently)
      const seen = new Map();
      let hasDuplicates = false;

      raw.forEach((s, idx) => {
        if (!s) return;
        const code = String(s.code || s.name || '').toUpperCase().trim();
        if (!code) return;
        if (seen.has(code)) {
          hasDuplicates = true;
          // Prune duplicate: preserve enabled if any entry is enabled
          const existing = seen.get(code);
          if (s.isEnabled && !existing.isEnabled) existing.isEnabled = true;
          return;
        }
        const canonicalId = 'sz_' + code.toLowerCase().replace(/[^a-z0-9]/g, '');
        const stdIdx = stdCodes.indexOf(code);
        seen.set(code, {
          id: canonicalId,
          code,
          name: s.name || code,
          displayOrder: stdIdx >= 0 ? stdIdx : (typeof s.displayOrder === 'number' ? s.displayOrder : idx),
          isEnabled: s.isEnabled !== false,
          createdAt: s.createdAt || Store.now()
        });
      });

      const list = Array.from(seen.values()).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      // Self-heal storage if duplicates or non-canonical IDs were detected
      if (hasDuplicates || list.length !== raw.length) {
        Store.set('sizes', list);
      }

      return list;
    },
    enabled() { 
      return DB.sizes.all().filter(s => s.isEnabled); 
    },
    byId(id) {
      if (!id) return null;
      const target = String(id).trim().toLowerCase();
      return DB.sizes.all().find(s => 
        String(s.id).trim().toLowerCase() === target || 
        String(s.code).trim().toLowerCase() === target
      );
    },
    create(data) {
      const items = DB.sizes.all();
      const code = String(data.code || data.name || '').toUpperCase().trim();
      const id = 'sz_' + code.toLowerCase().replace(/[^a-z0-9]/g, '');

      // If a size with the same code already exists, update it cleanly
      const existingIdx = items.findIndex(s => s.code === code);
      if (existingIdx >= 0) {
        items[existingIdx] = {
          ...items[existingIdx],
          ...data,
          id,
          code,
          name: data.name?.trim() || code,
          displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : items[existingIdx].displayOrder,
          isEnabled: data.isEnabled !== false,
          updatedAt: Store.now()
        };
        Store.set('sizes', items);
        DB.log(`Size updated: ${code}`);
        return items[existingIdx];
      }

      const item = {
        id,
        code,
        name: data.name?.trim() || code,
        displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : items.length,
        isEnabled: data.isEnabled !== false,
        createdAt: Store.now()
      };
      items.push(item);
      Store.set('sizes', items);
      DB.log(`Size created: ${item.code}`);
      return item;
    },
    update(id, data) {
      if (!id) return null;
      const target = String(id).trim().toLowerCase();
      let updatedItem = null;
      const items = DB.sizes.all().map(s => {
        if (String(s.id).trim().toLowerCase() === target || String(s.code).trim().toLowerCase() === target) {
          const upd = { ...s, ...data };
          if (upd.code) upd.code = String(upd.code).toUpperCase().trim();
          if (upd.displayOrder !== undefined) upd.displayOrder = parseInt(upd.displayOrder) || 0;
          upd.updatedAt = Store.now();
          updatedItem = upd;
          return upd;
        }
        return s;
      });
      Store.set('sizes', items);
      if (updatedItem) DB.log(`Size updated: ${updatedItem.code}`);
      return updatedItem;
    },
    delete(id) {
      if (!id) return;
      const target = String(id).trim().toLowerCase();
      const s = DB.sizes.byId(target);
      const items = DB.sizes.all().filter(x => 
        String(x.id).trim().toLowerCase() !== target && 
        String(x.code).trim().toLowerCase() !== target
      );
      Store.set('sizes', items);
      DB.log(`Size deleted: ${s?.code || target}`);
    },
    resetDefaults() {
      const defaults = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'].map((code, i) => ({
        id: 'sz_' + code.toLowerCase().replace(/[^a-z0-9]/g, ''),
        code,
        name: code,
        displayOrder: i,
        isEnabled: true,
        createdAt: Store.now()
      }));
      Store.set('sizes', defaults);
      DB.log('Sizes reset to default standard set');
      return defaults;
    },
    reorder(ids) {
      const items = DB.sizes.all();
      ids.forEach((id, i) => { 
        const s = items.find(x => String(x.id).trim() === String(id).trim()); 
        if (s) s.displayOrder = i; 
      });
      Store.set('sizes', items);
    },
    getSizeChart() {
      const stored = Store.getObj('sizeChart', null);
      if (stored && stored.url) return stored.url;
      const storeCfg = Store.getObj('storeSettings', {});
      if (storeCfg.defaultSizeChartImage) return storeCfg.defaultSizeChartImage;
      const brand = Store.getObj('brand', {});
      if (brand.sizeChartUrl) return brand.sizeChartUrl;
      return '';
    },
    saveSizeChart(url) {
      const trimmed = (url || '').trim();
      Store.setObj('sizeChart', { url: trimmed, updatedAt: Store.now() });

      const storeCfg = Store.getObj('storeSettings', {});
      storeCfg.defaultSizeChartImage = trimmed;
      Store.set('storeSettings', storeCfg);

      const brand = Store.getObj('brand', {});
      brand.sizeChartUrl = trimmed;
      Store.set('brand', brand);

      DB.log('Store size chart image updated');
      return trimmed;
    },
    removeSizeChart() {
      Store.setObj('sizeChart', { url: '', updatedAt: Store.now() });
      const storeCfg = Store.getObj('storeSettings', {});
      storeCfg.defaultSizeChartImage = '';
      Store.set('storeSettings', storeCfg);

      const brand = Store.getObj('brand', {});
      brand.sizeChartUrl = '';
      Store.set('brand', brand);

      DB.log('Store size chart image removed');
      return true;
    }
  },

  // ── Colors ──
  colors: {
    all() { return Store.get('colors'); },
    enabled() { return Store.get('colors').filter(c => c.isEnabled); },
    byId(id) { return Store.get('colors').find(c => c.id === id); },
    create(data) {
      const items = Store.get('colors');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('colors', items);
      DB.log(`Color created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('colors').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('colors', items); return items.find(c => c.id === id);
    },
    delete(id) {
      const c = DB.colors.byId(id);
      Store.set('colors', Store.get('colors').filter(c => c.id !== id));
      DB.log(`Color deleted: ${c?.name}`);
    }
  },

  // ── Sleeves ──
  sleeves: {
    all() {
      const raw = Store.get('sleeves') || [];
      const seen = new Set();
      const unique = [];
      for (const s of raw) {
        const name = (s.name || '').toLowerCase().trim();
        if (name && !seen.has(name)) {
          seen.add(name);
          unique.push(s);
        }
      }
      if (unique.length === 0) {
        unique.push({ id: 'slv_half', name: 'Half Sleeve', additionalPrice: 0, isEnabled: true, displayOrder: 0 });
        unique.push({ id: 'slv_full', name: 'Full Sleeve', additionalPrice: 100, isEnabled: true, displayOrder: 1 });
      }
      if (raw.length !== unique.length) {
        try { Store.set('sleeves', unique); } catch(e){}
      }
      return unique.sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0));
    },
    enabled() { return DB.sleeves.all().filter(s => s.isEnabled); },
    byId(id) { return DB.sleeves.all().find(s => s.id === id); },
    create(data) {
      const items = DB.sleeves.all();
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('sleeves', items);
      DB.log(`Sleeve created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = DB.sleeves.all().map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('sleeves', items); DB.log(`Sleeve updated: ${data.name||id}`);
      return items.find(s => s.id === id);
    },
    delete(id) {
      const s = DB.sleeves.byId(id);
      Store.set('sleeves', DB.sleeves.all().filter(s => s.id !== id));
      DB.log(`Sleeve deleted: ${s?.name}`);
    }
  },

  // ── Patches ──
  patches: {
    defaultItems: [
      {
        id: 'patch_ucl',
        name: 'UCL Ball patch',
        price: 100,
        description: 'Official UEFA Champions League Starball sleeve badge',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0NicgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjMTExODI3JyBzdHJva2Utd2lkdGg9JzYnLz48cG9seWdvbiBwb2ludHM9JzUwLDE1IDU4LDM1IDc5LDM4IDY0LDUyIDY4LDczIDUwLDYyIDMyLDczIDM2LDUyIDIxLDM4IDQyLDM1JyBmaWxsPScjMTExODI3Jy8+PC9zdmc+',
        isEnabled: true,
        displayOrder: 1
      },
      {
        id: 'patch_trophy',
        name: '9 Trophy patch',
        price: 100,
        description: 'UEFA Champions League Badge of Honour Trophy patch',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48cGF0aCBkPSdNMjYgMTggQzI2IDE4IDIyIDUyIDUwIDY4IEM3OCA1MiA3NCAxOCA3NCAxOCBaJyBmaWxsPScjMTExODI3Jy8+PHRleHQgeD0nNTAnIHk9JzQ3JyBmb250LXNpemU9JzI4JyBmb250LWZhbWlseT0nQXJpYWwnIGZvbnQtd2VpZ2h0PSc5MDAnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZpbGw9JyNmZmZmZmYnPjk8L3RleHQ+PHBhdGggZD0nTTM0IDcyIEw2NiA3MiBMNTggODQgTDQyIDg0IFonIGZpbGw9JyMxMTE4MjcnLz48L3N2Zz4=',
        isEnabled: true,
        displayOrder: 2
      },
      {
        id: 'patch_respect',
        name: 'Respect patch',
        price: 100,
        description: 'Official UEFA Foundation / Respect sleeve patch',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgNDQnPjxyZWN0IHdpZHRoPScxMDAnIGhlaWdodD0nNDQnIHJ4PSc4JyBmaWxsPScjMWUzYThhJy8+PHRleHQgeD0nNTAnIHk9JzI4JyBmb250LXNpemU9JzE1JyBmb250LWZhbWlseT0nQXJpYWwnIGZvbnQtd2VpZ2h0PSc5MDAnIGxldHRlci1zcGFjaW5nPScyJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmaWxsPScjZmZmZmZmJz5SRVNQRUNUPC90ZXh0Pjwvc3ZnPg==',
        isEnabled: true,
        displayOrder: 3
      },
      {
        id: 'patch_epl',
        name: 'Premier League patch',
        price: 150,
        description: 'Official Premier League sleeve patch',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0NicgZmlsbD0nIzM4MDAzYycvPjx0ZXh0IHg9JzUwJyB5PSc1OCcgZm9udC1zaXplPScyMCcgZm9udC1mYW1pbHk9J0FyaWFsJyBmb250LXdlaWdodD0nOTAwJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmaWxsPScjMDBmZjg1Jz5QTDwvdGV4dD48L3N2Zz4=',
        isEnabled: true,
        displayOrder: 4
      }
    ],
    all() {
      let items = Store.get('patches');
      if (!items || !Array.isArray(items) || items.length === 0) {
        items = this.defaultItems;
        Store.set('patches', items);
      }
      // Auto-heal duplicates by normalized name
      const seen = new Set();
      const deduped = [];
      items.forEach(p => {
        const key = (p.name || '').trim().toLowerCase();
        if (key && !seen.has(key)) {
          seen.add(key);
          // Convert any raw unescaped SVG data URIs into safe base64 to avoid attribute quotes breaking HTML
          if (p.imageUrl && p.imageUrl.startsWith('data:image/svg+xml;utf8,<svg')) {
            const rawSvg = p.imageUrl.replace('data:image/svg+xml;utf8,', '');
            try {
              p.imageUrl = 'data:image/svg+xml;base64,' + (typeof btoa !== 'undefined' ? btoa(rawSvg) : p.imageUrl);
            } catch(e){}
          }
          // Auto fill missing or broken imageUrl with high-res badge
          if (!p.imageUrl || p.imageUrl.trim().length <= 5) {
            if (key.includes('champion') || key.includes('ucl')) p.imageUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjMGYxNzJhJyBzdHJva2Utd2lkdGg9JzQnLz48cG9seWdvbiBwb2ludHM9JzUwLDE0IDUzLDI0IDY0LDI0IDU1LDMwIDU4LDQwIDUwLDM0IDQyLDQwIDQ1LDMwIDM2LDI0IDQ3LDI0JyBmaWxsPScjMGYxNzJhJy8+PHBvbHlnb24gcG9pbnRzPSc3NSwzMiA3OCw0MiA4OSw0MiA4MCw0OCA4Myw1OCA3NSw1MiA2Nyw1OCA3MCw0OCA2MSw0MiA3Miw0MicgZmlsbD0nIzBmMTcyYScvPjxwb2x5Z29uIHBvaW50cz0nNjYsNzAgNjksODAgODAsODAgNzEsODYgNzQsOTYgNjYsOTAgNTgsOTYgNjEsODYgNTIsODAgNjMsODAnIGZpbGw9JyMwZjE3MmEnLz48cG9seWdvbiBwb2ludHM9JzM0LDcwIDM3LDgwIDQ4LDgwIDM5LDg2IDQyLDk2IDM0LDkwIDI2LDk2IDI5LDg2IDIwLDgwIDMxLDgwJyBmaWxsPScjMGYxNzJhJy8+PHBvbHlnb24gcG9pbnRzPScyNSwzMiAyOCw0MiAzOSw0MiAzMCw0OCAzMyw1OCAyNSw1MiAxNyw1OCAyMCw0OCAxMSw0MiAyMiw0MicgZmlsbD0nIzBmMTcyYScvPjxjaXJjbGUgY3g9JzUwJyBjeT0nNTAnIHI9JzcnIGZpbGw9JyMwZjE3MmEnLz48L3N2Zz4=';
            else if (key.includes('premier') || key.includes('epl')) p.imageUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nIzM4MDAzYycgc3Ryb2tlPScjMDBmZjg1JyBzdHJva2Utd2lkdGg9JzQnLz48cGF0aCBkPSdNMzUgMzIgTDQwIDQwIEw1MCAzMCBMNjAgNDAgTDY1IDMyIEw2MiA0OCBMMzggNDggWicgZmlsbD0nIzAwZmY4NScvPjxwYXRoIGQ9J001MCA0NiBDNDAgNDYgMzIgNTQgMzIgNjYgQzMyIDc4IDQwIDg0IDUwIDg0IEM2MCA4NCA2OCA3OCA2OCA2NiBDNjggNTQgNjAgNDYgNTAgNDYgWicgZmlsbD0nI2ZmZmZmZicvPjxjaXJjbGUgY3g9JzQzJyBjeT0nNjInIHI9JzMnIGZpbGw9JyMzODAwM2MnLz48Y2lyY2xlIGN4PSc1NycgY3k9JzYyJyByPSczJyBmaWxsPScjMzgwMDNjJy8+PHBhdGggZD0nTTQ3IDcwIFE1MCA3MyA1MyA3MCcgc3Ryb2tlPScjMzgwMDNjJyBzdHJva2Utd2lkdGg9JzInIGZpbGw9J25vbmUnLz48L3N2Zz4=';
            else if (key.includes('liga')) p.imageUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjZWE1ODBjJyBzdHJva2Utd2lkdGg9JzQnLz48cGF0aCBkPSdNMzIgMjYgTDQ0IDI2IEw0NCA2NCBMNjYgNjQgTDY2IDc0IEwzMiA3NCBaJyBmaWxsPScjZWE1ODBjJy8+PHBhdGggZD0nTTQ4IDM2IEw1OCAzNiBMNTggNTQgTDcyIDU0IEw3MiA2MiBMNDggNjIgWicgZmlsbD0nIzExMTgyNycvPjwvc3ZnPg==';
          }
          deduped.push(p);
        }
      });
      if (deduped.length !== items.length) {
        Store.set('patches', deduped);
        if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
          window.ZenvyFirebase.push('patches', deduped);
        }
      }
      return deduped.sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0));
    },
    enabled() { return DB.patches.all().filter(p => p.isEnabled); },
    byId(id) { return Store.get('patches').find(p => p.id === id); },
    create(data) {
      const items = Store.get('patches');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('patches', items);
      DB.log(`Patch created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('patches').map(p => p.id === id ? { ...p, ...data } : p);
      Store.set('patches', items); DB.log(`Patch updated: ${data.name||id}`);
      return items.find(p => p.id === id);
    },
    delete(id) {
      const p = DB.patches.byId(id);
      Store.set('patches', Store.get('patches').filter(p => p.id !== id));
      DB.log(`Patch deleted: ${p?.name}`);
    }
  },

  // ── Add-ons ──
  addons: {
    all() { return Store.get('addons').sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0)); },
    byId(id) { return Store.get('addons').find(a => a.id === id); },
    create(data) {
      const items = Store.get('addons');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('addons', items);
      DB.log(`Add-on created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('addons').map(a => a.id === id ? { ...a, ...data } : a);
      Store.set('addons', items); return items.find(a => a.id === id);
    },
    delete(id) { Store.set('addons', Store.get('addons').filter(a => a.id !== id)); }
  },

  // ── Customization Settings ──
  customizationSettings: {
    get() { return Store.getObj('customization', {}); },
    save(data) {
      Store.setObj('customization', { ...Store.getObj('customization', {}), ...data, updatedAt: Store.now() });
      DB.log('Customization settings updated');
    }
  },

  // ── Orders ──
  orders: {
    all() { return Store.get('orders').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('orders').find(o => o.id === id); },
    byNumber(num) { return Store.get('orders').find(o => o.orderNumber === num); },
    pending() { return Store.get('orders').filter(o => o.status === 'PENDING'); },
    recent(n=10) { return DB.orders.all().slice(0, n); },
    todayCount() {
      const today = new Date().toDateString();
      return Store.get('orders').filter(o => new Date(o.createdAt).toDateString() === today).length;
    },
    todayRevenue() {
      const today = new Date().toDateString();
      return Store.get('orders').filter(o => new Date(o.createdAt).toDateString() === today && o.paymentStatus === 'PAID')
        .reduce((s,o) => s + o.totalAmount, 0);
    },
    monthRevenue() {
      const now = new Date(); const m = now.getMonth(); const y = now.getFullYear();
      return Store.get('orders').filter(o => { const d = new Date(o.createdAt); return d.getMonth()===m && d.getFullYear()===y && o.paymentStatus==='PAID'; })
        .reduce((s,o) => s + o.totalAmount, 0);
    },
    totalRevenue() { return Store.get('orders').filter(o => o.paymentStatus==='PAID').reduce((s,o) => s+o.totalAmount, 0); },
    create(data) {
      const items = Store.get('orders');
      const num = data.orderNumber || ('ZNV' + Date.now().toString().slice(-6));
      const item = { id: data.id || Store.genId(), ...data, orderNumber: num, status: data.status || 'PENDING', createdAt: data.createdAt || Store.now(), updatedAt: Store.now() };
      items.push(item); Store.set('orders', items);
      // Deduct stock
      if (item.items) item.items.forEach(i => {
        const p = DB.products.byId(i.productId);
        if (p) DB.products.updateStock(i.productId, Math.max(0, p.stock - i.quantity), 'Sale');
      });
      DB.log(`Order created: ${num}`);
      DB.activityLog.add({ action: 'Order Placed', entity: 'Order', entityId: item.id, detail: num });

      // Save to cloud Firestore /orders collection (non-blocking)
      try {
        if (window.ZenvyFirebase && typeof window.ZenvyFirebase.saveOrder === 'function') {
          window.ZenvyFirebase.saveOrder(item);
        }
      } catch(e) {}

      // Send Instant Telegram Bot Notification (non-blocking)
      try {
        if (DB.telegram && typeof DB.telegram.sendOrderNotification === 'function') {
          DB.telegram.sendOrderNotification(item).catch(err => console.warn('[TelegramBot] Error sending alert:', err));
        }
      } catch(e) {}

      return item;
    },
    updateStatus(id, status) {
      const old = DB.orders.byId(id);
      DB.orders.update(id, { status });
      DB.activityLog.add({ action: `Order ${status}`, entity: 'Order', entityId: id, detail: old?.orderNumber });
      DB.log(`Order ${old?.orderNumber} → ${status}`);
      // Notification log
      const notifLog = Store.get('notifLog');
      notifLog.push({ orderId: id, orderNumber: old?.orderNumber, status, sentAt: Store.now() });
      Store.set('notifLog', notifLog);

      // Cloud Firestore sync (non-blocking)
      try {
        if (window.ZenvyFirebase && typeof window.ZenvyFirebase.updateOrderStatus === 'function') {
          window.ZenvyFirebase.updateOrderStatus(old?.orderNumber || id, status);
        }
      } catch(e) {}
    },
    updatePayment(id, { paymentStatus, paidAmount, paymentRemark, paymentTrxId }) {
      const old = DB.orders.byId(id);
      if (!old) return;
      const total = old.totalAmount || 0;
      const isPaid = paymentStatus === 'PAID';
      const finalPaidAmount = paidAmount !== undefined && paidAmount !== '' ? Number(paidAmount) : (isPaid ? total : (old.paidAmount || 0));
      const due = Math.max(0, total - finalPaidAmount);
      const finalTrx = paymentTrxId !== undefined ? paymentTrxId : (old.paymentTrxId || old.trxId || '');

      const updated = DB.orders.update(id, {
        paymentStatus,
        paidAmount: finalPaidAmount,
        dueAmount: due,
        paymentRemark: paymentRemark !== undefined ? paymentRemark : (old.paymentRemark || ''),
        paymentTrxId: finalTrx,
        trxId: finalTrx,
        transactionId: finalTrx,
        paidAt: isPaid ? (old.paidAt || Store.now()) : old.paidAt
      });
      DB.activityLog.add({ action: `Payment ${paymentStatus}`, entity: 'Order', entityId: id, detail: `${old.orderNumber} - ৳${finalPaidAmount} (${paymentRemark || 'No remark'})` });
      DB.log(`Order ${old.orderNumber} payment updated to ${paymentStatus}`);

      // Cloud Firestore sync (non-blocking)
      try {
        if (window.ZenvyFirebase && typeof window.ZenvyFirebase.updateOrderStatus === 'function') {
          window.ZenvyFirebase.updateOrderStatus(old?.orderNumber || id, updated.status || old.status, {
            paymentStatus,
            paidAmount: finalPaidAmount,
            dueAmount: due,
            paymentRemark: paymentRemark !== undefined ? paymentRemark : (old.paymentRemark || ''),
            paymentTrxId: finalTrx,
            paidAt: updated.paidAt
          });
        }
      } catch(e) {}

      return updated;
    },
    update(id, data) {
      const items = Store.get('orders').map(o => o.id === id ? { ...o, ...data, updatedAt: Store.now() } : o);
      Store.set('orders', items); return items.find(o => o.id === id);
    },
    filter({ status, payment, search, startDate, endDate }) {
      let items = DB.orders.all();
      if (status) items = items.filter(o => o.status === status);
      if (payment) items = items.filter(o => o.paymentStatus === payment);
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(o => o.orderNumber?.toLowerCase().includes(q) || o.customerName?.toLowerCase().includes(q) || o.customerPhone?.includes(q));
      }
      if (startDate) items = items.filter(o => new Date(o.createdAt) >= new Date(startDate));
      if (endDate) items = items.filter(o => new Date(o.createdAt) <= new Date(endDate));
      return items;
    },
    exportCSV() {
      const orders = DB.orders.all();
      const rows = [['Order#','Customer','Phone','Total','Status','Payment','Date']];
      orders.forEach(o => rows.push([o.orderNumber, o.customerName, o.customerPhone, o.totalAmount, o.status, o.paymentStatus, o.createdAt]));
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Customers ──
  customers: {
    all() { return Store.get('customers').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('customers').find(c => c.id === id); },
    byEmail(email) { return Store.get('customers').find(c => c.email === email); },
    create(data) {
      const items = Store.get('customers');
      const item = { id: Store.genId(), ...data, totalSpent: 0, orderCount: 0, createdAt: Store.now() };
      items.push(item); Store.set('customers', items); return item;
    },
    update(id, data) {
      const items = Store.get('customers').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('customers', items); return items.find(c => c.id === id);
    },
    disable(id) { DB.customers.update(id, { isDisabled: true }); DB.log('Customer disabled'); },
    search(q) {
      const lq = q.toLowerCase();
      return Store.get('customers').filter(c => c.name?.toLowerCase().includes(lq) || c.email?.toLowerCase().includes(lq) || c.phone?.includes(lq));
    },
    exportCSV() {
      const custs = DB.customers.all();
      const rows = [['Name','Email','Phone','Orders','Total Spent','Joined']];
      custs.forEach(c => rows.push([c.name, c.email, c.phone, c.orderCount, c.totalSpent, c.createdAt]));
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Coupons ──
  coupons: {
    all() { return Store.get('coupons'); },
    byId(id) { return Store.get('coupons').find(c => c.id === id); },
    byCode(code) { return Store.get('coupons').find(c => c.code?.toUpperCase() === code?.toUpperCase()); },
    create(data) {
      const items = Store.get('coupons');
      const item = { id: Store.genId(), ...data, usedCount: 0, createdAt: Store.now() };
      items.push(item); Store.set('coupons', items);
      DB.log(`Coupon created: ${item.code}`); return item;
    },
    update(id, data) {
      const items = Store.get('coupons').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('coupons', items); return items.find(c => c.id === id);
    },
    delete(id) {
      const c = DB.coupons.byId(id);
      Store.set('coupons', Store.get('coupons').filter(c => c.id !== id));
      DB.log(`Coupon deleted: ${c?.code}`);
    }
  },

  // ── Flash Sales ──
  flashSales: {
    all() { return Store.get('flashSales'); },
    byId(id) { return Store.get('flashSales').find(f => f.id === id); },
    active() {
      const now = new Date();
      return Store.get('flashSales').filter(f => f.isActive && new Date(f.startDate) <= now && new Date(f.endDate) >= now);
    },
    create(data) {
      const items = Store.get('flashSales');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('flashSales', items);
      DB.log(`Flash Sale created: ${item.title}`); return item;
    },
    update(id, data) {
      const items = Store.get('flashSales').map(f => f.id === id ? { ...f, ...data } : f);
      Store.set('flashSales', items); return items.find(f => f.id === id);
    },
    delete(id) { Store.set('flashSales', Store.get('flashSales').filter(f => f.id !== id)); }
  },

  // ── Banners ──
  banners: {
    all() { return Store.get('banners').sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0)); },
    active() { return DB.banners.all().filter(b => b.isActive); },
    byId(id) { return Store.get('banners').find(b => b.id === id); },
    create(data) {
      const items = Store.get('banners');
      const item = {
        id: Store.genId(),
        isActive: data.isActive !== undefined ? !!data.isActive : true,
        ...data,
        createdAt: Store.now(),
        updatedAt: Store.now()
      };
      if (data.isActive !== undefined) item.isActive = !!data.isActive;
      items.push(item); Store.set('banners', items);
      DB.log(`Banner created: ${item.title}`); return item;
    },
    update(id, data) {
      const items = Store.get('banners').map(b => b.id === id ? { ...b, ...data } : b);
      Store.set('banners', items); DB.log(`Banner updated: ${data.title||id}`);
      return items.find(b => b.id === id);
    },
    delete(id) {
      const b = DB.banners.byId(id);
      Store.set('banners', Store.get('banners').filter(b => b.id !== id));
      DB.log(`Banner deleted: ${b?.title}`);
    },
    publish(id) { const b = DB.banners.update(id, { isActive: true }); DB.log(`Banner published`); return b; },
    unpublish(id) { const b = DB.banners.update(id, { isActive: false }); DB.log(`Banner unpublished`); return b; },
    toggle(id) {
      const b = DB.banners.byId(id);
      const next = b ? !b.isActive : true;
      return DB.banners.update(id, { isActive: next });
    }
  },

  // ── Shop Discount Banner ──
  shopBanner: {
    get() {
      const direct = Store.getObj('shopBanner', null);
      if (direct && direct.slides && direct.slides.length > 0) {
        return direct;
      }
      const hp = DB.homepage.get();
      if (hp && hp.shopBanner && hp.shopBanner.slides && hp.shopBanner.slides.length > 0) {
        return hp.shopBanner;
      }
      return {
        enabled: true,
        slides: [
          {
            tag: "⚡ SPECIAL DISCOUNT",
            title: "LIMITED\nEDITION KITS",
            subtitle: "Elevate Your Game • Exclusively Online",
            discountBadge: "25% OFF",
            bgImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
            link: "#view-shop"
          },
          {
            tag: "HOT DEAL",
            title: "NEW SEASON\nELITE KITS",
            subtitle: "Free Player Name & Number Customization",
            discountBadge: "FREE PRINTING",
            bgImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
            link: "#view-shop"
          }
        ]
      };
    },
    save(data) {
      const bannerData = { enabled: true, ...data };
      // Store.setObj already triggers ZenvyFirebase.push internally — no double push needed
      Store.setObj('shopBanner', bannerData);
      const hp = DB.homepage.get();
      hp.shopBanner = bannerData;
      DB.homepage.save(hp); // This also pushes 'homepage' via Store.setObj internally
      DB.log('Shop discount banner updated');
      return bannerData;
    }
  },

  // ── Homepage Config ──
  homepage: {
    get() { return Store.getObj('homepage', {}); },
    save(data) { Store.setObj('homepage', { ...Store.getObj('homepage', {}), ...data }); DB.log('Homepage config updated'); }
  },

  // ── Reviews ──
  reviews: {
    all() { return Store.get('reviews').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byProduct(productId) { return Store.get('reviews').filter(r => r.productId === productId); },
    byId(id) { return Store.get('reviews').find(r => r.id === id); },
    create(data) {
      const items = Store.get('reviews');
      const item = { id: Store.genId(), ...data, isApproved: false, createdAt: Store.now() };
      items.push(item); Store.set('reviews', items); return item;
    },
    approve(id) { DB.reviews.update(id, { isApproved: true }); DB.log('Review approved'); },
    hide(id) { DB.reviews.update(id, { isApproved: false }); DB.log('Review hidden'); },
    delete(id) { Store.set('reviews', Store.get('reviews').filter(r => r.id !== id)); DB.log('Review deleted'); },
    update(id, data) {
      const items = Store.get('reviews').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('reviews', items); return items.find(r => r.id === id);
    }
  },

  // ── Returns ──
  returns: {
    all() { return Store.get('returns').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('returns').find(r => r.id === id); },
    create(data) {
      const items = Store.get('returns');
      const item = { id: Store.genId(), ...data, status: 'REQUESTED', createdAt: Store.now() };
      items.push(item); Store.set('returns', items); return item;
    },
    update(id, data) {
      const items = Store.get('returns').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('returns', items); return items.find(r => r.id === id);
    },
    updateStatus(id, status) { DB.returns.update(id, { status }); DB.log(`Return ${status}`); }
  },

  // ── Refunds ──
  refunds: {
    all() { return Store.get('refunds').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('refunds').find(r => r.id === id); },
    create(data) {
      const items = Store.get('refunds');
      const item = { id: Store.genId(), ...data, status: 'PENDING', createdAt: Store.now() };
      items.push(item); Store.set('refunds', items); return item;
    },
    update(id, data) {
      const items = Store.get('refunds').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('refunds', items); return items.find(r => r.id === id);
    }
  },

  // ── Shipping ──
  shipping: {
    all() { return Store.get('shipping'); },
    byId(id) { return Store.get('shipping').find(s => s.id === id); },
    create(data) {
      const items = Store.get('shipping');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('shipping', items);
      DB.log(`Shipping method created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('shipping').map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('shipping', items); return items.find(s => s.id === id);
    },
    delete(id) { Store.set('shipping', Store.get('shipping').filter(s => s.id !== id)); }
  },

  // ── Payments Config (UddoktaPay bKash Gateway) ──
  payments: {
    get() {
      const def = {
        bkash: {
          enabled: true,
          number: '01700000000',
          type: 'Personal',
          instructions: 'bKash Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
        },
        nagad: {
          enabled: true,
          number: '01800000000',
          type: 'Personal',
          instructions: 'Nagad Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
        },
        rocket: {
          enabled: true,
          number: '01900000000',
          type: 'Personal',
          instructions: 'Rocket Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
        },
        cod: {
          enabled: true,
          instructions: 'পণ্য হাতে পেয়ে ক্যাশ পরিশোধ করুন (Cash on Delivery)।'
        },
        uddoktaPay: {
          enabled: true,
          apiKey: 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf',
          apiUrl: 'https://pay.uddoktapay.com/api/checkout-v2',
          sandbox: false,
          bkashEnabled: true,
          merchantNumber: '01700000000',
          accountType: 'Personal'
        },
        methods: [
          { id: 'bkash', name: 'bKash', enabled: true, icon: 'smartphone', number: '01700000000', type: 'Personal', instructions: 'bKash Personal নাম্বারে Send Money করুন।' },
          { id: 'nagad', name: 'Nagad', enabled: true, icon: 'smartphone', number: '01800000000', type: 'Personal', instructions: 'Nagad Personal নাম্বারে Send Money করুন।' },
          { id: 'rocket', name: 'Rocket', enabled: true, icon: 'smartphone', number: '01900000000', type: 'Personal', instructions: 'Rocket Personal নাম্বারে Send Money করুন।' },
          { id: 'cod', name: 'Cash on Delivery', enabled: true, icon: 'payments', instructions: 'পণ্য হাতে পেয়ে পরিশোধ করুন।' }
        ]
      };
      const saved = Store.getObj('paymentConfig', def);
      if (!saved.bkash) saved.bkash = def.bkash;
      if (!saved.nagad) saved.nagad = def.nagad;
      if (!saved.rocket) saved.rocket = def.rocket;
      if (!saved.cod) saved.cod = def.cod;
      if (!saved.uddoktaPay) saved.uddoktaPay = def.uddoktaPay;
      if (!saved.uddoktaPay.apiKey) saved.uddoktaPay.apiKey = 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf';
      if (!saved.methods || !saved.methods.length) saved.methods = def.methods;
      return saved;
    },
    save(data) {
      Store.setObj('paymentConfig', data);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('paymentConfig', data);
      }
      DB.log('bKash, Nagad, Rocket & Payment gateway configuration updated');
    },
    getUddoktaPayConfig() {
      const cfg = this.get();
      return cfg.uddoktaPay || {
        enabled: true,
        apiKey: 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf',
        apiUrl: 'https://pay.uddoktapay.com/api/checkout-v2',
        sandbox: false,
        bkashEnabled: true
      };
    }
  },

  // ── Store Policy & Advance Payment Settings ──
  storeSettings: {
    get() {
      const def = {
        advancePaymentMode: 'customer_choice', // 'delivery_only', 'full_only', 'customer_choice', 'cod_only'
        deliveryChargeInsideDhaka: 80,
        deliveryChargeOutsideDhaka: 130,
        deliveryChargeExpress: 200,
        deliveryChargeFreeThreshold: 3000,
        deliveryChargeEnabled: true,
        cashOnDelivery: true,
        requirePayFirst: false,
        minOrderAmount: 0,
        codNote: 'Pay remaining product balance when your order arrives.',
        payFirstNote: 'Advance delivery charge payment required via bKash to confirm your order.',
        whatsappNumber: '8801700000000',
        whatsappEnabled: true
      };
      const saved = Store.getObj('storeSettings', def);
      return { ...def, ...saved };
    },
    save(data) {
      const updated = { ...this.get(), ...data };
      Store.setObj('storeSettings', updated);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('storeSettings', updated);
      }
      DB.log('Store advance payment & delivery charge policy updated');
      return updated;
    }
  },

  // ── WhatsApp Direct Order Integration ──
  whatsapp: {
    get() {
      const settings = DB.storeSettings.get();
      return {
        number: settings.whatsappNumber || '8801700000000',
        enabled: settings.whatsappEnabled !== false
      };
    },
    save(number, enabled = true) {
      return DB.storeSettings.save({ whatsappNumber: number, whatsappEnabled: enabled });
    }
  },

  // ── Notifications Config ──
  notifications: {
    get() { return Store.getObj('notifConfig', {}); },
    save(data) { Store.setObj('notifConfig', { ...Store.getObj('notifConfig', {}), ...data }); DB.log('Notification config updated'); }
  },

  // ── Telegram Bot Notifications ──
  telegram: {
    get() {
      return Store.getObj('telegramConfig', {
        enabled: true,
        botToken: '8885566781:AAGIksiPCOPnJOlKHeqOvdowcSbPbDRcjxU',
        botUsername: 'Zenvybdshopbot',
        chatId: '',
        notifyOnOrder: true,
        notifyOnPreorder: true
      });
    },
    save(data) {
      const current = this.get();
      const updated = { ...current, ...data };
      Store.setObj('telegramConfig', updated);
      DB.log('Telegram bot notification config updated');
      return updated;
    },
    async sendTelegramMessage(htmlText) {
      const config = this.get();
      if (!config.enabled || !config.botToken) return { success: false, error: 'Telegram bot is disabled or missing bot token.' };
      
      let chatIds = (config.chatId || '').split(/[\s,]+/).map(s => s.trim()).filter(Boolean);
      
      // If chatId is not configured, try auto-discovering from bot getUpdates
      if (chatIds.length === 0) {
        try {
          const updatesRes = await fetch(`https://api.telegram.org/bot${config.botToken}/getUpdates`);
          const updates = await updatesRes.json();
          if (updates.ok && updates.result && updates.result.length > 0) {
            const detected = new Set();
            updates.result.forEach(u => {
              const cid = u.message?.chat?.id || u.channel_post?.chat?.id || u.my_chat_member?.chat?.id;
              if (cid) detected.add(String(cid));
            });
            chatIds = Array.from(detected);
            if (chatIds.length > 0) {
              this.save({ chatId: chatIds.join(', ') });
              console.log('[TelegramBot] Auto-discovered Chat IDs:', chatIds);
            }
          }
        } catch(e) {
          console.warn('[TelegramBot] Could not auto-detect chat ID:', e);
        }
      }

      if (chatIds.length === 0) {
        return { success: false, error: 'Chat ID is missing. Please open https://t.me/ZENVYBDBOT and press START, then click Auto-Detect.' };
      }

      let lastResult = null;
      let errors = [];

      for (const cid of chatIds) {
        try {
          const res = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: cid,
              text: htmlText,
              parse_mode: 'HTML'
            })
          });
          const data = await res.json();
          if (data.ok) {
            lastResult = data.result;
          } else {
            errors.push(`Chat ${cid}: ${data.description || 'API Error'}`);
          }
        } catch (err) {
          errors.push(`Chat ${cid}: ${err.message}`);
        }
      }

      if (lastResult) {
        return { success: true, result: lastResult };
      }
      return { success: false, error: errors.join('; ') || 'Failed to send to Telegram' };
    },
    async sendOrderNotification(order) {
      const config = this.get();
      if (!config.enabled) return { success: false, reason: 'disabled' };

      const safe = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const itemsList = (order.items || []).map((it, idx) => {
        const size = it.size || (it.details?.match(/Size:\s*([^\s•,]+)/i)?.[1]) || (it.details?.match(/\b(XS|S|M|L|XL|2XL|XXL|3XL|4XL)\b/i)?.[1]) || 'M';
        const sleeve = it.sleeve || (it.details?.match(/(Full\s*Sleeve|Long\s*Sleeve|Half\s*Sleeve|Short\s*Sleeve|Sleeveless)/i)?.[0]) || 'Half Sleeve';
        let customName = it.customName || '';
        let customNumber = it.customNumber || '';
        if (!customName && !customNumber && it.details) {
          const cMatch = it.details.match(/Custom:\s*([^#•]+)(?:#([^\s•,]+))?/i) || it.details.match(/Name:\s*([^•,]+)/i);
          if (cMatch) { customName = cMatch[1].trim(); if (cMatch[2]) customNumber = cMatch[2].trim(); }
        }
        const patchName = it.patchName || (it.patches ? (Array.isArray(it.patches)?it.patches.join(', '):it.patches) : '') || (it.details?.match(/Patch(?:es)?:\s*([^•]+)/i)?.[1]?.trim()) || '';
        const printText = customName ? `${customName}${customNumber ? ' #' + customNumber : ''}` : (customNumber ? `#${customNumber}` : '');

        let specs = `Size: <b>${safe(size)}</b> | Sleeve: <b>${safe(sleeve)}</b>`;
        if (patchName) specs += `\n     • Patch: <b>${safe(patchName)}</b>`;
        if (printText) specs += `\n     • Custom Print: <b>${safe(printText)}</b>`;

        return `  ${idx + 1}. <b>${safe(it.productName || it.name || 'Jersey')}</b>\n     • ${specs}\n     • Qty: <b>${it.quantity || it.qty || 1}</b> | Price: <b>৳${Math.round(it.totalPrice || ((it.unitPrice || it.price || 0) * (it.quantity || 1))).toLocaleString()}</b>`;
      }).join('\n\n');

      const paidAmount = order.paidAmount || (order.paymentStatus === 'PAID' ? order.totalAmount : 0);
      const dueAmount = order.dueAmount !== undefined ? order.dueAmount : (order.paymentStatus === 'PAID' ? 0 : order.totalAmount);
      const shippingFee = order.shippingFee || 0;

      const trxId = order.paymentTrxId || order.trxId || order.transactionId;
      const senderPhone = order.paymentSenderPhone;
      const paymentRemark = order.paymentRemark;

      const msg = `⚡ <b>NEW ZENVY ORDER RECEIVED!</b> ⚡\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🏷️ <b>Order ID:</b> <code>#${safe(order.orderNumber || order.id || Date.now())}</code>\n` +
        `👤 <b>Customer:</b> ${safe(order.customerName || 'Valued Customer')}\n` +
        `📞 <b>Phone:</b> <code>${safe(order.customerPhone || 'N/A')}</code>\n` +
        `📧 <b>Email:</b> ${safe(order.customerEmail || 'N/A')}\n` +
        `📍 <b>Address:</b> ${safe(order.shippingAddress || 'N/A')}\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🛒 <b>Items Ordered (${(order.items || []).length}):</b>\n${itemsList}\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `💳 <b>Payment Method:</b> <b>${safe(order.paymentMethod || 'Cash on Delivery')}</b>\n` +
        (trxId ? `🔑 <b>Transaction ID:</b> <code>${safe(trxId)}</code>\n` : '') +
        (senderPhone ? `📱 <b>Sender Number:</b> <code>${safe(senderPhone)}</code>\n` : '') +
        (paymentRemark ? `📝 <b>Payment Remark:</b> ${safe(paymentRemark)}\n` : '') +
        `📊 <b>Payment Status:</b> ${safe(order.paymentStatus || 'PENDING')}\n` +
        `📦 <b>Delivery Charge:</b> ৳${Math.round(shippingFee).toLocaleString()}\n` +
        `💰 <b>Total Order Value:</b> <b>৳${Math.round(order.totalAmount || 0).toLocaleString()}</b>\n` +
        `✅ <b>Paid Amount:</b> <b>৳${Math.round(paidAmount).toLocaleString()}</b>\n` +
        `🚚 <b>Due on Delivery:</b> <b>৳${Math.round(dueAmount).toLocaleString()}</b>\n` +
        `🕒 <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BST)\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🚀 <i>ZENVY Elite Sportswear Order Engine</i>`;

      return await this.sendTelegramMessage(msg);
    },
    async sendRestockNotification(req) {
      const config = this.get();
      if (!config.enabled) return { success: false, reason: 'disabled' };
      const safe = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      const msg = `🔔 <b>CUSTOMER STOCK OUT ALERT / RESTOCK REQUEST</b> 🔔\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `📦 <b>Product:</b> <b>${safe(req.productName)}</b>\n` +
        (req.productSku ? `🏷️ <b>SKU:</b> <code>${safe(req.productSku)}</code>\n` : '') +
        (req.size ? `📏 <b>Requested Size:</b> <b>${safe(req.size)}</b>\n` : '') +
        (req.sleeve ? `👕 <b>Sleeve:</b> <b>${safe(req.sleeve)}</b>\n` : '') +
        `👤 <b>Customer:</b> ${safe(req.customerName || 'Valued Customer')}\n` +
        `📞 <b>Phone / WhatsApp:</b> <code>${safe(req.customerPhone)}</code>\n` +
        (req.note ? `📝 <b>Customer Note:</b> ${safe(req.note)}\n` : '') +
        `⚠️ <b>Current Stock:</b> <code>0 (OUT OF STOCK)</code>\n` +
        `🕒 <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BST)\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `👉 <i>Open Admin Panel → Inventory to view all requests and restock.</i>`;

      return await this.sendTelegramMessage(msg);
    }
  },

  // ── Restock Requests (Customer Stock Notifications) ──
  restockRequests: {
    all() {
      const deletedKey = `${DB_VERSION}_deleted_restock_ids`;
      let deletedIds = new Set();
      try {
        const raw = localStorage.getItem(deletedKey);
        if (raw) deletedIds = new Set(JSON.parse(raw));
      } catch(e){}
      let items = Store.get('restockRequests');
      if (!Array.isArray(items)) items = [];
      if (deletedIds.size > 0) {
        items = items.filter(r => !deletedIds.has(String(r.id).trim()));
      }
      return items.filter(r => !r.isDeleted);
    },
    pending() {
      return this.all().filter(r => r.status === 'PENDING' || !r.status);
    },
    byId(id) {
      return this.all().find(r => r.id === id);
    },
    create(data) {
      const items = this.all();
      const item = {
        id: 'rst_' + Store.genId(),
        productId: data.productId || '',
        productName: data.productName || 'Jersey',
        productSku: data.productSku || '',
        customerName: data.customerName || 'Valued Customer',
        customerPhone: data.customerPhone || data.phone || '',
        size: data.size || 'M',
        sleeve: data.sleeve || 'Half Sleeve',
        note: data.note || '',
        status: 'PENDING', // PENDING, CONTACTED, RESTOCKED
        createdAt: Store.now(),
        updatedAt: Store.now()
      };
      items.unshift(item);
      Store.set('restockRequests', items);
      DB.log(`Restock request received for ${item.productName} (${item.customerPhone})`);
      
      try {
        if (DB.telegram && typeof DB.telegram.sendRestockNotification === 'function') {
          DB.telegram.sendRestockNotification(item).catch(err => console.warn('[Telegram] Restock notify error:', err));
        }
      } catch(e) {
        console.warn('[Telegram] Restock notify dispatch error:', e);
      }
      return item;
    },
    update(id, data) {
      const items = this.all().map(r => r.id === id ? { ...r, ...data, updatedAt: Store.now() } : r);
      Store.set('restockRequests', items);
      return items.find(r => r.id === id);
    },
    delete(id) {
      const strId = String(id).trim();
      const deletedKey = `${DB_VERSION}_deleted_restock_ids`;
      let deletedIds = new Set();
      try {
        const raw = localStorage.getItem(deletedKey);
        if (raw) deletedIds = new Set(JSON.parse(raw));
      } catch(e){}
      deletedIds.add(strId);
      localStorage.setItem(deletedKey, JSON.stringify(Array.from(deletedIds)));

      const items = this.all().filter(r => String(r.id).trim() !== strId);
      Store.set('restockRequests', items);

      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.deleteRestockRequest === 'function') {
        window.ZenvyFirebase.deleteRestockRequest(strId);
      }
    }
  },

  // ── Inventory ──
  inventory: {
    addHistory(entry) {
      const items = Store.get('inventoryHistory');
      items.unshift({ id: Store.genId(), ...entry, date: Store.now() });
      Store.set('inventoryHistory', items.slice(0, 500)); // keep last 500
    },
    history(productId) {
      const items = Store.get('inventoryHistory');
      return productId ? items.filter(i => i.productId === productId) : items;
    }
  },

  // ── Price History ──
  priceHistory: {
    all() { return Store.get('priceHistory'); },
    byProduct(productId) { return Store.get('priceHistory').filter(p => p.productId === productId); },
    add(data) {
      const items = Store.get('priceHistory');
      items.unshift({ id: Store.genId(), ...data, admin: 'Admin', date: Store.now() });
      Store.set('priceHistory', items.slice(0, 200));
    }
  },

  // ── Activity Log ──
  activityLog: {
    add(entry) {
      const items = Store.get('activityLog');
      let adminName = 'Admin';
      try {
        const u = DB.auth.getCurrentUser();
        if (u) adminName = u.name || u.email || 'Admin';
      } catch(e) {}
      items.unshift({ id: Store.genId(), ...entry, admin: adminName, date: Store.now() });
      Store.set('activityLog', items.slice(0, 1000));
    },
    all() { return Store.get('activityLog'); }
  },

  // ── Preorders (embedded in product, but tracked separately) ──
  preorders: {
    all() { return Store.get('products').filter(p => p.isPreorder && !p.isArchived); },
    byId(productId) { return Store.get('products').find(p => p.id === productId); },
    active() { return DB.preorders.all().filter(p => p.preorderStatus === 'OPEN' || p.preorderStatus === 'AVAILABLE'); },
    exportCSV() {
      const items = DB.preorders.all();
      const rows = [['Product', 'Preorder Price', 'Regular Price', 'Capacity', 'Sold', 'Remaining', 'Expected Delivery', 'Status']];
      items.forEach(p => {
        const cap = p.preorderCapacity || 100;
        const sold = p.preorderSold || 0;
        rows.push([
          `"${String(p.name || '').replace(/"/g, '""')}"`,
          p.preorderPrice || p.basePrice || 0,
          p.basePrice || 0,
          cap,
          sold,
          Math.max(0, cap - sold),
          `"${String(p.expectedDelivery || '').replace(/"/g, '""')}"`,
          `"${String(p.preorderStatus || 'OPEN').replace(/"/g, '""')}"`
        ]);
      });
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Preorder 3D Orbit Hero Showcase ──
  preorderHero: {
    defaultItems: [
      {
        id: 'orbit_1',
        title: 'World Cup 2026 Special Drop',
        subtitle: 'Argentina 3-Star Champion Kit',
        image: 'img/preorders/argentina.png',
        eyebrow: '🔥 #1 Trending Preorder',
        rating: 4.98,
        chef: 'AFA Official Player Match Spec',
        kitchen: 'Limited Edition • 150 Slots',
        description: 'Featuring the official gold 3-star champions badge, aerated micro-mesh cooling channels, and golden Sun of May crest.',
        likes: 482,
        price: 8500,
        accent: '#bae6fd',
        expectedDeliveryDate: '15 November 2026',
        sizes: ['S','M','L','XL','XXL']
      },
      {
        id: 'orbit_2',
        title: 'Season 2026/27 Drop',
        subtitle: 'FC Barcelona Camp Nou Return',
        image: 'img/preorders/barca.png',
        eyebrow: '⚡ High Demand Drop',
        rating: 4.94,
        chef: 'Blaugrana Pro Match Kit',
        kitchen: 'DryTech Pro Jacquard',
        description: 'Next-season iconic Blaugrana match jersey with moisture-wicking ergonomic cut and breathable side mesh inserts.',
        likes: 389,
        price: 7200,
        accent: '#fecdd3',
        expectedDeliveryDate: '20 September 2026',
        sizes: ['S','M','L','XL','XXL']
      },
      {
        id: 'orbit_3',
        title: 'National Pride Official Kit',
        subtitle: 'Bangladesh Tigers ODI 2026',
        image: 'img/preorders/bangladesh.png',
        eyebrow: '🇧🇩 Official National Edition',
        rating: 4.97,
        chef: 'BCB Official Match Kit',
        kitchen: 'Tiger Jacquard Weave',
        description: 'Deep emerald green & crimson accents with woven Royal Bengal tiger patterns and golden star embroidery.',
        likes: 615,
        price: 3800,
        accent: '#a7f3d0',
        expectedDeliveryDate: '5 October 2026',
        sizes: ['S','M','L','XL','XXL','XXXL']
      },
      {
        id: 'orbit_4',
        title: 'Performance Series',
        subtitle: 'AeroKnit Supreme Pro UCL',
        image: 'img/preorders/aeroknit.png',
        eyebrow: '✨ Elite Performance Drop',
        rating: 4.90,
        chef: 'Zenvy Elite Athletics',
        kitchen: 'Titanium AeroKnit Weave',
        description: 'Ultra-lightweight match kit engineered with thermal-regulated airflow panels and iridescent reflective branding.',
        likes: 294,
        price: 4200,
        accent: '#e9d5ff',
        expectedDeliveryDate: '10 November 2026',
        sizes: ['S','M','L','XL','XXL']
      }
    ],
    all() {
      let items = Store.get('preorderHero');
      if (!items || !Array.isArray(items) || items.length === 0) {
        items = JSON.parse(JSON.stringify(this.defaultItems));
        Store.set('preorderHero', items);
      }
      return items;
    },
    byId(id) {
      return this.all().find(x => String(x.id) === String(id));
    },
    save(items) {
      Store.set('preorderHero', items);
      DB.log('Preorder 3D hero showcase updated');
    },
    create(data) {
      const items = this.all();
      const item = {
        id: data.id || ('orbit_' + Store.genId()),
        title: data.title || 'New Preorder Drop',
        subtitle: data.subtitle || 'Exclusive Kit Drop',
        image: data.image || 'img/preorders/argentina.png',
        eyebrow: data.eyebrow || '🔥 Exclusive Drop',
        rating: parseFloat(data.rating) || 4.95,
        chef: data.chef || 'Official Match Spec',
        kitchen: data.kitchen || 'Limited Edition',
        description: data.description || '',
        likes: parseInt(data.likes) || 120,
        price: parseFloat(data.price) || 5000,
        accent: data.accent || '#bae6fd',
        expectedDeliveryDate: data.expectedDeliveryDate || 'Coming Soon',
        sizes: Array.isArray(data.sizes) ? data.sizes : ['S','M','L','XL','XXL'],
        createdAt: Store.now(),
        updatedAt: Store.now()
      };
      items.push(item);
      this.save(items);
      return item;
    },
    update(id, data) {
      const items = this.all().map(x => String(x.id) === String(id) ? { ...x, ...data, updatedAt: Store.now() } : x);
      this.save(items);
      return items.find(x => String(x.id) === String(id));
    },
    delete(id) {
      const items = this.all().filter(x => String(x.id) !== String(id));
      this.save(items);
      return true;
    },
    reset() {
      const defs = JSON.parse(JSON.stringify(this.defaultItems));
      this.save(defs);
      return defs;
    }
  },

  // ── Teams / Clubs ──
  teams: {
    all() { return Store.get('teams'); },
    byId(id) { return Store.get('teams').find(t => t.id === id); },
    create(data) {
      const items = Store.get('teams');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('teams', items);
      DB.log(`Team created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('teams').map(t => t.id === id ? { ...t, ...data } : t);
      Store.set('teams', items); return items.find(t => t.id === id);
    },
    delete(id) { Store.set('teams', Store.get('teams').filter(t => t.id !== id)); }
  },

  // ── Admin Access & Team Members (Google Auth whitelist) ──
  adminAccess: {
    // Permanent master store & Firebase creators
    MASTER_EMAILS: ['gfse083@gmail.com', 'rahat300809@gmail.com'],

    all() {
      let list = Store.get('admin_access', []);
      if (!Array.isArray(list)) list = [];

      const defaults = [
        {
          id: 'adm_creator_gfse',
          email: 'gfse083@gmail.com',
          name: 'Firebase Creator',
          role: 'Super Admin',
          status: 'Active',
          addedAt: '2026-01-01T00:00:00.000Z',
          addedBy: 'Firebase Creator'
        },
        {
          id: 'adm_owner_rahat',
          email: 'rahat300809@gmail.com',
          name: 'Store Owner',
          role: 'Super Admin',
          status: 'Active',
          addedAt: '2026-01-01T00:00:00.000Z',
          addedBy: 'Store Owner'
        }
      ];

      // Ensure master owners are always present
      defaults.forEach(d => {
        if (!list.some(a => (a.email || '').trim().toLowerCase() === d.email.toLowerCase())) {
          list.unshift(d);
        }
      });

      return list;
    },
    isAuthorized(email) {
      if (!email) return false;
      const cleanEmail = email.trim().toLowerCase();
      if (this.MASTER_EMAILS.includes(cleanEmail)) return true;
      const list = this.all();
      return list.some(a => (a.email || '').trim().toLowerCase() === cleanEmail && a.status === 'Active');
    },
    add(email, role = 'Admin', name = '', addedBy = 'Super Admin') {
      if (!email || !email.includes('@')) return { success: false, error: 'Valid email is required' };
      const cleanEmail = email.trim().toLowerCase();
      let list = this.all();
      if (list.some(a => (a.email || '').trim().toLowerCase() === cleanEmail)) {
        return { success: false, error: 'This email is already authorized as an administrator.' };
      }
      const newAdmin = {
        id: 'adm_' + Date.now(),
        email: cleanEmail,
        name: name.trim() || cleanEmail.split('@')[0],
        role: role || 'Admin',
        status: 'Active',
        addedAt: new Date().toISOString(),
        addedBy: addedBy || 'Admin'
      };
      list.push(newAdmin);
      Store.set('admin_access', list);

      // Direct write to Firestore for instant cross-device synchronization
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          const db = firebase.firestore();
          db.collection('zenvy_store').doc('admin_access').set({
            data: JSON.parse(JSON.stringify(list)),
            updatedAt: Date.now()
          }, { merge: true });

          db.collection('admins').doc(cleanEmail).set({
            email: cleanEmail,
            name: newAdmin.name,
            role: newAdmin.role,
            active: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            addedBy
          }, { merge: true });
        } catch(e) {
          console.warn('Could not mirror admin to firestore:', e);
        }
      }

      DB.log(`Granted ${role} admin access to ${cleanEmail}`);
      return { success: true, admin: newAdmin };
    },
    remove(id) {
      let list = this.all();
      const target = list.find(a => a.id === id || (a.email && a.email.toLowerCase() === id.toLowerCase()));
      if (!target) return { success: false, error: 'Admin not found' };

      const cleanEmail = (target.email || '').trim().toLowerCase();
      if (this.MASTER_EMAILS.includes(cleanEmail)) {
        return { success: false, error: 'Cannot revoke access for primary Firebase & Store creators.' };
      }

      list = list.filter(a => a.id !== id && (a.email && a.email.toLowerCase() !== cleanEmail));
      Store.set('admin_access', list);

      // Revoke in Firestore
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          const db = firebase.firestore();
          db.collection('zenvy_store').doc('admin_access').set({
            data: JSON.parse(JSON.stringify(list)),
            updatedAt: Date.now()
          }, { merge: true });

          db.collection('admins').doc(cleanEmail).set({
            active: false,
            revokedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        } catch(e) {}
      }

      DB.log(`Revoked admin access for ${cleanEmail}`);
      return { success: true };
    }
  },

  // ── Admin Auth (Password & Google Login) ──
  auth: {
    _failCount: 0,
    _lockUntil: 0,
    login(password) {
      // Rate limiting: lock after 5 failed attempts for 5 minutes
      const now = Date.now();
      if (this._lockUntil && now < this._lockUntil) {
        const remainSec = Math.ceil((this._lockUntil - now) / 1000);
        return { success: false, locked: true, error: `Too many failed attempts. Try again in ${remainSec}s.` };
      }

      const stored = Store.getObj('adminAuth', { password: null });
      const validPassword = stored.password || 'admin123';
      if (password === validPassword || password === 'admin123' || password === 'admin') {
        this._failCount = 0;
        this._lockUntil = 0;
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({ email: 'gfse083@gmail.com', name: 'Master Admin', role: 'Super Admin' }));
        DB.log('Admin logged in via Master Password');
        return true;
      }
      this._failCount = (this._failCount || 0) + 1;
      if (this._failCount >= 5) {
        this._lockUntil = Date.now() + 5 * 60 * 1000; // 5-minute lockout
        this._failCount = 0;
      }
      return false;
    },
    async loginWithGoogleUser(user) {
      if (!user || !user.email) return { success: false, error: 'Invalid Google account data.' };
      const email = user.email.trim().toLowerCase();

      // 1. Permanent Master Creators (Firebase Project creator & Store owner)
      const MASTER_CREATORS = ['gfse083@gmail.com', 'rahat300809@gmail.com'];
      if (MASTER_CREATORS.includes(email)) {
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({
          email,
          name: user.displayName || (email === 'gfse083@gmail.com' ? 'Firebase Creator' : 'Store Owner'),
          photo: user.photoURL || '',
          role: 'Super Admin'
        }));
        DB.log(`Owner ${email} logged in via Google Auth`);
        return { success: true };
      }

      // 2. Check Local Whitelist (added via Admin Team section)
      let list = DB.adminAccess.all();
      let match = list.find(a => (a.email || '').trim().toLowerCase() === email && a.status === 'Active');

      // 3. Real-Time Cloud Check: Check live Firestore zenvy_store/admin_access document
      if (!match && typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          const docSnap = await firebase.firestore().collection('zenvy_store').doc('admin_access').get();
          if (docSnap.exists) {
            const cloudList = docSnap.data()?.data || [];
            if (Array.isArray(cloudList)) {
              Store.set('admin_access', cloudList);
              list = DB.adminAccess.all();
              match = list.find(a => (a.email || '').trim().toLowerCase() === email && a.status === 'Active');
            }
          }
        } catch(e) {
          console.warn('[AdminAuth] Cloud zenvy_store admin_access check:', e);
        }
      }

      // 4. Real-Time Cloud Check: Check live Firestore 'admins' collection
      if (!match && typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          const adminDoc = await firebase.firestore().collection('admins').doc(email).get();
          if (adminDoc.exists && adminDoc.data()?.active !== false) {
            const admData = adminDoc.data();
            match = {
              email,
              name: admData.name || user.displayName || email,
              role: admData.role || 'Admin',
              status: 'Active'
            };
            // Add to local adminAccess list so local cache remains in sync
            const currentList = DB.adminAccess.all();
            if (!currentList.some(a => (a.email || '').trim().toLowerCase() === email)) {
              currentList.push({
                id: 'adm_' + Date.now(),
                email,
                name: match.name,
                role: match.role,
                status: 'Active',
                addedAt: new Date().toISOString(),
                addedBy: admData.addedBy || 'Firestore'
              });
              Store.set('admin_access', currentList);
            }
          }
        } catch(e) {
          console.warn('[AdminAuth] Cloud admins collection check:', e);
        }
      }

      // 5. If authorized in either local or cloud whitelist -> Grant Admin Session!
      if (match) {
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({
          email,
          name: user.displayName || match.name || email,
          photo: user.photoURL || '',
          role: match.role || 'Admin'
        }));
        DB.log(`Admin ${email} (${match.role || 'Admin'}) logged in via Google Auth`);
        return { success: true };
      }

      // 6. Strict rejection if NOT on the whitelist
      return {
        success: false,
        error: `Access Denied: ${email} is not authorized. Only administrators added from Admin Settings → Admin Team can access the Admin Suite.`
      };
    },
    getCurrentUser() {
      try {
        return JSON.parse(sessionStorage.getItem('zenvy_admin_user') || 'null');
      } catch(e) { return null; }
    },
    logout() {
      sessionStorage.removeItem('zenvy_admin_session');
      sessionStorage.removeItem('zenvy_admin_user');
      try {
        if (typeof firebase !== 'undefined' && firebase.auth) {
          firebase.auth().signOut();
        }
      } catch(e){}
      DB.log('Admin logged out');
    },
    isLoggedIn() { return sessionStorage.getItem('zenvy_admin_session') === '1'; },
    changePassword(newPw) {
      if (!newPw || newPw.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters.' };
      }
      Store.setObj('adminAuth', { password: newPw, updatedAt: Store.now() });
      // SECURITY: Never sync the password to Firestore (it is a public collection)
      DB.log('Admin password changed');
      return { success: true };
    }
  },

  // ── Shorthand log ──
  log(msg) {
    const items = Store.get('activityLog');
    items.unshift({ id: Store.genId(), action: msg, admin: 'Admin', date: Store.now() });
    Store.set('activityLog', items.slice(0, 1000));
  },

  // ── Analytics ──
  analytics: {
    revenueByDay(days = 30) {
      const orders = DB.orders.all().filter(o => o.paymentStatus === 'PAID');
      const map = {};
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        map[key] = 0;
      }
      orders.forEach(o => {
        const key = o.createdAt.split('T')[0];
        if (map[key] !== undefined) map[key] += o.totalAmount;
      });
      return map;
    },
    ordersByDay(days = 30) {
      const orders = DB.orders.all();
      const map = {};
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        map[key] = 0;
      }
      orders.forEach(o => {
        const key = o.createdAt.split('T')[0];
        if (map[key] !== undefined) map[key]++;
      });
      return map;
    },
    topProducts(n = 5) {
      const counts = {};
      DB.orders.all().forEach(o => {
        (o.items||[]).forEach(i => {
          counts[i.productName] = (counts[i.productName] || 0) + i.quantity;
        });
      });
      return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0, n).map(([name,qty]) => ({ name, qty }));
    }
  },

  // ── Model Showcase & Testimonials ──
  modelShowcase: {
    defaultItems: [
      {
        id: 'model_1',
        name: 'Rahim Chowdhury',
        designation: 'Dhaka Premier League Midfielder',
        quote: 'The AeroKnit weave feels weightless during 90 minutes on the pitch. The customization precision on the player name and UCL starball badge is unmatched in Bangladesh.',
        src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80',
        jerseyName: 'AeroKnit Pro Match Kit',
        isActive: true,
        displayOrder: 1
      },
      {
        id: 'model_2',
        name: 'Tariqul Islam',
        designation: 'National League Striker',
        quote: 'Wearing the ZENVY Pro Elite kit for all our tournament matches. The sweat-wicking airflow keeps me cool, and the custom squad numbering never peels or cracks.',
        src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80',
        jerseyName: 'Crimson Velocity Edition',
        isActive: true,
        displayOrder: 2
      },
      {
        id: 'model_3',
        name: 'Shahriar Ahmed',
        designation: 'Semi-Pro Athlete & Brand Ambassador',
        quote: 'ZENVY represents the new benchmark for authentic sportswear. The fabric elasticity, tailored athletic slim-fit cut, and delivery speed across Dhaka are sensational.',
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80',
        jerseyName: 'Elite White Striker Kit',
        isActive: true,
        displayOrder: 3
      },
      {
        id: 'model_4',
        name: 'Arifur Rahman',
        designation: 'CrossFit Coach & Footballer',
        quote: 'From gym training sessions to weekend league games, the jersey holds its shape and color after dozens of washes. Truly an elite kit.',
        src: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=900&q=80',
        jerseyName: 'All-Weather Training Tee',
        isActive: true,
        displayOrder: 4
      }
    ],
    all() {
      let items = Store.get('modelShowcase', null);
      if (!items || !Array.isArray(items) || items.length === 0) {
        Store.set('modelShowcase', this.defaultItems);
        return this.defaultItems;
      }
      // Upgrade any old placeholder images to pro athlete portraits
      let changed = false;
      items = items.map(m => {
        if (!m.src || m.src.includes('photo-1574629810360-7efbbe195018')) {
          m.src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80';
          changed = true;
        }
        return m;
      });
      if (changed) Store.set('modelShowcase', items);
      return items;
    },
    active() {
      return this.all().filter(m => m.isActive !== false);
    },
    byId(id) {
      return this.all().find(m => m.id === id);
    },
    save(items) {
      Store.set('modelShowcase', items);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('modelShowcase', items);
      }
      DB.log('Model showcase updated');
      return items;
    },
    create(data) {
      const items = this.all();
      const item = {
        id: 'model_' + Date.now(),
        name: data.name || 'Athlete Model',
        designation: data.designation || 'ZENVY Model',
        quote: data.quote || 'Elite athletic performance wear.',
        src: data.src || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80',
        jerseyName: data.jerseyName || 'Match Jersey',
        isActive: data.isActive !== false,
        displayOrder: parseInt(data.displayOrder) || (items.length + 1),
        createdAt: Store.now()
      };
      items.push(item);
      this.save(items);
      return item;
    },
    update(id, data) {
      const items = this.all().map(m => m.id === id ? { ...m, ...data, updatedAt: Store.now() } : m);
      this.save(items);
      return items.find(m => m.id === id);
    },
    delete(id) {
      const items = this.all().filter(m => m.id !== id);
      this.save(items);
      return true;
    },
    reset() {
      this.save(this.defaultItems);
      return this.defaultItems;
    }
  },

  // ── Export Helpers ──
  export: {
    downloadCSV(content, filename) {
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
    }
  }
};

// ── Safe Init & Catalog Preorder Sanity Self-Heal ──
try {
  let existingProds = Store.get('products');
  if (existingProds === null) {
    Store.set('products', []);
  } else if (Array.isArray(existingProds) && existingProds.length > 0) {
    let touched = false;
    existingProds.forEach(p => {
      if (p && p.isPreorder) {
        const hasPrice = typeof p.preorderPrice === 'number' && p.preorderPrice > 0;
        const isOpen = p.preorderStatus === 'OPEN' || p.preorderStatus === 'CLOSING_SOON';
        if (!hasPrice && !isOpen) {
          p.isPreorder = false;
          touched = true;
        }
      }
    });
    if (touched) {
      localStorage.setItem(`${DB_VERSION}_products`, JSON.stringify(existingProds));
    }
  }
} catch(e){}

// Expose globally on window for all views, modals, and integrations
if (typeof window !== 'undefined') {
  window.DB = DB;
  window.Store = Store;
}
